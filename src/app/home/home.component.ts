import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  title = 'NGWebApiCore';

  constructor(private loginService: LoginService, private router: Router) { 
      let tokenExist: boolean = this.loginService.isTokenExist("token");
      if(!tokenExist)
        this.router.navigateByUrl('/login');

  }

  ngOnInit(): void {
  }

}
