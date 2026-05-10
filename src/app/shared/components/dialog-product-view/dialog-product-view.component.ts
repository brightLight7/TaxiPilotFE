import { Component, Inject } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';

export interface DialogData {
  name: string;
  listPrice: string;
  largePhoto: string;
}

@Component({
  selector: 'app-dialog-product-view',
  templateUrl: './dialog-product-view.component.html',
  styleUrls: ['./dialog-product-view.component.scss'],
})
export class DialogProductViewComponent {
  constructor(
    public dialogRef: MatDialogRef<DialogProductViewComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData, public dialog: MatDialog) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
