import { Component, inject, signal } from '@angular/core';
import { PublicFantasyItemComponent } from "../public-fantasy-item/public-fantasy-item.component";
import { FantasyItem } from '../../models/fantasy.model';
import { FantasyService } from '../../services/fantasy.service';
import { INLINE_MESSAGES } from '../../../core/models/core.model';

@Component({
  selector: 'app-public-fantasies',
  imports: [PublicFantasyItemComponent],
  templateUrl: './public-fantasies.component.html',
  styleUrl: './public-fantasies.component.css'
})
export class PublicFantasiesComponent {
  readonly fantasies = signal<FantasyItem[]>([]);
  readonly message = signal<string>('');

  #fantasyService = inject(FantasyService);

  ngOnInit(): void {
    this.loadItems();
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

  private loadItems() {
    this.#fantasyService.getPublicList().subscribe((fantasies) => {
      if (fantasies.length === 0) {
        this.message.set(INLINE_MESSAGES.NO_DATA_AVAILABLE);
      }
      this.fantasies.set(fantasies);
    });
  }
}
