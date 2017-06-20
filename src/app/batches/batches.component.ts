import { LoaderService } from './../state-management/loader/loader.service';
import { WorkingBatchSamples } from './../state-management/model/workingBatchSamples';
import { Router } from '@angular/router';
import { State } from './../state-management/state/main-state';
import { Batches } from './../state-management/model/workingbatches';
import { Store } from '@ngrx/store';
import { Component, OnInit, ViewContainerRef } from '@angular/core';

@Component({
  selector: 'app-batches',
  templateUrl: './batches.component.html',
  styleUrls: ['./batches.component.css']
})
export class BatchesComponent implements OnInit {
  labID: string;  
  workingBatches = [];
  samples = [];
  msg = '';
  searching = false;
  showLoading: boolean = false;

  constructor(private store: Store<State>, private router: Router, private loaderService: LoaderService) {
    //console.log('We have a store! ' + store);
   
    store.select('mainStoreReducer')
      .subscribe((data: State) => {
        ////////debugger;;
        this.workingBatches = <Batches[]>data.batches;
        this.samples = <WorkingBatchSamples[]>data.samples;
        //this.msg = data.message;
        //////////////debugger;; 
        this.searching = data.loading;
        //console.log(this.workingBatches);
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

    // setTimeout(() => {
    //   //this.store.dispatch({ type: INCREMENT, payload: { innerObj: { text: "derp!" } } });
    //   // this.store.dispatch({ type: "SUPER_SIMPLE_EFFECT", payload: { seconds: 2 } });
       this.store.dispatch({ type: "SEND_PAYLOAD_TO_EFFECT", payload: { message: "The component says hello!" } })
    //   // this.store.dispatch({ type: "SET_TIMER", payload: { seconds: 10 } });
    //   //this.store.dispatch({ type: "PULL_ARRAY_FROM_FIREBASE"});
       //this.store.dispatch({ type: "PULL_OBJECT_FROM_FIREBASE"});
    //   this.store.dispatch({ type: "PULL_WORKING_BATCHES" });
    // }, 5000);

  }

   onAddSample(selectedBatch, selectedCode) {
    ////console.log('Add Sample Clicked');
    //alert('Add sample Clicked');
     //this.router.navigate(['sample/', this.selectedBatch, selectedCode.innerText]);
    //alert(selectedBatch.innerText + selectedCode.innerText); 
    this.labID = ("00000" + selectedBatch.innerText).slice(-5) + ("00000" + selectedCode.innerText).slice(-3); 
    this.router.navigate(['addsample/', this.labID]);
  }

  onSelect(batch) {
    //alert('Clicked - ' + batch.innerText);
    this.router.navigate(['/samples', batch.innerText]);
  }


  ngOnInit() {
    ////////debugger;;
    if (this.workingBatches.length === 0) {
      this.store.dispatch({ type: "PULL_WORKING_BATCHES" });
    }
  }

}
