import { Component, OnInit ,ViewChild, ViewContainerRef} from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import {PostresumeService} from '../postresume.service';
import {LoaderService} from '../loader.service';
import { ToastsManager } from 'ng2-toastr';
import {GlobalServices} from '../GlobalService.component';
import { SigninService } from '../signin.service';

@Component({
  selector: 'app-offre-form',
  templateUrl: './offre-form.component.html',
  styleUrls: ['./offre-form.component.css']
})
export class OffreFormComponent implements OnInit {
  offreForm : FormGroup;

  constructor(private fb:FormBuilder,
    private loaderService: LoaderService , public toaster : ToastsManager) { }

  ngOnInit() {
    this.offreForm = this.fb.group ({

      nom : [''],
      dateDebut :[''],
      dateFin :[''],
      specialite :[''],
      description :[''],
      NbrPersonne :[''],
      remuneration:[''],
      niveau:['']

      

    });
    this.offreForm.valueChanges.subscribe(()=>console.log(this.offreForm.value));

  }



  onSubmit(){                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            

    console.log(this.offreForm.value)
  }

}