import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { Users1Component } from './users1/users1.component';

@NgModule({
  declarations: [HomeComponent, Users1Component],
  imports: [CommonModule, HomeRoutingModule],
})
export class HomeModule {}
