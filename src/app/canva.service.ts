import { Injectable } from '@angular/core';
import { Card } from './cards/icard';
import { DeckService } from './deck.service';
import { DungeonService } from './dungeon.service';
import { HeroService } from './hero.service';
import { IDrawable } from './idrawable';

@Injectable({
  providedIn: 'root'
})
export class CanvaService {
  private thecanva : HTMLCanvasElement|null=null;
  constructor(
    private hero:HeroService,
    private dungeon:DungeonService,
    private deck:DeckService
  ) { }

  drawables:IDrawable[] = [];
  zoom:number = 1;
  lastZoom:number = 1;
  MAX_ZOOM:number = 5
  MIN_ZOOM:number = 0.1
  SCROLL_SENSITIVITY:number = 0.0005
  w:number = 100;
  h:number = 100;
  cameraX:number = 0;
  cameraY:number = 0;

  isDragging:boolean =  false;

   dragStartX:number = 0;
   dragStartY:number = 0;

  
  onPointerDown(e:MouseEvent) { 
      this.isDragging = true
      
      this.dragStartX = e.clientX - this.cameraX;
      this.dragStartY = e.clientY - this.cameraY;      

  }
  
  onPointerUp(e:MouseEvent)  {
      this.isDragging = false;      
      this.lastZoom = this.zoom;
  }
  
  onPointerMove(e:MouseEvent) {
      if (this.isDragging) {
          this.cameraX = e.clientX - this.dragStartX;
          this.cameraY = e.clientY - this.dragStartY;          
          this.draw();
      }
  }
  

  setCanva(canva:HTMLCanvasElement) {
    this.thecanva = canva;
    this.drawables.push(this.hero);
    this.drawables.push(this.dungeon);
    this.thecanva.addEventListener('mousedown', (e) => this.onPointerDown(e))
    this.thecanva.addEventListener('mouseup', (e) => this.onPointerUp(e))
    this.thecanva.addEventListener('mousemove', (e) => this.onPointerMove(e))
    /*
    this.thecanva.addEventListener('touchstart', (e) => handleTouch(e, onPointerDown))
    this.thecanva.addEventListener('touchend',  (e) => handleTouch(e, onPointerUp))
    
    this.thecanva.addEventListener('touchmove', (e) => handleTouch(e, onPointerMove))
    */
    this.thecanva.addEventListener( 'wheel', (e) => this.adjustZoom(e.deltaY * this.SCROLL_SENSITIVITY,null));
  }



  adjustZoom(zoomAmount:number|null, zoomFactor:number|null) {
      if (!this.isDragging)
      {
          if (zoomAmount) {
              this.zoom += zoomAmount
          } else if (zoomFactor) {
              console.log(zoomFactor)
              this.zoom = zoomFactor*this.lastZoom
          }
          
          this.zoom = Math.min( this.zoom, this.MAX_ZOOM )
          this.zoom = Math.max( this.zoom, this.MIN_ZOOM )        
      }
      this.draw();
  }


  resize() {
    this.w =  document.body.clientWidth - 2;
    var oh = document.getElementById("thenavbar")!.clientHeight;
    this.h =  document.body.clientHeight  - 4 - oh ;
    
    this.thecanva!.width = this.w;
    this.thecanva!.height = this.h;
  }

  draw() {
    this.thecanva!.width = this.thecanva!.width;
    let ctx:CanvasRenderingContext2D = this.thecanva!.getContext('2d')!;
    ctx.clearRect(0,0,this.w,this.h);
    /*
    ctx.fillStyle = "#000000";
    
    */


    ctx.save();
    ctx.translate( this.w / 2 + this.cameraX, this.h / 2 + this.cameraY );
    ctx.scale(this.zoom, -this.zoom);

    this.drawables.sort((a:IDrawable,b:IDrawable) => {return a.z-b.z;});
    this.drawables.forEach(
      (d:IDrawable) => {
        d.draw(ctx)
      }
    )
    ctx.restore();


/*     var cx = this.w * 0.35;
    var a = -0.1;
    var dx = this.w * 0.3 / this.deck.hand.length;
    var da = 0.2 / this.deck.hand.length;
    this.deck.hand.forEach(
      (c:Card) => {
        ctx.save();
        ctx.translate(cx, this.h - 180);
        ctx.rotate(a);
        ctx.scale(2,2);
        c.draw(ctx);
        ctx.restore();
        cx = cx + dx;
        a = a + da;
      }
    );
 */
  }

}
