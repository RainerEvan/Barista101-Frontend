import { Component, OnInit, Inject } from '@angular/core';
import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';

@Component({
  selector: 'app-description-dialog',
  templateUrl: './description-dialog.component.html',
  styleUrls: ['./description-dialog.component.css']
})
export class DescriptionDialogComponent implements OnInit {

  constructor(public dialogRef:DialogRef, @Inject(DIALOG_DATA) public data:any) { }

  ngOnInit(): void {
  }

  closeDialog(){
    this.dialogRef.close();
  }

}
