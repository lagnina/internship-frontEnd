import { Component, OnInit } from '@angular/core';
import {GlobalServices} from '../_services/GlobalService.component';
import { Router } from '@angular/router';
import { SigninService } from '../_services/signin.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(public global:GlobalServices,private router: Router,private signin:SigninService) { }

  ngOnInit() {
  }
  signOut()
  {
   GlobalServices.setUserName(null);
   localStorage.removeItem('token'); 
    this.router.navigate(['']);
  }
  isLogged():boolean{
    
    return this.signin.IsLoggedIn();
  }

}
