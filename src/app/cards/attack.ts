import { DeckService } from "../deck.service";
import { DungeonService } from "../dungeon.service";
import { HeroService } from "../hero.service";
import { Card } from "./icard";

export class Attack extends Card {
    name = "Attack";
    description ="Infligge 1 danno in raggio 1";
    
    effect(
        hero:HeroService, target:any, targetX:number, targetY:number, dungeon: DungeonService, deck: DeckService
    ) {
        if (target.hitpoints) {
            target.hitpoints--;            
        }
    }
}