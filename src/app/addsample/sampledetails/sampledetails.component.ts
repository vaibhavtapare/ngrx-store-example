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
  sourceGroupOptionList: any;
  farmList: any;
  currentSelectedSourcegroup: string;
  currentSelectedFeedCode: string;
  feedCodeList: any;
  currentSelectedGeneralClass: string;
  generalClassList: any;
  feedTypeList: any;
  currentSelectedFeedType: string;
  currentSelectedSampleVolume: string;
  sampleVolumeList: any;
  currentSelectedCutting: any;
  cuttingList: any;
  receivingConditionsList:any; 
  currentSelectedReceivingConditions: string;
  currentSelectedYear: string; 
  yearList: any; 
  isProcessed: boolean = false; 
  isPreground: boolean= false; 
  HandlingFeeIncluded: boolean =false;


  constructor(private fb: FormBuilder, private store: Store<State>) {


    this.sampleDetails = fb.group({

      "FarmName": ["", Validators.required],
      "SourceGroupOption": ["", Validators.required],
      "FeedClass": ["", Validators.required],
      "CollectedDate": ["", Validators.required],
      "SampledDate": ["", Validators.required],
      "ShippedDate": ["", Validators.required],
      "SampleDescription": ["", Validators.required],
      "Memo": ["", Validators.required],
      "ReportingMemo": ["", Validators.required],
      "SampleVolume": ["", Validators.required],
      "ReceivingConditions": ["", Validators.required],
      "Year": ["", Validators.required],
      "Postage": ["", Validators.required],
      "isHandlingFeeIncluded": ["", Validators.required],
      "isFermented": ["", Validators.required],
      "isEarlyRelease": ["", Validators.required],
      "Processed": ["", Validators.required],
      "LDAS": ["", Validators.required],
      "Wet": ["", Validators.required],
      "LNIR": ["", Validators.required],
      "LCAP": ["", Validators.required],
      "Cutting": [""],
      "CuttingInterval": [], 
      "NIRClass":[]

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
