import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrderComponent } from './order.component';

const routes: Routes = [
    { path: '', component: OrderComponent },
    { path: 'new', loadChildren: () => import('./new-order/new-order.module').then((m) => m.NewOrderModule) },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class OrderRoutingModule {}
