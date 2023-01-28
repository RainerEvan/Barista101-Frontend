import { Component, OnInit } from '@angular/core';
import { Accounts } from 'src/app/main/models/accounts';
import { AccountService } from 'src/app/main/services/account/account.service';

@Component({
  selector: 'app-account-list',
  templateUrl: './account-list.component.html',
  styleUrls: ['./account-list.component.css']
})
export class AccountListComponent implements OnInit {

  accounts:Accounts[] = [];
  loading:boolean = false;

  constructor(private accountService:AccountService) { }

  ngOnInit(): void {
    this.getAllAccounts();
  }

  public getAllAccounts(){
    this.loading = true;
    
    this.accountService.getAllAccounts().subscribe({
      next:(response:Accounts[])=>{
        this.accounts = response;
        this.loading = false;
      },
      error:(error:any)=>{
          console.log(error);
      }
    });
  }

}
