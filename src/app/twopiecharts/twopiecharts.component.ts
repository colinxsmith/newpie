import { Component, OnInit, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as d3 from 'd3';

@Component({
  selector: 'app-twopiecharts',
  standalone: true,
  imports: [CommonModule, TwopiechartsComponent],
  templateUrl: './twopiecharts.component.html',
  styleUrl: './twopiecharts.component.scss'
})
export class TwopiechartsComponent implements OnInit {
  constructor(private element: ElementRef) { }
  colours = d3.scaleLinear([0, 100], ['red', 'blue']);
  paths: Array<string> = [];
  useColours: Array<string> = [];
  mockdata = {
    'values': [4, 5, 3, 7, 1, 10, 17]
  };
  pie1 = d3.pie();
  figureArcs = d3.arc();
  ngOnInit() {
    this.pie1(this.mockdata.values).forEach((s, i) => {
      this.paths.push(this.figureArcs({
        innerRadius: 1,
        outerRadius: 200,
        padAngle: 0.005,
        startAngle: s.startAngle,
        endAngle: s.endAngle
      }) as string);
      this.useColours.push(this.colours(100 * (s.index - 1) / this.mockdata.values.length));
      console.log(i, this.colours(100 * (s.index - 1) / this.mockdata.values.length), s)
    });
    this.update();
  }
  update() {
    setTimeout(()=>{
      d3.select(this.element.nativeElement).selectAll('path.arc')
        .transition().duration(1000)
        .styleTween('opacity',()=>(t)=>`${t}`)
        .attrTween('d', (_, i) => (t) => {
          //console.log(i);
          const p1 = this.pie1(this.mockdata.values)[i];
          const path = this.figureArcs({
            startAngle: p1.startAngle,
            endAngle: p1.endAngle,
            padAngle: p1.padAngle,
            innerRadius: 1,
            outerRadius: t * 150 +50
          }) as string;
          return `${path}`;
        });
    },200);
  }
}