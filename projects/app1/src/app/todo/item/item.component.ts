import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Task } from '../../models/task';

@Component({
  selector: 'isdi-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss'],
})
export class ItemComponent implements OnInit {
  @Input() task!: Task;
  @Output() onDelete: EventEmitter<Task>;

  constructor() {
    this.onDelete = new EventEmitter();
  }

  ngOnInit(): void {}

  handleDelete() {
    this.onDelete.next(this.task);
  }
}
