import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username: string | undefined;
  password: string | undefined;

  constructor(private loginService: LoginService, private router: Router) {
    this.loginService.deleteToken("token");
   }

  ngOnInit(): void {
  }


  login() {
    console.log(this.username);
    console.log(this.password);

    

  const credential = {Username: this.username, Password: this.password};

  this.loginService.login(credential).subscribe(data => {

    console.log(data);

    this.loginService.setToken(data);

    this.router.navigateByUrl('/home');
    
  });

  }

}
