import { Component, OnInit } from '@angular/core';
import { NbMenuItem } from '@nebular/theme';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  listMenu : NbMenuItem[] = []

  constructor() { }

  ngOnInit(): void {
    this.listMenu = [
      {link : '/demo1', title : 'Observable - la base', icon : 'book'},
      {link : '/demo2', title : 'Subject', icon : 'book'},
      {link : '/demo3', title : 'Conso api'}
    ]
  }

}
