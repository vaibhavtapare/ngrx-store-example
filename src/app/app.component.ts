import { Batches } from './state-management/model/workingbatches';
import { Cheese } from './.cheese';
import { INCREMENT } from './state-management/actions/main-action-creator';
import { State } from './state-management/state/main-state';
import { Component } from '@angular/core';
import { Store } from "@ngrx/store";
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'app works!';
 
}
