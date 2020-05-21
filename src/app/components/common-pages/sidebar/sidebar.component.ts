import { Component, OnInit } from '@angular/core';
import { navItems } from '../../../constants/_nav';

@Component({
  selector: 'sidebar-page',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  public sidebarMinimized = false;
  public navItems = navItems;

  constructor() { }

  ngOnInit(): void {
  }

  public toggleMinimize(e): void {
    this.sidebarMinimized = e;
  }

}
