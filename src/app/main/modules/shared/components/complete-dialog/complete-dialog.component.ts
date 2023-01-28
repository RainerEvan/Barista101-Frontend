import { DialogRef, DIALOG_DATA } from '@angular/cdk/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-complete-dialog',
  templateUrl: './complete-dialog.component.html',
  styleUrls: ['./complete-dialog.component.css']
})
export class CompleteDialogComponent implements OnInit {

  icon:string;
  link:string;

  constructor(public dialogRef:DialogRef, @Inject(DIALOG_DATA) public data:any, private router:Router) { }

  ngOnInit(): void {
    this.icon = this.data.icon;
    this.link = this.data.link;
  }

  continue(){
    this.dialogRef.close();
    if(this.link){
      this.router.navigate([this.link]);
    }
  }
}
