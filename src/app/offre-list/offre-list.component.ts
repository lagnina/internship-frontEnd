import { Component, OnInit } from '@angular/core';
import { GlobalServices } from '../GlobalService.component';
import { offre } from '../pipes/search';

@Component({
  selector: 'app-offre-list',
  templateUrl: './offre-list.component.html',
  styleUrls: ['./offre-list.component.css']
})
export class OffreListComponent implements OnInit {
  offres : offre[];

  constructor(private globalService:GlobalServices) { }

  ngOnInit() {
    this.globalService.offreList().subscribe((resp) => {     
      
      this.offres = JSON.parse(resp['_body']);
      this.offres.forEach(offre => {
        offre['diff']= this.daydiff(offre.dateDebut,offre.dateFin);
      });
      console.log(this.offres);
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
