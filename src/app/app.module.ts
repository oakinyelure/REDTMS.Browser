import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar';

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        BrowserAnimationsModule,
        MatDividerModule,
        MatIconModule,
    ],
    providers: [
        { provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: { hasBackdrop: false } },
        {
            provide: MAT_SNACK_BAR_DEFAULT_OPTIONS,
            useValue: { duration: 4500, panelClass: 'primary', horizontalPosition: 'right', verticalPosition: 'top' },
        },
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
