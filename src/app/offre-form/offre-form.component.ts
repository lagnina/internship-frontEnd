import { Component, OnInit ,ViewChild, ViewContainerRef} from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import {PostresumeService} from '../postresume.service';
import {LoaderService} from '../loader.service';
import { ToastsManager } from 'ng2-toastr';
import {GlobalServices} from '../GlobalService.component';
import { SigninService } from '../signin.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-offre-form',
  templateUrl: './offre-form.component.html',
  styleUrls: ['./offre-form.component.css']
})
export class OffreFormComponent implements OnInit {
  offreForm : FormGroup;

  constructor(private fb:FormBuilder,
    private loaderService: LoaderService , public toaster : ToastsManager,private globalService:GlobalServices,private router: Router,private activatedRoute: ActivatedRoute) { }

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
      this.globalService.GetOfferById(this.activatedRoute.snapshot.params['id']).subscribe((res)=>
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

      this.globalService.updateOffer(this.offreForm.value,this.activatedRoute.snapshot.params['id']).subscribe((resp)=>
      {
        console.log('sucess')
        console.log(resp)
      })                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            
    
    }
    else if (this.router.url.includes('delete')){

    }else{
      this.globalService.addOffre(this.offreForm.value,localStorage.getItem('UserName'));
    }
      this.router.navigate(['/offer/list']);
  }

}