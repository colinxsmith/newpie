import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TwopiechartsComponent } from "./twopiecharts/twopiecharts.component";
import { BarchartComponent } from "./barchart/barchart.component";
export interface rankings { id: number; current: number; proposed: number; };
export interface distribution { id: number; values: number; };
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TwopiechartsComponent, BarchartComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'New Charts for Charles Stanley';
  k = [3, 4, 11, 6, 14, 18, 9, 1, 10, 8];
  kb = this.k.map(k => k).reverse();
  prop: Array<number> = [];
  curr: Array<number> = [];
  dist: Array<distribution> = [];
  rankdata: Array<rankings> = new Array(this.k.length);
  ngOnInit(): void {
    this.k.forEach((d, i) => {
      const s: rankings = { id: i, current: this.kb[i], proposed: this.k[i] };
      this.dist.push({ id: i,values: d });
      this.rankdata[i] = s;
    });
    this.curr = this.rankdata.map(d => d.current);
    this.prop = this.rankdata.map(d => d.proposed);
  }
}
