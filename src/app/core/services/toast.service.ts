import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { take } from 'rxjs/operators';

export class Message {
  content: string;
  style: string;
  dismissed = false;
  id: number;

  constructor(content, style = 'info', id) {
    this.content = content;
    this.style = style;
    this.id = id;
  }
}

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  toasts$: BehaviorSubject<Message[]> = new BehaviorSubject<Message[]>([]);
  currentId = 0;

  constructor() {}

  getMessages(): Observable<Message[]> {
    return this.toasts$.asObservable();
  }

  sendMessage(content, style, duration = 4000) {
    const messageId = this.currentId;
    this.currentId += 1;
    const newMessage: Message = new Message(content, style, messageId);
    this.toasts$.pipe(take(1)).subscribe((currentMessages: Message[]) => {
      currentMessages.push(newMessage);
      this.toasts$.next(currentMessages);
    });

    setTimeout(() => {
      this.destroyMessage(messageId);
    }, duration);
  }

  destroyMessage(id: number) {
    this.toasts$.pipe(take(1)).subscribe((currentMessages: Message[]) => {
      currentMessages[id].dismissed = true;
      this.toasts$.next(currentMessages);
    });
  }
}
