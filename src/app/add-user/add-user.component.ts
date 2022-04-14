import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { userModel } from '../interfaces/userModel';
import { UserCREDService } from '../services/usercred.service';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  public success: boolean = false;
  public message: string = "";
  
  public userFrmGroup : any = this.formBuilder.group({
    name: '',
    address: '',
    contact: ''
  });

  private user: userModel = { userId: 0, name: '', address: '', contact: ''};

  constructor(private formBuilder: FormBuilder, 
    private userService: UserCREDService,
    private loginService: LoginService, 
    private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    // Process data here

    let tokenExist: boolean = this.loginService.isTokenExist("token");
    if(!tokenExist)
      this.router.navigateByUrl('/login');
    
    this.user.name = this.userFrmGroup.value.name;
    this.user.address = this.userFrmGroup.value.address;
    this.user.contact = this.userFrmGroup.value.contact;

    this.userService.createUser(this.user).subscribe(data => {

      console.log(data);

      let code = data.statusCode;
      if(code != undefined && code == 201){

        console.log(data.responseObject);
        this.success = true;
        this.message = "User " + data.responseObject.name + " was successfully added";

      }
      else{

        this.success = false;
        this.message = "Error occured while adding user " + data.responseObject.name + ". " +
        "Error details are: " + data.errorMsg;

      }

    });

    //console.warn('User added successfully', this.userFrmGroup.value);

    this.userFrmGroup.reset();
  }

}
