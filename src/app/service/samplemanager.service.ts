import { Injectable } from '@angular/core';
import { Http } from "@angular/http";

@Injectable()
export class SampleManagerService {
  private globalVariables: string;  

  constructor(private _http: Http) { 
      this.globalVariables = 'http://stgcvassamplemanagerservice.foragelab.com/';
  }

  public getBilltoAccouts(userID: string, affiliate: string) {    
    return this._http.get(this.globalVariables.toString()  +'SampleSubmission.svc/GetBillToAccountForAccount/' + userID)
      .map((data) => data.json());      
  }


   public getSamplesForBatches(userID: string, batch: number) {      
    return this._http.get(this.globalVariables.toString()  +'SampleSubmission.svc/GetSamplesForUser/' + userID + '/' + batch)
      .map((data) => data.json());      
  }

  
}