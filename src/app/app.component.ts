import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { BnNgIdleService } from 'bn-ng-idle'; // import it to your component

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private router: Router, private bnIdle: BnNgIdleService) {
    this.bnIdle.startWatching(600).subscribe((res) => {
      if (res) {
        localStorage.clear();
        this.router.navigateByUrl('/login')
      }
    });
  }

  ngOnInit() {
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0);
    });
  }
}
