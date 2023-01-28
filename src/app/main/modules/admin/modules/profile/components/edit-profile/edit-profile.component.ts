import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Accounts } from 'src/app/main/models/accounts';
import { AccountService } from 'src/app/main/services/account/account.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {

  account:Accounts;
  accountForm:FormGroup;
  isAccountFormSubmitted:boolean = false;
  profileImg:any;
  imageUrl:any;

  constructor(public dialogRef:DialogRef, @Inject(DIALOG_DATA) public data:any, private accountService:AccountService, private formBuilder:FormBuilder) {}

  ngOnInit(): void {
    this.account = this.data.account;
    this.imageUrl = environment.apiUrl+"/account/profile-img/"+this.account.id;
    this.generateAccountForm();
  }

  generateAccountForm(){
    this.accountForm = this.formBuilder.group({
      fullname: [this.account.fullname],
      username: [{value:this.account.username,disabled:true}],
      email: [{value:this.account.email,disabled:true}]
    });
  }

  public editAccount(): void{
    if(this.accountForm.valid){
      const accountId = this.account.id;

      const formData = new FormData();
      const account = this.accountForm.value;

      formData.append('image',this.profileImg);
      formData.append('accountId', new Blob([JSON.stringify(accountId)], {type:"application/json"}));
      formData.append('account', new Blob([JSON.stringify(account)], {type:"application/json"}));
      
      this.accountService.editAccount(formData).subscribe({
        next: (response: any) => {
          console.log(response);
          this.isAccountFormSubmitted = true;
          this.dialogRef.close(this.isAccountFormSubmitted);
        },
        error: (error: any) => {
          console.log(error);
          this.isAccountFormSubmitted = false;
          this.dialogRef.close(this.isAccountFormSubmitted);
        }
      });
    } 
  }

  onSelectFile(event:any){
    if(event.target.files.length > 0){
      this.profileImg = event.target.files[0];
      this.previewImage(this.profileImg);
    }
  }

  previewImage(image:any){
    var reader = new FileReader();
    reader.readAsDataURL(image);
    reader.onload = (_event) => {
      this.imageUrl = reader.result;
    }
  }

  closeDialog(){
    this.dialogRef.close();
  }

}
