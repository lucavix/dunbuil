import { DeckService } from "../deck.service";
import { DungeonService } from "../dungeon.service";
import { HeroService } from "../hero.service";
import { IDrawable } from "../idrawable";

export abstract class Card {
    abstract name:string;
    abstract description:string;
    onetime:boolean=false;
    range:number=5;
    abstract effect(hero:HeroService, target:any, targetX:number, targetY:number, dungeon: DungeonService, deck: DeckService):void;


    draw(ctx: CanvasRenderingContext2D): void {
        ctx.fillStyle = "#aaa";
        ctx.fillRect(0,0, 70, 120);
        ctx.fillStyle = "#fff";
        ctx.fillRect(5,5,60,110);
        ctx.fillStyle = "#000";
        ctx.font = "8px Arial";
        
        
        ctx.fillText(this.name, 8, 15); 

        ctx.font = "6px Arial";
        var lines = this.getLines(ctx,this.description,60);
        var y = 30;
        lines.forEach(
            (l:string) => {
                ctx.fillText(l, 8, y); 
                y+=10;
            }
        )
    
    }


    getLines(ctx:CanvasRenderingContext2D, text:string, maxWidth:number):string[] {
        var words = text.split(" ");
        var lines:string[] = [];
        var currentLine = words[0];
    
        for (var i = 1; i < words.length; i++) {
            var word = words[i];
            var width = ctx.measureText(currentLine + " " + word).width;
            if (width < maxWidth) {
                currentLine += " " + word;
            } else {
                lines.push(currentLine);
                currentLine = word;
            }
        }
        lines.push(currentLine);
        return lines;
    }
}