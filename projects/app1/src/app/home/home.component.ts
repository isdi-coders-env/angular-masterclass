import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'isdi-home',
  template: `
    <p>home works!</p>
    <isdi-users1></isdi-users1>
  `,
  styles: [],
})
export class HomeComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
