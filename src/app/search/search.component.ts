import { Component, OnInit, ViewContainerRef } from '@angular/core';
import {job, offre} from '../pipes/search';
import {FormBuilder,FormGroup,FormArray,FormControl} from '@angular/forms';
import {JobListService} from '../_services/job-list.service';
import { Headers, Response } from '@angular/http';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { GlobalServices } from '../_services/GlobalService.component';
import { OfferService } from '../_services/offer.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  jobList:FormGroup;
  searchForm:FormGroup; 
  jobcategory:string="Job Category";
  joblocation:string="Job Location";  
  sliderValue:number= 20;
  pageData:any;
  datePosted:Array<any>;
  jobType:Array<any>;
  Experience:Array<any>;
  Companies:Array<any>;
  Loation:Array<any>;
  Designation:Array<any>;
  jobdata:any;
  totaljobs:number;
  Pageindex:number;
  daysFormArray:FormArray;
  typesFormArray:FormArray;
  ExperienceFormArray:FormArray;
  CompanyFormArray:FormArray;
  LocationFormArray:FormArray;
  unselecteddate:any;
  unselectedExperience:any;
  unselectedtypes:any;
  unselectedCompany:any;
  unselectedLocation:any;
  offres : offre[];

  constructor(private fb:FormBuilder,private jobservice:JobListService,public toastr: ToastsManager,private globalService:GlobalServices, vcr: ViewContainerRef,private offerService:OfferService) { 
    this.pageData=new Array<any>();
    this.toastr.setRootViewContainerRef(vcr); 
    
  }

  ngOnInit() {
    this.offerService.offreList().subscribe((resp) => {     
      
      this.offres = JSON.parse(resp['_body']);
      this.offres.forEach(offre => {
        offre['diff']= this.daydiff(offre.dateDebut,offre.dateFin);
      });
      console.log(this.offres);
    },
    error=>{    
    });
    // this.toastr.success('Correct UserName and Password!', 'SignIn Successfull',{toastLife: 2000});
  }
  daydiff(date1,date2){
    var date11 = new Date(date1);
    var date22 = new Date(date2);
     // différence des heures
    var time_diff = date22.getTime() - date11.getTime();
     // différence de jours
    var days_Diff = time_diff / (1000 * 3600 * 24);
    // afficher la différence
    return days_Diff;
  }
  onApply(offre){
    
    this.offerService.apply(offre);
  }
  loadPageData() {
    this.jobservice.getValues().subscribe((resp: Response) => {      
      this.pageData = resp;      
      this.Designation=this.pageData.category;
      this.jobType=this.pageData.employement;
      this.Experience=this.pageData.experience;
      this.Loation=this.pageData.location;
      this.Companies=this.pageData.company;
      (error)=>console.log(error)      
    });
    
  }
  loadListData() {
    this.jobservice.getList().subscribe((resp: Response) => { 
      console.log(resp);    
      this.jobdata=resp;     
      //this.totaljobs=this.jobdata.length;
      this.Pageindex= 1;
      (error)=>console.log(error)      
    });
    
  }
  search(desig:any)
  {
    console.log(desig);
  }
  searchButton()
  {  
   this.searchAllData();
  }
  searchAllData()
  {
    var samplearray={sampledata:["all"]};  
    if(this.jobcategory ==null || this.jobcategory =="Job Category")
    {
      this.jobcategory="all";
    }
    if(this.joblocation ==null || this.joblocation =="Job Location")
    {
      this.joblocation="all";
    }

    if(this.daysFormArray == undefined)
    {
      this.unselecteddate=samplearray.sampledata;
    }
    else
    {
      if(this.daysFormArray.length>0)
      {
        this.unselecteddate=this.daysFormArray.value;
      }
      else
      {
        this.unselecteddate=samplearray.sampledata;
      }
      
    }
    if(this.typesFormArray == undefined)
    {
      this.unselectedtypes=samplearray.sampledata;
    }
    else
    {
      
      if(this.typesFormArray.length>0)
      {
        this.unselectedtypes=this.typesFormArray.value;
      }
      else
      {
        this.unselectedtypes=samplearray.sampledata;
      }
    }
    if(this.ExperienceFormArray == undefined)
    {
      this.unselectedExperience=samplearray.sampledata;
    }
    else
    {
     
      if(this.ExperienceFormArray.length>0)
      {
        this.unselectedExperience=this.ExperienceFormArray.value;
      }
      else
      {
        this.unselectedExperience=samplearray.sampledata;
      }
    }
    
    if(this.CompanyFormArray == undefined)
    {
      this.unselectedCompany=samplearray.sampledata;
    }
    else
    {
      
      if(this.CompanyFormArray.length>0)
      {
        this.unselectedCompany=this.CompanyFormArray.value;
      }
      else
      {
        this.unselectedCompany=samplearray.sampledata;
      }
    }
    if(this.LocationFormArray == undefined)
    {
      this.unselectedLocation=samplearray.sampledata;
    }
    else
    {
      
      if(this.LocationFormArray.length>0)
      {
        this.unselectedLocation=this.LocationFormArray.value;
      }
      else
      {
        this.unselectedLocation=samplearray.sampledata;
      }
    }
    
   
    var parameters = {   
     
      
      loc: this.joblocation,
      cat: this.jobcategory,
      day: this.unselecteddate,
      etype:this.unselectedtypes,
      elevel:this.unselectedExperience,
      ecompany:this.unselectedCompany,
      elocation:this.unselectedLocation,
      esalary:this.sliderValue,
      ecat:this.jobcategory
    }

  
 
    this.jobservice.getSearchDatas(parameters).subscribe((resp: Response) => {      
      this.jobdata=resp;      
      this.Pageindex= 1;
      (error)=>console.log(error)      
    });
     this.jobcategory="Job Category";
     this.joblocation="Job Location";
 
  }
  selectedLocation(value:any)
  {
    this.joblocation=value;
  }
  selectedDesig(value:any)
  {
this.jobcategory=value;
  }
  onDays(days:string, isChecked: boolean) {
     this.daysFormArray = <FormArray>this.jobList.controls.jobDays;

    if(isChecked) {
      this.daysFormArray.push(new FormControl(days));
    } else {
      let index =this.daysFormArray.controls.findIndex(x => x.value == days)
      this.daysFormArray.removeAt(index);
    }
    console.log(this.daysFormArray.value);
    this.searchAllData();
}
onType(types:string, isChecked: boolean) {
   this.typesFormArray = <FormArray>this.jobList.controls.jobType;

  if(isChecked) {
    this.typesFormArray.push(new FormControl(types));
  } else {
    let index = this.typesFormArray.controls.findIndex(x => x.value == types)
    this.typesFormArray.removeAt(index);
  }
  console.log(this.typesFormArray.value);
  this.searchAllData();
}
onExperience(exp:string, isChecked: boolean) {
   this.ExperienceFormArray = <FormArray>this.jobList.controls.experience;

  if(isChecked) {
    this.ExperienceFormArray.push(new FormControl(exp));
  } else {
    let index = this.ExperienceFormArray.controls.findIndex(x => x.value == exp)
    this.ExperienceFormArray.removeAt(index);
  }
  console.log(this.ExperienceFormArray.value);
  this.searchAllData();
}
onCompany(com:string, isChecked: boolean) {
   this.CompanyFormArray = <FormArray>this.jobList.controls.company;

  if(isChecked) {
    this.CompanyFormArray.push(new FormControl(com));
  } else {
    let index = this.CompanyFormArray.controls.findIndex(x => x.value == com)
    this.CompanyFormArray.removeAt(index);
  }
  console.log(this.CompanyFormArray.value);
  this.searchAllData();
}
onLocation(loc:string, isChecked: boolean) {
   this.LocationFormArray = <FormArray>this.jobList.controls.location;

  if(isChecked) {
    this.LocationFormArray.push(new FormControl(loc));
  } else {
    let index = this.LocationFormArray.controls.findIndex(x => x.value == loc)
    this.LocationFormArray.removeAt(index);
  }
  console.log(this.LocationFormArray.value);
  this.searchAllData();
}

}
