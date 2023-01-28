import { DialogRef, DIALOG_DATA } from '@angular/cdk/dialog';
import { Component, Inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.css']
})
export class ConfirmationDialogComponent implements OnInit {

  confirmation:boolean = false;

  constructor(public dialogRef:DialogRef, @Inject(DIALOG_DATA) public data:any) { }

  ngOnInit(): void {
  }

  closeDialog(){
    this.dialogRef.close();
  }

  confirm(){
    this.confirmation = true;
    this.dialogRef.close(this.confirmation);
  }

  cancel(){
    this.confirmation = false;
    this.dialogRef.close(this.confirmation);
  }

}
