import { Component, OnInit, ElementRef, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as d3 from 'd3';
import { portfolio } from '../app.component';
@Component({
  selector: 'app-twopiecharts',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './twopiecharts.component.html',
  styleUrl: './twopiecharts.component.scss'
})
export class TwopiechartsComponent implements OnInit {
  constructor(private element: ElementRef) { }
  @Input() portfolioData: portfolio = {} as portfolio;
  colours = d3.scaleLinear([0, 100], ['red', 'green']);
  paths: Array<{ path: string, rank: number, name: string, value: number }> = [];
  centres: Array<Array<number>> = [];
  useColours: Array<string> = ["rgb(146,208,80)",
    "rgb(163,209,83)",
    "rgb(180,210,86)",
    "rgb(197,212,90)",
    "rgb(215,213,93)",
    "rgb(232,215,97)",
    "rgb(249,216,100)",
    "rgb(254,188,103)",
    "rgb(251,147,105)",
    "rgb(248,105,107)"];
  @Input() title = "Ranking Trevor";
  @Input() boxsize = 400;
  @Input() innerRadius = 10;
  @Input() outerRadius = this.boxsize * 0.8 / 2;
  @Input() padAngle = 0.02;
  @Input() padRadius = 100;
  @Input() cornerRadius = 20;
  @Input() squareBorderOpacity = 0;
  /**
   * Set false to stop animation with pdf renderer
   */
  @Input() animate = false;
  pie1: Array<d3.PieArcDatum<number | { valueOf(): number; }>> = [];
  percentFormat = (z: number) => d3.format('.2%')(z / 100);
  figureArcs = d3.arc();
  ngOnInit() {
    //    console.log(this.portfolioData);

    const together = this.portfolioData.rankingDistribution;
    const totals: Map<string, number> = new Map(); //We'll hold the rank totals in a map and declare it here
    let combine = together
      .map((d, i) => { totals.set(d.ranking, d.value + (totals.get(d.ranking) ?? 0)); return d; }) //get totals for each rank
      .filter((v, i, c) => i === c.findIndex(t => t.ranking === v.ranking)) // find repeated ranks
      .map(dk => { dk.value = totals.get(dk.ranking) ?? 0; return dk; }) // find sums over repeated ranks
      ;
    //combine = together; //Don't combine repeated ranks for checking
    //    console.log(combine);
    this.pie1 = d3.pie().sort(null)(combine.sort((a, b) => (+a.ranking - +b.ranking)).map(d => d.value));
    this.figureArcs = d3.arc()
      .padRadius(this.padRadius)
      .padAngle(this.padAngle)
      .cornerRadius(this.cornerRadius);
    this.outerRadius = this.boxsize * 0.8 / 2;

    this.pie1.forEach((s, i) => {
      this.paths.push({
        path: this.figureArcs({
          innerRadius: this.innerRadius,
          outerRadius: this.outerRadius,
          startAngle: s.startAngle,
          endAngle: s.endAngle
        }) as string, rank: +combine[i].ranking, name: combine[i].name, value: combine[i].value
      });
      const cent = this.figureArcs.centroid({
        innerRadius: this.outerRadius * .75,
        outerRadius: this.outerRadius,
        startAngle: s.startAngle,
        endAngle: s.endAngle
      });
      this.centres.push([cent[0] - 5, cent[1]]); //fiddle to position index number better in a narrow pie slice
    });
    if (this.animate) this.update();
  }
  update() {
    d3.select(this.element.nativeElement).select('[rogue-title]')
      .attr('rogue-title', this.title + ' chart')
      .style('--xx', '4%')
      .style('--yy', '5%');
    setTimeout(() => {
      d3.select(this.element.nativeElement).select('body')
        .attr('title', this.title + ' chart');
      d3.select(this.element.nativeElement).select('text.title')
        .attr('x', this.boxsize / 2 - this.title.length * 4)
        .text(this.title);
      d3.select(this.element.nativeElement).selectAll('path.arc').select('title')
        .text((_, i) => {
          return `${this.paths[i].name} index is ${i}, rank is ${this.paths[i].rank}, value is ${this.percentFormat(this.paths[i].value)}`;
        });
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
    if (inout) {
      const x = e.pageX;
      const y = e.pageY;
      here.style('opacity', 0.5);
      svg
        .attr('tiptitle', 'tipper')
        .style('left', `${x}px`)
        .style('top', `${y}px`)
        .style('opacity', '1')
        .style('--accent-colour', 'black')
        .style('--triangle-base', '11px')
        .style('--triangle-height', '11px')
        .style('--triangle-left', `50%`)
        .html(`(${x},${y})${this.paths[i].name}   index:${this.pie1[i].index} ranking :${this.paths[i].rank} value :${this.percentFormat(this.paths[i].value)}`);
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


