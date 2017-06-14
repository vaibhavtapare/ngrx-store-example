import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import {TabsModule} from "ng2-tabs";

@Component({
  selector: 'app-addsample',
  templateUrl: './addsample.component.html',
  styleUrls: ['./addsample.component.css']
})
export class AddsampleComponent implements OnInit , OnDestroy {
 labid: number; 
 private sub: any;
  constructor(private route: ActivatedRoute) { }

   ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
       this.labid = +params['labid']; // (+) converts string 'id' to a number
    });    
  }

   ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
