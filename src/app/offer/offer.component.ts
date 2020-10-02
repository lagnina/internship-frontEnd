import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-offer',
  templateUrl: './offer.component.html',
  styleUrls: ['./offer.component.css']
})
export class offerComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  getRole() {
    return localStorage.getItem('role');
}

}
