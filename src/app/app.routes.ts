import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { UserPageComponent } from './pages/userpage/userpage.component';
// import { PlantsComponent } from './pages/plants/plants.component';
// import { LogoutComponent } from './pages/logout/logout.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
//   { path: 'plants', component: PlantsComponent },
  { path: 'userpage', component: UserPageComponent },
//   { path: 'logout', component: LogoutComponent },
  { path: '**', redirectTo: 'home' }
];