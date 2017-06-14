import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-copytodetails',
  templateUrl: './copytodetails.component.html',
  styleUrls: ['./copytodetails.component.css']
})
export class CopytodetailsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
 accounts = [
    {value: '', viewValue: ''},
    {value: 'CLA-DEV', viewValue: 'CLA-DEV'},
    {value: 'VAL-001', viewValue: 'VAL-001'},
    {value: 'HAG-001', viewValue: 'HAG-001'}
  ];
}
