import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './landing/landing.component';
import { OrderComponent } from './order/order.component'; // Assuming you have an order component
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ConfirmationGuard} from './confirmation.guard';
import { DairyProductsRequestsComponent } from './dairy-products-requests/dairy-products-requests.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './services/auth.guard';


const routes: Routes = [
  { path: '', component: LandingComponent }, // Default route
  { path: 'order/:id', component: OrderComponent, canDeactivate: [ConfirmationGuard]  }, // Route for order view
  { path: 'login', component: LoginComponent },
  { path: 'dairy-products-requests', component: DairyProductsRequestsComponent, canActivate: [AuthGuard]},
  { path: '', redirectTo: '/landing', pathMatch: 'full' }, // Redirect to landing component on root path
  { path: '**', component: PageNotFoundComponent }
  // Define more routes as needed
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [ConfirmationGuard]
})
export class AppRoutingModule { }
