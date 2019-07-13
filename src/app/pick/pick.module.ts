import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PickCardComponent } from './components/pick-card/pick-card.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [PickCardComponent],
  imports: [CommonModule, ReactiveFormsModule],
  exports: [PickCardComponent]
})
export class PickModule {}
