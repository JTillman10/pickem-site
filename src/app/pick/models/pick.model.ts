import { User } from '../../auth/models/user.model';
import { Game } from '../../game/models/game.model';
import { LineWinner } from '../../game/models/line-winner.enum';
import { OverunderWinner } from '../../game/models/overunder-winner.model';

export class Pick {
  user: User;
  game: Game;
  selection: LineWinner | OverunderWinner;
  win?: boolean;
}
