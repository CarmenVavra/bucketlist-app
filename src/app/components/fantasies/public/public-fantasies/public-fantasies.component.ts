import { Component, inject, signal } from '@angular/core';
import { PublicFantasyItemComponent } from "../public-fantasy-item/public-fantasy-item.component";
import { FantasyItem } from '../../models/fantasy.model';
import { FantasyService } from '../../services/fantasy.service';
import { AuthService } from '../../../auth/services/auth-service.service';

@Component({
  selector: 'app-public-fantasies',
  imports: [PublicFantasyItemComponent],
  templateUrl: './public-fantasies.component.html',
  styleUrl: './public-fantasies.component.css'
})
export class PublicFantasiesComponent {
  readonly fantasies = signal<FantasyItem[]>([]);

  #authService = inject(AuthService);
  #fantasyService = inject(FantasyService);

  ngOnInit(): void {
    const userId = this.#authService.getStoredUser().id;
    this.#fantasyService.getPublicList().subscribe((fantasies) => {
      this.fantasies.set(fantasies);
      console.log('this.fantasies', this.fantasies());
    });
  }
}
