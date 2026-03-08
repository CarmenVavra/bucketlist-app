import { Component, inject, signal } from '@angular/core';
import { SimpleTitleTextFormComponent } from "../../../../core/forms/simple-title-text-form/simple-title-text-form.component";
import { Router } from '@angular/router';
import { ROUTE_PATHS, SimpleTitleText } from '../../../../../models/general.model';
import { FantasyService } from '../../../services/fantasy.service';
import { FantasyItem } from '../../../models/fantasy.model';
import { AuthService } from '../../../../auth/services/auth-service.service';
import { CoreService } from '../../../../core/services/core.service';
import { SNACKBAR_MESSAGES } from '../../../../core/models/core.model';

@Component({
  selector: 'app-create-fantasy-item',
  imports: [SimpleTitleTextFormComponent],
  templateUrl: './create-fantasy-item.component.html',
  styleUrl: './create-fantasy-item.component.css'
})
export class CreateFantasyItemComponent {
  #router = inject(Router);
  #authService = inject(AuthService);
  #fantasyService = inject(FantasyService);
  #coreService = inject(CoreService);

  readonly fantasyItem = signal<FantasyItem>({
    title: '',
    description: '',
    userId: 0,
  });

  protected submit(formData: SimpleTitleText) {
    this.fantasyItem().title = formData.title;
    this.fantasyItem().description = formData.text;
    this.fantasyItem().userId = this.#authService.getStoredUser().id!;
    this.#fantasyService.create(this.fantasyItem()).subscribe((fantasyItem) => {
      this.fantasyItem.set(fantasyItem);
      this.#coreService.openSnackBar(SNACKBAR_MESSAGES.CREATE);
      this.goBack();
    });
  }

  protected cancel() {
    this.goBack();
  }

  private goBack() {
    this.#router.navigateByUrl(ROUTE_PATHS.PRIVATE_FANTASIES);
  }


}
