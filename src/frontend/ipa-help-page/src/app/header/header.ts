import { Component } from '@angular/core';
import {NavigationEnd, Router, RouterLink} from '@angular/router';
import { filter } from 'rxjs/operators';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.html',
  styleUrl: './header.scss',
  imports: [
    RouterLink,
    NgIf
  ]
})
export class Header {

  username: string | null = null;

  constructor(private router: Router) {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        const segments = this.router.url.split('/');
        this.username = segments.length > 2 ? segments[2] : null;
      });
  }
}
