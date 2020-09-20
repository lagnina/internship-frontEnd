import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { GlobalServices } from '../GlobalService.component';
import { LoaderService } from '../loader.service';

@Component({
  selector: 'app-demande-form',
  templateUrl: './demande-form.component.html',
  styleUrls: ['./demande-form.component.css']
})
export class DemandeFormComponent implements OnInit {
demandeForm : FormGroup;
  constructor(private fb:FormBuilder,
    private loaderService: LoaderService , public toaster : ToastsManager,private globalService: GlobalServices) { }

  ngOnInit() {
    this.demandeForm = this.fb.group ({

      nom : [''],
      dateDebut :[''],
      dateFin :[''],
      specialite :[''],
      description :[''],
      nbrPersonne :[''],
      remuneration:[''],
      niveau:[''],
      diplome:['']
  });
  this.demandeForm.valueChanges.subscribe(()=>console.log(this.demandeForm.value));

}
onSubmit(){
this.globalService.addDemande(this.demandeForm.value,localStorage.getItem('username'));
}
}