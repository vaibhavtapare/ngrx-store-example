import { State } from './../../state-management/state/main-state';
import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
@Component({
  selector: 'app-sampledetails',
  templateUrl: './sampledetails.component.html',
  styleUrls: ['./sampledetails.component.css']
})
export class SampledetailsComponent implements OnInit {
  sampleDetails: FormGroup;
  constructor(private fb: FormBuilder, private store: Store<State>) {
    

     this.sampleDetails = fb.group({
      
      "FarmName": ["", Validators.required],
      "FirstName": ["", Validators.required],
      "BusinessName": ["", Validators.required],
      "LastName": ["", Validators.required],
      "Address": ["", Validators.required],
      "Country": [""],
      "State": [""],
      "CityName": ["", Validators.required],
      "Zip": ["", Validators.required],
      "Phone": ["", Validators.required],
      "Fax": ["", Validators.required]
    });
    store.select('mainStoreReducer')
      .subscribe((data: State) => {

      })

  }

  ngOnInit() {
  }

  onSubmit() {
    debugger;
    this.store.dispatch({ type: "SET_SELECTED_INDEX_OF_TAB", payload: { nextIndex: 2 } })
  }

  GotoBillto() {
    debugger; 
    this.store.dispatch({ type: "SET_SELECTED_INDEX_OF_TAB", payload: { nextIndex: 0 } })
    return false; 
  }

}
