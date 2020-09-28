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
export class OfferService {

constructor(private http: Http) { }
public offreList(){

    let url = environment._userApiurl + "offre/list/";
   
    let header = new Headers({ "Content-Type": "application/json","Authorization":"Bearer "+localStorage.getItem('token') });
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
   public mesOffreList(username){
  
    let url = environment._userApiurl + "entreprise/byusername/";
    let header = new Headers({ "Content-Type": "application/json","Authorization":"Bearer "+localStorage.getItem('token') });
    let options = new RequestOptions({ headers: header });
    let mesOffres;
    return this.http
      .post(url, {"username":username},options)
      .map(
        // tslint:disable-next-line: whitespace
        (response: Response) => {
          let id_entreprise=JSON.parse(response['_body'])['_id'];
          localStorage.setItem('id_entreprise',id_entreprise);
          return id_entreprise
            
        }
      ).pipe(
        switchMap(output => 
          {
          
    let url1 = environment._userApiurl + "offre/byStagiaire/";
    let header1 = new Headers({ "Content-Type": "application/json","Authorization":"Bearer "+localStorage.getItem('token') });
    let options1 = new RequestOptions({ headers: header1 });
        return  this.http
        .post(url1, {"id_entreprise":output},options1)
        .map(
          // tslint:disable-next-line: whitespace
          (response: Response) => {
            mesOffres = JSON.parse(response['_body']);
            mesOffres.forEach(offre => {
              offre['diff']= this.daydiff(offre.dateDebut,offre.dateFin);
            });
            return mesOffres;
            
          }
        )
        
  
        }
      )
      )
      
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
  
   public addOffre(offre:offre,username){
  
    let url = environment._userApiurl + "entreprise/byusername/";
    let header = new Headers({ "Content-Type": "application/json","Authorization":"Bearer "+localStorage.getItem('token') });
    let options = new RequestOptions({ headers: header });
  console.log(offre)
    return this.http
      .post(url, {"username":username},options)
      .map(
        // tslint:disable-next-line: whitespace
        (response: Response) => {
          console.log(offre);
          offre.id_entreprise=JSON.parse(response['_body'])['_id'];
          let url1 = environment._userApiurl + "offre/add/";
   
          let header1 = new Headers({ "Content-Type": "application/json","Authorization":"Bearer "+localStorage.getItem('token') });
          let options = new RequestOptions({ headers: header1 });
        console.log(offre);
          return this.http
            .post(url1, offre,options)
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
  
  
 public apply(offre){
  
    let url = environment._userApiurl + "offre/apply/";
    let header = new Headers({ "Content-Type": "application/json","Authorization":"Bearer "+localStorage.getItem('token') });
    let options = new RequestOptions({ headers: header });
  console.log(offre)
    return this.http
      .post(url, {"offre":offre,"username":localStorage.getItem('UserName')},options)
      .map(
        // tslint:disable-next-line: whitespace
        (response: Response) => {
          console.log(response);
  
          return response;
        }
      )
      .catch(this.handleerror).subscribe();
  
  
   }
  
 public GetOfferById(id){
     
    let url = environment._userApiurl + "offre/byid/"+id;
    let header = new Headers({ "Content-Type": "application/json","Authorization":"Bearer "+localStorage.getItem('token') });
    
    let options = new RequestOptions({ headers: header});
    
    return this.http
    .get(url,options)
    .map(
      // tslint:disable-next-line: whitespace
      (response: Response) => {
        console.log(response);
  
        return JSON.parse(response['_body']);
      }
    )
    .catch(this.handleerror);
  
   }

 public  deleteOffre(offre: any) {
    let url = environment._userApiurl + "offre/delete/";
    let header = new Headers({ "Content-Type": "application/json","Authorization":"Bearer "+localStorage.getItem('token') });
    let options = new RequestOptions({ headers: header });
  console.log(offre)
    return this.http
      .post(url, {"id":offre._id},options)
      .map(
        // tslint:disable-next-line: whitespace
        (response: Response) => {
          
          console.log(response)
          return response;
        }
      )
      .catch(this.handleerror);
  }

public updateOffer(value: any, id: any) {
    let url = environment._userApiurl + "offre/update/"+id;
    let header = new Headers({ "Content-Type": "application/json","Authorization":"Bearer "+localStorage.getItem('token') });
    let options = new RequestOptions({ headers: header });
    value['id']= id;
    value['id_entreprise']= localStorage.getItem('id_entreprise');
    console.log(value);
    return this.http
    .put(url,value,options)
    .map(
      // tslint:disable-next-line: whitespace
      (response: Response) => {
        console.log(response);
  
        return JSON.parse(response['_body']);
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
  
}
