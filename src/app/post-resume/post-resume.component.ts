import { Component, OnInit ,ViewChild, ViewContainerRef} from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import {PostresumeService} from '../_services/postresume.service';
import {LoaderService} from '../_services/loader.service';
import { ToastsManager } from 'ng2-toastr';
import {GlobalServices} from '../_services/GlobalService.component';
import { SigninService } from '../_services/signin.service';

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
      nom : ['', Validators.required],
      prenom : ['' , Validators.required],
      sexe :[''],
        cin:[''],
        dateNaissance : [''],
        lieuNaissance: [''],
        specialite: [''],
        diplome: [''],
        tele:[null],
        email:[''],
        description:[''],
        niveau:['']
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
      confirmPassword: ['', Validators.required],
      role: ['0'],
      stagiaire: this.stagiaireForm,
      entreprise:this.entrepriseForm

    }, {
      validator: this.MustMatch('password', 'confirmPassword')
  });
    this.userForm.valueChanges.subscribe(()=>console.log(this.userForm));
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
  
MustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
        const control = formGroup.controls[controlName];
        const matchingControl = formGroup.controls[matchingControlName];

        if (matchingControl.errors && !matchingControl.errors.mustMatch) {
            // return if another validator has already found an error on the matchingControl
            return;
        }

        // set error on matchingControl if validation fails
        if (control.value !== matchingControl.value) {
            matchingControl.setErrors({ mustMatch: true });
        } else {
            matchingControl.setErrors(null);
        }
    }
}
  

}
