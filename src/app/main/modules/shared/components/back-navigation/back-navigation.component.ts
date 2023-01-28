import { Location } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-back-navigation',
  templateUrl: './back-navigation.component.html',
  styleUrls: ['./back-navigation.component.css']
})
export class BackNavigationComponent implements OnInit {

  @Input("label") label:string = "";
  @Input("link") link:string;

  constructor(private location:Location, private router:Router) { }

  ngOnInit(): void {
  }

  back(){
    if(this.link){
      this.router.navigate([this.link]);
    } else {
      this.location.back();
    }
  }

}
