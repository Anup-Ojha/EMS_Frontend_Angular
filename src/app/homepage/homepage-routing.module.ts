import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../auth.guard';
import { ChartsComponent } from './charts/charts.component';
import { HomepageComponent } from './homepage.component';


const routes: Routes = [
  { path: 'home', component: HomepageComponent, canActivate: [AuthGuard]
    , children: [
    {  path: 'profile', loadChildren: () => import('./profile/profile.module').then(m => m.ProfileModule)  },
    {  path: 'organization', loadChildren: () => import('./orgainzation/orgainzation.module').then(m => m.OrgainzationModule)  },
    {  path: 'group', loadChildren: () => import('./group/group.module').then(m => m.GroupModule)  },
    {  path: 'attendance', loadChildren: () => import('./charts/charts.module').then(m => m.ChartsModule)  },
  ]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule { }