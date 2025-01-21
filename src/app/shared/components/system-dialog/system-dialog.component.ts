import {
  ChangeDetectionStrategy,
  Component,
  inject,
  model,
  OnInit,
} from '@angular/core';
import {
  DialogButton,
  DialogData,
  DialogType,
} from '../../models/components-models/dialog';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';

@Component({
  selector: 'app-system-dialog',
  templateUrl: './system-dialog.component.html',
  styleUrl: './system-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SystemDialogComponent {
  dialogType!: DialogType;

  title!: string;

  content!: string;

  entityId?: any;

  dialogButtons: DialogButton[] = [];

  readonly dialog = inject(MatDialog);

  readonly data = inject<DialogData>(MAT_DIALOG_DATA);

  readonly dialogRef = inject(MatDialogRef<SystemDialogComponent>);

  constructor() {
    this.dialogType = this.data.dialogType;
    this.title = this.data.title;
    this.content = this.data.content;

    if (this.data.entityId) this.entityId = this.data.entityId;

    switch (this.dialogType) {
      case 'Ok':
        this.dialogButtons = [
          {
            name: 'ok',
            label: 'SYSTEM.BUTTONS.OK',
          },
        ];
        break;
      case 'YesNoPrompt':
        this.dialogButtons = [
          {
            name: 'no',
            label: 'SYSTEM.BUTTONS.NO',
          },
          {
            name: 'yes',
            label: 'SYSTEM.BUTTONS.YES',
          },
        ];
        break;
      case 'YesNoCancelPrompt':
        this.dialogButtons = [
          {
            name: 'cancel',
            label: 'SYSTEM.BUTTONS.CANCEL',
          },
          {
            name: 'no',
            label: 'SYSTEM.BUTTONS.NO',
          },
          {
            name: 'yes',
            label: 'SYSTEM.BUTTONS.YES',
          },
        ];
        break;
      case 'OkCancelPrompt':
        this.dialogButtons = [
          {
            name: 'cancel',
            label: 'SYSTEM.BUTTONS.CANCEL',
          },
          {
            name: 'yes',
            label: 'SYSTEM.BUTTONS.YES',
          },
        ];
        break;
      default:
        this.dialogButtons = [];
        break;
    }
  }

  dialogButtonOnClick(buttonsName: string) {
    this.dialogRef.close(buttonsName);
  }
}
