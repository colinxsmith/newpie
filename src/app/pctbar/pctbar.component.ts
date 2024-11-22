import { Component, Input, OnInit, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { pctEvDiverse } from '../app.component';
import * as d3 from 'd3';
import { animate } from '@angular/animations';
@Component({
  selector: 'app-pctbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pctbar.component.html',
  styleUrl: './pctbar.component.scss'
})
export class PctbarComponent implements OnInit {

  @Input() title = "Diverse pct";
  @Input() boxsize = 450;
  @Input() squareBorderOpacity = 0;
  @Input() data: pctEvDiverse = {} as pctEvDiverse;
  @Input()animate=false;
  Hdomain: Array<number> = [];
  Vdomain: Array<number> = [];
  Hrange: Array<number> = [];
  Vrange: Array<number> = [];
  hscaleGraph = d3.scaleLinear();
  vscaleGraph = d3.scaleLinear();
  percentScale0 = (t: number) => d3.format('0.0%')(t);
  percentScale = (t: number) => d3.format('0.003%')(t);
  transform = (x: number, y: number, r = 0) => `translate(${x},${y}) rotate(${r})`;
  constructor(private element: ElementRef) { }
  ngOnInit(): void {
    this.Hrange = [this.boxsize * 2e-1, this.boxsize * 7e-1];
    this.Vrange = [this.boxsize / 2 * 9e-1, this.boxsize / 2 * 1e-1];
    this.Vdomain = [0, 2];
    this.vscaleGraph = d3.scaleLinear(this.Vdomain, this.Vrange);
    this.Hdomain = [0, 2];
    this.hscaleGraph = d3.scaleLinear(this.Hdomain, this.Hrange);
    if(this.animate)this.update();
  }
  update() {
    d3.select(this.element.nativeElement).select('[rogue-title]')
      .attr('rogue-title', this.title + ' chart')
      .style('--xx', '4%')
      .style('--yy', '5%');
    setTimeout(() => {
      const port = d3.select(this.element.nativeElement).selectAll('rect.portfolio').nodes();
      port.forEach((d, i) => {
        const p = d3.select(d);
        const w1 = +p.attr('width');
        p.transition().duration(2000)
          .attrTween('width', () => (t) => `${w1 * t}`)
          ;
      });
      const diver = d3.select(this.element.nativeElement).selectAll('rect.diverse').nodes();
      diver.forEach((d, i) => {
        const p = d3.select(d);
        const w1 = +p.attr('width');
        p.transition().duration(2000)
          .attrTween('width', () => (t) => `${w1 * t}`)
          .attrTween('transform', () => (t) => `rotate(${(1 - t) * 90})`)
          ;
      });
    }, 20);
  }

  over(e: MouseEvent, inout = false) {
    const svg = d3.select(this.element.nativeElement).select('div.mainTip');
    const here = d3.select(e.target as HTMLElement & EventTarget);
    if (inout) {
      const x = e.pageX - 100;
      const y = e.pageY - 80;
      const tipval = +here.attr('tip');
      svg
        .attr('tiptitle', 'tipper')
        .style('left', `${x}px`)
        .style('top', `${y}px`)
        .style('opacity', '1')
        .html(`(${x},${y}): ${this.percentScale(tipval)}`);
      here.style('opacity', 0.5);
    } else {

      here.style('opacity', 1);
      svg.style('opacity', 0)
        .attr('tiptitle', null);
    }
  }
}
