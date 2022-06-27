import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DeckService } from '../deck.service';
import { DungeonService } from '../dungeon.service';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
    private router:Router,
    private hero:HeroService,
    private dungeon:DungeonService,
    private deck:DeckService
  ) { }

  ngOnInit(): void {
  }

  play() {
    this.hero.reset();
    this.dungeon.reset();
    this.deck.reset();
   this.router.navigate(["/play"]);
  }
}
