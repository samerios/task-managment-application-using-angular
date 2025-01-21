export type DialogType =
  | 'Ok'
  | 'YesNoPrompt'
  | 'YesNoCancelPrompt'
  | 'OkCancelPrompt';

export interface DialogButton {
  name: string;
  label: string;
}

export interface DialogData {
  dialogType: DialogType;
  title: string;
  content: string;
  entityId?: any;
}
