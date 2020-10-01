export class job {
    designation:string;
    companyname:string;
    place:string;
    jobtype:string;
    salary:number;
}


export class demande {
    _id:String
    id_stagiaire :String;
    nom : String;
    ville :String;
    dateDebut : Date;
    dateFin : Date;
    specialite : String;
    description : String;
    nbrPersonne :Number;
    remuneration : Number;
    niveau :String;
    diplome :String;


}

export class offre {
    _id:String
    id_entreprise : String;
    nom : String;
    ville : String;
    dateDebut : Date;
    dateFin : Date;
    specialite : String;
    description : String;
    nbrPersonne :Number;
    remuneration : Number;
    niveau :String;
    diplome :String;
}