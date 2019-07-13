import { Component, OnInit } from '@angular/core';
import { GameService } from '../../../game/services/game.service';
import { Observable } from 'rxjs';
import { Game } from '../../../game/models/game.model';
import { Pick } from '../../../pick/models/pick.model';
import { Store } from 'store';
import { first, tap } from 'rxjs/operators';
import { FormArray, FormBuilder, FormGroup, FormControl } from '@angular/forms';

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

  constructor(private gameService: GameService, private fb: FormBuilder) {}

  ngOnInit() {
    // this.form.get('picks').valueChanges.subscribe(newValue => {
    //   console.log(newValue);
    // });
    this.gameService
      .getGamesForCurrentWeek()
      .pipe(
        tap((games: Game[]) => {
          const gamesControl: FormArray = this.form.get('games') as FormArray;
          games.forEach((game: Game) =>
            gamesControl.push(
              this.fb.group({
                id: [game.id],
                home: [game.home],
                away: [game.away],
                line: [game.line],
                lineWinner: [game.lineWinner],
                overunder: [game.overunder],
                overunderWinner: [game.overunderWinner],
                week: [game.week],
                season: [game.season],
                date: [game.date]
              })
            )
          );
        })
      )
      .subscribe();

    this.form.get('games').valueChanges.subscribe(newValue => {
      console.log(newValue);
    });
  }
}
