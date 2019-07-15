import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { PickCardComponent } from './components/pick-card/pick-card.component';
import { PickSummaryComponent } from './components/pick-summary/pick-summary.component';
import { CoreModule } from '../core/core.module';

@NgModule({
  declarations: [PickCardComponent, PickSummaryComponent],
  imports: [CommonModule, ReactiveFormsModule, CoreModule, FontAwesomeModule],
  exports: [PickCardComponent, PickSummaryComponent]
})
export class PickModule {}
