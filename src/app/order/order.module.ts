import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrderRoutingModule } from './order-routing.module';
import { OrderComponent } from './order.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
    declarations: [OrderComponent],
    imports: [
        CommonModule,
        OrderRoutingModule,
        MatFormFieldModule,
        MatIconModule,
        MatButtonModule,
        MatSelectModule,
        MatTableModule,
        MatCheckboxModule,
        FormsModule,
        MatSnackBarModule,
    ],
})
export class OrderModule {}
