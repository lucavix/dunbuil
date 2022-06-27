import { DeckService } from "../deck.service";
import { DungeonService } from "../dungeon.service";
import { HeroService } from "../hero.service";
import { Card } from "./icard";

export class Move extends Card {
    name = "Move";
    description ="Muoviti di 5 passi";
    
    effect(
        hero:HeroService, target:any, targetX:number, targetY:number, dungeon: DungeonService, deck: DeckService
    ) {
        hero.x = targetX;
        hero.y = targetY;
    }
}