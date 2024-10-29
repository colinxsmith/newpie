import { Component, OnInit, ElementRef, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as d3 from 'd3';
import { portfolio } from '../app.component';
@Component({
  selector: 'app-twopiecharts',
  standalone: true,
  imports: [CommonModule, TwopiechartsComponent],
  templateUrl: './twopiecharts.component.html',
  styleUrl: './twopiecharts.component.scss'
})
export class TwopiechartsComponent implements OnInit {
  constructor(private element: ElementRef) { }
  @Input() portfolioData: portfolio = {} as portfolio;
  @Input() colourRange = 100;
  @Input() colourStart = 'red';
  @Input() colourEnd = 'blue';
  colours = d3.scaleLinear([0, 100], ['red', 'green']);
  paths: Array<string> = [];
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
  pie1: Array<d3.PieArcDatum<number | { valueOf(): number; }>> = [];
  figureArcs = d3.arc();
  ngOnInit() {
    console.log(this.portfolioData);
    const getUniqueValues = (array:Array<number>) => (
      array.filter((currentValue, index, arr) => (
        arr.indexOf(currentValue) === index
      ))
    );

    const together=/*getUniqueValues*/(this.portfolioData.rankingDistribution.map(d=>+d.ranking));
    console.log(together)
    this.pie1 = d3.pie().sort(null)(together);
    this.figureArcs = d3.arc()
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
        innerRadius: this.outerRadius * .75,
        outerRadius: this.outerRadius,
        startAngle: s.startAngle,
        endAngle: s.endAngle
      });
      this.centres.push([cent[0]-5,cent[1]]); //fiddle to position index number better in a narrow pie slice
      //  this.useColours.push(this.colours(this.colourRange * (s.index - 1) / this.portfolioData.rankingDistribution.length));
    });
    this.update();
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
          return `${this.portfolioData.rankingDistribution[i].name} index is ${i}, rank is ${this.portfolioData.rankingDistribution[i].ranking}, value is ${this.portfolioData.rankingDistribution[i].value}`;
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
      const x = e.pageX - 100;
      const y = e.pageY;
      here.style('opacity', 0.5);
      svg
        .attr('tiptitle', 'tipper')
        .style('left', `${x}px`)
        .style('top', `${y}px`)
        .style('opacity', '1')
        .html(`(${x},${y})${this.portfolioData.rankingDistribution[i].name}   index:${this.pie1[i].index} ranking :${this.portfolioData.rankingDistribution[i].ranking} value :${this.portfolioData.rankingDistribution[i].value}`);
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


