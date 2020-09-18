import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import {Http,Response,Request, RequestOptions,Headers} from '@angular/http';
import {environment} from '../environments/environment';

@Injectable()
export class SigninService { 

  constructor(private http:Http) { }
  Sign(resumedata): Observable<Response> {
    let url=environment._userApiurl+'user/login/';
    let header = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: header });
    
    return this
        .http
        .post(url,JSON.stringify(resumedata),options)
        .map(
          (response:Response)=>{
            console.log(JSON.parse(response['_body'])['token']);
            localStorage.setItem('token', JSON.parse(response['_body'])['token']);
            localStorage.setItem('role',JSON.parse(response['_body'])['user']['role']);
            return response;
          })
        .catch(this.handleerror)
}
//  Use scound type requset
       //return this.http.post(url,JSON.stringify(resumedata),options)


handleerror(error:Response) {
  return Observable.throw(error.statusText);
}

}
