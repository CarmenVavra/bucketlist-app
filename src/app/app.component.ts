import { Component, ElementRef, inject, signal, SimpleChange, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavToolbarComponent } from './components/core/nav-toolbar/nav-toolbar.component';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { NavigationListComponent } from "./components/core/navigation-list/navigation-list.component";
import { AUTH_DATA, LoginUser } from './components/auth/models/auth.model';
import { AuthService } from './components/auth/services/auth-service.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavToolbarComponent, MatButtonModule, MatSelectModule, MatFormFieldModule,
    MatSidenavModule, MatListModule, NavigationListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {
  readonly title = signal<string>('cartoni-bucketlist');
  readonly opened = signal<boolean>(false);
  readonly hide = signal<boolean>(false);
  readonly loggedInUser = signal<LoginUser>(null!);

  #autService = inject(AuthService);

  ngDoCheck() {
    this.handleNavtop();
  }

  private handleNavtop() {
    if (this.#autService.getStoredUser()) {
      this.loggedInUser.set(this.#autService.getStoredUser());
    } else {
      this.loggedInUser.set(null!);
    }
  }

  hideNavigation() {
    this.hide.set(this.#autService.hideNavigation());
  }

  toggleMenuItems() {
    this.opened.set(!this.opened());
  }

  navItemClicked() {
    this.opened.set(false);
  }

  // doUnload() {
  //   console.log('in doUnload');
  //   this.doBeforeUnload();
  // }

  // doBeforeUnload() {
  //   console.log('in doBeforeUnload');
  //   localStorage.clear();
  // }
}
