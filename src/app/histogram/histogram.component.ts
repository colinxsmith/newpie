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
  scaleX = d3.scaleLinear();
  scaleY = d3.scaleLinear();
  heightToWidth = 0.35;
  title = 'Response Histogram';
  squareBorderOpacity = 1;
  ngOnInit(): void {
    console.log(this.DATA)
    setTimeout(() => {
      this.newDimensions();
    }, 0);
  }
  newDimensions() {
    const drawthis = d3.select(this.element.nativeElement);
    const here = (drawthis.node().parentElement as HTMLElement).getBoundingClientRect();
    //  const boxsizeH =((drawthis.select('#histo').node() as HTMLElement).parentElement?.parentElement?.parentElement as HTMLElement).getBoundingClientRect().width;// here.width;
    // const boxsizeV = ((drawthis.select('#histo').node() as HTMLElement).parentElement?.parentElement?.parentElement as HTMLElement).getBoundingClientRect().height;//Math.max(boxsizeH * this.heightToWidth, here.height);
    const boxsizeH = here.width;
    const boxsizeV = Math.max(boxsizeH * this.heightToWidth, here.height);
    this.boxsizeH = boxsizeH;
    this.boxsizeV = boxsizeV;
    drawthis.select('svg')
      .attr('height', boxsizeV)
      .attr('width', boxsizeH);

    console.log('Box dimensions:', boxsizeH, boxsizeV)
  }
}
