// Angular Material components

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MAT_LABEL_GLOBAL_OPTIONS } from '@angular/material/core';

@NgModule({
    imports: [MatFormFieldModule, MatInputModule, MatCardModule, MatButtonModule],
    exports: [MatFormFieldModule, MatInputModule, MatCardModule, MatButtonModule],
    providers: [
        {provide: MAT_LABEL_GLOBAL_OPTIONS, useValue: {float: 'never'}} 

    ]
})

export class MaterialModule {}