import { DialogRef, DIALOG_DATA } from '@angular/cdk/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-result-dialog',
  templateUrl: './result-dialog.component.html',
  styleUrls: ['./result-dialog.component.css']
})
export class ResultDialogComponent implements OnInit {

  link:string;
  success:boolean;

  constructor(public dialogRef:DialogRef, @Inject(DIALOG_DATA) public data:any, private router:Router) { }

  ngOnInit(): void {
    this.link = this.data.link;
    this.success = this.data.success;
  }

  okay(){
    this.dialogRef.close(this.success);
    if(this.link){
      this.router.navigate([this.link]);
    }
  }

  close(){
    this.dialogRef.close(this.success);
  }
}
