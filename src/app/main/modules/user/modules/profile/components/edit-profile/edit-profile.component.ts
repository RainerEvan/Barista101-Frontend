import { Dialog } from '@angular/cdk/dialog';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Accounts } from 'src/app/main/models/accounts';
import { ResultDialogComponent } from 'src/app/main/modules/shared/components/result-dialog/result-dialog.component';
import { AccountService } from 'src/app/main/services/account/account.service';
import { AuthService } from 'src/app/main/services/auth/auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {

  account:Accounts;
  accountForm:FormGroup;
  loading:boolean = false;
  isAccountFormSubmitted:boolean = false;
  profileImg:any;
  imageUrl:any;

  constructor(public dialog:Dialog, private authService:AuthService, private accountService:AccountService, private formBuilder:FormBuilder) {}

  ngOnInit(): void {
    this.account = history.state;
    this.generateAccountForm();
    this.imageUrl = environment.apiUrl+"/account/profile-img/"+this.account.id;
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
      const accountId = this.authService.accountValue.accountId;

      const formData = new FormData();
      const account = this.accountForm.value;

      formData.append('image',this.profileImg);
      formData.append('accountId', new Blob([JSON.stringify(accountId)], {type:"application/json"}));
      formData.append('account', new Blob([JSON.stringify(account)], {type:"application/json"}));
      
      this.loading = true;

      this.accountService.editAccount(formData).subscribe({
        next: (response: any) => {
          console.log(response);
          this.loading = false;
          this.isAccountFormSubmitted = true;
          this.openResultDialog(this.isAccountFormSubmitted,"Profile has been updated","./profile");
        },
        error: (error: any) => {
          console.log(error);
          this.loading = false;
          this.isAccountFormSubmitted = false;
          this.openResultDialog(this.isAccountFormSubmitted,"There was a problem",null);
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

  openResultDialog(success:boolean,description:string,link:string){
    const dialogRef = this.dialog.open(ResultDialogComponent,{
      data:{
        success:success,
        description:description,
        link:link
      }
    });
  }
}
