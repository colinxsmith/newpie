import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TwopiechartsComponent } from "./twopiecharts/twopiecharts.component";
import { BarchartComponent } from "./barchart/barchart.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TwopiechartsComponent, BarchartComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'New Charts for Charles Stanley';
  k=[3,4,11,6,14,18,9,1,10,8];
  kb=this.k.map(k=>k).reverse();
  prop={'values':this.k};
  curr={'values':this.kb};
}
