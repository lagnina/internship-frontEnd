import { Component, OnInit } from '@angular/core';
import { GlobalServices } from '../_services/GlobalService.component';
import { demande } from '../pipes/search';
import { DemandeService } from '../_services/demande.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-demande-list',
  templateUrl: './demande-list.component.html',
  styleUrls: ['./demande-list.component.css']
})
export class DemandeListComponent implements OnInit {
  
 demandes : demande[];
 Mesdemandes: demande[];

  constructor(private globalService:GlobalServices,private demandeService:DemandeService,private rourter:Router) { }

  ngOnInit() {
    this.demandeService.demandeList().subscribe((resp) => {     
      
      this.demandes = JSON.parse(resp['_body']);
      this.demandes.forEach(demande => {
        demande['diff']= this.daydiff(demande.dateDebut,demande.dateFin);
      });
      console.log(this.demandes);
    },
    error=>{    
    });
    this.demandeService.mesDemandeList(localStorage.getItem('UserName')).subscribe((resp)=>{
      this.Mesdemandes = resp;
    });
  }
  daydiff(date1,date2){
    var date11 = new Date(date1);
    var date22 = new Date(date2);
     // différence des heures
    var time_diff = date22.getTime() - date11.getTime();
     // différence de jours
    var days_Diff = time_diff / (1000 * 3600 * 24);
    // afficher la différence
    return days_Diff;
  }

  onDelete(demande){
    this.demandeService.deleteDemande(demande).subscribe((resp)=>{
      this.ngOnInit();
    });

  }
  getRole() {
    return localStorage.getItem('role');
}

}
