import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { GlobalServices } from '../GlobalService.component';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css']
})
export class ServicesComponent implements OnInit {

  cvForm: FormGroup;
  constructor(private fb:FormBuilder,private gs:GlobalServices,private cd: ChangeDetectorRef){}
  ngOnInit() {
    this.cvForm= this.fb.group({
      file : [null],
    })

    this.cvForm.valueChanges.subscribe(()=>console.log(this.cvForm.value));
  }
  onSubmit(){
    console.log(this.cvForm.value)
      this.gs.sendCv(this.cvForm.value);
  }
  
 
  
}
