import { BillTo } from './../../../state-management/model/billto';
import { State } from 'app/state-management/state/main-state';
import { LoaderService } from './../../../state-management/loader/loader.service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl, FormBuilder } from "@angular/forms";

@Component({
  selector: 'app-billtodetails',
  templateUrl: './billtodetails.component.html',
  styleUrls: ['./billtodetails.component.css']
})
export class BilltodetailsComponent implements OnInit {
  billto: FormGroup;
  billtoList: BillTo[];
  searching = false;
  showLoading: boolean = false;
  selectedAccountId: number = 0;
  selectedBillTo: BillTo;
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
      "SelectedAccountCode":["VAI-001"],
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
        //debugger;
        this.billtoList = data.billto;
        this.searching = data.loading;
        if (this.searching === true) {
          ////debugger;
          //this.showLoading = true;
          this.loaderService.display(true);
        }
        else {
          ////debugger;
          //this.showLoading = false;
          this.loaderService.display(false);
        }
      })

  }

  ngOnInit() {
    ////debugger;
    this.store.dispatch({ type: "PULL_BILLTO_ACCOUTS" });
    // if (this.billtoList.length === 0) {
    //   this.store.dispatch({ type: "PULL_BILLTO_ACCOUTS" });
    // }
  }
  onSubmit() {
    console.log(this.billto.status);
    console.log("model-based form submitted");
    console.log(this.billto);
  }

  onChangeAccount(event) {
    console.log(this.selectedAccountId);
    debugger;
    if (this.selectedAccountId > 0) {
      this.selectedBillTo = this.billtoList.find(x => x.AccountID == this.selectedAccountId);
      (<FormGroup>this.billto)
        .setValue({
          SelectedAccountCode: this.selectedBillTo.AccountID,
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
}
