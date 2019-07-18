import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Game } from '../models/game.model';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  constructor(private http: HttpClient) {}

  getGamesForCurrentWeek(): Observable<Game[]> {
    return this.http.get<Game[]>('/games/current');
  }
}
