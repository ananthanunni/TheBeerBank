export class AdvancedSearchParams {
  "ibuMax": number;
  "ibuMin": number;
  "abvMax": number;
  "abvMin": number;
  "ebcMax": number;
  "ebcMin": number;
  "brewedBefore": ShortDate;
  "brewedAfter": ShortDate;
}

export class ShortDate{
  constructor(public month:number, public year:number){

  }

  format(){
    return `${this.month.toString().padStart(2,"0")}-${this.year.toString().padStart(4,"0")}`;
  }
}