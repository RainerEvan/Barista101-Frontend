import { Dialog } from '@angular/cdk/dialog';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Accounts } from 'src/app/main/models/accounts';
import { ResultDialogComponent } from 'src/app/main/modules/shared/components/result-dialog/result-dialog.component';
import { AccountService } from 'src/app/main/services/account/account.service';
import { AuthService } from 'src/app/main/services/auth/auth.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  account:Accounts;
  passwordForm:FormGroup;
  loading:boolean = false;
  isPasswordFormSubmitted:boolean = false;
  showPassword: boolean = false;

  constructor(public dialog:Dialog, private authService:AuthService, private accountService:AccountService, private formBuilder:FormBuilder) {}

  ngOnInit(): void {
    this.account = history.state;
    this.generatePasswordForm();
  }

  generatePasswordForm(){
    this.passwordForm = this.formBuilder.group({
      accountId: [this.authService.accountValue.accountId],
      currPassword: [null,[Validators.required]],
      newPassword: [null,[Validators.required]],
    });
  }

  public changePassword(): void{
    if(this.passwordForm.valid){
      const formData = this.passwordForm.value;

      this.loading = true;

      this.accountService.changePassword(formData).subscribe({
        next: (response: any) => {
          console.log(response);
          this.loading = false;
          this.isPasswordFormSubmitted = true;
          this.openResultDialog(this.isPasswordFormSubmitted,"Password has been updated, please sign in again");
        },
        error: (error: any) => {
          console.log(error);
          this.loading = false;
          this.isPasswordFormSubmitted = false;
          this.openResultDialog(this.isPasswordFormSubmitted,error.message);
        }
      });
    } 
  }

  openResultDialog(success:boolean,description:string){
    const dialogRef = this.dialog.open(ResultDialogComponent,{
      data:{
        success:success,
        description:description,
      }
    });

    dialogRef.closed.subscribe((result) => {
      if(result){
        this.authService.signout();
      }
    });
  }

  togglePassword(){
    this.showPassword = !this.showPassword;
  }

}
