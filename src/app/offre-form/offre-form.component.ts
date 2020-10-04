import { Component, OnInit ,ViewChild, ViewContainerRef} from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import {PostresumeService} from '../_services/postresume.service';
import {LoaderService} from '../_services/loader.service';
import { ToastsManager } from 'ng2-toastr';
import {GlobalServices} from '../_services/GlobalService.component';
import { SigninService } from '../_services/signin.service';
import { ActivatedRoute, Router } from '@angular/router';
import { OfferService } from '../_services/offer.service';


@Component({
  selector: 'app-offre-form',
  templateUrl: './offre-form.component.html',
  styleUrls: ['./offre-form.component.css']
})
export class OffreFormComponent implements OnInit {
  offreForm : FormGroup;

  constructor(private fb:FormBuilder,
    private loaderService: LoaderService , public toaster : ToastsManager,private globalService:GlobalServices,private router: Router,private activatedRoute: ActivatedRoute,private offerService:OfferService) { }

  ngOnInit() {
    
    this.offreForm = this.fb.group ({

      nom : [''],
      ville :[''],
      dateDebut :[''],
      dateFin :[''],
      specialite :[''],
      description :[''],
      nbrPersonne :[''],
      remuneration:[''],
      niveau:['']

      

    });

    if(this.router.url.includes('update')){
      this.offerService.GetOfferById(this.activatedRoute.snapshot.params['id']).subscribe((res)=>
      this.offreForm.patchValue({

        nom : res.nom,
        ville :res.ville,
        dateDebut :res.dateDebut.substring(0,10),
        dateFin :res.dateFin.substring(0,10),
        specialite :res.specialite,
        description :res.description,
        nbrPersonne :res.nbrPersonne,
        remuneration:res.remuneration,
        niveau:res.niveau
  
        
  
      }))
    }
    this.offreForm.valueChanges.subscribe(()=>console.log(this.offreForm.value));

  }



  onSubmit(){              
    if(this.router.url.includes('update')){   

      this.offerService.updateOffer(this.offreForm.value,this.activatedRoute.snapshot.params['id']).subscribe((resp)=>
      {
        console.log('sucess')
        console.log(resp)
      })                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            
    
    }
    else if (this.router.url.includes('delete')){

    }else{
      this.offerService.addOffre(this.offreForm.value,localStorage.getItem('UserName'));
    }
      this.router.navigate(['/offer/list']);
  }

  includesUpdate(){
    if(this.router.url.includes('update')) return true;
    return false;
  }

  includesDelete(){
    if(this.router.url.includes('delete')) return true;
    return false;
  }

}