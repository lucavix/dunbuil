import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CanvaService } from './canva.service';
import { IDrawable } from './idrawable';

@Injectable({
  providedIn: 'root'
})
export class HeroService extends IDrawable {

  constructor(
  ) { 
    super();
    var c:any = localStorage.getItem("hero");
    if(c) {
      this.heroState = JSON.parse(c);
    }    
  }

  heroState = {
    hispoints : environment.hitpoints,
    score: 0,
    x: 0,
    y: 0,
  }
  
  saveState() {
    localStorage.setItem("hero",JSON.stringify(this.heroState));  
  }
  
  reset() {
    this.heroState.hispoints=environment.hitpoints;
    this.heroState.score=0;
    this.heroState.x=0
    this.heroState.y=0;
    this.saveState();
  }

  draw(ctx:CanvasRenderingContext2D): void {
    ctx.fillStyle = '#3a3';
    ctx.beginPath();
    ctx.moveTo(this.heroState.x + 50, this.heroState.y + 90);
    ctx.lineTo(this.heroState.x + 10, this.heroState.y + 10);
    ctx.lineTo(this.heroState.x + 90, this.heroState.y + 10);
    ctx.moveTo(this.heroState.x + 50, this.heroState.y + 40);
    ctx.closePath();
    ctx.fill();
  }

  isIn(x: number, y: number): boolean {
    return false;
  }

}
