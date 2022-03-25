import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { AppSettings } from '../appsettings.component';
import { CookieService } from "ngx-cookie-service";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient, private cookies: CookieService) { }

  login(credential: any): Observable<any> {

    return this.http.post<string>(AppSettings.API_ENDPOINT + 'login', credential);
  }


  setToken(token: string) {
    this.cookies.set("token", token);
  }
  getToken() {
    return this.cookies.get("token");
  }

  deleteToken(token: string){
    this.cookies.delete(token);    
  }

  isTokenExist(token: string){
    return this.cookies.check(token);
  }

}
