import { Injectable } from "@angular/core";
import { retry } from "rxjs/operators/retry";
import { FormGroup } from "@angular/forms";
import { environment } from "../environments/environment";
import { Http, RequestOptions, Headers, Response } from "@angular/http";
import { Observable } from "rxjs";
import { demande } from "./pipes/search";
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
          console.log(response);

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
          console.log(response);

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

 public demandeList(){

  let url = environment._userApiurl + "demande/list/";
 
  let header = new Headers({ "Content-Type": "application/json","Authorization":"Bearer "+localStorage.getItem('token') });
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

 public addDemande(demande:demande,username){

  let url = environment._userApiurl + "demande/list/";
  let header = new Headers({ "Content-Type": "application/json","Authorization":"Bearer "+localStorage.getItem('token') });
  let options = new RequestOptions({ headers: header });

  return this.http
    .get(url, options)
    .map(
      // tslint:disable-next-line: whitespace
      (response: Response) => {
        demande.id_stagiaire=JSON.parse(response['_body'])['_id'];
        let url1 = environment._userApiurl + "demande/add/";
 
        let header1 = new Headers({ "Content-Type": "application/json","Authorization":"Bearer "+localStorage.getItem('token') });
        let options = new RequestOptions({ headers: header1 });
      
        return this.http
          .post(url1, demande,options)
          .map(
            // tslint:disable-next-line: whitespace
            (response: Response) => {
              console.log(response);
              return response;
            }
          )
          .catch(this.handleerror).subscribe();
      }
    )
    .catch(this.handleerror).subscribe();

 }

 public offreList(){

  let url = environment._userApiurl + "offre/list/";
 
  let header = new Headers({ "Content-Type": "application/json","Authorization":"Bearer "+localStorage.getItem('token') });
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

 public addOffre(demande:demande,username){

  let url = environment._userApiurl + "offre/list/";
  let header = new Headers({ "Content-Type": "application/json","Authorization":"Bearer "+localStorage.getItem('token') });
  let options = new RequestOptions({ headers: header });

  return this.http
    .get(url, options)
    .map(
      // tslint:disable-next-line: whitespace
      (response: Response) => {
        demande.id_stagiaire=JSON.parse(response['_body'])['_id'];
        let url1 = environment._userApiurl + "offre/add/";
 
        let header1 = new Headers({ "Content-Type": "application/json","Authorization":"Bearer "+localStorage.getItem('token') });
        let options = new RequestOptions({ headers: header1 });
      
        return this.http
          .post(url1, demande,options)
          .map(
            // tslint:disable-next-line: whitespace
            (response: Response) => {
              console.log(response);
              return response;
            }
          )
          .catch(this.handleerror).subscribe();
      }
    )
    .catch(this.handleerror).subscribe();

 }

}
