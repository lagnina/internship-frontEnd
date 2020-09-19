import { Injectable } from '@angular/core';  
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot,Router } from '@angular/router';  
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { Observable } from 'rxjs/Observable';  
import { SigninService } from './signin.service';
@Injectable()
export class AuthGuardGuard implements CanActivate   
{  
  constructor(private router:Router,private signin:SigninService,public toastr: ToastsManager) {}  

canActivate(  next: ActivatedRouteSnapshot,state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean  
     {  
        
      
      if(!this.signin.IsLoggedIn()){
        this.toastr. error('signin first');
       this.router.navigate(['signin']); 
     }  
     return this.signin.IsLoggedIn();  
} 
}