import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    { path: '', redirectTo: 'orders', pathMatch: 'full' },
    { path: 'orders', loadChildren: () => import('./order/order.module').then((m) => m.OrderModule), title: 'Orders' },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
