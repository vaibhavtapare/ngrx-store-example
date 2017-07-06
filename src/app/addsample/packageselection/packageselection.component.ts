import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PackageAnalysis } from './../../state-management/model/packageAnalysis';
import { State } from 'app/state-management/state/main-state';
import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-packageselection',
  templateUrl: './packageselection.component.html',
  styleUrls: ['./packageselection.component.css']
})
export class PackageselectionComponent implements OnInit {
  rows: PackageAnalysis[] = [];
  packageSelectedIndex: number;
  nirPackageList: PackageAnalysis[] = [];
  chemPackageList: PackageAnalysis[] = [];
  packageSelection: FormGroup;
  constructor(private fb: FormBuilder, private store: Store<State>) {
    this.packageSelection = fb.group({
      "selectedNIRPackage": ["", Validators.required],
    });
    store.select('mainStoreReducer')
      .subscribe((data: State) => {
        if (data.nirPackages !== undefined && data.nirPackages.length > 0) {
          //debugger;;
          this.nirPackageList = data.nirPackages;
          ////debugger;;
          //this.rows = data.nirPackages;
          //this.rows.push(...data.nirPackages);
        }
        if (data.chemPackages !== undefined) {
          this.chemPackageList = data.chemPackages;
        }
        this.packageSelectedIndex = data.defaultSelectedIndex;
      });
  }

  ngOnInit() {
    this.store.dispatch({ type: "PULL_CHEM_PACKAGES" });
  }

  tabChanged() {

  }
  onSubmit() {
    ////////////////debugger;;
    this.store.dispatch({ type: "SET_SELECTED_INDEX_OF_TAB", payload: { nextIndex: 3 } })
  }

  GotoSampleDetails() {
    ////////////////debugger;;
    this.store.dispatch({ type: "SET_SELECTED_INDEX_OF_TAB", payload: { nextIndex: 1 } })
    return false;
  }
}
