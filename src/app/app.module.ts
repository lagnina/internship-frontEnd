import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RatingModule} from "ng2-rating";
import {PostresumeService} from './postresume.service';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { ServicesComponent } from './services/services.component';
import { PostResumeComponent } from './post-resume/post-resume.component';
import { demandeComponent } from './demande/demande.component';
import { offerComponent } from './offer/offer.component';
import { AppRoutingModule } from './app-routing.module';
import {SigninComponent} from './signin/signin.component';
import {SigninService} from './signin.service';
import{GlobalServices} from './GlobalService.component';
import {NgxPaginationModule} from 'ngx-pagination';
import {JobListService} from './job-list.service';
import { SearchComponent } from './search/search.component';
import {LoaderService} from './loader.service';
import {ToastModule} from 'ng2-toastr/ng2-toastr';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AuthGuardGuard}from './auth-guard.service'

import { RestrictTodayDirective } from './restrict-today.directive';
import { SampleComponent } from './sample/sample.component';

import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { OffreFormComponent } from './offre-form/offre-form.component';
import { OffreListComponent } from './offre-list/offre-list.component';
import { DemandeFormComponent } from './demande-form/demande-form.component';
import { DemandeListComponent } from './demande-list/demande-list.component';


@NgModule({
  declarations: [				
    AppComponent,    
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    ServicesComponent,
    PostResumeComponent,
    demandeComponent,
    offerComponent,SigninComponent, SearchComponent, RestrictTodayDirective, SampleComponent,
      OffreFormComponent,
      OffreListComponent,
      DemandeFormComponent,
      DemandeListComponent
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,FormsModule,ReactiveFormsModule,RatingModule,HttpModule,NgxPaginationModule,ToastModule.forRoot(),
    BrowserAnimationsModule,BsDatepickerModule.forRoot()
  ],
  providers: [PostresumeService,SigninService,GlobalServices,JobListService,LoaderService,AuthGuardGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
