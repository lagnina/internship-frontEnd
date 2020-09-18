import { Injectable } from '@angular/core';
import { retry } from 'rxjs/operators/retry';
import { FormGroup } from '@angular/forms';
import {environment} from '../environments/environment';
import { Http, RequestOptions , Headers,Response} from '@angular/http';
import { Observable } from 'rxjs';
@Injectable()
export class GlobalServices{
  constructor(private http:Http) { }
      
      // public SetLoginData(user:UserLoginData):void
      // {
      //     localStorage.setItem("Login",JSON.stringify(user));
      // }
      // public GetValueFromLocalStorage():UserLoginData{
      //     let signindata=JSON.parse(localStorage.getItem("Login"));
      //     return signindata==null?null:signindata;
      // }
      
      public  getStagiaireCount(){
        
          let url=environment._userApiurl+'stagiaire/count/';
          let header = new Headers({ 'Content-Type': 'application/json' });
          let options = new RequestOptions({ headers: header });
          
          return this
              .http
              .get(url,options)
              .map(
                // tslint:disable-next-line: whitespace
                (response:Response)=> {
                  console.log(response);
                 
                  return response;
                })
              .catch(this.handleerror)

      }

      public  getOffreCount(){
        
        let url=environment._userApiurl+'offre/count/';
        let header = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: header });
        
        return this
            .http
            .get(url,options)
            .map(
              // tslint:disable-next-line: whitespace
              (response:Response)=> {
                console.log(response);
               
                return response;
              })
            .catch(this.handleerror)

    }


    public  getEntrepriseCount(){
        
      let url=environment._userApiurl+'entreprise/count/';
      let header = new Headers({ 'Content-Type': 'application/json' });
      let options = new RequestOptions({ headers: header });
      
      return this
          .http
          .get(url,options)
          .map(
            // tslint:disable-next-line: whitespace
            (response:Response)=> {
              console.log(response);
             
              return response;
            })
          .catch(this.handleerror)

  }





























  
      handleerror(error:Response) {
        return Observable.throw(error.statusText);
      }
      public  getUserName(): string{
        let userName = (localStorage.getItem("UserName"));

        if(userName == "null")
        {
          userName = null;
        }
        return userName;
      }

      public static setUserName(userName:string){
        localStorage.setItem("UserName", userName);

        console.log("setUserName->UserNameStr: " +  userName);
      }

      public todayDate(){
        return new Date().toJSON().split('T')[0];
      }
      public static   dateLessThan(fromDate: string, toDate: string) {
        return (group: FormGroup): {[key: string]: any} => {
         let _fromDate = group.controls[fromDate];
         let _toDate = group.controls[toDate];     
         if (_fromDate.value > _toDate.value) {       
           return {
            daterange: "From Date Less Then To Date Please Change"
           };
         }     
         return {};
        }
      }
}