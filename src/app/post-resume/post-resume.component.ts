import { Component, OnInit ,ViewChild, ViewContainerRef} from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import {PostresumeService} from '../postresume.service';
import {LoaderService} from '../loader.service';
import { ToastsManager } from 'ng2-toastr';
import {GlobalServices} from '../GlobalService.component';
import { SigninService } from '../signin.service';

import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post-resume',
  templateUrl: './post-resume.component.html',
  styleUrls: ['./post-resume.component.css']
})
export class PostResumeComponent implements OnInit {
  userForm: FormGroup;
  stagiaireForm: FormGroup;
  entrepriseForm: FormGroup;
  
  constructor(private fb:FormBuilder,private service:PostresumeService, 
    private loaderService: LoaderService,public toastr: ToastsManager,private sig:SigninService,private router: Router 
  ) {}

  ngOnInit() {
    this.stagiaireForm = this.fb.group({
      nom : [''],
      prenom : [''],
      sexe :[''],
        cin:[''],
        dateNaissance : [''],
        lieuNaissance: [''],
        specialite: [''],
        diplome: [''],
        tele:[null],
        email:[''],
        description:['']
    });
    this.entrepriseForm = this.fb.group({
      nom :[''],
       ville : [''],
       specialite : [''],
       tele: [null],
       email:['']
       
    });
    this.userForm = this.fb.group({
      username: [''],
      password: [''],
      role: ['0'],
      stagiaire: this.stagiaireForm,
      entreprise:this.entrepriseForm

    });
    this.userForm.valueChanges.subscribe(()=>console.log(this.userForm.value));
  }

  onSubmit(){
    console.log(this.userForm.value['entreprise']);
    this.sig.Signup({
      'username':this.userForm.value['username'],
      'password':this.userForm.value['password'],
      'role':this.userForm.value['role']
      },this.userForm.value['stagiaire'],this.userForm.value['entreprise']).subscribe(()=>{
        this.router.navigate(['/signin']);
      });
      

  }
  
  

}
