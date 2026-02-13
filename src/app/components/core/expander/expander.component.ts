import { Component, input, output } from '@angular/core';
import { MatAccordion, MatExpansionModule, MatExpansionPanelActionRow } from "@angular/material/expansion";
import { EditButtonComponent } from "../buttons/edit-button/edit-button.component";
import { DeleteButtonComponent } from "../buttons/delete-button/delete-button.component";
import { DoneButtonComponent } from "../buttons/done-button/done-button.component";
import { UnpublishButtonComponent } from "../buttons/unpublish-button/unpublish-button.component";
import { PublishButtonComponent } from "../buttons/publish-button/publish-button.component";
import { AcceptButtonComponent } from "../buttons/accept-button/accept-button.component";
import { DenyButtonComponent } from "../buttons/deny-button/deny-button.component";

@Component({
  selector: 'app-expander',
  imports: [MatAccordion, MatExpansionModule, EditButtonComponent, DeleteButtonComponent, MatExpansionPanelActionRow, DoneButtonComponent, UnpublishButtonComponent, PublishButtonComponent, AcceptButtonComponent, DenyButtonComponent],
  templateUrl: './expander.component.html',
  styleUrl: './expander.component.css'
})
export class ExpanderComponent {

  readonly title = input.required<string>();
  readonly text = input.required<string>();
  readonly published = input<boolean>();
  readonly headerRightSide = input<string>();
  readonly subtitle = input<string>();
  readonly showAcceptBtn = input<boolean>();
  readonly showDenyBtn = input<boolean>();
  readonly showPublishBtn = input<boolean>();
  readonly showUnpublishBtn = input<boolean>();
  readonly showDoneBtn = input<boolean>();
  readonly showEditBtn = input<boolean>();
  readonly showDeleteBtn = input<boolean>();

  readonly acceptAction = output();
  readonly denyAction = output();
  readonly publishAction = output();
  readonly unpublishAction = output();
  readonly doneAction = output();
  readonly editAction = output();
  readonly deleteAction = output();

  protected accept() {
    this.acceptAction.emit();
  }

  protected deny() {
    this.denyAction.emit();
  }

  protected publish() {
    this.publishAction.emit();
  }

  protected unpublish() {
    this.unpublishAction.emit();
  }

  protected done() {
    this.doneAction.emit();
  }

  protected edit() {
    this.editAction.emit();
  }

  protected delete() {
    this.deleteAction.emit();
  }
}
