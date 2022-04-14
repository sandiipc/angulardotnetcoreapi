import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { DialogBoxComponent } from '../dialog-box/dialog-box.component';
import { userModel } from '../interfaces/userModel';
import { updateUserModel } from '../interfaces/updateUserModel';
import { UserCREDService } from '../services/usercred.service';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  public success: boolean = false;
  public message: string = "";
  private updatedUser: updateUserModel = { address: '', contact: ''};

  displayedColumns: string[] = ['userId', 'name', 'address', 'contact', 'action'];

  dataSource: userModel[] = [];

  @ViewChild(MatTable,{static:true}) table: MatTable<any> | undefined;

  constructor(private dialog: MatDialog,
              private userService: UserCREDService,
              private loginService: LoginService, 
              private router: Router) { 

      let tokenExist: boolean = this.loginService.isTokenExist("token");
      if(!tokenExist)
        this.router.navigateByUrl('/login');


      this.userService.getAllUser().subscribe(data => {

        this.dataSource = data;

      });

    }

  ngOnInit(): void {

  }

  openDialog(action: any,obj: any) {

    obj.action = action;
    const dialogRef = this.dialog.open(DialogBoxComponent, {
      width: '250px',
      data:obj
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result.event == 'Add'){
        // this.addRowData(result.data);
      }else if(result.event == 'Update'){
        this.updateRowData(result.data);
      }else if(result.event == 'Delete'){
        this.deleteRowData(result.data);
      }
    });
  }

  // addRowData(row_obj: any){
  //   var d = new Date();
  //   this.dataSource.push({
  //     id:d.getTime(),
  //     name:row_obj.name
  //   });
  //   this.table.renderRows();
    
  // }

  updateRowData(row_obj: any){
    this.dataSource = this.dataSource.filter((value,key)=>{
      if(value.userId == row_obj.userId){
        // value.name = row_obj.name;
        // api code goes here
        this.updatedUser.address =  row_obj.address;
        this.updatedUser.contact = row_obj.contact;

        this.userService.editUser(row_obj.userId, this.updatedUser).subscribe(data => {

            console.log(data);

            let code = data.statusCode;
            if(code != undefined && code == 200){

              console.log(data.responseObject);
              this.success = true;
              this.message = "User " + row_obj.name + " was successfully updated";

              this.userService.getAllUser().subscribe(data => {

                this.dataSource = data;
        
              });

            }
            else if(code != undefined && code == 404){

              this.success = false;
              this.message = "User " + row_obj.name + "not found";

            }
            else{

              this.success = false;
              this.message = "Error occured while update user " + row_obj.name + ". " +
              "Error details are: " + data.errorMsg;

            }

        });

      }
      return true;
    });
  }


  deleteRowData(row_obj: any){
    this.dataSource = this.dataSource.filter((value,key)=>{
      // return value.userId != row_obj.userId;

      if(value.userId == row_obj.userId){

        this.userService.deleteUser(row_obj.userId).subscribe(data => {

            console.log(data);

            let code = data.statusCode;
            if(code != undefined && code == 200){

              this.success = true;
              this.message = data.message;

              this.userService.getAllUser().subscribe(data => {

                this.dataSource = data;
        
              });

            }
            else if(code != undefined && code == 404){

              this.success = false;
              this.message = data.message;

            }
            else{

              this.success = false;
              this.message = data.errorMsg;

            }

        });

      }

    });
  }


}
