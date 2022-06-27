export abstract class IDrawable {
    x:number=0;
    y:number=0;
    minx:number=0;
    maxx:number=0;
    miny:number=0;
    maxy:number=0;
    z:number=0;
    abstract draw(ctx:CanvasRenderingContext2D):void;
    abstract isIn(x:number,y:number):boolean;
}