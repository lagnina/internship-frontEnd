import { Component, OnInit } from '@angular/core';
import { GlobalServices } from '../GlobalService.component';
import { demande } from '../pipes/search';

@Component({
  selector: 'app-demande-list',
  templateUrl: './demande-list.component.html',
  styleUrls: ['./demande-list.component.css']
})
export class DemandeListComponent implements OnInit {
  
 demandes : demande[];

  constructor(private globalService:GlobalServices) { }

  ngOnInit() {
    this.globalService.demandeList().subscribe((resp) => {     
      
      this.demandes = JSON.parse(resp['_body']);
      this.demandes.forEach(demande => {
        demande['diff']= this.daydiff(demande.dateDebut,demande.dateFin);
      });
      console.log(this.demandes);
    },
    error=>{    
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

}
