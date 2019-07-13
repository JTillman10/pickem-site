import { LineWinner } from './line-winner.enum';
import { OverunderWinner } from './overunder-winner.model';

export class Game {
  id: number;
  home: string;
  away: string;
  line: number;
  lineWinner: LineWinner;
  overunder: number;
  overunderWinner: OverunderWinner;
  week: number;
  season: number;
  date: Date;
}
