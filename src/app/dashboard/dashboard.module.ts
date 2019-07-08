import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './containers/dashboard/dashboard.component';
import { RouterModule, Routes } from '@angular/router';
import { CoreModule } from '../core/core.module';

const ROUTES: Routes = [
  {
    path: '',
    component: DashboardComponent
  }
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(ROUTES), CoreModule],
  declarations: [DashboardComponent]
})
export class DashboardModule {}
