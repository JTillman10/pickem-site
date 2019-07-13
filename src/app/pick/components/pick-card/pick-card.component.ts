import { Component, Input, OnInit } from '@angular/core';
import { Game } from '../../../game/models/game.model';
import { FormArray, FormGroup, FormControl } from '@angular/forms';
import { Pick } from '../../models/pick.model';
import { LineWinner } from 'src/app/game/models/line-winner.enum';
import { OverunderWinner } from 'src/app/game/models/overunder-winner.model';
import { User } from 'src/app/auth/models/user.model';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'pick-card',
  templateUrl: './pick-card.component.html',
  styleUrls: ['./pick-card.component.scss']
})
export class PickCardComponent implements OnInit {
  @Input() game: FormGroup;
  @Input() form: FormGroup;

  // homeWinner: boolean;
  // awayWinner: boolean;
  // overWinner: boolean;
  // underWinner: boolean;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    // this.game.valueChanges.subscribe(newValue => console.log(newValue));
  }

  get lineWinner() {
    return this.game.get('lineWinner').value;
  }

  get overunderWinner() {
    return this.game.get('overunderWinner').value;
  }

  // selectHome(value: boolean) {
  //   const awayPickIndex: number = this.getPickIndex(LineWinner.Away);
  //   if (awayPickIndex >= 0) {
  //     this.picks.removeAt(awayPickIndex);
  //     this.awayWinner = false;
  //   }

  //   const pick: Pick = this.createPick(LineWinner.Home);
  //   this.picks.push(new FormControl(pick));
  // }

  // selectAway(value: boolean) {
  //   const homePickIndex: number = this.getPickIndex(LineWinner.Home);
  //   if (homePickIndex >= 0) {
  //     this.picks.removeAt(homePickIndex);
  //     this.homeWinner = false;
  //   }

  //   const pick: Pick = this.createPick(LineWinner.Away);
  //   this.picks.push(new FormControl(pick));
  // }

  // selectOver() {
  //   const underPickIndex: number = this.getPickIndex(OverunderWinner.Under);
  //   if (underPickIndex >= 0) {
  //     this.picks.removeAt(underPickIndex);
  //     this.underWinner = false;
  //   }

  //   const pick: Pick = this.createPick(OverunderWinner.Over);
  //   this.picks.push(new FormControl(pick));
  // }

  // selectUnder() {
  //   const overPickIndex: number = this.getPickIndex(OverunderWinner.Over);
  //   if (overPickIndex >= 0) {
  //     this.picks.removeAt(overPickIndex);
  //     this.overWinner = false;
  //   }

  //   const pick: Pick = this.createPick(OverunderWinner.Under);
  //   this.picks.push(new FormControl(pick));
  // }

  // get picks() {
  //   return this.form.get('picks') as FormArray;
  // }

  // getPickIndex(selection: LineWinner | OverunderWinner): number {
  //   return (this.picks.value as Array<Pick>).findIndex(pick => pick.selection === selection);
  // }

  // createPick(selection: LineWinner | OverunderWinner): Pick {
  //   return {
  //     game: this.game,
  //     user: {
  //       id: this.authService.userId
  //     },
  //     selection
  //   };
  // }
}
