import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Pick } from '../../../pick/models/pick.model';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'current-week-header',
  templateUrl: './current-week-header.component.html',
  styleUrls: ['./current-week-header.component.scss']
})
export class CurrentWeekHeaderComponent implements OnInit {
  @Input() form: FormGroup;
  @Input() season: number;
  @Input() week: number;

  picks$: BehaviorSubject<Pick[]> = new BehaviorSubject<Pick[]>([]);

  constructor() {}

  ngOnInit() {
    this.form.get('picks').valueChanges.subscribe((newPicks: Pick[]) => {
      this.picks$.next(newPicks);
    });
  }
}
