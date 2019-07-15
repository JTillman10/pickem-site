import { Component, OnInit } from '@angular/core';
import { GameService } from '../../../game/services/game.service';
import { Observable } from 'rxjs';
import { Game } from '../../../game/models/game.model';
import { Pick } from '../../../pick/models/pick.model';
import { Store } from 'store';
import { first, tap } from 'rxjs/operators';
import { FormArray, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { LineWinner } from 'src/app/game/models/line-winner.enum';
import { OverunderWinner } from 'src/app/game/models/overunder-winner.model';

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  form: FormGroup = this.fb.group({
    games: this.fb.array([]),
    picks: this.fb.array([])
  });

  season: number;
  week: number;

  constructor(private gameService: GameService, private fb: FormBuilder) {}

  ngOnInit() {
    this.gameService
      .getGamesForCurrentWeek()
      .pipe(
        tap((games: Game[]) => {
          this.season = games[0].season;
          this.week = games[0].week;

          const gamesControl: FormArray = this.form.get('games') as FormArray;
          games.forEach((game: Game) => {
            const disabled = new Date(game.date) < new Date();
            return gamesControl.push(
              this.fb.group({
                id: [game.id],
                home: [game.home],
                away: [game.away],
                line: [game.line],
                lineWinner: [{ value: game.lineWinner, disabled }],
                overunder: [game.overunder],
                overunderWinner: [{ value: game.overunderWinner, disabled }],
                week: [game.week],
                season: [game.season],
                date: [game.date]
              })
            );
          });
        })
      )
      .subscribe();
  }

  get picksArray(): FormArray {
    return this.form.get('picks') as FormArray;
  }

  get gamesArray(): FormArray {
    return this.form.get('games') as FormArray;
  }
}
