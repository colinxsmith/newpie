import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TwopiechartsComponent } from './twopiecharts/twopiecharts.component';
import { BarchartComponent } from './barchart/barchart.component';
import { PctbarComponent } from './pctbar/pctbar.component';
import {FanchartComponent}from './fanchart/fanchart.component';
export interface portfolio {
    rankingValue: number | null;
    rankingDistribution: {
        ranking: string;
        name: string;
        value: number;
    }[];
};
export interface pctEvDiverse {
    current: {
        pctEquityVol: number;
        weightedPctEquityVol: number;
    };
    proposed: {
        pctEquityVol: number;
        weightedPctEquityVol: number;
    };
};
export interface ranking {
    current: portfolio;
    proposed: portfolio;
};
@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterOutlet, TwopiechartsComponent, PctbarComponent, BarchartComponent,FanchartComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent {
    title = 'New Charts for Charles Stanley';
    pctEvDiverse = {
        'current': {
            'pctEquityVol': 20,
            'weightedPctEquityVol': 40
        },
        'proposed': {
            'pctEquityVol': 50,
            'weightedPctEquityVol':100
        }
    };
    assetRanking: ranking = {
        'current': {
            'rankingValue': null,
            'rankingDistribution': [
                {
                    'ranking': '-1',
                    'name': 'International Equity',
                    'value': 0
                },
                {
                    'ranking': '6',
                    'name': 'Property',
                    'value': 2.68
                },
                {
                    'ranking': '-1',
                    'name': 'Alternatives',
                    'value': 0
                },
                {
                    'ranking': '-1',
                    'name': 'UK Equity',
                    'value': 0
                },
                {
                    'ranking': '-1',
                    'name': 'Fixed Income',
                    'value': 0
                },
                {
                    'ranking': '-1',
                    'name': 'Cash',
                    'value': 0
                },
                {
                    'ranking': '6',
                    'name': 'International Equity',
                    'value': 7.13
                },
                {
                    'ranking': '5',
                    'name': 'International Equity',
                    'value': 28.82
                },
                {
                    'ranking': '6',
                    'name': 'Fixed Income',
                    'value': 2.25
                },
                {
                    'ranking': '4',
                    'name': 'Alternatives',
                    'value': 10.08
                },
                {
                    'ranking': '5',
                    'name': 'Fixed Income',
                    'value': 3.09
                },
                {
                    'ranking': '5',
                    'name': 'Alternatives',
                    'value': 4.47
                },
                {
                    'ranking': '4',
                    'name': 'Fixed Income',
                    'value': 6.93
                },
                {
                    'ranking': '-1',
                    'name': 'Property',
                    'value': 0
                },
                {
                    'ranking': '6',
                    'name': 'Alternatives',
                    'value': 5.43
                },
                {
                    'ranking': '3',
                    'name': 'Fixed Income',
                    'value': 11.53
                },
                {
                    'ranking': '1',
                    'name': 'Cash',
                    'value': 3.67
                },
                {
                    'ranking': '5',
                    'name': 'UK Equity',
                    'value': 10.57
                },
                {
                    'ranking': '6',
                    'name': 'UK Equity',
                    'value': 1.63
                },
                {
                    'ranking': '3',
                    'name': 'Alternatives',
                    'value': 1.71
                }
            ]
        },
        'proposed': {
            'rankingValue': null,
            'rankingDistribution': [
                {
                    'ranking': '-1',
                    'name': 'International Equity',
                    'value': 0
                },
                {
                    'ranking': '6',
                    'name': 'Property',
                    'value': 2.68
                },
                {
                    'ranking': '-1',
                    'name': 'Alternatives',
                    'value': 0
                },
                {
                    'ranking': '-1',
                    'name': 'UK Equity',
                    'value': 0
                },
                {
                    'ranking': '-1',
                    'name': 'Fixed Income',
                    'value': 0
                },
                {
                    'ranking': '-1',
                    'name': 'Cash',
                    'value': 0
                },
                {
                    'ranking': '6',
                    'name': 'International Equity',
                    'value': 7.13
                },
                {
                    'ranking': '5',
                    'name': 'International Equity',
                    'value': 28.82
                },
                {
                    'ranking': '6',
                    'name': 'Fixed Income',
                    'value': 2.25
                },
                {
                    'ranking': '4',
                    'name': 'Alternatives',
                    'value': 10.08
                },
                {
                    'ranking': '5',
                    'name': 'Fixed Income',
                    'value': 3.09
                },
                {
                    'ranking': '5',
                    'name': 'Alternatives',
                    'value': 4.47
                },
                {
                    'ranking': '4',
                    'name': 'Fixed Income',
                    'value': 6.93
                },
                {
                    'ranking': '-1',
                    'name': 'Property',
                    'value': 0
                },
                {
                    'ranking': '6',
                    'name': 'Alternatives',
                    'value': 5.43
                },
                {
                    'ranking': '3',
                    'name': 'Fixed Income',
                    'value': 11.53
                },
                {
                    'ranking': '1',
                    'name': 'Cash',
                    'value': 3.67
                },
                {
                    'ranking': '5',
                    'name': 'UK Equity',
                    'value': 10.57
                },
                {
                    'ranking': '6',
                    'name': 'UK Equity',
                    'value': 1.63
                },
                {
                    'ranking': '3',
                    'name': 'Alternatives',
                    'value': 1.71
                }
            ]
        }
    };
    assetRanking1: ranking = {
        'current': {
            'rankingValue': 3.456,
            'rankingDistribution': [
                {
                    'ranking': '6',
                    'name': 'Bond',
                    'value': 3.6
                },
                {
                    'ranking': '6',
                    'name': 'Bond Fund',
                    'value': 2.1
                },
                {
                    'ranking': '5',
                    'name': 'EQ UK',
                    'value': 9.5
                },
                {
                    'ranking': '5',
                    'name': 'EQ Intl',
                    'value': 4.5
                },
                {
                    'ranking': '5',
                    'name': 'Sovereign Bond',
                    'value': 7.5
                },
                {
                    'ranking': '5',
                    'name': 'MX Fund',
                    'value': 12.5
                },
                {
                    'ranking': '4',
                    'name': 'PR FUND',
                    'value': 22.5
                },
                {
                    'ranking': '4',
                    'name': 'EQ FUND',
                    'value': 15.5
                },
                {
                    'ranking': '4',
                    'name': 'SP',
                    'value': 20
                },
                {
                    'ranking': '1',
                    'name': 'CASH',
                    'value': 0.3
                },
                {
                    'ranking': '1',
                    'name': 'ALT',
                    'value': 2
                }
            ]
        },
        'proposed': {
            'rankingValue': 3.765,
            'rankingDistribution': [
                {
                    'ranking': '6',
                    'name': 'Bond',
                    'value': 3.6
                },
                {
                    'ranking': '6',
                    'name': 'Bond Fund',
                    'value': 2.1
                },
                {
                    'ranking': '5',
                    'name': 'EQ UK',
                    'value': 9.5
                },
                {
                    'ranking': '5',
                    'name': 'EQ Intl',
                    'value': 4.5
                },
                {
                    'ranking': '5',
                    'name': 'Sovereign Bond',
                    'value': 7.5
                },
                {
                    'ranking': '5',
                    'name': 'EQ IT',
                    'value': 4.5
                },
                {
                    'ranking': '5',
                    'name': 'MX Fund',
                    'value': 5.2
                },
                {
                    'ranking': '5',
                    'name': 'MX Fund2',
                    'value': 3.3
                },
                {
                    'ranking': '4',
                    'name': 'PR FUND',
                    'value': 22.5
                },
                {
                    'ranking': '4',
                    'name': 'EQ FUND',
                    'value': 15.5
                },
                {
                    'ranking': '4',
                    'name': 'SP',
                    'value': 10
                },
                {
                    'ranking': '4',
                    'name': 'SP2',
                    'value': 5
                },
                {
                    'ranking': '4',
                    'name': 'SP3',
                    'value': 5
                },
                {
                    'ranking': '1',
                    'name': 'CASH',
                    'value': 0.3
                },
                {
                    'ranking': '1',
                    'name': 'ALT',
                    'value': 2
                }
            ]
        }
    };
}
