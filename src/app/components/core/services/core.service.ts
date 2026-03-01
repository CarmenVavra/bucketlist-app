import { inject, Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../dialog/confirmation-dialog/confirmation-dialog.component';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CoreService {
  dialog = inject(MatDialog);

  constructor() { }

  openConfirmationDialog(enterAnimationDuration: string, exitAnimationDuration: string): Observable<boolean> {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '400px',
      enterAnimationDuration,
      exitAnimationDuration,
    });

    return dialogRef.afterClosed().pipe(
      map(result => result === true)
    );
  }
}
