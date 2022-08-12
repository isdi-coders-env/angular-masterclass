import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'isdi-bye-world',
  templateUrl: './bye-world.component.html',
  styleUrls: ['./bye-world.component.scss'],
})
export class ByeWorldComponent implements OnInit {
  loaded!: boolean;
  constructor() {}

  ngOnInit(): void {
    this.loaded = false;
  }
}
