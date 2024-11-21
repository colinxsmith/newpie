import { Component, Input, ElementRef, OnInit, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { fchart } from '../app.component';
import * as d3 from 'd3';

@Component({
  selector: 'app-fanchart',
  standalone: true,
  imports: [CommonModule, FanchartComponent],
  templateUrl: './fanchart.component.html',
  styleUrl: './fanchart.component.scss'
})
export class FanchartComponent implements OnInit {
  @Input() boxsizeV = 900;
  @Input() boxsizeH = 900;
  @Input() squareBorderOpacity = 1;
  @Input() DATA = {} as fchart;
  @Input()title="fanchart";
  maxY = -1e9;
  maxX = 0;
  minY = 1e9;
  minX = 0;
  scaleX = d3.scaleLinear();
  scaleY = d3.scaleLinear();
  intVal=(i:number)=>Math.floor(i);
  plotPoints = (i: number, array: Array<number>, pos: number) => { };
  transform = (x: number, y: number, r = 0) => `translate(${x},${y}) rotate(${r})`;
  constructor(private element: ElementRef) { }
  ngOnInit(): void {
    console.log(this.DATA);
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
    this.scaleX.range([15e-2 * this.boxsizeH, 95e-2 * this.boxsizeH]);
    this.scaleY.range([90e-2 * this.boxsizeV, 10e-2 * this.boxsizeV]);
    this.plotPoints = (i, values, pos) => {
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
    console.log(this.DATA.lines[0].values);
    console.log(this.plotPoints(1, this.DATA.lines[0].values, 0),
      this.plotPoints(1, this.DATA.lines[0].values, 1),
      this.plotPoints(1, this.DATA.lines[0].values, 2),
      this.plotPoints(1, this.DATA.lines[0].values, 3));
  }
}
