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
  @Input() data:portfolio={}as portfolio;
  Hdomain: Array<number> = [];
  Vdomain: Array<number> = [];
  Hrange: Array<number> = [];
  Vrange: Array<number> = [];
  hscaleGraph = d3.scaleLinear();
  vscaleGraph = d3.scaleLinear();
  ngOnInit(): void {
    this.Hrange = [this.boxsize * 1e-1, this.boxsize * 5e-1];
    this.Vrange = [this.boxsize / 2*9e-1, this.boxsize/2*1e-1];
    this.Vdomain = [Math.min(0, d3.min(this.data.rankingDistribution.map(d => d.value)) as number), Math.max(-1e-1, d3.max(this.data.rankingDistribution.   map(d => d.value)) as number)];
    this.vscaleGraph = d3.scaleLinear(this.Vdomain, this.Vrange);
    this.Hdomain = [d3.min(this.data.rankingDistribution.map((_,i) => i)) as number, d3.max(this.data.rankingDistribution.  map((_,i) => i)) as number];
    this.hscaleGraph = d3.scaleLinear(this.Hdomain, this.Hrange);
    console.log(this.Hdomain, this.Vdomain);
    console.log(this.hscaleGraph.range(), this.vscaleGraph.range(), this.Vrange, this.vscaleGraph(0))
    console.log(1, this.vscaleGraph(1));
    console.log(2, this.vscaleGraph(2));
    console.log(3, this.vscaleGraph(3));
    this.update();
  }
  update() {
    d3.select(this.element.nativeElement).select('[rogue-title]')
      .attr('rogue-title', this.title + ' chart')
      .style('--xx', '4%')
      .style('--yy', '5%');
  }
}

