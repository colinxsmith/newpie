import { Component, Input, OnInit, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { portfolio } from '../app.component';
import * as d3 from 'd3';
@Component({
  selector: 'app-barchart',
  standalone: true,
  imports: [CommonModule, BarchartComponent],
  templateUrl: './barchart.component.html',
  styleUrl: './barchart.component.scss'
})
export class BarchartComponent implements OnInit {
  constructor(private element: ElementRef) { }
  @Input() title = "Ranking Trevor";
  @Input() boxsize = 450;
  @Input() squareBorderOpacity = 0;
  @Input() data: portfolio = {} as portfolio;
  /**
   * Set false to stop animation with pdf renderer
   */
  @Input() animate=false;
  Hdomain: Array<number> = [];
  Vdomain: Array<number> = [];
  Hrange: Array<number> = [];
  Vrange: Array<number> = [];
  hscaleGraph = d3.scaleLinear();
  vscaleGraph = d3.scaleLinear();
  hLedge = d3.scaleLinear();
  vLedge = d3.scaleLinear();
  maxRankTotal = 1;
  transform = (x: number, y: number, r = 0) => `translate(${x},${y}) rotate(${r})`;
  percentScale0 = (t: number) => d3.format('0.0%')(t);
  percentScale = (t: number) => d3.format('0.003%')(t);
  colours = (t: number, s = 1) => d3.interpolateBrBG(t / s);
  rankTotals: Array<{ id: number; totalPercent: number; data: Array<{ value: number, name: string, id: number, colour: string, ranking: number, runningPercent: number, percent: number }> }> = [];
  ngOnInit(): void {
    const ranks = new Map<number, Array<{ value: number, name: string, id: number, colour: string, ranking: number, percent: number, runningPercent: number }>>();
    const totalValue = this.data.rankingDistribution.map(d => d.value)
      .reduce((agg, now) => agg + now, 0);
    console.log(totalValue);
    console.log(this.data.rankingDistribution.map(d => +d.ranking));
    const mm = d3.min(this.data.rankingDistribution.map(d => +d.ranking)) as number;
    const MM = d3.max(this.data.rankingDistribution.map(d => +d.ranking)) as number;
    //this.colours = d3.scaleLinear([0,this.data.rankingDistribution.length], ['magenta', 'cyan']);
    const running = new Map<number, number>();
    this.data.rankingDistribution.forEach((d, i) => {
      const interim = running.get(+d.ranking) ?? 0;
      running.set(+d.ranking, (interim + d.value / totalValue));
      if (!ranks.has(+d.ranking)) {
        ranks.set(+d.ranking, []);
      }
      ranks.get(+d.ranking)?.push({ value: d.value, name: d.name, id: i, colour: this.colours(i, this.data.rankingDistribution.length), ranking: +d.ranking, runningPercent: running.get(+d.ranking) ?? 0, percent: d.value / totalValue });
    });
    console.log(ranks);
    ranks.forEach((val, kk) => {
      this.rankTotals.push({
        data: val,
        id: kk, totalPercent: val.map(d => d.percent)
          .reduce((agg, now) => agg + now, 0)
      });
    });
    this.rankTotals = this.rankTotals.sort(d => d.id).reverse();
    console.log(this.rankTotals);
    this.maxRankTotal = d3.max(this.rankTotals.map(d => d.totalPercent)) as number;
    const grandTotal = this.rankTotals.flatMap((v) => v.totalPercent).reduce((agg, now) => agg + now, 0);
    console.log(grandTotal);
    this.Hrange = [this.boxsize * 1e-1, this.boxsize * 5e-1];
    this.Vrange = [this.boxsize / 2 * 9e-1, this.boxsize / 2 * 1e-1];
    this.Vdomain = [Math.min(0, d3.min(this.rankTotals.map(d => d.totalPercent)) as number), Math.max(-1e-1, d3.max(this.rankTotals.map(d => d.totalPercent)) as number)];
    this.vscaleGraph = d3.scaleLinear(this.Vdomain, this.Vrange);
    this.Hdomain = [d3.min(this.rankTotals.map((_, i) => i)) as number, d3.max(this.rankTotals.map((_, i) => i)) as number];
    this.hscaleGraph = d3.scaleLinear(this.Hdomain, this.Hrange);
    console.log(this.Hdomain, this.Vdomain);
    console.log(this.hscaleGraph.range(), this.vscaleGraph.range());
    console.log(this.Vdomain, this.Vrange);
    console.log(0, this.vscaleGraph(0));
    console.log(0.5, this.vscaleGraph(0.5));
    console.log(1, this.hscaleGraph(1));
    console.log(2, this.hscaleGraph(2));
    console.log(3, this.hscaleGraph(3));
    this.hLedge = d3.scaleLinear([0, this.data.rankingDistribution.length], [this.boxsize * 0.6, this.boxsize * 0.6]);
    this.vLedge = d3.scaleLinear([0, this.data.rankingDistribution.length], [this.boxsize * 0.1, this.boxsize * 0.4]);
    if(this.animate)this.update();
  }
  update() {
    d3.select(this.element.nativeElement).select('[rogue-title]')
      .attr('rogue-title', this.title + ' chart')
      .style('--xx', '4%')
      .style('--yy', '5%');
    setTimeout(() => {
      const percents = d3.select(this.element.nativeElement).selectAll('rect.assetpercent')
      const nodes = percents.nodes();
      nodes.forEach(d => {
        const rect = d3.select(d);
        const ww = +rect.attr('width');
        const hh = +rect.attr('height');
        rect.transition().ease(d3.easeBounce).duration(3000)
          .attrTween('height', () => (t) => `${hh * t}`)
          .attrTween('width', () => (t) => `${ww * t}`)
      });

      const legs = d3.select(this.element.nativeElement).selectAll('g.stockLegend')
      legs.nodes().forEach(d => {
        const g = d3.select(d);
        const transform = g.attr('transform');
        g.transition().duration(1000)
          .attrTween('transform', () => (t) => `${transform} rotate(${360*t})`)
          ;
          g.select('rect').transition().duration(400)
          .styleTween('opacity',()=>(t)=>`${t}`)
          ;
      });
    });
  }
  over(e: MouseEvent, a: { value: number, name: string, id: number, colour: string, ranking: number, percent: number, runningPercent: number }, inout = false) {
    const svg = d3.select(this.element.nativeElement).select('div.mainTip');
    const here = d3.select(e.target as HTMLElement & EventTarget);
    if (inout) {
      const x = e.pageX - 100;
      const y = e.pageY;
      here.style('opacity', 0.5);
      svg
        .attr('tiptitle', 'tipper for bars')
        .style('left', `${x}px`)
        .style('top', `${y}px`)
        .style('opacity', '1')
        .html(`${a.name}: percent of value ${this.percentScale(a.percent)} asset number ${a.id} rank ${a.ranking}`);
    }
    else {
      here.style('opacity', 1);
      svg.style('opacity', 0)
        .attr('tiptitle', null);
    }
  }
}

