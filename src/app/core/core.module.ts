import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { LinePipe } from './pipes/line.pipe';

@NgModule({
  imports: [CommonModule, FontAwesomeModule],
  declarations: [NavbarComponent, SidebarComponent, LinePipe],
  exports: [NavbarComponent, SidebarComponent, LinePipe]
})
export class CoreModule {}
