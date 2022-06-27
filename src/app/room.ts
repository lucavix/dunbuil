import { IDrawable } from "./idrawable";

export abstract class Room extends IDrawable {

    override z=-100;
    abstract roomType:string;
    
    draw(ctx: CanvasRenderingContext2D): void {
        console.log("Draw room")
        ctx.beginPath();

        ctx.save();
        ctx.lineWidth = 1;
        ctx.fillStyle = '#aaa';
        ctx.setLineDash([5, 15]);
        for(var x:number = this.minx;x<=this.maxx;x+=100) {
            ctx.moveTo(x, this.miny);
            ctx.lineTo(x,this.maxy);
            ctx.stroke(); 
        }           
        for(var y:number = this.miny;y<=this.maxy;y+=100) {
            ctx.moveTo(this.minx, y);
            ctx.lineTo(this.maxx, y);
            ctx.stroke(); 
        }           
        ctx.lineWidth = 5;
        ctx.fillStyle = '#aa2222';
        ctx.setLineDash([]);
        ctx.beginPath();
        ctx.moveTo(this.minx, this.miny);
        ctx.lineTo(this.minx, this.maxy);
        ctx.lineTo(this.maxx, this.maxy);
        ctx.lineTo(this.maxx, this.miny);
        ctx.lineTo(this.minx, this.miny);
        ctx.closePath();
        ctx.stroke(); 

        ctx.restore();
    }
}