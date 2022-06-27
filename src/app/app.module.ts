import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router'

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './home/home.component';
import { CanvasComponent } from './canvas/canvas.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'play', component: CanvasComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
]


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CanvasComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
