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
  title='Response Histogram';
  squareBorderOpacity=1;
  ngOnInit(): void {
    console.log(this.DATA)
    setTimeout(()=>{
      this.newDimensions();
    },0);
  }
  newDimensions(){
    const drawthis = d3.select(this.element.nativeElement);
    console.log(this.element.nativeElement.offsetWidth,this.element.nativeElement.offsetHeight)
    const here = (drawthis.node().parentElement as HTMLElement).getBoundingClientRect();
    const boxsizeH = here.width;
    const boxsizeV = here.height;
    this.boxsizeH = boxsizeH;
    this.boxsizeV = boxsizeH*0.5;
    drawthis.select('svg')
      .attr('height', boxsizeV)
      .attr('width', boxsizeH);
    
    console.log('Box dimensions:',boxsizeH,boxsizeV)
  }
}
