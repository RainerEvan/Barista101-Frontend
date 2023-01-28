import { Dialog } from '@angular/cdk/dialog';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/main/services/auth/auth.service';
import { ConfirmationDialogComponent } from '../../../shared/components/confirmation-dialog/confirmation-dialog.component';
import { FcmsubscriptionService } from 'src/app/main/services/fcmsubscription/fcmsubscription.service';
import { AngularFireMessaging } from '@angular/fire/compat/messaging';
import { FcmSubscriptions } from 'src/app/main/models/fcmsubscriptions';
import { AuthDetails } from 'src/app/main/models/authdetails';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  host:{
    "(window:click)":"onClick()"
  }
})
export class HeaderComponent implements OnInit {

  showDropdown:boolean = false;
  newNotification:boolean = false;
  account: AuthDetails;

  constructor(public dialog:Dialog, private angularFireMessaging: AngularFireMessaging,private authService:AuthService, private fcmSubscriptionService: FcmsubscriptionService) {}

  ngOnInit(): void {
    this.account = this.authService.accountValue;
    
    if (this.account){
      this.getAccountFcmToken(this.account.accountId);
      this.receiveMessage();
    }
  }

  toggleDropdown(event:any){
    event.stopPropagation();
    this.showDropdown = !this.showDropdown;
  }

  onClick(){
    this.showDropdown = false;
  }

  openSignoutDialog(){
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data:{
        title:"Sign Out",
        description:"Are you sure you want to sign out?"
      }
    });

    dialogRef.closed.subscribe((confirm) => {
      if(confirm){
        this.authService.signout();
      }
    });
  }

  getAccountFcmToken(accountId:string){
    this.fcmSubscriptionService.getAllFcmSubscriptionsForAccount(accountId).subscribe({
      next: (fcm:FcmSubscriptions[]) => {
        this.requestPermission(fcm);
        console.log("Fcm Token Retrieved!");
      },
      error: (error:any) => {
        console.log(error);
      }
    });
  }
  
  requestPermission(fcmSubscriptions:FcmSubscriptions[]) {
    this.angularFireMessaging.requestToken.subscribe({
      next: (token:any) => {
        console.log("Notification permission granted!", token);

        if(this.checkToken(fcmSubscriptions,token)){
          this.saveToken(token);
        }
      },
      error: (error:any) => {
        console.error('Unable to get permission',error);
      }
    });
  }

  receiveMessage(){
    this.angularFireMessaging.messages.subscribe({
      next:(message:any) => {
        console.log("New message received ", message);
        this.newNotification = true;
      }
    })
  }

  saveToken(token:any){
    const fcmsubscription = {
      accountId:this.account.accountId,
      token:token
    }

    this.fcmSubscriptionService.addFcmSubscriptions(fcmsubscription).subscribe({
      next:(response:any) => {
        console.log("Fcm token saved successfully", response);
      },
      error: (error:any) => {
        console.log(error);
      }
    })
  }

  checkToken(fcmSubscriptions:any[], token:any):boolean{
    console.log(fcmSubscriptions);
    if(token){
      if(fcmSubscriptions.some(fcmToken => token.match(fcmToken.token))){
        return false;
      } else{
        return true;
      }
    }

    return false;
  }

}
