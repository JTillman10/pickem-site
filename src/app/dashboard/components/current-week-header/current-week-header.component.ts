import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
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

  @Output() save: EventEmitter<any> = new EventEmitter<any>();
  @Output() clear: EventEmitter<any> = new EventEmitter<any>();

  picks$: BehaviorSubject<Pick[]> = new BehaviorSubject<Pick[]>([]);

  constructor() {}

  ngOnInit() {
    this.form.get('picks').valueChanges.subscribe((newPicks: Pick[]) => {
      this.picks$.next(newPicks);
    });
  }

  onClear() {
    this.clear.emit();
  }

  onSave() {
    this.save.emit();
  }
}
