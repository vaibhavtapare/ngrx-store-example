import { PackageAnalysis } from './../../state-management/model/packageAnalysis';
import { FeedType } from './../../state-management/model/feedtypes';
import { UserFarms } from './../../state-management/model/userfarm';
import { LoaderService } from './../../state-management/loader/loader.service';
import { Router } from '@angular/router';
import { State } from './../../state-management/state/main-state';
import { Store } from '@ngrx/store';
import { Component, OnInit, Pipe, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

import { OrderByPipe } from "app/pipes/orderby";
@Component({
  selector: 'app-sampledetails',
  templateUrl: './sampledetails.component.html',
  styleUrls: ['./sampledetails.component.css'],
})
export class SampledetailsComponent implements OnInit {
  thisYear: number;
  currentSelectedFeedCode: number;
  sampleDetails: FormGroup;
  sourceGroupOptionList: any;
  farmList: UserFarms[] = [];
  currentSelectedSourcegroup: string;
  currentSelectedFeedTypeId: number;
  feedCodeList: FeedType[] = [];
  feedTypeList: FeedType[] = [];
  quickFeedCodeList: FeedType[] = [];
  currentSelectedGeneralClass: string;
  generalClassList: FeedType[] = [];
  TodaysDate: Date = new Date();
  CollectedDateValue: Date = new Date();
  SampledDateValue: Date = new Date();
  ShippedDateValue: Date = new Date();
  currentSelectedFeedType: string;
  currentSelectedSampleVolume: string;
  sampleVolumeList: any;
  currentSelectedCutting: any;
  cuttingList: any;
  receivingConditionsList: any;
  currentSelectedReceivingConditions: string;
  currentSelectedYear: string;
  yearList: any;
  isProcessed: boolean = false;
  isPreground: boolean = false;
  HandlingFeeIncluded: boolean = false;
  distinctGeneralClassList: string[] = [];
  YearList: string[] = [];
  nirPackageList: PackageAnalysis[] = []; 


  constructor(private fb: FormBuilder, private store: Store<State>, private router: Router, private loaderService: LoaderService) {


    this.sampleDetails = fb.group({
      "FarmName": ["", Validators.required],
      "SourceGroupOption": ["", Validators.required],
      "FeedClass": [""],
      "CollectedDate": ["", Validators.required],
      "SampledDate": ["", Validators.required],
      "ShippedDate": ["", Validators.required],
      "SampleDescription": ["", Validators.required],
      "FeedGeneralClass": [],
      "FeedType": ["", Validators.required],
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
      "NIRClass": []
    });


    store.select('mainStoreReducer')
      .subscribe((data: State) => {

        //////////debugger;;
        if (data.feedTypes !== undefined) {
          //////////debugger;;
          this.farmList = data.userFarm;
        }

         if (data.nirPackages !== undefined) {
           this.nirPackageList = data.nirPackages; 
         }
        ////////debugger;;

        this.feedCodeList = data.feedTypes;
        this.feedTypeList = data.feedTypes;
        this.quickFeedCodeList = data.feedTypes.filter(x => x.IsQuickFeedType == true);
        var gen = this.quickFeedCodeList.map(data => data.GeneralClass);
        //this.distinctGeneralClassList = gen.filter((x, i, a) => x && a.indexOf(x) === i);
        if (data.feedTypes !== undefined) {
          var index;
          var innerIndex;
          var found = false;
          this.generalClassList = [];
          for (index = 0; index < this.feedCodeList.length; ++index) {
            found = false;

            for (innerIndex = 0; innerIndex < this.generalClassList.length; ++innerIndex) {
              if (this.feedCodeList[index].GeneralClass.toUpperCase().trim() === this.generalClassList[innerIndex].GeneralClass.toUpperCase().trim()) {
                found = true;
              }
            }

            if (found === false) {
              this.generalClassList.push(this.feedCodeList[index]);
            }
          }
        }
      });
  }


  ngOnInit() {
    //this.store.dispatch({ type: "PULL_USER_FARMS"});
    this.store.dispatch({ type: "PULL_FEED_TYPES" });
    this.store.dispatch({ type: "PULL_NIR_PACKAGES"});

    this.CollectedDateValue.setDate(this.TodaysDate.getDate() - 1);
    this.SampledDateValue.setDate(this.TodaysDate.getDate());
    this.ShippedDateValue.setDate(this.TodaysDate.getDate() - 2);
    this.sampleVolumeList = [
      "Select",
      "< ½ lb (< .25 kg)",
      "½ lb (.25 to .5 kg)",
      "1 to 2 lb (.5 to 1 kg)",
      "2 to 4 lb (1 to 2 kg)",
      "> 4 lbs (> 2 kg)",
      "< ½ quart (< .5 liter)",
      "½  to 1 quart (.5 to 1 liter)",
      "1  to 2 quart (1 to 2liter)",
      "2  to 4 quart (2 to  lites)",
      "> 4 quarts (> 4 litrs)"
    ]

    this.cuttingList = [
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9"
    ]

    this.receivingConditionsList = [
      "POOR PACKAGEING",
      "BROKEN PACKAGEING",
      "LOW SAMPLE VOLUME",
      "MOLDY",
      "CONTAMINATION",
      "COARSE - NEEDS PROCESSED",
      "LIQUID",
      "UNIDENTIFIED",
      "INCOMPLETE INFORMATION",
      "CUSTOMER CONTACT REQUIRED",
      "ILLEGIBLE INFORMATION",
      "NO INFORMATION",
      "EXCESSIVE VOLUME",
      "UN-CORED HAY",
      "MULTIPLE PACKAGES / SINGLE SAMPLE",
      "FOREIGN"
    ];

    //this.thisYear.setFullYear();

    // this.YearList = [
    //      this.thisYear.setFullYear(this.TodaysDate.getFullYear()-3).toString(),
    //      this.thisYear.setFullYear(this.TodaysDate.getFullYear()-2).toString(),
    //      this.thisYear.setFullYear(this.TodaysDate.getFullYear()-1).toString(),
    //      this.thisYear.setFullYear(this.TodaysDate.getFullYear()).toString()
    // ]



    this.thisYear = this.TodaysDate.getFullYear();
    console.log(this.thisYear);
    this.YearList = [
      (this.thisYear - 3).toString(),
      (this.thisYear - 2).toString(),
      (this.thisYear - 1).toString(),
      (this.thisYear).toString(),
    ]
  }

  onSubmit() {
    //////////////debugger;;
    this.store.dispatch({ type: "SET_SELECTED_INDEX_OF_TAB", payload: { nextIndex: 2 } })
  }

  GotoBillto() {
    //////////////debugger;;
    this.store.dispatch({ type: "SET_SELECTED_INDEX_OF_TAB", payload: { nextIndex: 0 } })
    return false;
  }

  onChangeQuickFeed() {
    if (this.currentSelectedFeedCode > 0) {
      var selectedFeedCode = this.feedCodeList.filter(x => x.FeedCodeID === this.currentSelectedFeedCode);
      this.currentSelectedGeneralClass = selectedFeedCode[0].GeneralClass;
      this.currentSelectedFeedTypeId = selectedFeedCode[0].FeedCodeID;
      this.feedTypeList = this.feedCodeList;
      //return false; 
      // this.currentSelectedGeneralClass = 80; 

      //alert('currentSelectedFeedTypeId : ' + selectedFeedCode['GeneralClass']);
    }
  }


  onChangeGeneralClass() {
    if (this.currentSelectedGeneralClass !== '') {
      this.feedTypeList = this.feedCodeList.filter(x => x.GeneralClass === this.currentSelectedGeneralClass);
    }
  }
}
