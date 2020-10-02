import { Injectable } from "@angular/core";
import { retry } from "rxjs/operators/retry";
import { FormGroup } from "@angular/forms";
import { environment } from "../../environments/environment";
import { Http, RequestOptions, Headers, Response } from "@angular/http";
import { Observable } from "rxjs";
import { demande, offre } from "../pipes/search";
import { switchMap } from "rxjs/operators";
import { HttpParams } from "@angular/common/http";
@Injectable()
export class GlobalServices {
 
  
  constructor(private http: Http) {}

  // public SetLoginData(user:UserLoginData):void
  // {
  //     localStorage.setItem("Login",JSON.stringify(user));
  // }
  // public GetValueFromLocalStorage():UserLoginData{
  //     let signindata=JSON.parse(localStorage.getItem("Login"));
  //     return signindata==null?null:signindata;
  // }

  public getStagiaireCount() {
    let url = environment._userApiurl + "stagiaire/count/";
    let header = new Headers({ "Content-Type": "application/json" });
    let options = new RequestOptions({ headers: header });

    return this.http
      .get(url, options)
      .map(
        // tslint:disable-next-line: whitespace
        (response: Response) => {

          return response;
        }
      )
      .catch(this.handleerror);
  }

  public getOffreCount() {
    let url = environment._userApiurl + "offre/count/";
    let header = new Headers({ "Content-Type": "application/json" });
    let options = new RequestOptions({ headers: header });

    return this.http
      .get(url, options)
      .map(
        // tslint:disable-next-line: whitespace
        (response: Response) => {
          return response;
        }
      )
      .catch(this.handleerror);
  }

  public getEntrepriseCount() {
    let url = environment._userApiurl + "entreprise/count/";
    let header = new Headers({ "Content-Type": "application/json" });
    let options = new RequestOptions({ headers: header });

    return this.http
      .get(url, options)
      .map(
        // tslint:disable-next-line: whitespace
        (response: Response) => {
          console.log(response);

          return response;
        }
      )
      .catch(this.handleerror);
  }

  handleerror(error: Response) {
    return Observable.throw(error.statusText);
  }
  public getUserName(): string {
    let userName = localStorage.getItem("UserName");

    if (userName == "null") {
      userName = null;
    }
    return userName;
  }

  public static setUserName(userName: string) {
    localStorage.setItem("UserName", userName);

    console.log("setUserName->UserNameStr: " + userName);
  }

  public todayDate() {
    return new Date().toJSON().split("T")[0];
  }
  public static dateLessThan(fromDate: string, toDate: string) {
    return (group: FormGroup): { [key: string]: any } => {
      let _fromDate = group.controls[fromDate];
      let _toDate = group.controls[toDate];
      if (_fromDate.value > _toDate.value) {
        return {
          daterange: "From Date Less Then To Date Please Change",
        };
      }
      return {};
    };
  }

 
 
 public daydiff(date1,date2){
  var date11 = new Date(date1);
  var date22 = new Date(date2);
   // différence des heures
  var time_diff = date22.getTime() - date11.getTime();
   // différence de jours
  var days_Diff = time_diff / (1000 * 3600 * 24);
  // afficher la différence
  return days_Diff;
}

 
 public sendCv(cv){
  let url = environment._userApiurl + "stagiaire/uploadCv/";
  let header = new Headers({ "Content-Type": "application/json","Authorization":"Bearer "+localStorage.getItem('token') });
  let options = new RequestOptions({ headers: header });
 

  var arr = []
    var formData = new FormData();
    arr.push(cv.file);
console.log(cv.file)


  formData.append('file', arr[0])

console.log(formData)
  
  return this.http
  .post(url, cv,options)
  .map(
    // tslint:disable-next-line: whitespace
    (response: Response) => {
      console.log(response);

      return response;
    }
  )
  .catch(this.handleerror).subscribe();

 }

 public isLogged(){

  if (localStorage.getItem("UserName") === null) {
    return false;
  }
  return true;
 }

 



}
