import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map'
import "rxjs/Rx";
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { ServiceResponce } from './../state-management/model/service-responce';
//import { Configuration } from '../app.constants';
// import * as globalVariables from './../global/global'
@Injectable()
export class LoginService {

  private globalVariables: string; 
  private headers: Headers;
  private actionUrl: string; 


  constructor(private _http: Http) { 
    this.globalVariables = 'http://stgcvassamplemanagerservice.foragelab.com/';   
    this.actionUrl = 'http://date.jsontest.com';
  }
 



  

  getCurrentTime() {
    return this._http.get('http://date.jsontest.com')
      .map(res => res.json());


  }

  postJSON() {
  }

  public getLogin(userName: string, password: string) {
    console.log(userName + password);
    return this._http.get(this.globalVariables.toString() +'CVASUtilities.svc/Login/' + userName + '/' + password)
      .map(res => res.json());


  }
}
// import { Injectable } from '@angular/core';
// import { Http, Response, Headers } from '@angular/http';
// import { Observable } from 'rxjs/Observable';
// import "rxjs/Rx";
// import 'rxjs/add/operator/map';
// import 'rxjs/add/operator/catch';

// @Injectable()
// export class LoginServiceService {
//   private headers: Headers;

//   constructor(private http: Http) {
//     this.http = http;
//   }

//   checkLogin() {
//     this.headers = new Headers();
//     //this.headers.append("Content-Type", 'application/json');   
//     //this.headers.append('Accept', 'application/json');
//     //return this.http.get('http://cvassamplemanagerservice.foragelab.com//CVASUtilities.svc/Login/' + userName + '/' + password, { headers: this.headers }).map(res => res.json().data);
//     return this.http.get('http://stgcvassamplemanagerservice.foragelab.com/CVASUtilities.svc/Login/cvas@foragelab.com/jj', { headers: this.headers }).map(res => res.json().data);
//   }

//    private handleError (error: Response) {
//     // in a real world app, we may send the error to some remote logging infrastructure
//     // instead of just logging it to the console
//     console.error(error);
//     return Observable.throw(error.json().error || 'Server error');
//   }
// }
