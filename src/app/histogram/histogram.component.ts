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
      this.newDimensions();
    }, 0);
  }
  divover(s: MouseEvent, newtitle = '', inside = false) {
    const area = d3.select(this.element.nativeElement).select('#histo');
    const x1 = this.staticPosition.x;
    const y1 = this.staticPosition.y;
    const text1 = this.title;
    console.log(x1, y1);
    if (inside) {
      const x = s.offsetX;
      const y = s.offsetY;
      area
        .style('--xx', `${x}px`)
        .style('--yy', `${y}px`)
        .style('--trans','translate(-50%,0)')
        .attr('rogue-title', newtitle)
        ;
      console.log(x, y, newtitle)
    }
    else {
      area
        .style('--xx', `${x1}`)
        .style('--yy', `${y1}`)
        .style('--trans','translate(0,0)')
        .attr('rogue-title', text1)
        ;
    }
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
