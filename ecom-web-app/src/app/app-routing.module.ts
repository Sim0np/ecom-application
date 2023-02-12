import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ProductsComponent} from "./products/products.component";
import {CustomersComponent} from "./customers/customers.component";
import { BillsComponent } from './bills/bills.component';
import {BillDetailsComponent} from "./bill-details/bill-details.component";
import { AuthGuard } from './guards/security.guard';

const routes: Routes = [
  {
    path : "products", component : ProductsComponent
  },
  {
    path : "customers", component : CustomersComponent
  },
  {
    path : "bills/:customerId", component : BillsComponent,
    canActivate : [AuthGuard],
    data : {roles : ['USER']}
  },
  {
    path : "bill-details/:billId", component : BillDetailsComponent,
    canActivate : [AuthGuard],
    data : {roles : ['ADMIN']}
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
