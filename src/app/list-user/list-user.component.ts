import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AppSettings } from '../appsettings.component';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';
import { userModel } from '../interfaces/userModel';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css']
})
export class ListUserComponent implements OnInit {

  // public users: UserEntity[] = [];
  public users: userModel[] = [];
  public success: boolean = false;
  private token: string = '';

  constructor(private http: HttpClient, private loginService: LoginService, private router: Router) { 

    let tokenExist: boolean = this.loginService.isTokenExist("token");
      if(!tokenExist)
        this.router.navigateByUrl('/login');

    this.token = this.loginService.getToken(); 

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ` + this.token
    })

    // http.get<UserEntity[]>(AppSettings.API_ENDPOINT + 'user', { headers: headers }).subscribe(result => {
    //   this.users = result;
    //   this.success = true;
    // }, error => console.error(error));

    http.get<userModel[]>(AppSettings.API_ENDPOINT + 'user', { headers: headers }).subscribe(result => {
      this.users = result;
      this.success = true;
    }, error => console.error(error));

  }

  ngOnInit(): void {
  }

}