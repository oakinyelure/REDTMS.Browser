import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NewOrderRoutingModule } from './new-order-routing.module';
import { NewOrderComponent } from './new-order.component';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
    declarations: [NewOrderComponent],
    imports: [
        CommonModule,
        NewOrderRoutingModule,
        MatInputModule,
        ReactiveFormsModule,
        MatSelectModule,
        MatButtonModule,
        MatSnackBarModule,
    ],
})
export class NewOrderModule {}
