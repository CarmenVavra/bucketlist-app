import { Component, inject, signal } from '@angular/core';
import { PublicFantasyItemComponent } from "../public-fantasy-item/public-fantasy-item.component";
import { FantasyItem } from '../../models/fantasy.model';
import { FantasyService } from '../../services/fantasy.service';
import { INLINE_MESSAGES, TEXT } from '../../../core/models/core.model';
import { TextContainerComponent } from "../../../core/text-container/text-container.component";
import { MessageContainerComponent } from "../../../core/message-container/message-container.component";
import { MatAccordion } from "@angular/material/expansion";

@Component({
  selector: 'app-public-fantasies',
  imports: [PublicFantasyItemComponent, TextContainerComponent, MessageContainerComponent, MatAccordion],
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

  /**
   * Accepts a public fantasy item.
   * @param fantasyItem - The fantasy item to accept.
   */
  protected accept(fantasyItem: FantasyItem) {
    this.#fantasyService.setIsAccepted(fantasyItem).subscribe((fantasy) => {
      this.loadItems();
    });
  }

  /**
   * Denies a public fantasy item.
   * @param fantasyItem - The fantasy item to deny.
   */
  protected deny(fantasyItem: FantasyItem) {
    this.#fantasyService.setIsDenied(fantasyItem).subscribe((fantasy) => {
      this.loadItems();
    });
  }

  /**
   * Loads public fantasy items from the backend by calling the getPublicList method of the FantasyService and sets the fantasies signal with the response, also sets a message if no items are available
   */
  private loadItems() {
    this.#fantasyService.getPublicList().subscribe((fantasies) => {
      if (fantasies?.length === 0) {
        this.message.set(INLINE_MESSAGES.NO_DATA_AVAILABLE);
      }
      this.fantasies.set(fantasies);
    });
  }
}
