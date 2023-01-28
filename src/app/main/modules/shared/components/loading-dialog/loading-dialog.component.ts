import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-loading-dialog',
  templateUrl: './loading-dialog.component.html',
  styleUrls: ['./loading-dialog.component.css']
})
export class LoadingDialogComponent implements OnInit {
  
  @Input("label") label:string = ""

  constructor() { }

  ngOnInit(): void {
  }

}
