import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pick } from '../models/pick.model';
import { HttpClient } from '@angular/common/http';
import { LineWinner } from '../../game/models/line-winner.enum';
import { OverunderWinner } from '../../game/models/overunder-winner.model';

@Injectable({
  providedIn: 'root'
})
export class PickService {
  constructor(private http: HttpClient) {}

  getPicksForCurrentWeek(userId: number): Observable<Pick[]> {
    return this.http.get<Pick[]>(`users/${userId}/picks`, {
      params: {
        current: 'true'
      }
    });
  }

  savePicks(userId: number, newPicks: Pick[]): Observable<Pick[]> {
    return this.http.post<Pick[]>(`users/${userId}/picks`, newPicks);
  }

  selectionIsLineWinner(selection: LineWinner | OverunderWinner) {
    return Object.values(LineWinner).includes(selection);
  }

  selectionIsOverunderWinner(selection: LineWinner | OverunderWinner) {
    return Object.values(OverunderWinner).includes(selection);
  }
}
