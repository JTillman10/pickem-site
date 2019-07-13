import { BehaviorSubject, Observable } from 'rxjs';
import { distinctUntilChanged, pluck } from 'rxjs/operators';
import { Pick } from './app/pick/models/pick.model';
import { JwtResponse } from './app/auth/models/jwt-response.model';

export interface State {
  session: JwtResponse;
  currentWeekPicks: Pick[];
}

const state: State = {
  session: undefined,
  currentWeekPicks: []
};

export class Store {
  private subject = new BehaviorSubject<State>(state);
  private store = this.subject.asObservable().pipe(distinctUntilChanged());

  get value() {
    return this.subject.value;
  }

  select<T>(name: string): Observable<T> {
    return this.store.pipe(pluck(name));
  }

  set(name: string, newValue: any) {
    this.subject.next({ ...this.value, [name]: newValue });
  }
}
