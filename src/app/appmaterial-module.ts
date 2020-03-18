import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatInputModule} from '@angular/material/input';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatSortModule} from '@angular/material/sort';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSelectModule} from '@angular/material/select';
import {MatRadioModule} from '@angular/material/radio';
import {MatDialogModule} from "@angular/material";
import {MatDividerModule} from '@angular/material/divider';
import {MatStepperModule} from '@angular/material/stepper';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatTabsModule} from '@angular/material/tabs';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatCardModule} from '@angular/material/card';
import {MatChipsModule} from '@angular/material/chips';
import {MatButtonModule, MatSnackBarModule, MatNativeDateModule,
MatIconModule, MatSidenavModule, MatListModule, MatToolbarModule} from '@angular/material';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {DragDropModule} from '@angular/cdk/drag-drop';
  const MaterialComponents = [
    CommonModule,
    MatButtonModule,
    MatToolbarModule,
    MatNativeDateModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatInputModule,
    MatAutocompleteModule,
    MatSortModule,
    MatTableModule,
    MatPaginatorModule,
    MatSelectModule,
    MatRadioModule,
    MatSnackBarModule,
    MatDialogModule,
    MatDividerModule,
    MatStepperModule,
    MatDatepickerModule,
    MatSlideToggleModule,
    MatTabsModule,
    MatGridListModule,
    MatTooltipModule,
    MatExpansionModule,
    MatCardModule,
    MatChipsModule,
    MatCheckboxModule,
    DragDropModule
  ];
@NgModule({
  imports: [MaterialComponents],
  exports: [MaterialComponents],
})
export class CustomMaterialModule { }