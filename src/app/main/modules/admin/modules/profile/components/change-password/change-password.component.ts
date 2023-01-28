import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountService } from 'src/app/main/services/account/account.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  passwordForm:FormGroup;
  isPasswordFormSubmitted:boolean = false;
  showPassword: boolean = false;

  constructor(public dialogRef:DialogRef, @Inject(DIALOG_DATA) public data:any, private accountService:AccountService, private formBuilder:FormBuilder) {}

  ngOnInit(): void {
    this.generatePasswordForm();
  }

  generatePasswordForm(){
    this.passwordForm = this.formBuilder.group({
      accountId: [this.data.account.id],
      currPassword: [null,[Validators.required]],
      newPassword: [null,[Validators.required]],
    });
  }

  public changePassword(): void{
    if(this.passwordForm.valid){
      const formData = this.passwordForm.value;

      this.accountService.changePassword(formData).subscribe({
        next: (response: any) => {
          console.log(response);
          this.isPasswordFormSubmitted = true;
          this.dialogRef.close(this.isPasswordFormSubmitted);
        },
        error: (error: any) => {
          console.log(error);
          this.isPasswordFormSubmitted = false;
          this.dialogRef.close(this.isPasswordFormSubmitted);
        }
      });
    } 
  }

  togglePassword(){
    this.showPassword = !this.showPassword;
  }

  closeDialog(){
    this.dialogRef.close();
  }

}
