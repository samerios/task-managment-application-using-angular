import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatOption, provideNativeDateAdapter } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatDividerModule } from '@angular/material/divider';
import { RouterModule } from '@angular/router';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatTableModule } from '@angular/material/table';
import { SystemTableComponents } from './components/system-table/system-table.component';
import { MatSortModule } from '@angular/material/sort';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { SystemInputComponent } from './components/system-input/system-input.component';
import { SystemDialogComponent } from './components/system-dialog/system-dialog.component';

@NgModule({
  declarations: [
    SystemTableComponents,
    SystemInputComponent,
    SystemDialogComponent,
  ],
  imports: [
    CommonModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule, // Import the TranslateModule
    MatMenuModule,
    MatProgressSpinnerModule,
    MatToolbarModule,
    MatSelectModule,
    MatOption,
    MatSnackBarModule,
    MatSidenavModule,
    MatDividerModule,
    RouterModule,
    MatButtonToggleModule,
    MatTableModule,
    MatIconModule,
    MatSortModule,
    MatDialogModule,
    MatDatepickerModule,
  ],
  exports: [
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule, // Import the TranslateModule
    MatMenuModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatOption,
    MatSnackBarModule,
    MatSidenavModule,
    MatDividerModule,
    MatButtonToggleModule,
    MatTableModule,
    MatIconModule,
    MatSortModule,
    SystemTableComponents,
    MatDialogModule,
    MatDatepickerModule,
    MatToolbarModule,
    SystemInputComponent,
    SystemDialogComponent,
  ],
  providers: [provideNativeDateAdapter()],
})
export class SharedModule {}
