import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Task } from '../../models/task';

const initialTask = { id: '', title: '' };

@Component({
  selector: 'isdi-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss'],
})
export class AddComponent implements OnInit {
  newTask!: Task;
  @Output() onAdd: EventEmitter<Task>;
  constructor() {
    this.onAdd = new EventEmitter();
  }

  ngOnInit(): void {
    this.newTask = initialTask;
  }

  handleSave() {
    this.onAdd.next({ ...this.newTask });
    this.newTask.title = '';
    this.newTask = initialTask;
  }
}
