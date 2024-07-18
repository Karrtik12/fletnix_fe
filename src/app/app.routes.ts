import { Routes } from '@angular/router';
import { HomeComponent } from './Pages/home/home.component';
import { TitleDetailsComponent } from './Pages/title-details/title-details.component';
import { SearchResultsComponent } from './Pages/search-results/search-results.component';
import { LoginComponent } from './Pages/login/login.component';
import { RegisterComponent } from './Pages/register/register.component';

export const routes: Routes = [
    {
        path:'',
        redirectTo:'home',
        pathMatch:'full'
    },{
        path:'home',
        component: HomeComponent
    },{
        path: 'title/:id',
        component: TitleDetailsComponent
    },{
        path: 'search',
        component: SearchResultsComponent
    },{
        path: 'login',
        component: LoginComponent
    },{
        path: 'register',
        component: RegisterComponent
    }
];
