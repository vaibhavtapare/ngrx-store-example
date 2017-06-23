import { Sample } from './../state-management/model/sample';
import { Country } from './../state-management/model/country';
import { BillTo } from './../state-management/model/billto';
import { LoaderService } from './../state-management/loader/loader.service';
import { State } from 'app/state-management/state/main-state';
import { Store } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { TabsModule } from "ng2-tabs";

@Component({
  selector: 'app-addsample',
  templateUrl: './addsample.component.html',
  styleUrls: ['./addsample.component.css']
})
export class AddsampleComponent implements OnInit, OnDestroy {
  labid: number;
  private sub: any;
  selectedIndex: number = 0;
  searching = false;
  billtoList: BillTo[];
  countries: Country[];
  currentSample: Sample = { SampleID: 0, BillTo: [], LabID: 0, Batch: 0, Code: 0 };


  constructor(private route: ActivatedRoute, private store: Store<State>, private loaderService: LoaderService) {


    store.select('mainStoreReducer')
      .subscribe((data: State) => {
        debugger;
        this.billtoList = data.billto;
        this.searching = data.loading;
        this.countries = data.countries;
        this.selectedIndex = data.selectedTabIndex;

        if (this.searching === true) {
          //////debugger;
          //this.showLoading = true;
          this.loaderService.display(true);
        }
        else {
          //////debugger;
          //this.showLoading = false;
          this.loaderService.display(false);
        }
      })

    //   if (this.currentSample.BillTo !== undefined) {
    //     //////debugger;
    //     //this.showLoading = true;
    //     this.loaderService.display(true);
    //   }
    //   else {
    //     //////debugger;
    //     //this.showLoading = false;
    //     this.loaderService.display(false);
    //   }
    // })



  }

  ngOnInit() {
    //debugger;
    this.sub = this.route.params.subscribe(params => {
      this.labid = +params['labid']; // (+) converts string 'id' to a number
    });

    this.currentSample.LabID = this.labid;
    this.currentSample.Batch = parseInt(this.currentSample.LabID.toString().substring(0, 5));
    this.currentSample.Code = parseInt(this.currentSample.LabID.toString().substring(5, 3));
    this.store.dispatch({ type: "SET_ADD_SAMPLE", payload: { Sample: this.currentSample } });

  }


  tabChanged(tab) {
    debugger;

    this.selectedIndex = tab._selectedIndex;
    console.log('Tab Changed: ', this.selectedIndex);
    this.store.dispatch({ type: "SET_SELECTED_INDEX_OF_TAB", payload: { nextIndex: this.selectedIndex } })


    //let textLabel = event.tab.textLabel.toString();
    // if (textLabel.includes('+')) {     
    //   this.selectedIndex = this.orders.length - 1;
    // }
    //return false;
  }
  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}

