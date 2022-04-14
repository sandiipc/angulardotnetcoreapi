import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { LoginService } from '../services/login.service';
import { AppSettings } from '../appsettings.component';
import { userModel } from '../interfaces/userModel';
import { updateUserModel } from '../interfaces/updateUserModel';

@Injectable({
  providedIn: 'root'
})
export class UserCREDService {

  private token: string = '';
  private headers: HttpHeaders;

    constructor(private http: HttpClient,
      private loginService: LoginService) { 

      this.token = this.loginService.getToken(); 

      this.headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ` + this.token
      });
    

    }

    getAllUser(): Observable<any>{

      return this.http.get<any>(AppSettings.API_ENDPOINT + 'user', { headers: this.headers });
      
    }


    createUser(user: userModel): Observable<any>{

        return this.http.post<any>(AppSettings.API_ENDPOINT + 'user/create', user, { headers: this.headers });

    }

    editUser(id: number, updateUser: updateUserModel): Observable<any>{

      return this.http.post<any>(AppSettings.API_ENDPOINT + 'user/edit/' + id, updateUser, { headers: this.headers });

  }

  deleteUser(id: number): Observable<any>{

    return this.http.get<any>(AppSettings.API_ENDPOINT + 'user/delete/' + id, { headers: this.headers });

}



}