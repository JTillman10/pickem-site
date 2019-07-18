import { Component, OnInit } from '@angular/core';
import { GameService } from '../../../game/services/game.service';
import { Game } from '../../../game/models/game.model';
import { tap } from 'rxjs/operators';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { PickService } from '../../../pick/services/pick.service';
import { Pick } from '../../../pick/models/pick.model';
import { AuthService } from 'src/app/auth/services/auth.service';

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

  season = 2019;
  week = 1;

  constructor(
    private gameService: GameService,
    private picksService: PickService,
    private authService: AuthService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.gameService
      .getGamesForCurrentWeek()
      .pipe(
        tap((games: Game[]) => {
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

    this.picksService.getPicksForCurrentWeek(this.authService.userId).subscribe((picks: Pick[]) => {
      picks.forEach((pick: Pick) => {
        this.picksArray.push(this.fb.group(pick));
      });
    });
  }

  get picksArray(): FormArray {
    return this.form.get('picks') as FormArray;
  }

  get gamesArray(): FormArray {
    return this.form.get('games') as FormArray;
  }

  savePicks() {
    if (this.picksArray.valid) {
      this.picksService
        .savePicks(this.authService.userId, this.picksArray.value)
        .subscribe((savedPicks: Pick[]) => {
          this.clearPicks();
          savedPicks.forEach((newPick: Pick) => this.picksArray.push(this.fb.group(newPick)));
        });
    } else {
      console.log('invalid form!');
    }
  }

  clearPicks() {
    while (this.picksArray.length > 0) {
      this.picksArray.removeAt(0);
    }
  }
}
