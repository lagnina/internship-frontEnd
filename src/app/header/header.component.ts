import { Component, OnInit } from '@angular/core';
import {GlobalServices} from '../GlobalService.component';
import { Router } from '@angular/router';
import { SigninService } from '../signin.service';

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
