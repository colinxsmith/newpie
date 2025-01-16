import { Component, Input, ElementRef, OnInit, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as d3 from 'd3';
@Component({
  selector: 'app-histogram',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './histogram.component.html',
  styleUrl: './histogram.component.scss'
})
export class HistogramComponent implements OnInit {
  constructor(private element: ElementRef) { }
  @Input() DATA = {};
  boxsizeV = 900;
  boxsizeH = 900;
  rim = 10;
  scaleX = d3.scaleLinear();
  scaleY = d3.scaleLinear();
  heightToWidth = 0.35;
  title = 'Response Histogram';
  staticPosition = { x: '2.5%', y: '5%' };
  squareBorderOpacity = 1;
  ngOnInit(): void {
    console.log(this.DATA)
    setTimeout(() => {
      d3.select(this.element.nativeElement).select('#histo')
        .style('--xx', `${this.staticPosition.x}px`)
        .style('--yy', `${this.staticPosition.y}px`)
        .style('--trans', 'translate(-10%,0%) rotate(10deg)')
        ;
      this.newDimensions();
    }, 0);
  }
  divover(s: MouseEvent, newtitle = '', inside = false) {
    const blackTip=d3.select(this.element.nativeElement).select('div.mainTip');
    const here=d3.select(s.target as HTMLElement&EventTarget);
    const area = d3.select(this.element.nativeElement).select('#histo');
    const x = s.offsetX;
    const y = s.offsetY;
    const xp=s.pageX;
    const yp=s.pageY;
    const x1 = this.staticPosition.x;
    const y1 = this.staticPosition.y;
    const text1 = newtitle==''?this.title:newtitle;
    console.log(x,y,xp,yp,xp-x,yp-y)
    setTimeout(() => {
      console.log('====================');
      if (inside) {
        here.style('opacity',0.5);
        blackTip
        .style('left',`${xp}px`)
        .style('top',`${yp}px`)
        .style('--accent-colour','black')
        .style('opacity',1)
        .html(`offset: (${x} ${y}) and page: (${xp} ${yp}). Difference: (${xp-x} ${yp-y})`)
        ;
        area
          .style('--xx', `${x}px`)
          .style('--yy', `${y}px`)
          .style('--trans', 'translate(-50%,0%) rotate(0deg)')
          .attr('rogue-title', newtitle)
          ;
        console.log(x, y, newtitle, inside)
      }
      else {
        here.style('opacity',1);
        blackTip.style('opacity',0);
        area
          .style('--xx', `${x1}`)
          .style('--yy', `${y1}`)
          .style('--trans', 'translate(-10%,0%) rotate(-10deg)')
          .attr('rogue-title', text1)
          ;
        console.log(x1, y1, text1, inside);
      }
      console.log('++++++++++++++++++++');
    }, 0);
  }
  newDimensions() {
    const drawthis = d3.select(this.element.nativeElement);
    const here = (drawthis.node().parentElement as HTMLElement).getBoundingClientRect();
    //  const boxsizeH =((drawthis.select('#histo').node() as HTMLElement).parentElement?.parentElement?.parentElement as HTMLElement).getBoundingClientRect().width;// here.width;
    // const boxsizeV = ((drawthis.select('#histo').node() as HTMLElement).parentElement?.parentElement?.parentElement as HTMLElement).getBoundingClientRect().height;//Math.max(boxsizeH * this.heightToWidth, here.height);
    const boxsizeH = here.width;
    const boxsizeV = Math.max(boxsizeH * this.heightToWidth, here.height);
    drawthis.select('svg')
      .attr('width', boxsizeH)
      .attr('height', boxsizeV)
      ;
    this.boxsizeH = boxsizeH - this.rim;
    this.boxsizeV = boxsizeV - this.rim;

    console.log('Box dimensions:', boxsizeH, boxsizeV)
  }
}
