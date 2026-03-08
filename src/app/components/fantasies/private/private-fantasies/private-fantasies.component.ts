import { Component, inject, signal } from '@angular/core';
import { FantasyItem } from '../../models/fantasy.model';
import { PlusButtonComponent } from "../../../core/buttons/plus-button/plus-button.component";
import { Router } from '@angular/router';
import { ROUTE_PATHS } from '../../../../models/general.model';
import { PrivateFantasyItemComponent } from "../private-fantasy-item/private-fantasy-item.component";
import { AuthService } from '../../../auth/services/auth-service.service';
import { FantasyService } from '../../services/fantasy.service';
import { MatDivider } from "@angular/material/divider";
import { CoreService } from '../../../core/services/core.service';
import { INLINE_MESSAGES, SNACKBAR_MESSAGES } from '../../../core/models/core.model';
import { MatAccordion } from "@angular/material/expansion";

@Component({
  selector: 'app-private-fantasies',
  imports: [PlusButtonComponent, PrivateFantasyItemComponent, MatDivider, MatAccordion],
  templateUrl: './private-fantasies.component.html',
  styleUrl: './private-fantasies.component.css'
})
export class PrivateFantasiesComponent {
  readonly fantasies = signal<FantasyItem[]>([]);
  readonly message = signal<string>('');

  #router = inject(Router);
  #authService = inject(AuthService);
  #fantasyService = inject(FantasyService);
  #coreService = inject(CoreService);

  readonly userId = this.#authService.getStoredUser().id;

  ngOnInit(): void {
    this.loadItems();
  }

  private loadItems() {
    this.#fantasyService.getPrivateListByUserId(this.userId!).subscribe((fantasies) => {
      if (fantasies.length === 0) {
        this.message.set(INLINE_MESSAGES.NO_DATA_AVAILABLE);
      } else {
        this.message.set('');
      }
      this.fantasies.set(fantasies);
    });
  }

  protected openCreate() {
    this.#router.navigateByUrl(ROUTE_PATHS.FANTASY_ITEM_CREATE);
  }

  protected publish(fantasyItem: FantasyItem) {
    this.#fantasyService.togglePublishFantasies(fantasyItem.id!, true).subscribe((fantasy) => {
      this.loadItems();
    });
  }

  protected unpublish(fantasyItem: FantasyItem) {
    this.#fantasyService.togglePublishFantasies(fantasyItem.id!, false).subscribe((fantasy) => {
      this.loadItems();
    });
  }

  protected done(fantasyItem: FantasyItem) {
    this.#fantasyService.setIsDone(fantasyItem.id!).subscribe((fantasy) => {
      this.loadItems();
    });
  }

  protected openEdit(fantasyItem: FantasyItem) {
    this.#router.navigateByUrl(`${ROUTE_PATHS.FANTASY_ITEM_EDIT}/${fantasyItem.id}`)
  }

  protected deleteFantasyItem(fantasyItem: FantasyItem) {
    this.#coreService.openConfirmationDialog().subscribe((confirmationResult) => {
      if (true == confirmationResult) {
        this.deleteItem(fantasyItem);
      }
    });
  }

  protected deleteItem(fantasyItem: FantasyItem) {
    this.#fantasyService.delete(fantasyItem.id!).subscribe((message) => {
      this.loadItems();
      this.#coreService.openSnackBar(SNACKBAR_MESSAGES.DELETE);
    });
  }

  protected loadPrivateFantasies() {
    this.loadItems();
  }

  protected loadPrivateDone() {
    this.#fantasyService.showPrivateDone(this.userId!).subscribe((fantasies) => {
      if (fantasies.length === 0) {
        this.message.set(INLINE_MESSAGES.NO_DATA_AVAILABLE);
      } else {
        this.message.set('');
      }
      this.fantasies.set(fantasies);
    });
  }

  protected loadPrivateAccepted() {
    this.#fantasyService.showPrivateAccepted(this.userId!).subscribe((fantasies) => {
      if (fantasies.length === 0) {
        this.message.set(INLINE_MESSAGES.NO_DATA_AVAILABLE);
      } else {
        this.message.set('');
      }
      this.fantasies.set(fantasies);
    });
  }

  protected loadPrivateDenied() {
    this.#fantasyService.showPrivateDenied(this.userId!).subscribe((fantasies) => {
      if (fantasies.length === 0) {
        this.message.set(INLINE_MESSAGES.NO_DATA_AVAILABLE);
      } else {
        this.message.set('');
      }
      this.fantasies.set(fantasies);
    });
  }

}
