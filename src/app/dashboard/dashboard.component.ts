import { State } from 'app/state-management/state/main-state';
import { Store } from '@ngrx/store';
import { LoaderService } from './../state-management/loader/loader.service';

import { Batches } from './../state-management/model/batches';
import { DashboardService } from './../service/dashboard.service';
import { User } from './../state-management/model/user';
import { ServiceResponce } from './../state-management/model/service-responce';
import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from "@angular/router";
import { Subject } from 'rxjs/Rx';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [DashboardService]
})

export class DashboardComponent {
  labID: string;
  user: User;
  getData: string;
  batchData: string;
  samplesData: string;
  currentUser: any;
  data: any;
  inProcessCount: number = 0;
  serviceResponce: ServiceResponce;
  private selectedBatch: string = '';
  private selectedCode: string = '';
  Header: string;

  workingBatches = [];
  samplesofSelectedBatch = [];
  rows = [];
  samplesArray = [];
  samples = [];
  batches: Batches[] = [];
  selected = [];
  jsonArray = [];
  constructor(private _dashboardService: DashboardService, private store: Store<State>, private router: Router, private loaderService: LoaderService) {
    this.Header = 'Dashboard'
    this.currentUser = localStorage.getItem('user');
    debugger;
    // if (this.currentUser !== null) {
    this.user = <User>JSON.parse(this.currentUser.toString());

    store.select('mainStoreReducer')
      .subscribe((data: State) => {
        this.inProcessCount = data.counter;

        if (this.inProcessCount > 0) {
          debugger;
          //this.showLoading = true;
          this.loaderService.display(true);
        }
        else if (this.inProcessCount === 0) {
          debugger;
          //this.showLoading = false;
          this.loaderService.display(false);
          this.workingBatches = data.batches;
          this.samplesofSelectedBatch = data.samples;
          if (this.workingBatches !== undefined && this.workingBatches.length > 0) {
            this.rows.push(...this.workingBatches);
          }
          if (this.samplesofSelectedBatch !== undefined && this.samplesofSelectedBatch.length > 0) {
            this.samples.push(...this.samplesofSelectedBatch);
          }
        }
      });
    // }
    // else {
    //   this.router.navigate(['']);
    // }
  }

  ngOnInit() {

    debugger;
    if (this.currentUser !== null) {
      this.store.dispatch({ type: "PULL_WORKING_BATCHES", payload: { UserID: this.user.UserID, AffiliateCode: this.user.AffiliateCode } });
    } else {
      this.router.navigate(['']);
    }
    // this._dashboardService.getWorkingBatches(this.user.UserID, this.user.AffiliateCode)
    //   .subscribe(
    //   data => {

    //     this.getData = JSON.stringify(data || null)
    //     this.serviceResponce = <ServiceResponce>JSON.parse(this.getData);
    //     this.samplesData = this.serviceResponce.Data.toString().toLocaleLowerCase();
    //     this.jsonArray = JSON.parse(this.samplesData);

    //     ////////////////debugger;;
    //     if (this.selectedBatch == '') {
    //       ////////////////debugger;;
    //       this.selected = [this.jsonArray[0]];
    //       this.selectedBatch = this.selected[0].batch.toString();
    //       this.selectedCode = this.selected[0].code.toString();

    //     }
    //     this.rows.push(...this.jsonArray);
    //     // console.log(this.selected);




    //   },
    //   error => alert(error),
    //   );
  }

  onSelect({ selected }) {
    //// console.log('Selected Event',selected,this.selected); 
    this.selected = selected;
    //// console.log(this.selected[0]['$$index']);
    // console.log(selected | Json);
    ////////////////debugger;;
    this.selectedBatch = selected[0].batch.toString();
    this.selectedCode = this.selected[0].code.toString();
    this.loadSamplesForSelectedBatch(selected);
  }

  loadSamplesForSelectedBatch(batch) {
    this.samplesArray = [];
    this.batchData = "";
    this.samples = [];
    this.store.dispatch({ type: "PULL_SAMPLES_OF_BATCH", payload: { UserID: this.user.UserID, Batch: batch[0].batch } });

    // this._dashboardService.getSamplesForBatches(this.user.UserID, batch[0].batch)
    //   .subscribe(
    //   data => {
    //     this.getData = JSON.stringify(data || null)
    //     this.serviceResponce = <ServiceResponce>JSON.parse(this.getData);
    //     this.batchData = this.serviceResponce.Data.toString().toLocaleLowerCase();
    //     this.samplesArray = JSON.parse(this.batchData);
    //     //this.selected = [this.jsonArray[0]];             
    //     this.samples.push(...this.samplesArray);
    //   },
    //   error => alert(error),
    //   () => { }
    //   );
  }

  onActivate(event) {
    // console.log('Activate Event', event);
  }

  getSelectedIx() {
    ////////////////debugger;;
    return this.selected[0]['$$index'];
  }

  AddSample() {

    this.labID = ("00000" + this.selectedBatch).slice(-5) + ("00000" + this.selectedCode).slice(-3);
    this.router.navigate(['addsample/', this.labID]);
    //alert(this.labID);
  }
  updateRowPosition() {
    ////////////////debugger;;
    const ix = this.getSelectedIx();
    const arr = [...this.rows];
    arr[ix - 1] = this.rows[ix];
    arr[ix] = this.rows[ix - 1];
    this.rows = arr;
  }

}
