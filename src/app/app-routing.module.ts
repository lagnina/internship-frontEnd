import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './home/home.component';
import {demandeComponent} from './demande/demande.component';
import {offerComponent} from './offer/offer.component';
import {PostResumeComponent} from './post-resume/post-resume.component';
import {ServicesComponent}  from './services/services.component';
import {SigninComponent} from './signin/signin.component';
import {SearchComponent} from './search/search.component';

const routes: Routes =[
  { path:'home',component:HomeComponent},
  { path:'postresume',component:PostResumeComponent},
  { path:'service',component:ServicesComponent},
  { path:'demande',component:demandeComponent},
  { path:'offer',component:offerComponent},
  {path:'signin',component:SigninComponent},
  {path:'search',component:SearchComponent},
  { path:'',redirectTo: 'home', pathMatch: 'full' },
   
  ];


@NgModule({
  
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [ RouterModule ],
  declarations: []
})
export class AppRoutingModule { }
