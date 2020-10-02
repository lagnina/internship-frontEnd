import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-demande',
  templateUrl: './demande.component.html',
  styleUrls: ['./demande.component.css']
})
export class demandeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  getRole() {
    return localStorage.getItem('role');
}
}
