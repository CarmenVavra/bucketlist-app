import { Component, inject, signal } from '@angular/core';
import { DashboardItemComponent } from "./dashboard-item/dashboard-item.component";
import { ActivatedRoute, Router } from '@angular/router';
import { AREA, DashboardCard, PRIVATE_CARD_ITEMS, PUBLIC_CARD_ITEMS } from './models/dashboard.model';

@Component({
  selector: 'app-dashboard',
  imports: [DashboardItemComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  #activatedRoute = inject(ActivatedRoute);
  #router = inject(Router);

  readonly cardList = signal<DashboardCard[]>([]);
  readonly headline = signal<string>('Öffentlicher Bereich');

  readonly data = signal(this.#activatedRoute.data);

  get area() {
    return AREA;
  }

  get publicCards() {
    return PUBLIC_CARD_ITEMS;
  }

  get privateCards() {
    return PRIVATE_CARD_ITEMS;
  }

  ngOnInit(): void {
    this.data().subscribe((value) => {
      if (this.area.PUBLIC == value['area']) {
        this.cardList.set(this.publicCards);
        this.headline.set('Öffentlicher Bereich');
      } else if (this.area.PRIVATE == value['area']) {
        this.cardList.set(this.privateCards);
        this.headline.set('Privater Bereich');
      }
    });
  }

  protected buttonClick(path: string) {
    this.#router.navigateByUrl(path);
  }
}
