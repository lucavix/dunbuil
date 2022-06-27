import { AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { CanvaService } from '../canva.service';
import { DeckService } from '../deck.service';

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.css']
})
export class CanvasComponent implements OnInit, AfterViewInit {


  @ViewChild('thecanva') thecanva: ElementRef<HTMLCanvasElement>|null=null;

  constructor(
    private canvaService:CanvaService,
    private deck:DeckService
  ) {

  }

  ngOnInit( ): void {
  }

  
  ngAfterViewInit(): void {
    var c:HTMLCanvasElement = this.thecanva!.nativeElement;
    this.canvaService.setCanva(c);
    this.canvaService.resize();
    this.canvaService.draw();
    
  }

  @HostListener('window:resize', ['$event'])
  onResize(event:any) {
    this.canvaService.resize();
    this.canvaService.draw();
  }

  get hand() {
    return this.deck.hand;
  }

}
