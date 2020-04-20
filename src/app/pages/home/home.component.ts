import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  @ViewChild('sidenav', { static: false }) sidenav: any;

  public sidenavMode: boolean;
  public sidenavOpen: boolean;

  constructor() {
  }

  ngOnInit() {

    if(window.innerWidth <= 768) {
      this.sidenavMode = false;
      this.sidenavOpen = false;
      } else {
      this.sidenavMode = true;
      this.sidenavOpen = true;
    }
  }

  public toggleSidenav(){
    this.sidenav.toggle();
  }

}
