import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GlobalServices } from '../GlobalService.component';

@Component({
  selector: 'app-offre-update',
  templateUrl: './offre-update.component.html',
  styleUrls: ['./offre-update.component.css']
})
export class OffreUpdateComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute, private gs:GlobalServices) { }

  ngOnInit() {
    console.log(this.activatedRoute.snapshot.params)
    this.gs.GetOfferById(this.activatedRoute.snapshot.params["id"]).subscribe((resp)=>
    console.log(resp))

  }

}
