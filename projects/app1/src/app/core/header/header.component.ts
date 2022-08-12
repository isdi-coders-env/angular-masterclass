import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'isdi-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  title!: string;
  isHidden!: boolean;
  constructor() {}

  ngOnInit(): void {
    this.title = 'Learning Angular';
    this.isHidden = false;
  }
}
