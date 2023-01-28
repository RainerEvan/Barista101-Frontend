import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  menus:any;

  constructor() { 
    this.menus = [
      {
        label: 'Course',
        link: './course',
        icon: 'academic-cap'
      },
      {
        label: 'Forum',
        link: './forum',
        icon: 'chat-alt-2'
      },
      {
        label: 'Recipe',
        link: './recipe',
        icon: 'clipboard-list'
      },
      {
        label: 'Brew',
        link: './brew',
        icon: 'beaker'
      },
    ]
  }

  ngOnInit(): void {
  }

}
