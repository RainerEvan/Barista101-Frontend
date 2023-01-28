import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Accounts } from 'src/app/main/models/accounts';
import { AccountService } from 'src/app/main/services/account/account.service';

@Component({
  selector: 'app-account-detail',
  templateUrl: './account-detail.component.html',
  styleUrls: ['./account-detail.component.css']
})
export class AccountDetailComponent implements OnInit {

  account:Accounts;
  loading:boolean = false;

  constructor(private route:ActivatedRoute, private accountService:AccountService) { }

  ngOnInit(): void {
    this.getAccount();
  }

  public getAccount(){
    const accountId = this.route.snapshot.paramMap.get('id');

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

}
