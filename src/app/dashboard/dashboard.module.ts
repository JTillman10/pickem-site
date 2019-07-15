import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './containers/dashboard/dashboard.component';
import { RouterModule, Routes } from '@angular/router';
import { CoreModule } from '../core/core.module';
import { PickModule } from '../pick/pick.module';
import { ReactiveFormsModule } from '@angular/forms';
import { CurrentWeekHeaderComponent } from './components/current-week-header/current-week-header.component';

const ROUTES: Routes = [
  {
    path: '',
    component: DashboardComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(ROUTES),
    CoreModule,
    PickModule
  ],
  declarations: [DashboardComponent, CurrentWeekHeaderComponent]
})
export class DashboardModule {}
