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
      console.log(this.demandes);
    },
    error=>{    
    });
  }

}
