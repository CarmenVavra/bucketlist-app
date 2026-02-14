import { Component, inject, signal } from '@angular/core';
import { PublicFantasyItemComponent } from "../public-fantasy-item/public-fantasy-item.component";
import { FantasyItem } from '../../models/fantasy.model';
import { FantasyService } from '../../services/fantasy.service';

@Component({
  selector: 'app-public-fantasies',
  imports: [PublicFantasyItemComponent],
  templateUrl: './public-fantasies.component.html',
  styleUrl: './public-fantasies.component.css'
})
export class PublicFantasiesComponent {
  readonly fantasies = signal<FantasyItem[]>([]);

  #fantasyService = inject(FantasyService);

  ngOnInit(): void {
    this.#fantasyService.getPublicList().subscribe((fantasies) => {
      this.fantasies.set(fantasies);
    });
  }

  protected accept(fantasyItem: FantasyItem) {
    this.#fantasyService.setIsAccepted(fantasyItem.id!).subscribe((fantasy) => {
      this.fantasies.update((fantasies) => {
        return fantasies.filter((f) => f.id !== fantasyItem.id);
      });
    });
  }

  protected deny(fantasyItem: FantasyItem) {
    this.#fantasyService.setIsDenied(fantasyItem.id!).subscribe((fantasy) => {
      this.fantasies.update((fantasies) => {
        return fantasies.filter((f) => f.id !== fantasyItem.id);
      });
    });
  }
}
