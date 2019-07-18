import { Component, OnInit } from '@angular/core';
import { ToastService, Message } from '../../services/toast.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'toasts',
  templateUrl: './toasts.component.html',
  styleUrls: ['./toasts.component.scss'],
  animations: [
    trigger('fadeInOut', [
      state(
        'void',
        style({
          opacity: 0
        })
      ),
      transition('void <=> *', animate('2s'))
    ])
  ]
})
export class ToastsComponent implements OnInit {
  messages$: Observable<Message[]>;

  constructor(private toastService: ToastService) {}

  ngOnInit() {
    this.messages$ = this.toastService
      .getMessages()
      .pipe(
        map((messages: Message[]) => messages.filter((message: Message) => !message.dismissed))
      );
  }

  removeMessage(id: number) {
    this.toastService.destroyMessage(id);
  }
}
