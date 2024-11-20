import { Component, Input, ElementRef, OnInit, input } from '@angular/core';
import { CommonModule } from '@angular/common';
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
  @Input()squareBorderOpacity=1;
  constructor(private element: ElementRef) { }
  ngOnInit(): void {
  }
}
