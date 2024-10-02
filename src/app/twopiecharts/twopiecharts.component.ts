import { Component, OnInit, ElementRef, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as d3 from 'd3';
import { NONE_TYPE } from '@angular/compiler';

@Component({
  selector: 'app-twopiecharts',
  standalone: true,
  imports: [CommonModule, TwopiechartsComponent],
  templateUrl: './twopiecharts.component.html',
  styleUrl: './twopiecharts.component.scss'
})
export class TwopiechartsComponent implements OnInit {
  constructor(private element: ElementRef) { }
  @Input() colourRange = 100;
  @Input() colourStart = 'red';
  @Input() colourEnd = 'blue';
  colours = d3.scaleLinear([0, 100], ['red', 'green']);
  paths: Array<string> = [];
  centres: Array<Array<number>> = [];
  useColours: Array<string> = [];
  @Input() title = "Ranking Trevor";
  @Input() boxsize = 400;
  @Input() innerRadius = 10;
  @Input() outerRadius = this.boxsize * 0.8 / 2;
  @Input() padAngle = 0.02;
  @Input() padRadius = 100;
  @Input() cornerRadius = 20;
  @Input() squareBorderOpacity = 0;
  @Input() mockdata = {
    'values': [4, 5, 3, 7, 1, 10, 17]
  };
  pie1: Array<d3.PieArcDatum<number | { valueOf(): number; }>> = [];
  figureArcs=d3.arc();
  ngOnInit() {
    this.pie1 = d3.pie().sort(null)(this.mockdata.values);
    this.figureArcs=d3.arc()
    .padRadius(this.padRadius)
    .padAngle(this.padAngle)
    .cornerRadius(this.cornerRadius);
    this.outerRadius = this.boxsize * 0.8 / 2;
    this.colours = d3.scaleLinear([0, this.colourRange], [this.colourStart, this.colourEnd])
    console.log(this.colourStart, this.colourEnd, this.boxsize);

    this.pie1.forEach((s, i) => {

      this.paths.push(this.figureArcs({
        innerRadius: this.innerRadius,
        outerRadius: this.outerRadius,
        startAngle: s.startAngle,
        endAngle: s.endAngle
      }) as string);
      const cent = this.figureArcs.centroid({
        innerRadius: this.innerRadius,
        outerRadius: this.outerRadius,
        startAngle: s.startAngle,
        endAngle: s.endAngle
      });
      this.centres.push(cent);
      this.useColours.push(this.colours(this.colourRange * (s.index - 1) / this.mockdata.values.length));
    });
    this.update();
  }
  update() {
    setTimeout(() => {
      d3.select(this.element.nativeElement).selectAll('text.title')
        .attr('x', this.boxsize / 2 - this.title.length * 4)
        .text(this.title);
      d3.select(this.element.nativeElement).selectAll('path.arc')
        .transition().duration(1000)
        .styleTween('opacity', () => (t) => `${t}`)
        .attrTween('d', (_, i) => (t) => {
          const p1 = this.pie1[i];
          const path = this.figureArcs({
            startAngle: p1.startAngle,
            endAngle: p1.startAngle - t * (p1.startAngle - p1.endAngle),
            innerRadius: this.innerRadius,
            outerRadius: this.innerRadius - t * (this.innerRadius - this.outerRadius)
          }) as string;
          return `${path}`;
        });
    }, 200);
  }
  over(e: MouseEvent, i: number, inout = false) {
    const svg = d3.select(this.element.nativeElement).select('div.mainTip');
    const here = d3.select(e.target as HTMLElement & EventTarget);
    console.log(e, i, svg, here);
    if (inout) {
      const x = e.clientX - 100;
      const y = e.clientY;
      here.style('opacity', 0.5);
      svg
        .attr('tiptitle', 'tipper')
        .style('left', `${x}px`)
        .style('top', `${y}px`)
        .style('opacity', '1')
        .html(`(${x},${y})  index:${this.pie1[i].index} value :${this.mockdata.values[i]}`);
      /* .style('--ff', '110%')
       .style('--xx', xx + 'px')
       .style('--yy', yy - this.height * 0.15 + 'px')
       .style('--bx', e.offsetX + 'px')
       .style('--by', yy + 'px')*/
      ;
    } else {
      here.style('opacity', 1);
      svg.style('opacity', 0)
        .attr('tiptitle', null);
    }
  }
}


