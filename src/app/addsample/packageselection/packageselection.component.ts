import { State } from 'app/state-management/state/main-state';
import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-packageselection',
  templateUrl: './packageselection.component.html',
  styleUrls: ['./packageselection.component.css']
})
export class PackageselectionComponent implements OnInit {
  packageSelectedIndex: number;
  constructor(private store: Store<State>) {

     store.select('mainStoreReducer')
      .subscribe((data: State) => {
        debugger; 
        this.packageSelectedIndex = data.defaultSelectedIndex;
      });
  }

  ngOnInit() {
   
  }

tabChanged(){
  
}
  onSubmit() {
    debugger;
    this.store.dispatch({ type: "SET_SELECTED_INDEX_OF_TAB", payload: { nextIndex: 3 } })
  }

  GotoSampleDetails() {
    debugger;
    this.store.dispatch({ type: "SET_SELECTED_INDEX_OF_TAB", payload: { nextIndex: 1 } })
    return false;
  }
}
