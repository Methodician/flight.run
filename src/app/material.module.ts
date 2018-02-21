// Angular Material components

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
    imports: [MatFormFieldModule, MatInputModule, MatCardModule, MatButtonModule],
    exports: [MatFormFieldModule, MatInputModule, MatCardModule, MatButtonModule],
})

export class MaterialModule {}