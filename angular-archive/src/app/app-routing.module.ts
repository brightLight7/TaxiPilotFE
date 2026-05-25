import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { ServicesComponent } from './components/our-services/services.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { RegisterLogin2Component } from './components/register-login-2/register-login-2.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { AdminPageComponent } from './components/admin-page/admin-page.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'registration-login', component: RegisterLogin2Component },
  { path: 'about', component: AboutComponent },
  { path: 'contact', component: ContactUsComponent },
  { path: 'services', component: ServicesComponent },
  { path: 'privacy-policy', component: PrivacyPolicyComponent},
  { path: 'admin-dashboard', component: AdminDashboardComponent},
  { path: 'admin-page', component: AdminPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabledBlocking'
})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
