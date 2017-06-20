import { LoaderService } from './../../state-management/loader/loader.service';
import { WorkingBatchSamples } from './../../state-management/model/workingBatchSamples';
import { Routes, ActivatedRoute, Router } from '@angular/router';
import { Batches } from './../../state-management/model/workingbatches';
import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import { State } from "app/state-management/state/main-state";

@Component({
  selector: 'app-samples',
  templateUrl: './samples.component.html',
  styleUrls: ['./samples.component.css']
})
export class SamplesComponent implements OnInit {
  workingBatches = [];
  samples = [];
  selectedBatch: number;

  private sub: any;
  searching = false;
  showLoading: boolean = false;
  labID: string;
  constructor(private store: Store<State>, private route: ActivatedRoute, private router: Router, private loaderService: LoaderService) {
    store.select('mainStoreReducer')
      .subscribe((data: State) => {
        //////debugger;;
        this.workingBatches = <Batches[]>data.batches;
        this.samples = <WorkingBatchSamples[]>data.samples;

        this.searching = data.loading;
        if (this.searching === true) {
          ////////debugger;;
          //this.showLoading = true;
          this.loaderService.display(true);
        }
        else {
          ////////debugger;;
          //this.showLoading = false;
          this.loaderService.display(false);
        }
      })
  }

 

  ngOnInit() {
    //////debugger;;
    this.workingBatches = [];
    this.sub = this.route.params.subscribe(params => {
      this.selectedBatch = +params['batch'];
      this.store.dispatch({ type: "PULL_SAMPLES_OF_BATCH", payload: { Batch: this.selectedBatch } });
    });
  }

  goBackToBatches() {
    this.router.navigate(['/']);
  }

  onSelect(selectedCode) {
    //alert(selectedCode.innerText);
    this.router.navigate(['sample/', this.selectedBatch, selectedCode.innerText]);
  }

  
}
