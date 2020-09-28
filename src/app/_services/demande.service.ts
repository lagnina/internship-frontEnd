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
export class DemandeService {

constructor(private http: Http) { }
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
  
    console.log(username)
    let url = environment._userApiurl + "stagiaire/byusername";
    let header = new Headers({ "Content-Type": "application/json","Authorization":"Bearer "+localStorage.getItem('token') });
    let options = new RequestOptions({ headers: header });
  
    return this.http
      .post(url, {"username":username},options)
      .map(
        // tslint:disable-next-line: whitespace
        (response: Response) => {
          demande.id_stagiaire=JSON.parse(response['_body'])['_id'];
          console.log(demande);
          let url1 = environment._userApiurl + "demande/add/";
   
          let header1 = new Headers({ "Content-Type": "application/json","Authorization":"Bearer "+localStorage.getItem('token') });
          let options = new RequestOptions({ headers: header1 });
        
          return this.http
            .post(url1, demande,options)
            .map(
              // tslint:disable-next-line: whitespace
              (response: Response) => {
                return response;
              }
            )
            .catch(this.handleerror).subscribe();
        }
      )
      .catch(this.handleerror).subscribe();
  
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
  
  handleerror(error: Response) {
    return Observable.throw(error.statusText);
  }
   
}
