import { Component , Input, OnInit, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import{pctEvDiverse}from '../app.component';
import * as d3 from 'd3';
@Component({
  selector: 'app-pctbar',
  standalone: true,
  imports: [CommonModule, PctbarComponent],
  templateUrl: './pctbar.component.html',
  styleUrl: './pctbar.component.scss'
})
export class PctbarComponent implements OnInit{

  @Input() title="Diverse pct";
  @Input() boxsize = 450;
  @Input() squareBorderOpacity = 0;
  @Input() data:pctEvDiverse={}as pctEvDiverse;
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
    this.Vdomain = [0,2];
    this.vscaleGraph = d3.scaleLinear(this.Vdomain, this.Vrange);
    this.Hdomain = [0,2];
    this.hscaleGraph = d3.scaleLinear(this.Hdomain, this.Hrange);
  }
}
