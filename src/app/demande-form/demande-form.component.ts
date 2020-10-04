import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { DemandeService } from '../_services/demande.service';
import { GlobalServices } from '../_services/GlobalService.component';
import { LoaderService } from '../_services/loader.service';

@Component({
  selector: 'app-demande-form',
  templateUrl: './demande-form.component.html',
  styleUrls: ['./demande-form.component.css']
})
export class DemandeFormComponent implements OnInit {
demandeForm : FormGroup;
  constructor(private fb:FormBuilder,
    private loaderService: LoaderService , public toaster : ToastsManager,private globalService: GlobalServices,private demandeService:DemandeService, private router:Router,private activatedRoute:ActivatedRoute) { }

  ngOnInit() {
    this.demandeForm = this.fb.group ({

      nom : [''],
      ville  : [''],
      dateDebut :[''],
      dateFin :[''],
      specialite :[''],
      description :[''],
      nbrPersonne :[''],
      remuneration:[''],
      niveau:[''],
      diplome:['']
  });
  if(this.router.url.includes('update')){
    this.demandeService.GetDemandeById(this.activatedRoute.snapshot.params['id']).subscribe((res)=>
    this.demandeForm.patchValue({

      nom : res.nom,
      ville :res.ville,
      dateDebut :res.dateDebut.substring(0,10),
      dateFin :res.dateFin.substring(0,10),
      specialite :res.specialite,
      description :res.description,
      nbrPersonne :res.nbrPersonne,
      remuneration:res.remuneration,
      niveau:res.niveau,
      diplome:res.diplome

      

    }))
  }
  this.demandeForm.valueChanges.subscribe(()=>console.log(this.demandeForm.value));

}
onSubmit(){ if(this.router.url.includes('update')){   

  this.demandeService.updateDemande(this.demandeForm.value,this.activatedRoute.snapshot.params['id']).subscribe((resp)=>
  {
    console.log('sucess')
    console.log(resp)
  })                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            

}
else if (this.router.url.includes('delete')){

}else{
  this.demandeService.addDemande(this.demandeForm.value,localStorage.getItem('UserName'));
}

this.router.navigate(['/demande/list']);
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
