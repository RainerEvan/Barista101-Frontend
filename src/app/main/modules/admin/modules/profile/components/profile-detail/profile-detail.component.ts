import { Dialog } from '@angular/cdk/dialog';
import { Component, OnInit } from '@angular/core';
import { Accounts } from 'src/app/main/models/accounts';
import { AccountService } from 'src/app/main/services/account/account.service';
import { AuthService } from 'src/app/main/services/auth/auth.service';
import { EditProfileComponent } from '../edit-profile/edit-profile.component';
import { ChangePasswordComponent } from '../change-password/change-password.component';

@Component({
  selector: 'app-profile-detail',
  templateUrl: './profile-detail.component.html',
  styleUrls: ['./profile-detail.component.css']
})
export class ProfileDetailComponent implements OnInit {

  account:Accounts;
  loading:boolean = false;

  constructor(public dialog:Dialog, private authService:AuthService, private accountService:AccountService) { }

  ngOnInit(): void {
    this.getAccount();
  }

  public getAccount(){
    const accountId = this.authService.accountValue.accountId;

    this.loading = true;
    
    if(accountId){
      this.accountService.getAccount(accountId).subscribe({
        next:(response:Accounts)=>{
          this.account = response;
          this.loading = false;
        },
        error:(error:any)=>{
          console.log(error);
        }
      });
    }
  }

  openEditDialog(){
    const dialogRef = this.dialog.open(EditProfileComponent, {
      data:{
        title:"Edit Profile",
        account:this.account
      }
    });

    dialogRef.closed.subscribe((success) => {
      if(success){
        this.getAccount();
      }
    });
  }

  openPasswordDialog(){
    const dialogRef = this.dialog.open(ChangePasswordComponent, {
      data:{
        title:"Change Password",
        account:this.account
      }
    });

    dialogRef.closed.subscribe((success) => {
      if(success){
        this.authService.signout();
      }
    });
  }
}
