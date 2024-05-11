import { Routes } from '@angular/router';
import { AboutMeFullComponent } from './components/about-me-full/about-me-full.component';
import { HomeComponent } from './components/home/home.component';

export const routes: Routes = [
    // { path: "home", component: AboutMeFullComponent },
    { path: "home", component: HomeComponent },
    { path: "about", component: AboutMeFullComponent }
];
