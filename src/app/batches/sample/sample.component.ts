import { LoaderService } from './../../state-management/loader/loader.service';
import { Sample } from './../../state-management/model/sample';
import { State } from './../../state-management/state/main-state';
import { Store } from '@ngrx/store';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sample',
  templateUrl: './sample.component.html',
  styleUrls: ['./sample.component.css']
})
export class SampleComponent implements OnInit {
  private sub: any;
  selectedBatch: number;
  selectedCode: number;
  labID: string;
  affiliate: string;
  sample: Sample;
  searching: boolean = false;

  constructor(private store: Store<State>, private router: Router, private route: ActivatedRoute,private loaderService: LoaderService) {
    store.select('mainStoreReducer')
      .subscribe((data: State) => {
        //////debugger;;
        this.affiliate = data.affiliate;
        if (data.sample != undefined) {
          ////debugger;;
          this.sample = data.sample;
        }
        this.searching = data.loading;
        if (this.searching === true) {
          ////////debugger;;
          //this.showLoading = true;
          this.loaderService.display(true);
        }
        else {
          ////////debugger;;
          //this.showLoading = false;
          this.loaderService.display(false);
        }
      })
  }

  ngOnInit() {
    //////debugger;;
    this.sub = this.route.params.subscribe(params => {
      this.selectedBatch = +params['batch'];
      this.selectedCode = +params['code'];
      this.labID = ("00000" + this.selectedBatch).slice(-5) + ("00000" + this.selectedCode).slice(-3); // returns 00123
      this.store.dispatch({ type: "PULL_SAMPLE_DETAILS", payload: { LabID: this.labID, affiliate: this.affiliate } });
    });
  }
  goBackToBatches() {
    this.router.navigate(['/']);
  }

  goBackToSample() {    
    this.router.navigate(['samples/',this.selectedBatch]);
  }
}
