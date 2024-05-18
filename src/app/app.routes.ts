import { Routes } from '@angular/router';
import { AboutMeFullComponent } from './components/about-me-full/about-me-full.component';
import { HomeComponent } from './components/home/home.component';
import { ContactComponent } from './components/contact/contact.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { UnderContructionComponent } from './components/under-contruction/under-contruction.component';

export const routes: Routes = [
    // { path: "home", component: AboutMeFullComponent },
    { path: "home", component: HomeComponent },
    { path: "about", component: AboutMeFullComponent },
    { path: "projects", component: UnderContructionComponent },
    { path: "contact", component: UnderContructionComponent }
];
