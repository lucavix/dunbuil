import { Injectable } from '@angular/core';
import { IDrawable } from './idrawable';
import { Room } from './room';
import { StdRoom } from './stdroom';

@Injectable({
  providedIn: 'root'
})
export class DungeonService extends IDrawable  {
  rooms:Room[] = [];

  constructor() {
    super();
    var r = localStorage.getItem("rooms");
    if (r) {
      this.rooms=[];
      var rs:Room[] = JSON.parse(r);
      rs.forEach(
        (r) => {
          console.log("Loading " + r);
          if (r.roomType === "StdRoom") { 
            console.log("Room");
            var a:StdRoom = new StdRoom(); 
            Object.assign(a,r); 
            this.rooms.push(a)
          }
        }
      )
      console.log("Dungeon loaded");
    }
  }


  saveState() {
    localStorage.setItem("rooms",JSON.stringify(this.rooms));    
  }

  reset() {
    this.rooms = [];
    var w=100 + Math.floor(Math.random() * 10)*100; 
    var h=100 + Math.floor(Math.random() * 10)*100; 
    var stdRoom:StdRoom = new StdRoom();
    stdRoom.minx = -w;
    stdRoom.maxx = w;
    stdRoom.maxy = h;
    stdRoom.miny = -h;

    this.rooms.push(stdRoom);
    this.saveState();
  }

  draw(ctx: CanvasRenderingContext2D): void {
    this.rooms.forEach( (r:Room) => {r.draw(ctx)})        
  }

  isIn(x: number, y: number): boolean {
    return true;
  }
}
