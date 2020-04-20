
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { PagesComponent } from './pages/pages.component';
import { TraceabilityComponent } from './Pages/traceability/traceability.component';
import { TemperatureComponent } from './pages/temperature/temperature.component';
import { PhotoComponent } from './pages/photo/photo.component';

const routes: Routes = [
  {
    path: '',
        component: PagesComponent, children: [

    {
      path: '',
      component: HomeComponent, pathMatch: 'full'
    },
    {
      path: 'home',
      component: HomeComponent, pathMatch: 'full'
    },
    {
      path: 'traceability',
      component: TraceabilityComponent, pathMatch: 'full'
    },
    {
      path: 'temperature',
      component: TemperatureComponent, pathMatch: 'full'
    },
    {
      path: 'photo',
      component: PhotoComponent, pathMatch: 'full'
    }

  ]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
