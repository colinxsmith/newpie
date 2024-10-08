import { Component} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TwopiechartsComponent } from "./twopiecharts/twopiecharts.component";
import { BarchartComponent } from "./barchart/barchart.component";
export interface portfolio {
  rankingValue: number;
  rankingDistribution: {
      ranking: string;
      name: string;
      value: number;
  }[];
};
export interface ranking  {
  current:portfolio;
  proposed:portfolio;
};
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TwopiechartsComponent, BarchartComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent  {
  title = 'New Charts for Charles Stanley';
  assetRanking:ranking={
    "current": {
        "rankingValue": 3.456,
        "rankingDistribution": [
            {
                "ranking": "6",
                "name": "Bond",
                "value": 3.6
            },
            {
                "ranking": "6",
                "name": "Bond Fund",
                "value": 2.1
            },
            {
                "ranking": "5",
                "name": "EQ UK",
                "value": 9.5
            },
            {
                "ranking": "5",
                "name": "EQ Intl",
                "value": 4.5
            },
            {
                "ranking": "5",
                "name": "Sovereign Bond",
                "value": 7.5
            },
            {
                "ranking": "5",
                "name": "MX Fund",
                "value": 12.5
            },
            {
                "ranking": "4",
                "name": "PR FUND",
                "value": 22.5
            },
            {
                "ranking": "4",
                "name": "EQ FUND",
                "value": 15.5
            },
            {
                "ranking": "4",
                "name": "SP",
                "value": 20
            },
            {
                "ranking": "1",
                "name": "CASH",
                "value": 0.3
            },
            {
                "ranking": "1",
                "name": "ALT",
                "value": 2
            }
        ]
    },
    "proposed": {
        "rankingValue": 3.765,
        "rankingDistribution": [
            {
                "ranking": "6",
                "name": "Bond",
                "value": 3.6
            },
            {
                "ranking": "6",
                "name": "Bond Fund",
                "value": 2.1
            },
            {
                "ranking": "5",
                "name": "EQ UK",
                "value": 9.5
            },
            {
                "ranking": "5",
                "name": "EQ Intl",
                "value": 4.5
            },
            {
                "ranking": "5",
                "name": "Sovereign Bond",
                "value": 7.5
            },
            {
                "ranking": "5",
                "name": "EQ IT",
                "value": 4.5
            },
            {
                "ranking": "5",
                "name": "MX Fund",
                "value": 5.2
            },
            {
                "ranking": "5",
                "name": "MX Fund2",
                "value": 3.3
            },
            {
                "ranking": "4",
                "name": "PR FUND",
                "value": 22.5
            },
            {
                "ranking": "4",
                "name": "EQ FUND",
                "value": 15.5
            },
            {
                "ranking": "4",
                "name": "SP",
                "value": 10
            },
            {
                "ranking": "4",
                "name": "SP2",
                "value": 5
            },
            {
                "ranking": "4",
                "name": "SP3",
                "value": 5
            },
            {
                "ranking": "1",
                "name": "CASH",
                "value": 0.3
            },
            {
                "ranking": "1",
                "name": "ALT",
                "value": 2
            }
        ]
    }
  };
}
