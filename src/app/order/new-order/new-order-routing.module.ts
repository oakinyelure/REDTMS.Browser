import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewOrderComponent } from './new-order.component';

const routes: Routes = [{ path: '', component: NewOrderComponent, title: 'New Order' }];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class NewOrderRoutingModule {}
