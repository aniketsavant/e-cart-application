import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'header-page',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  constructor(private router: Router, private toster: ToastrService) {}

  ngOnInit(): void {}

  public onLogoutClick(): void {
    localStorage.clear();
    this.router.navigateByUrl('/login');
    this.toster.success('Logout successfull.', 'Done..!!');
  }
}
