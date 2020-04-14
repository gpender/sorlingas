import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PersonnelComponent } from './personnel/personnel.component';
import { EncComponent } from './enc/enc.component';
import { OtherproductsComponent } from './otherproducts/otherproducts.component';
import { LoginComponent } from './login/login.component';
import { ContactusComponent } from './contactus/contactus.component';


const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'personnel', component: PersonnelComponent },
  { path: 'enc', component: EncComponent },
  { path: 'otherproducts', component: OtherproductsComponent },
  { path: 'contact', component: ContactusComponent },
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
