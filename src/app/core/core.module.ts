import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { LinePipe } from './pipes/line.pipe';
import { ToastsComponent } from './components/toasts/toasts.component';

@NgModule({
  imports: [CommonModule, FontAwesomeModule],
  declarations: [NavbarComponent, SidebarComponent, LinePipe, ToastsComponent],
  exports: [NavbarComponent, SidebarComponent, LinePipe, ToastsComponent]
})
export class CoreModule {}
