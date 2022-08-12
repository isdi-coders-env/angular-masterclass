import { Component, OnInit } from '@angular/core';
import { Task } from '../../models/task';

@Component({
  selector: 'isdi-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  tasks!: Array<Task>;

  constructor() {}

  ngOnInit(): void {
    this.tasks = [
      { id: '1', title: 'Task 1' },
      { id: '2', title: 'Task 2' },
    ];
  }

  handleAdd(task: Task) {
    task.id = String(+(this.tasks.at(-1)?.id as string) + 1);
    this.tasks = [...this.tasks, task];
  }

  handleDelete(task: Task) {
    this.tasks = this.tasks.filter((item) => item.id !== task.id);
  }
}
