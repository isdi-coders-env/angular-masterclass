import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HelloWorldComponent } from './components/hello-world/hello-world.component';
import { ByeWorldComponent } from './components/bye-world/bye-world.component';
import { CoreModule } from './core/core.module';

@NgModule({
  declarations: [AppComponent, HelloWorldComponent, ByeWorldComponent],
  imports: [BrowserModule, HttpClientModule, AppRoutingModule, CoreModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
