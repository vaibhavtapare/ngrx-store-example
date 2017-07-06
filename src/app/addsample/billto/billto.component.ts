import { Sample } from './../../state-management/model/sample';
import { States } from './../../state-management/model/state';
import { Country } from './../../state-management/model/country';
import { BillTo } from './../../state-management/model/billto';
import { State } from 'app/state-management/state/main-state';
import { LoaderService } from './../../state-management/loader/loader.service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl, FormBuilder } from "@angular/forms";

@Component({
  selector: 'app-billto',
  templateUrl: './billto.component.html',
  styleUrls: ['./billto.component.css']
})

export class BilltoComponent implements OnInit {
  billto: FormGroup;
  billtoList: BillTo[];
  inProcessCount: number = 0;
  showLoading: boolean = false;
  selectedAccountId: number = 0;
  selectedBillTo: BillTo;
  countries: Country[];
  allcountries: string[];
  currentSelectedCountry: string;
  currentSelectedAccountCode: number = 0;
  billtoSelectedIndex: number = 0;

  selectedCountry: Country;
  states: string[]
  arrStates: States[] = [];
  currentSample: Sample;
  isSubmitted: boolean = false;
  // public billtoForm = new FormGroup({
  selectedAccountCode = new FormControl("")
  accountCode = new FormControl("")
  businessName = new FormControl("")
  firstName = new FormControl("")
  lastName = new FormControl("")
  address = new FormControl("")
  country = new FormControl("")
  state = new FormControl("")
  city = new FormControl("")
  postalCode = new FormControl("")
  phone = new FormControl("")
  fax = new FormControl("")
  // });

  constructor(private fb: FormBuilder, private store: Store<State>, private router: Router, private loaderService: LoaderService) {
    this.billto = fb.group({
      //"SelectedAccountCode": ["VAI-001"],
      //"SelectedCountry": [""],
      "AccountID": ["", Validators.required],
      "AccountCode": ["", Validators.required],
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
        ////////////////debugger;;
        this.billtoList = data.billto;
        this.inProcessCount = data.counter;
        this.countries = data.countries;
        this.currentSample = data.sample;
        this.billtoSelectedIndex = data.selectedTabIndex;
        //////////////////debugger;;
        // if (this.currentSample !== undefined) {
        //   ////debugger;
        //   if (this.isSubmitted === true) {
        //     this.isSubmitted = false;
        //    // this.store.dispatch({ type: "SET_SELECTED_INDEX_OF_TAB", payload: { nextIndex: 1 } })

        //   }
        // }
        if (this.inProcessCount > 0) {
          debugger;
          //this.showLoading = true;
          this.loaderService.display(true);
        }
        else if (this.inProcessCount === 0) {
          debugger;
          //this.showLoading = false;
          this.loaderService.display(false);
        }
      });
    //////////////////debugger;;



  }

  ngOnInit() {
    ////////////////////////debugger;;;

    this.store.dispatch({ type: "PULL_COUNTRIES" });
    this.store.dispatch({ type: "PULL_BILLTO_ACCOUTS" });
    // if (this.billtoList.length === 0) {
    //   this.store.dispatch({ type: "PULL_BILLTO_ACCOUTS" });
    // }
  }
  onSubmit() {
    //console.log(this.billto.status);
    //console.log("model-based form submitted"); 
    //////////////////debugger;;;
    // ////////////////debugger;;
    // console.log(this.billto);
    // this.isSubmitted = true;
    this.store.dispatch({ type: "SET_ADD_SAMPLE_BILLTO", payload: { Billto: this.billto.value, nextIndex: 1 } });

    //this.selectedIndex=1;
    //this.store.dispatch({ type: INCREMENT, payload: { innerObj: { text: "derp!" } } });
  }


  onChangeAccount(event) {
    //console.log(this.selectedAccountId);
    ////////////////debugger;;;
    if (this.currentSelectedAccountCode > 0) {
      this.selectedBillTo = this.billtoList.find(x => x.AccountID == this.currentSelectedAccountCode);
      ////////////////////debugger;;;
      this.currentSelectedAccountCode = this.selectedBillTo.AccountID;

      (<FormGroup>this.billto)
        .setValue({
          AccountID: this.selectedBillTo.AccountID,
          ///SelectedCountry: this.selectedBillTo.Country,
          AccountCode: this.selectedBillTo.AccountCode,
          FirstName: this.selectedBillTo.FirstName,
          LastName: this.selectedBillTo.LastName,
          BusinessName: this.selectedBillTo.BusinessName,
          Address: this.selectedBillTo.Address,
          Country: this.selectedBillTo.Country,
          State: this.selectedBillTo.State,
          CityName: this.selectedBillTo.CityName,
          Zip: this.selectedBillTo.Zip,
          Phone: this.selectedBillTo.Phone,
          Fax: this.selectedBillTo.Fax
        });
    }
  }

  onChangeCountry() {
    //console.log(this.currentSelectedCountry);
    ////////////////////debugger;;;
    if (this.currentSelectedCountry != "") {
      ////////////////////debugger;;;
      if (this.countries != undefined) {
        //this.selectedCountry = this.countries.find(x => x.CountryName == this.currentSelectedCountry);
        this.states = [];
        for (var i = 0; i < this.countries.length; i++) {
          if (this.currentSelectedCountry == this.countries[i]['$'].name) {
            //////////////////debugger;;;
            this.states = this.countries[i]["state"];
          }
        }
        this.arrStates = [];

        for (var i = 0; i < this.states.length; i++) {
          this.arrStates.push({ StateName: this.states[i] });
        }
      }
    }
  }
}