import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Pick } from '../../models/pick.model';
import { LineWinner } from 'src/app/game/models/line-winner.enum';
import { OverunderWinner } from 'src/app/game/models/overunder-winner.model';

@Component({
  selector: 'pick-summary',
  templateUrl: './pick-summary.component.html',
  styleUrls: ['./pick-summary.component.scss']
})
export class PickSummaryComponent implements OnChanges {
  @Input() picks: Pick[];
  @Input() index: number;

  pick: Pick;

  constructor() {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes.picks) {
      this.pick = changes.picks.currentValue[this.index];
    }
  }

  get pickTeam(): string {
    const { home, away } = this.pick.game;
    if (this.pick.selection === LineWinner.Home) {
      return home;
    } else if (this.pick.selection === LineWinner.Away) {
      return away;
    } else {
      return `${home}/${away}`;
    }
  }

  get selectionIsLineWinner(): boolean {
    return Object.values(LineWinner).includes(this.pick.selection);
  }

  get overUnderWinner(): string {
    const keys = Object.keys(OverunderWinner).filter(
      x => OverunderWinner[x] === this.pick.selection
    );
    return keys.length > 0 ? keys[0] : null;
  }
}
