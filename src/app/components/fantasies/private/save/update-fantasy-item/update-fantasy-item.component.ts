import { Component, inject, signal } from '@angular/core';
import { SimpleTitleTextFormComponent } from "../../../../core/forms/simple-title-text-form/simple-title-text-form.component";
import { FantasyItem } from '../../../models/fantasy.model';
import { AuthService } from '../../../../auth/services/auth-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ROUTE_PATHS, SimpleTitleText } from '../../../../../models/general.model';
import { FantasyService } from '../../../services/fantasy.service';
import { FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-update-fantasy-item',
  imports: [SimpleTitleTextFormComponent],
  templateUrl: './update-fantasy-item.component.html',
  styleUrl: './update-fantasy-item.component.css'
})
export class UpdateFantasyItemComponent {
  readonly fantasyItem = signal<FantasyItem>({
    title: '',
    description: '',
    userId: 0,
  });

  #router = inject(Router);
  #activatedRoute = inject(ActivatedRoute);
  #authService = inject(AuthService);
  #fantasyService = inject(FantasyService);

  ngOnInit(): void {
    this.loadItem();
  }

  private loadItem() {
    const itemId = this.#activatedRoute.snapshot.params['fantasyItemId'];
    this.#fantasyService.getFantasyItemById(itemId).subscribe((fantasyItem) => {
      this.fantasyItem.set(fantasyItem);
    });

  }

  protected submit(formData: SimpleTitleText) {
    this.fantasyItem().title = formData.title;
    this.fantasyItem().description = formData.text;
    this.#fantasyService.update(this.fantasyItem()).subscribe((fantasyItem) => {
      this.fantasyItem.set(fantasyItem);
      console.log('updated fantasyItem', fantasyItem);
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
