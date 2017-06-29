import { Component, OnInit, Input } from '@angular/core';
@Component({
  selector: 'app-samples',
  templateUrl: './samples.component.html',
  styleUrls: ['./samples.component.css']
})
export class SamplesComponent implements OnInit {   
  @Input() samples
  @Input() userId : string;
  @Input() batch : string;
  constructor() {   } 
  ngOnInit() {    
  }

  viewSample(code){    
    alert(this.batch + " - " + code + " - " + this.userId);
    
  }  
}
