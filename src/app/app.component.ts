import { Router } from '@angular/router';
import { LoaderService } from './state-management/loader/loader.service';
import { Batches } from './state-management/model/workingbatches';
import { Cheese } from './.cheese';
import { INCREMENT } from './state-management/actions/main-action-creator';
import { State } from './state-management/state/main-state';
import { Component, OnInit } from '@angular/core';
import { Store } from "@ngrx/store";
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit{
  title = 'app works!';
  showLoader: boolean; 

  constructor(
        private loaderService: LoaderService,private router: Router) {
    }
  
  ngOnInit() {
        this.loaderService.status.subscribe((val: boolean) => {
            this.showLoader = val;
        });
    }

    LogOff(){
        localStorage.removeItem("user"); 
        this.router.navigate(['']);
    }
}
