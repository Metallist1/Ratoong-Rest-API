import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {NgbCalendar, NgbDate, NgbDateParserFormatter} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-summary-calendar',
  templateUrl: './summary-calendar.component.html',
  styleUrls: ['./summary-calendar.component.scss']
})
export class SummaryCalendarComponent {

  hoveredDate: NgbDate | null = null;
  fromDate: NgbDate | null;
  toDate: NgbDate | null;
  @Output() startDate = new EventEmitter<NgbDate>();
  @Output() endDate = new EventEmitter<NgbDate>();

  constructor(private calendar: NgbCalendar, public formatter: NgbDateParserFormatter) {
    this.fromDate = calendar.getToday();
    this.toDate = calendar.getNext(calendar.getToday(), 'd', 10);
  }

  onDateSelection(date: NgbDate): any{
    if (!this.fromDate && !this.toDate) {
      this.fromDate = date;
      this.startDate.emit(date);
    } else if (this.fromDate && !this.toDate && date && date.after(this.fromDate)) {
      this.toDate = date;
      this.endDate.emit(date);
    } else {
      this.toDate = null;
      this.fromDate = date;
      this.endDate.emit(null);
      this.startDate.emit(date);
    }
  }

  isHovered(date: NgbDate): any {
    return this.fromDate && !this.toDate && this.hoveredDate && date.after(this.fromDate) && date.before(this.hoveredDate);
  }

  isInside(date: NgbDate): any {
    return this.toDate && date.after(this.fromDate) && date.before(this.toDate);
  }

  isRange(date: NgbDate): any {
    return date.equals(this.fromDate) || (this.toDate && date.equals(this.toDate)) || this.isInside(date) || this.isHovered(date);
  }

  validateInput(currentValue: NgbDate | null, input: string): NgbDate | null {
    const parsed = this.formatter.parse(input);
    return parsed && this.calendar.isValid(NgbDate.from(parsed)) ? NgbDate.from(parsed) : currentValue;
  }
}
