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
  maxY = 0;
  maxX = 0;
  minY = 0;
  minX = 0;
  scaleX=d3.scaleLinear();
  scaleY=d3.scaleLinear();
  transform=(x:number,y:number,r=0)=>`translate(${x},${y}) rotate(${r})`;
  constructor(private element: ElementRef) { }
  ngOnInit(): void {
    console.log(this.DATA);
    this.DATA.lines.forEach(d => {
      this.minX = d3.min([this.minX, d3.min(d.values)??0])??0;
      this.maxX = d3.max([this.maxX, d3.max(d.values)??0])??0;
    });
    this.DATA.areas.forEach(dd => {
      dd.forEach(d => {
        this.minX = d3.min([this.minX, d3.min(d.values)??0])??0;
        this.maxX = d3.max([this.maxX, d3.max(d.values)??0])??0;
      });
    });
    this.maxY=this.DATA.areas.length+this.DATA.lines.length;
    console.log(this.minX,this.maxX);
    console.log(this.minY,this.maxY);
    this.scaleX.domain([this.minX,this.maxX]);
    this.scaleY.domain([this.minY,this.maxY]);
    this.scaleX.range([5e-2*this.boxsizeH,95e-2*this.boxsizeH]);
    this.scaleY.range([95e-2*this.boxsizeV,5e-2*this.boxsizeV]);
  }
}
