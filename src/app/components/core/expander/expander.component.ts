import { Component, input, output, signal } from '@angular/core';
import { MatAccordion, MatExpansionModule, MatExpansionPanelActionRow } from "@angular/material/expansion";
import { EditButtonComponent } from "../buttons/edit-button/edit-button.component";
import { DeleteButtonComponent } from "../buttons/delete-button/delete-button.component";
import { DoneButtonComponent } from "../buttons/done-button/done-button.component";
import { UnpublishButtonComponent } from "../buttons/unpublish-button/unpublish-button.component";
import { PublishButtonComponent } from "../buttons/publish-button/publish-button.component";
import { AcceptButtonComponent } from "../buttons/accept-button/accept-button.component";
import { DenyButtonComponent } from "../buttons/deny-button/deny-button.component";
import { LoginUser } from '../../auth/models/auth.model';
import { BlankoButtonComponent } from "../buttons/blanko-button/blanko-button.component";
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-expander',
  imports: [MatAccordion, MatExpansionModule, EditButtonComponent, DeleteButtonComponent,
    MatExpansionPanelActionRow, DoneButtonComponent, UnpublishButtonComponent,
    PublishButtonComponent, AcceptButtonComponent, DenyButtonComponent,
    BlankoButtonComponent, DatePipe],
  templateUrl: './expander.component.html',
  styleUrl: './expander.component.css'
})
export class ExpanderComponent {

  readonly itemOwner = input<LoginUser>();
  readonly title = input.required<string>();
  readonly text = input.required<string>();
  readonly published = input<boolean>();
  readonly headerRightSide = input<string>();
  readonly subtitle = input<string>();
  readonly priorityClass = input<string>();
  readonly date = input<string>();
  readonly toDate = input<string>();
  readonly fromDate = input<string>();
  readonly time = input<string>();
  readonly toTime = input<string>();
  readonly fromTime = input<string>();

  readonly showAcceptBtn = input<boolean>();
  readonly showDenyBtn = input<boolean>();
  readonly showPublishBtn = input<boolean>();
  readonly showUnpublishBtn = input<boolean>();
  readonly showDoneBtn = input<boolean>();
  readonly showEditBtn = input<boolean>();
  readonly showDeleteBtn = input<boolean>();
  readonly showBlankoBtn = input<boolean>();

  readonly acceptAction = output();
  readonly denyAction = output();
  readonly publishAction = output();
  readonly unpublishAction = output();
  readonly doneAction = output();
  readonly editAction = output();
  readonly deleteAction = output();
  readonly blankoAction = output();

  readonly dateFromDate = signal<string>('');
  readonly timeFromTime = signal<string>('');
  readonly printToDate = signal<string>('');
  readonly printToTime = signal<string>('');
  readonly showDate = signal<boolean>(false);

  ngOnInit(): void {
    if (!this.date()?.includes('0000') && this.date() != undefined) {
      this.dateFromDate.set(this.date()!);
      this.showDate.set(true);
    }

    if (!this.fromDate()?.includes('0000') && !this.toDate()?.includes('0000') && this.fromDate() != undefined) {
      this.dateFromDate.set(this.fromDate()!);
      this.printToDate.set(this.toDate()!);
      this.showDate.set(true);
    }

    if (!this.time()?.includes('00:00:00') && this.time() != undefined) {
      this.timeFromTime.set(this.time()?.substring(0, 5)!);
      this.showDate.set(true);
    }

    if (!this.fromTime()?.includes('00:00:00') && !this.toTime()?.includes('00:00:00') && this.fromTime() != undefined) {
      this.timeFromTime.set(this.fromTime()?.substring(0, 5)!);
      this.printToTime.set(this.toTime()?.substring(0, 5)!);
      this.showDate.set(true);
    }
  }

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

  protected blanko() {
    this.blankoAction.emit();
  }
}
