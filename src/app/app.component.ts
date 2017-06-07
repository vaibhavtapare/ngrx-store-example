import { Batches } from './state-management/model/workingbatches';
import { Cheese } from './.cheese';
import { INCREMENT } from './state-management/actions/main-action-creator';
import { State } from './state-management/state/main-state';
import { Component } from '@angular/core';
import { Store } from "@ngrx/store";
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app works!';
  workingBatches = [];
  msg = '';
  constructor(private store: Store<State>) {
    console.log('We have a store! ' + store);

    store.select('mainStoreReducer')
      .subscribe((data: State) => {
        debugger; 
        this.workingBatches = <Batches[]>data.batches;
        //this.msg = data.message;
        //////debugger; 
       
       console.log(this.workingBatches);
      })
    setTimeout(() => {
      // this.store.dispatch({ type: INCREMENT, payload: { innerObj: { text: "derp!" } } });
      // this.store.dispatch({ type: "SUPER_SIMPLE_EFFECT", payload: { seconds: 2 } });
      // this.store.dispatch({ type: "SEND_PAYLOAD_TO_EFFECT", payload: { message: "The component says hello!" } })
      // this.store.dispatch({ type: "SET_TIMER", payload: { seconds: 10 } });
      this.store.dispatch({ type: "PULL_ARRAY_FROM_FIREBASE"});
      //this.store.dispatch({ type: "PULL_OBJECT_FROM_FIREBASE"});
    }, 2000);

  }
}
