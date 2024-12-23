import { Component, Input, ElementRef, OnInit } from '@angular/core';
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
  constructor(private element: ElementRef) { }
  @Input() heightToWidth = 1;
  @Input() boxsizeV = 900;
  @Input() boxsizeH = 900;
  @Input() squareBorderOpacity = 1;
  @Input() differentColours = false;
  @Input() DATA = {} as fchart;
  @Input() title = 'fanchart';
  @Input() orderAreas = true;
  @Input() maxY = -1e9;
  @Input() maxX = 0;
  @Input() minY = 1e9;
  minX = 0;
  scaleX = d3.scaleLinear();
  scaleY = d3.scaleLinear();
  plotPath = [] as Array<string>;
  yNumber = (p: number) => {
    let interval = 10 * this.intVal((this.scaleY.domain()[1] - this.scaleY.domain()[0]) / 30);
    if (interval > 150) { interval = 150; } else if (interval < 50) { interval = 50; } else if (interval < 100) { interval = 100; } else if (interval < 150) { interval = 150; }
    //  console.log(interval);
    if (Math.abs(interval / 150 - 0.5) < 1e-5) { interval = 150; }
    const back = p * interval;
    //  back=p*150;
    // console.log('p:' + back + ' ' + this.maxY + ' ' + (back <= this.maxY) + ' ' + interval);
    return back;
  }
  colours = (t: number, s = 1) => d3.interpolateReds(t / s);
  intVal = (i: number) => Math.floor(i);
  plotPoints: (i: number, array: Array<number>, pos: number) => number = (i, a, p) => 0;
  transform = (x: number, y: number, r = 0) => `translate(${x},${y}) rotate(${r})`;

  ngOnInit() {
    this.draw();
  }
  draw(): void {
    if (this.differentColours) { this.DATA.areas.forEach((d, i, dd) => dd[i][0].colour = this.colours(i, this.DATA.areas.length)); }
    if (this.orderAreas) {
      // tslint:disable-next-line:max-line-length
      // console.log('Before Sort', this.DATA.areas.map(d => d[0].legend), this.DATA.areas.map(d => d[1].legend), this.DATA.areas.map(d => (d[0].values[d[0].values.length - 1] - d[1].values[d[1].values.length - 1])));
      this.DATA.areas = this.DATA.areas.sort((a, b) => (a[0].values[a[0].values.length - 1] - a[1].values[a[1].values.length - 1]
        - b[0].values[b[0].values.length - 1] + b[1].values[b[1].values.length - 1]));
      // console.log('After Sort', this.DATA.areas.map(d => d[0].legend), this.DATA.areas.map(d => d[1].legend), this.DATA.areas.map(d => (d[0].values[d[0].values.length - 1] - d[1].values[d[1].values.length - 1])));
    }
    console.log('max X:' + this.maxX);
    console.log('min max:' + this.minY, this.maxY);
    this.newDimensions(false);
    this.update();
  }
  over(e: MouseEvent, i: number, legend1: string = '', legend2: string = '', inout = false) {
    const svg = d3.select(this.element.nativeElement).select('div.mainTip');
    const here = d3.select(e.target as HTMLElement & EventTarget);
    if (inout) {
      const x = e.clientX;
      const y = e.clientY;
      here.style('opacity', 0.5);
      if (legend2 !== '') {
        legend2 = ' to ' + legend2;
      }

      svg
        .attr('tiptitle', 'tipper')
        .style('left', `${x}px`)
        .style('top', `${y}px`)
        .style('opacity', '1')
        .style('border-style', 'groove')
        .style('border-color', '#555 transparent transparent transparent')
        .html(`${legend1} ${legend2} `);

    } else {
      here.style('opacity', 1);
      svg.style('opacity', 0)
        .attr('tiptitle', null);
    }
  }
  newDimensions(leave = true) {
    const drawthis = d3.select(this.element.nativeElement);
    const here = (drawthis.node().parentElement as HTMLElement).getBoundingClientRect();
    const boxsizeH = here.width;
    const boxsizeV = Math.max(boxsizeH * this.heightToWidth, this.element.nativeElement.offsetHeight);
    this.boxsizeH = boxsizeH;
    this.boxsizeV = boxsizeV;
    drawthis.select('svg')
      .attr('height', boxsizeV)
      .attr('width', boxsizeH);
  if (leave) return;
    this.plotPoints = (i, values, pos) => {
      const q=(i-1)*0.25;
      const q1=(i)*0.25;
      if (i === 0) { return -1; }
      let back = 0;
      if (pos === 0) {
        back = this.scaleX(q);
      } else if (pos === 1) {
        back = this.scaleX(q1);
      } else if (pos === 2) {
        back = this.scaleY(values[i - 1]);
      } else if (pos === 3) {
        back = this.scaleY(values[i]);
      }
      return back;
    };
    this.scaleX = d3.scaleLinear();
    this.scaleY = d3.scaleLinear();
    this.scaleX.domain([this.minX, this.maxX]);
    this.scaleY.domain([this.minY, this.maxY]);
    this.scaleX.range([5e-2 * this.boxsizeH, 95e-2 * this.boxsizeH]);
    this.scaleY.range([90e-2 * this.boxsizeV, 10e-2 * this.boxsizeV]);
    console.log('height:' + boxsizeV, 'width:' + boxsizeH);
    //      .attr('viewBox', `0,0,${this.boxsizeH},${this.boxsizeV}`)

    this.plotPath = [];
    this.DATA.areas.forEach(areat => {
      const area = areat.map(v => v);
      let path = ``;
      area[1].values.forEach((val, j, plot) => {
        if (j === 1) { path += `M${this.plotPoints(j, plot, 0)} ${this.plotPoints(j, plot, 2)} `; } else if (j !== 0) { path += `L${this.plotPoints(j, plot, 1)} ${this.plotPoints(j, plot, 3)} `; }
      });
      area[0].values.forEach((val, j, plot) => {
        const jm = plot.length - j - 1; // We go backwards
        if (jm === 1) {
          path += `L${this.plotPoints(jm, [], 0)} ${this.plotPoints(jm, plot, 2)} `;
        } else if (jm !== 0) {
          path += `L${this.plotPoints(jm, [], 1)} ${this.plotPoints(jm, plot, 3)} `;
        }
      });
      path += ' Z';
      this.plotPath.push(path);
    });
  }
  update() {
    this.newDimensions(false);
    setTimeout(() => {
      d3.select(this.element.nativeElement).select('[rogue-title]')
        .attr('rogue-title', this.title)
        .style('--xx', '10%')
        .style('--yy', '5%');
      this.newDimensions(false);
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
      setTimeout(() => {
        this.newDimensions();
        d3.select(this.element.nativeElement).selectAll('path.path').nodes().forEach((d, i) => {
          d3.select(d)
            .transition()
            .duration(2000)
            .styleTween('opacity', () => (t) => `${t}`)
            .ease(d3.easeBounce)
            .attrTween('transform', () => (t) => `rotate(${t * 10 * ((i + 1) % 2 === 0 ? -i - 1 : i + 1) * (1 - t)})`)
            ;
        });
      }, 200);
  }
}
