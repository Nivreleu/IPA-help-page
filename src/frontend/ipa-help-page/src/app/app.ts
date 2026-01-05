import { Component } from '@angular/core';
import {NavigationEnd, Router, RouterOutlet} from '@angular/router';
import { filter } from 'rxjs/operators';
import {Header} from './header/header';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.html',
  imports: [
    RouterOutlet,
    Header
  ]
})
export class AppComponent {

  showHeader = false;

  constructor(private router: Router) {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.showHeader = event.urlAfterRedirects !== '/';
      });
  }
}
