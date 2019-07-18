import { Component } from '@angular/core';
import { ToastService } from './core/services/toast.service';

@Component({
  selector: 'root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  toastNumber = 0;

  constructor(private toastService: ToastService) {}

  createToast() {
    this.toastNumber += 1;
    this.toastService.sendMessage(`New Toast - ${this.toastNumber}`, 'success');
  }
}
