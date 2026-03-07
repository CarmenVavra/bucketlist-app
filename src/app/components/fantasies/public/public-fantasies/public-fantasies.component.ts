import { Component, inject, signal } from '@angular/core';
import { PublicFantasyItemComponent } from "../public-fantasy-item/public-fantasy-item.component";
import { FantasyItem } from '../../models/fantasy.model';
import { FantasyService } from '../../services/fantasy.service';
import { INLINE_MESSAGES, TEXT } from '../../../core/models/core.model';
import { TextContainerComponent } from "../../../core/text-container/text-container.component";
import { MessageContainerComponent } from "../../../core/message-container/message-container.component";

@Component({
  selector: 'app-public-fantasies',
  imports: [PublicFantasyItemComponent, TextContainerComponent, MessageContainerComponent],
  templateUrl: './public-fantasies.component.html',
  styleUrl: './public-fantasies.component.css'
})
export class PublicFantasiesComponent {
  readonly fantasies = signal<FantasyItem[]>([]);
  readonly message = signal<string>('');
  readonly text = signal<string>(TEXT.PUBLIC_FANTASIES);

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
