import { Component, Input, ElementRef, OnInit, input, numberAttribute } from '@angular/core';
import { CommonModule } from '@angular/common';
import { fchart } from '../app.component';
import * as d3 from 'd3';

@Component({
  selector: 'app-fanchart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './fanchart.component.html',
  styleUrl: './fanchart.component.scss'
})
export class FanchartComponent implements OnInit {
  @Input() boxsizeV = 900;
  @Input() boxsizeH = 900;
  @Input() squareBorderOpacity = 1;
  @Input() differentColours = false;
  @Input() DATA = {} as fchart;
  @Input() title = "fanchart";
  @Input() orderAreas = true;
  maxY = -1e9;
  maxX = 0;
  minY = 1e9;
  minX = 0;
  scaleX = d3.scaleLinear();
  scaleY = d3.scaleLinear();
  colours = d3.interpolateRdGy;
  plotPath = [] as Array<string>;
  intVal = (i: number) => Math.floor(i);
  plotPoints: (i: number, array: Array<number>, pos: number) => number = (i, a, p) => 0;
  transform = (x: number, y: number, r = 0) => `translate(${x},${y}) rotate(${r})`;
  constructor(private element: ElementRef) { }
  ngOnInit(): void {
    if (this.differentColours) this.DATA.areas.forEach((d, i, dd) => dd[i][0].colour = this.colours((i + 1) / d[0].values.length));
    if (this.orderAreas) {
      console.log('Before Sort', this.DATA.areas.map(d => d[0].legend), this.DATA.areas.map(d => d[1].legend), this.DATA.areas.map(d => (d[0].values[d[0].values.length - 1] - d[1].values[d[1].values.length - 1])));
      this.DATA.areas = this.DATA.areas.sort((a, b) => (a[0].values[a[0].values.length - 1] - a[1].values[a[1].values.length - 1]
        - b[0].values[b[0].values.length - 1] + b[1].values[b[1].values.length - 1]));
      console.log('After Sort', this.DATA.areas.map(d => d[0].legend), this.DATA.areas.map(d => d[1].legend), this.DATA.areas.map(d => (d[0].values[d[0].values.length - 1] - d[1].values[d[1].values.length - 1])));
    }
    this.DATA.lines.forEach(d => {
      this.minY = d3.min([this.minY, d3.min(d.values) ?? 0]) ?? 0;
      this.maxY = d3.max([this.maxY, d3.max(d.values) ?? 0]) ?? 0;
    });
    this.DATA.areas.forEach(dd => {
      dd.forEach(d => {
        this.minY = d3.min([this.minY, d3.min(d.values) ?? 0]) ?? 0;
        this.maxY = d3.max([this.maxY, d3.max(d.values) ?? 0]) ?? 0;
      });
    });
    this.maxX = this.DATA.lines[0].values.length;
    console.log(this.minX, this.maxX);
    console.log(this.minY, this.maxY);
    this.scaleX.domain([this.minX, this.maxX]);
    this.scaleY.domain([this.minY, this.maxY]);
    this.scaleX.range([5e-2 * this.boxsizeH, 95e-2 * this.boxsizeH]);
    this.scaleY.range([90e-2 * this.boxsizeV, 10e-2 * this.boxsizeV]);
    this.plotPoints = (i, values, pos) => {
      if (i == 0) return -1;
      let back = 0;
      if (pos == 0) {
        back = this.scaleX(i - 1);
      } else if (pos == 1) {
        back = this.scaleX(i)
      } else if (pos == 2) {
        back = this.scaleY(values[i - 1])
      } else if (pos == 3) {
        back = this.scaleY(values[i])
      }
      return back;
    };
    /* console.log(this.DATA.lines[0].values);
     console.log(this.plotPoints(1, [], 0),
       this.plotPoints(1, this.DATA.lines[0].values, 1),
       this.plotPoints(1, this.DATA.lines[0].values, 2),
       this.plotPoints(1, this.DATA.lines[0].values, 3));*/
    this.DATA.areas.forEach(area => {
      let path = ``;
      area[1].values.forEach((val, j, plot) => {
        if (j === 1) path += `M${this.plotPoints(j, plot, 0)} ${this.plotPoints(j, plot, 2)} `;
        else if (j !== 0) path += `L${this.plotPoints(j, plot, 1)} ${this.plotPoints(j, plot, 3)} `;
      });
      area[0].values.forEach((val, j, plot) => {
        const jm = plot.length - j - 1; // We go backwards
        if (jm === 1) path += `L${this.plotPoints(jm, [], 0)} ${this.plotPoints(jm, plot, 2)} `;
        else if (jm !== 0) path += `L${this.plotPoints(jm, [], 1)} ${this.plotPoints(jm, plot, 3)} `;
      });
      path += ' Z';
      this.plotPath.push(path);
    });
    this.update();
  }
  over(e: MouseEvent, i: number,legend:string='', inout = false) {
    const svg = d3.select(this.element.nativeElement).select('div.mainTip');
    const here = d3.select(e.target as HTMLElement & EventTarget);
    if (inout) {
      const x = e.clientX;
      const y = e.clientY;
      here.style('opacity', 0.5);
      svg
        .attr('tiptitle', 'tipper')
        .style('left', `${x}px`)
        .style('top', `${y}px`)
        .style('opacity', '1')
        .html(`${legend}`);
      ;
    } else {
      here.style('opacity', 1);
      svg.style('opacity', 0)
        .attr('tiptitle', null);
    }
  }
  update() {
    d3.select(this.element.nativeElement).select('[rogue-title]')
      .attr('rogue-title', this.title)
      .style('--xx', '4%')
      .style('--yy', '5%');
    setTimeout(() => {
      d3.select(this.element.nativeElement).selectAll('path').nodes().forEach((d, i) => {
        d3.select(d)
          .transition()
          .duration(2000)
          .styleTween('opacity', () => (t) => `${t}`)
          .attrTween('transform', () => (t) => `rotate(${10 * ((i + 1)%2===0?-10:1 )* (1 - t)})`)
          ;
      });
      d3.select(this.element.nativeElement).selectAll('line.lines.m')
        .transition()
        .duration(2000)
        .styleTween('opacity', () => (t) => `${t}`)
        .attrTween('transform', () => (t) => `rotate(${30 * (1 - t)})`)
        ;
      d3.select(this.element.nativeElement).selectAll('line.lines.t')
        .transition()
        .duration(2000)
        .styleTween('opacity', () => (t) => `${t}`)
        .attrTween('transform', () => (t) => `rotate(${-30 * (1 - t)})`)
        ;
    }, 200);
  }
}
