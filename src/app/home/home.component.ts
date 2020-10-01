import { Component, OnInit } from '@angular/core';
import {GlobalServices} from '../_services/GlobalService.component';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  countstagiare: number;
  countoffre: number;
  countentreprise: number;
  constructor(private global:GlobalServices) { }

  ngOnInit() {

    this.global.getStagiaireCount().subscribe((resp) => {     
    
      this.countstagiare = JSON.parse(resp['_body'])['count'];
    },
error=>{    
  }
);
this.global.getOffreCount().subscribe((resp) => {     
      
  this.countoffre = JSON.parse(resp['_body'])['count'];
},
error=>{    
}
);
this.global.getEntrepriseCount().subscribe((resp) => {     
      
  this.countentreprise = JSON.parse(resp['_body'])['count'];
},
error=>{    
}
);
  }

}
