import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-asignatures-dialog',
  templateUrl: './dialog.component.html' 
})
export class DialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { asignatures: string[] },
    private dialogRef: MatDialogRef<DialogComponent>
  ) {}

  closeDialog(): void {
    this.dialogRef.close();
  }
}