import {Component, Directive, EventEmitter, Input, OnInit, Output, QueryList, ViewChildren} from '@angular/core';
import {Select} from '@ngxs/store';
import {Observable} from 'rxjs';
import {ResortsState} from '../../../shared/states/resorts/resorts.state';
import {Question} from '../../../shared/states/resorts/entities/question';

export type SortColumn = keyof Location | '';
export type SortDirection = 'asc' | 'desc' | '';
const rotate: {[key: string]: SortDirection} = { asc: 'desc', desc: '', '': 'asc' };

const compare = (v1: string | number, v2: string | number) => v1 < v2 ? -1 : v1 > v2 ? 1 : 0;

export interface SortEvent {
  column: SortColumn;
  direction: SortDirection;
}

@Directive({
  selector: 'th[sortable]',
  host: {
    '[class.asc]': 'direction === "asc"',
    '[class.desc]': 'direction === "desc"',
    '(click)': 'rotate()'
  }
})
export class NgbdSortableHeader {

  @Input() sortable: SortColumn = '';
  @Input() direction: SortDirection = '';
  @Output() sort = new EventEmitter<SortEvent>();

  rotate(): any {
    this.direction = rotate[this.direction];
    this.sort.emit({column: this.sortable, direction: this.direction});
  }
}

@Component({
  selector: 'app-summary-rating-table',
  templateUrl: './summary-rating-table.component.html',
  styleUrls: ['./summary-rating-table.component.scss']
})
export class SummaryRatingTableComponent implements OnInit {

  @Input() ratings: Array<object>;
  totalQuestionList: Question[];
  currentQuestionList: Question[];

  @ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader>;
  @Select(ResortsState.questionList) questions: Observable<Question[]>;
  questionList: Question[];
  constructor() {
  }

  ngOnInit(): any{
    this.questions.subscribe( (data) => {
      const newData = data.map((item) => {
        let totalCount = 0;
        let average = '0';

        for (let i = 0; i <  this.ratings.length; i++) {
          if ( Number(this.ratings[i][0]) === Number(item.id)) {
            totalCount = Number(this.ratings[i][1].totalCount);
            average = (Math.round((this.ratings[i][1].totalScore / this.ratings[i][1].totalCount) * 100) / 100).toFixed(2);
            break;
          }
        }

        return { id: item.id, name: item.name, totalCount, average } as Question;
      });
      this.totalQuestionList = newData;
      this.currentQuestionList = newData;

    });
  }

  onSort({column, direction}: SortEvent): any {

    // resetting other headers
    this.headers.forEach(header => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });

    // sorting countries
    if (direction === '' || column === '') {
      this.currentQuestionList = this.totalQuestionList;
    } else {
      this.currentQuestionList = [...this.totalQuestionList].sort((a, b) => {
        const res = compare(a[column], b[column]);
        return direction === 'asc' ? res : -res;
      });
    }
  }
}
