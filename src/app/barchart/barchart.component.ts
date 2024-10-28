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
  @Input() squareBorderOpacity = 1;
  @Input() data: portfolio = {} as portfolio;
  Hdomain: Array<number> = [];
  Vdomain: Array<number> = [];
  Hrange: Array<number> = [];
  Vrange: Array<number> = [];
  hscaleGraph = d3.scaleLinear();
  vscaleGraph = d3.scaleLinear();
  colours = d3.scaleLinear([0, 100], ['red', 'green']);
  rankTotals: Array<{ id: number; totalPercent: number; data: Array<{ value: number, name: string, id: number, colour: string, ranking: number, runningPercent: number, percent: number }> }> = [];
  ngOnInit(): void {
    const ranks = new Map<number, Array<{ value: number, name: string, id: number, colour: string, ranking: number, percent: number, runningPercent: number }>>();
    const totalValue = this.data.rankingDistribution.map(d => d.value)
      .reduce((agg, now) => agg + now, 0);
    console.log(totalValue);
    const mm=d3.min(this.data.rankingDistribution.map(d=>+d.ranking))as number;
    const MM=d3.max(this.data.rankingDistribution.map(d=>+d.ranking))as number;
    this.colours = d3.scaleLinear([mm,MM], ['red', 'black']);
    const running = new Map<number, number>();
    this.data.rankingDistribution.forEach((d, i) => {
      const interim=running.get(+d.ranking) ?? 0;
      running.set(+d.ranking, (interim + d.value / totalValue));
      if (!ranks.has(+d.ranking)) {
        ranks.set(+d.ranking, []);
      }
      ranks.get(+d.ranking)?.push({ value: d.value, name: d.name, id: i, colour: this.colours(+d.ranking), ranking: +d.ranking, runningPercent: running.get(+d.ranking) ?? 0, percent: d.value / totalValue });
    });
    console.log(ranks);
    ranks.forEach((val, kk) => {
      this.rankTotals.push({
        data: val,
        id: kk, totalPercent: val.map(d => d.percent)
          .reduce((agg, now) => agg + now, 0)
      });
    });
    console.log(this.rankTotals);
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
    this.update();
  }
  update() {
    d3.select(this.element.nativeElement).select('[rogue-title]')
      .attr('rogue-title', this.title + ' chart')
      .style('--xx', '4%')
      .style('--yy', '5%');
  }
}

