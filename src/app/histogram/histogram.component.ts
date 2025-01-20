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
  @Input() DATA: any = {};
  boxsizeV = 900;
  boxsizeH = 900;
  rim = 10;
  edgeRatioX = 0.05;
  edgeRatioY = 0.2;
  scaleX = d3.scaleLinear();
  scaleY = d3.scaleLinear();
  heightToWidth = 0.35;
  title = 'Response Histogram';
  @Input() mainTitle=this.title;
  staticPosition = { x: '2.5%', y: '5%' };
  squareBorderOpacity = 1;
  ngOnInit(): void {
    console.log(this.DATA)
    this.newDimensions();
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
    const blackTip = d3.select(this.element.nativeElement).select('div.mainTip');
    const here = d3.select(s.target as HTMLElement & EventTarget);
    const area = d3.select(this.element.nativeElement).select('#histo');
    const x = s.offsetX;
    const y = s.offsetY;
    const screenWidth = (here.node()?.parentElement?.parentElement as HTMLElement).getBoundingClientRect().width;
    const xp = s.pageX;
    const yp = s.pageY;
    const x1 = this.staticPosition.x;
    const y1 = this.staticPosition.y;
    const text1 = newtitle == '' ? this.title : newtitle;
    //  console.log(x, y, xp, yp, xp - x, yp - y)
    //  console.log((blackTip.node() as HTMLElement)?.getBoundingClientRect());
    setTimeout(() => {
      console.log('====================');
      if (inside) {
        here.style('opacity', 0.5);
        const backOff=x < screenWidth * 0.05?'0%':x > screenWidth * 0.95?'100%':'50%';
        blackTip
          .style('left', `${xp}px`)
          .style('top', `${yp}px`)
          .style('--accent-colour', 'black')
          .style('opacity', 1)
          .style('transform', `translate(calc(max(0% , (50% - ${x}px)) - ${backOff}) , calc(0px - 100% - var(--triangle-height))) rotate(0deg)`)
          .html(`offset: (${x} ${y}) and page: (${xp} ${yp}). Difference: (${xp - x} ${yp - y}). Screen width: ${screenWidth}, edge conditions: ${x < screenWidth * 0.05} ${x > screenWidth * 0.95}`)
          ;
        area
          .style('--xx', `${x}px`)
          .style('--yy', `${y}px`)
          .style('--trans', x < screenWidth * 0.05 ? `translate(0%, 0%) rotate(0deg)` : x > screenWidth * 0.95 ? `translate(-100%, 0%) rotate(0deg)` : `translate(-50%, 0%) rotate(0deg)`)
          .attr('rogue-title', newtitle)
          ;
        //    console.log(x, y, newtitle, inside)
      }
      else {
        here.style('opacity', 1);
        blackTip.style('opacity', 0);
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
    this.scaleX.range([boxsizeH * this.edgeRatioX, boxsizeH * (1 - this.edgeRatioX)]);
    this.scaleY.range([boxsizeV * this.edgeRatioY, boxsizeV * (1 - this.edgeRatioY)]);
    this.scaleX.domain([ this.DATA['hist.x_min'], this.DATA['hist.x_max']]);
    this.scaleY.domain([ this.DATA['hist.y_max'], this.DATA['hist.y_min']]);
    console.log(this.scaleX.domain(),this.scaleX.range(),[this.scaleX(this.scaleX.domain()[0]),this.scaleX(this.scaleX.domain()[1])]);
    console.log(this.scaleY.domain(),this.scaleY.range(),[this.scaleY(this.scaleY.domain()[0]),this.scaleY(this.scaleY.domain()[1])]);
    console.log(this.DATA['hist.bin_edges'],(this.DATA['hist.bin_edges'] as Array<number>).map((d)=>this.scaleX(d)));
    console.log(this.DATA['hist.bin_values'],(this.DATA['hist.bin_values'] as Array<number>).map((d)=>this.scaleY(d)));
  }
}
