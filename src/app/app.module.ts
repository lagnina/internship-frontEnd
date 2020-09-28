import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RatingModule} from "ng2-rating";
import {PostresumeService} from './_services/postresume.service';
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
import {SigninService} from './_services/signin.service';
import{GlobalServices} from './_services/GlobalService.component';
import {NgxPaginationModule} from 'ngx-pagination';
import {JobListService} from './_services/job-list.service';
import { SearchComponent } from './search/search.component';
import {LoaderService} from './_services/loader.service';
import {ToastModule} from 'ng2-toastr/ng2-toastr';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AuthGuardGuard}from './_services/auth-guard.service';
import {OfferService}from './_services/offer.service'

import { RestrictTodayDirective } from './restrict-today.directive';
import { SampleComponent } from './sample/sample.component';

import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { OffreFormComponent } from './offre-form/offre-form.component';
import { OffreListComponent } from './offre-list/offre-list.component';
import { DemandeFormComponent } from './demande-form/demande-form.component';
import { DemandeListComponent } from './demande-list/demande-list.component';
import { DemandeService } from './_services/demande.service';


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
  providers: [PostresumeService,SigninService,GlobalServices,JobListService,LoaderService,AuthGuardGuard,OfferService,DemandeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
