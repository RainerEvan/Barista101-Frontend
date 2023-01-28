import { Component, OnInit } from '@angular/core';
import { Notifications } from 'src/app/main/models/notifications';
import { AuthService } from 'src/app/main/services/auth/auth.service';
import { NotificationService } from 'src/app/main/services/notification/notification.service';

@Component({
  selector: 'app-notification-list',
  templateUrl: './notification-list.component.html',
  styleUrls: ['./notification-list.component.css']
})
export class NotificationListComponent implements OnInit {

  notifications:Notifications[] = [];
  loading:boolean = false;
  icons:any;

  constructor(private authService:AuthService, private notificationService:NotificationService) {
    this.icons = [
      {
        name:'academic-cap',
        style:'text-orange-400 fill-orange-400'
      },
      {
        name:'chat-alt',
        style:'text-blue-400 fill-blue-400'
      },
      {
        name:'star',
        style:'text-yellow-400 fill-yellow-400'
      },
    ]
  }

  ngOnInit(): void {
    this.getAllNotificationsForAccount();
  }

  public getAllNotificationsForAccount(){
    const accountId = this.authService.accountValue.accountId;

    this.loading = true;
    
    this.notificationService.getAllNotificationsForAccount(accountId).subscribe({
      next:(response:Notifications[])=>{
        this.notifications = response;
        this.loading = false;
      },
      error:(error:any)=>{
        console.log(error);
      }
    });
  }

  getData(data:string){
    return JSON.parse(data);
  }

}
