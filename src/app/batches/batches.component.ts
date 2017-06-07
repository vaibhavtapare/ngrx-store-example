import { Router } from '@angular/router'; 
import { Samples } from './../state-management/model/samples';
import { State } from './../state-management/state/main-state';
import { Batches } from './../state-management/model/workingbatches';
import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-batches',
  templateUrl: './batches.component.html',
  styleUrls: ['./batches.component.css']
})
export class BatchesComponent implements OnInit {

  workingBatches = [];
  samples = []; 
  msg = '';
  constructor(private store: Store<State>,private router: Router) {
    console.log('We have a store! ' + store);

    store.select('mainStoreReducer')
      .subscribe((data: State) => {
        //debugger;
        this.workingBatches = <Batches[]>data.batches;
        this.samples = <Samples[]>data.samples;
        //this.msg = data.message;
        ////////debugger; 

        console.log(this.workingBatches);
      })

    // setTimeout(() => {
    //   //this.store.dispatch({ type: INCREMENT, payload: { innerObj: { text: "derp!" } } });
    //   // this.store.dispatch({ type: "SUPER_SIMPLE_EFFECT", payload: { seconds: 2 } });
    //   // this.store.dispatch({ type: "SEND_PAYLOAD_TO_EFFECT", payload: { message: "The component says hello!" } })
    //   // this.store.dispatch({ type: "SET_TIMER", payload: { seconds: 10 } });
    //   //this.store.dispatch({ type: "PULL_ARRAY_FROM_FIREBASE"});
    //   //this.store.dispatch({ type: "PULL_OBJECT_FROM_FIREBASE"});
    //   this.store.dispatch({ type: "PULL_WORKING_BATCHES" });
    // }, 5000);

  }

  onSelect(batch) {    
    //alert('Clicked - ' + batch.innerText);
    this.router.navigate(['/samples', batch.innerText]);
  }

  ngOnInit() {
    //debugger;
      if (this.workingBatches.length === 0) {
        this.store.dispatch({ type: "PULL_WORKING_BATCHES" });  
      }
  }

}
