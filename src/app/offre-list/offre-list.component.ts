import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalServices } from '../_services/GlobalService.component';
import { offre } from '../pipes/search';
import { OfferService } from '../_services/offer.service';

@Component({
  selector: 'app-offre-list',
  templateUrl: './offre-list.component.html',
  styleUrls: ['./offre-list.component.css']
})
export class OffreListComponent implements OnInit {
  offres : offre[];
  Mesoffres: offre[];

  constructor(private globalService:GlobalServices,private router:Router,private offerService:OfferService) { }

  ngOnInit() {
    this.offerService.offreList().subscribe((resp) => {     
      
      this.offres = JSON.parse(resp['_body']);
      this.offres.forEach(offre => {
        offre['diff']= this.daydiff(offre.dateDebut,offre.dateFin);
      });
    },
    error=>{    
    });
    this.offerService.mesOffreList(localStorage.getItem('UserName')).subscribe((resp)=>{
      this.Mesoffres = resp;
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
  onApply(offre){
    
    this.offerService.apply(offre);
  }
  onDelete(offre){
    this.offerService.deleteOffre(offre).subscribe((resp)=>{
      this.ngOnInit();
    });

  }
}
