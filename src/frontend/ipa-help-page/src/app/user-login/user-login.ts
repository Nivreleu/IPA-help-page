import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-login',
  standalone: true,
  templateUrl: './user-login.html',
  styleUrl: './user-login.scss',
})
export class UserLogin {

  constructor(private router: Router) {}

  goToOverview(username: string) {
    const cleanUsername = username.trim();
    this.router.navigate(['/overview', cleanUsername]);
  }

}
