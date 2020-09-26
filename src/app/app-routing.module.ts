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
import { AuthGuardGuard } from './auth-guard.service';
import { OffreFormComponent } from './offre-form/offre-form.component';
import { OffreListComponent } from './offre-list/offre-list.component';
import { DemandeListComponent } from './demande-list/demande-list.component';
import { DemandeFormComponent } from './demande-form/demande-form.component';

const routes: Routes =[
  { path:'home',component:HomeComponent},
  { path:'signup',component:PostResumeComponent},
  { path:'service',component: ServicesComponent,canActivate:[AuthGuardGuard]},
  { path:'demande',component: demandeComponent,canActivate:[AuthGuardGuard],children:[
    {path: '', redirectTo: 'list', pathMatch: 'full'}, 
      {path: 'list', component: DemandeListComponent}, 
      {path: 'form', component: DemandeFormComponent}, 
      {path: 'update', component: DemandeFormComponent}, 
      {path: 'delete', component: DemandeFormComponent}, 
  ]},
  { path:'offer',component: offerComponent,canActivate:[AuthGuardGuard],children:[
    {path: '', redirectTo: 'list', pathMatch: 'full'}, 
      {path: 'list', component: OffreListComponent}, 
      {path: 'form', component: OffreFormComponent}, 
      {path: 'update/:id', component: OffreFormComponent}, 
      {path: 'delete', component: OffreFormComponent}, 
  ]},
  {path:'signin',component: SigninComponent},
  {path:'search',component: SearchComponent,canActivate:[AuthGuardGuard]},
  { path:'offerform',component: OffreFormComponent,canActivate:[AuthGuardGuard]},
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
