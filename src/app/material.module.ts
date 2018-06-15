// Angular Material components

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MAT_LABEL_GLOBAL_OPTIONS } from '@angular/material/core';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select'
import { MatTableModule } from '@angular/material';
import { MatSortModule } from '@angular/material/sort';
import {CdkTableModule} from '@angular/cdk/table';

@NgModule({
    imports: [
      MatFormFieldModule,
      MatInputModule,
      MatCardModule,
      MatButtonModule,
      MatListModule,
      MatRadioModule,
      MatSelectModule,
      MatTableModule,
      MatSortModule
    ],
    exports: [
      MatFormFieldModule,
      MatInputModule,
      MatCardModule,
      MatButtonModule,
      MatListModule,
      MatRadioModule,
      MatSelectModule,
      MatTableModule,
      MatSortModule
    ],
    providers: [
        {provide: MAT_LABEL_GLOBAL_OPTIONS, useValue: {float: 'never'}}
    ]
})

export class MaterialModule {}
