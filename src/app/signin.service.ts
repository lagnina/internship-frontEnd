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
            console.log(JSON.parse(response['_body'])['user']['role']);
            localStorage.setItem('role',JSON.parse(response['_body'])['user']['role'][0]);
            return response;
          })
        .catch(this.handleerror)
}

Signup(userData,stagiareData?,entrepriseData?) {
  let url=environment._userApiurl+'user/signup/';
  let header = new Headers({ 'Content-Type': 'application/json' });
  let options = new RequestOptions({ headers: header });
  let username: String;
  let role;
  
      this
      .http
      .post(url,JSON.stringify(userData),options)
      .map(
        (response:Response)=>{
          username = JSON.parse(response['_body'])['username'];
          role = JSON.parse(response['_body'])['role'][0]
          console.log(role);
          console.log(response)
          if(role == "1"){
            console.log('tgsjsjjjkkkfdhs');
            const url1=environment._userApiurl+'stagiaire/add/';
            stagiareData['username']=username;
            stagiareData['tele']=parseInt(stagiareData['tele']);
            this
          .http
          .post(url1,JSON.stringify(stagiareData),options)
          .map(
            (response:Response)=>{
              console.log(response)
            })
          .catch(this.handleerror).subscribe()
          }else{
            const url1=environment._userApiurl+'entreprise/add/';
            entrepriseData['username']=username;
            entrepriseData['tele']=parseInt(entrepriseData['tele']);
            this
          .http
          .post(url1,JSON.stringify(entrepriseData),options)
          .map(
            (response:Response)=>{
              console.log(response)
              
            })
          .catch(this.handleerror).subscribe()
    
          }
        })
      .catch(this.handleerror).subscribe()

     
      
}
//  Use scound type requset
       //return this.http.post(url,JSON.stringify(resumedata),options)


handleerror(error:Response) {
  return Observable.throw(error.statusText);
}
IsLoggedIn():boolean{
  
    const token = localStorage.getItem('token');
    
    if(token != null){
      
      return true;
    }

    return false;
    
  
  
}
}
