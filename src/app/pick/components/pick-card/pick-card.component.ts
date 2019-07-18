import { Component, Input, OnInit } from '@angular/core';
import { Game } from '../../../game/models/game.model';
import { FormArray, FormGroup, FormBuilder, AbstractControl } from '@angular/forms';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import { Pick } from '../../models/pick.model';
import { LineWinner } from 'src/app/game/models/line-winner.enum';
import { OverunderWinner } from 'src/app/game/models/overunder-winner.model';
import { AuthService } from 'src/app/auth/services/auth.service';
import { PickService } from '../../services/pick.service';

@Component({
  selector: 'pick-card',
  templateUrl: './pick-card.component.html',
  styleUrls: ['./pick-card.component.scss']
})
export class PickCardComponent implements OnInit {
  @Input() game: FormGroup;
  @Input() form: FormGroup;

  faLock = faLock;

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private pickService: PickService
  ) {}

  ngOnInit() {
    this.game.valueChanges.subscribe((newValue: Game) => {
      const currentPicksWithSameGame: Pick[] = (this.picks.value as Pick[]).filter(
        (pick: Pick) => pick.game.id === newValue.id
      );

      // Both line and o/u already picked
      if (currentPicksWithSameGame.length === 2) {
        (this.picks.value as Pick[]).forEach((pick: Pick, index: number) => {
          if (pick.game.id === newValue.id) {
            const selection = pick.selection;
            if (
              this.pickService.selectionIsLineWinner(selection) &&
              newValue.lineWinner !== selection
            ) {
              this.picksArray.at(index).patchValue(this.createPick(newValue, newValue.lineWinner));
            } else if (
              this.pickService.selectionIsOverunderWinner(selection) &&
              newValue.overunderWinner !== selection
            ) {
              this.picksArray
                .at(index)
                .patchValue(this.createPick(newValue, newValue.overunderWinner));
            }
          }
        });
        // one of o/u or line picked
      } else if (currentPicksWithSameGame.length === 1) {
        const pickIndex = (this.picks.value as Pick[]).findIndex(
          (pick: Pick) => pick.game.id === newValue.id
        );
        const selection = this.picksArray.at(pickIndex).get('selection').value;
        if (
          this.pickService.selectionIsLineWinner(selection) &&
          newValue.lineWinner !== selection
        ) {
          this.picksArray.at(pickIndex).patchValue(this.createPick(newValue, newValue.lineWinner));
        } else if (
          this.pickService.selectionIsOverunderWinner(selection) &&
          newValue.overunderWinner !== selection
        ) {
          this.picksArray
            .at(pickIndex)
            .patchValue(this.createPick(newValue, newValue.overunderWinner));
        } else {
          if (newValue.lineWinner && this.pickService.selectionIsOverunderWinner(selection)) {
            this.pushPick(newValue, newValue.lineWinner);
          }
          if (newValue.overunderWinner && this.pickService.selectionIsLineWinner(selection)) {
            this.pushPick(newValue, newValue.overunderWinner);
          }
        }
        // game not picked yet
      } else {
        if (newValue.lineWinner) {
          this.pushPick(newValue, newValue.lineWinner);
        }
        if (newValue.overunderWinner) {
          this.pushPick(newValue, newValue.overunderWinner);
        }
      }
    });

    this.form.get('picks').valueChanges.subscribe((newValue: Pick[]) => {
      if (newValue.length === 0) {
        this.game.get('lineWinner').setValue(null);
        this.game.get('overunderWinner').setValue(null);
      }

      newValue.forEach((pick: Pick) => {
        const { game, selection } = pick;
        if (game.id === this.game.get('id').value) {
          if (this.pickService.selectionIsLineWinner(selection)) {
            this.game.get('lineWinner').setValue(selection);
          }

          if (this.pickService.selectionIsOverunderWinner(selection)) {
            this.game.get('overunderWinner').setValue(selection);
          }
        }
      });
    });
  }
  pushPick(game: Game, selection: LineWinner | OverunderWinner) {
    if (this.picksArray.length > 3) {
      const firstPick: Pick = this.picksArray.at(0).value;
      const firstGame: AbstractControl = (this.form.get('games') as FormArray).at(0);
      this.picksArray.removeAt(0);
      if (Object.values(LineWinner).includes(firstPick.selection)) {
        firstGame.get('lineWinner').setValue(null);
      }

      if (Object.values(OverunderWinner).includes(firstPick.selection)) {
        firstGame.get('overunderWinner').setValue(null);
      }
    }
    this.picksArray.push(this.fb.group(this.createPick(game, selection)));
  }

  // createPick(game: Game, selection: LineWinner | OverunderWinner): FormControl {
  createPick(game: Game, selection: LineWinner | OverunderWinner): Pick {
    return {
      game: Object.assign({}, game, { lineWinner: null, overunderWinner: null }),
      selection,
      user: { id: this.authService.userId },
      win: null
    };
  }

  get lineWinner(): LineWinner {
    return this.game.get('lineWinner').value;
  }

  get overunderWinner(): OverunderWinner {
    return this.game.get('overunderWinner').value;
  }

  get picks(): AbstractControl {
    return this.form.get('picks');
  }

  get picksArray(): FormArray {
    return this.form.get('picks') as FormArray;
  }

  get locked(): boolean {
    return this.game.get('lineWinner').disabled;
  }
}
