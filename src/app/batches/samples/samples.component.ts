import { Routes, ActivatedRoute, Router } from '@angular/router';
import { Batches } from './../../state-management/model/workingbatches';
import { Samples } from './../../state-management/model/samples';
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
  constructor(private store: Store<State>, private route: ActivatedRoute,private router: Router) {  
    store.select('mainStoreReducer')
      .subscribe((data: State) => {
        debugger;
        this.workingBatches = <Batches[]>data.batches;
        this.samples = <Samples[]>data.samples;
      })
  }
  ngOnInit() {
    this.workingBatches = []; 
    this.sub = this.route.params.subscribe(params => {
      this.selectedBatch = +params['batch'];
      this.store.dispatch({ type: "PULL_SAMPLES_OF_BATCH", payload: { Batch: this.selectedBatch } });
    });
  }

  goBackToBatches(){
      this.router.navigate(['/']);
  }
}
