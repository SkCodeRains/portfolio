import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AboutMeFullComponent } from './components/about-me-full/about-me-full.component';

export const routes: Routes = [ 
    { path: "home", component: HomeComponent },
    { path: "about", component: AboutMeFullComponent }
];
