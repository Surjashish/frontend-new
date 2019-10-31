import { Injectable } from '@angular/core';
import { Video } from '../my-posts/upload';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {JwtHelperService} from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class ViewUploadsService {
  constructor(private http: HttpClient) { 
  }

  getUser() {
    let obj = this.checkToken(JSON.stringify(localStorage.getItem('jwt')));
    let username = obj.sub;
    let url = 'http://13.235.222.93:8080/registration-service/api/v1/register/'+username;
    return this.http.get(url);
    // let posts = JSON.stringify(user);
    // console.log(user);
    // return posts;
  }           
  
  checkToken(tokenStr) {
    const helper = new JwtHelperService();
    const decodedToken = helper.decodeToken(tokenStr);
    console.log(decodedToken);
    
    return decodedToken;
  }
}
