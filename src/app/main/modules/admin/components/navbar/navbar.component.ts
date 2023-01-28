import { Dialog } from '@angular/cdk/dialog';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/main/services/auth/auth.service';
import { ConfirmationDialogComponent } from '../../../shared/components/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  host:{
    "(window:click)":"onClick()"
  }
})
export class NavbarComponent implements OnInit {

  menus:any

  showDropdown:boolean = false;

  constructor(public dialog:Dialog, private authService:AuthService) {
    this.menus = [
      {
        label: 'Course',
        link: './course',
      },
      {
        label: 'Forum',
        link: './forum',
      },
      {
        label: 'Recipe',
        link: './recipe',
      },
      {
        label: 'Brew',
        link: './brew',
      },
      {
        label: 'Account',
        link: './account',
      },
    ]
  }

  ngOnInit(): void {
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
        title:"Signout",
        description:"Are you sure you want to signout?"
      }
    });

    dialogRef.closed.subscribe((confirm) => {
      if(confirm){
        this.authService.signout();
      }
    });
  }

}
