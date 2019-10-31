import { Injectable } from '@angular/core';
import { JwtHelperService } from "@auth0/angular-jwt";
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('jwt'),
      'Access-Control-Allow-Origin': '*'
    }
    
  }

  checkToken(tokenStr) {
    const helper = new JwtHelperService();
    const decodedToken = helper.decodeToken(tokenStr);
    console.log(decodedToken);
    
    return decodedToken;
  }

  getUser(username) {
    let headers = this.httpOptions.headers;
    console.log('headers: ',headers);
    return this.http.get<any>('http://13.235.222.93:8080/registration-service/api/v1/register/'+username, this.httpOptions);
  }

}
