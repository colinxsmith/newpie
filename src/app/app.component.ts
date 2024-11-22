import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'
import { RouterOutlet } from '@angular/router';
import { TwopiechartsComponent } from './twopiecharts/twopiecharts.component';
import { BarchartComponent } from './barchart/barchart.component';
import { PctbarComponent } from './pctbar/pctbar.component';
import { FanchartComponent } from './fanchart/fanchart.component';
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
export interface fchart {
    areas: {
        legend: string;
        colour: string;
        values: number[];
    }[][];
    lines: {
        legend: string;
        colour: string;
        type: string;
        values: number[];
    }[];
}

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterOutlet, CommonModule, TwopiechartsComponent, PctbarComponent, BarchartComponent, FanchartComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent {
    title = 'New Charts for Charles Stanley';
    fanChart = {
        'areas': [
            [
                {
                    'legend': '0-5 Percentile (-9.71% - -1.21%)',
                    'colour': '#fee6de',
                    'values': [
                        100, 81.52515119, 73.9667742, 74.0343259, 73.40487435, 70.41968659, 66.46486894, 66.17048431, 64.49797995, 65.07954254,
                        64.65515097, 59.47563691, 62.58254354, 63.67503044, 62.67118948, 63.07649147, 61.50264663, 60.03251252, 61.20425746,
                        59.35042534, 60.02300312
                    ]
                },
                {
                    'legend': '95-100 (12.01% - 22.74%)',
                    'colour': '#fee6de',
                    'values': [
                        100, 120.2178725, 132.9763868, 143.611229, 146.1713498, 157.873848, 165.6773378, 169.5576884, 181.1025587, 198.2134769,
                        202.1003569, 209.5327794, 207.1553986, 219.7162461, 233.322561, 238.4267563, 244.4441827, 262.7485066, 267.9523383,
                        279.6877548, 278.5197527
                    ]
                }
            ],
            [
                {
                    'legend': '5-15 Percentile (-1.21% - 1.15%)',
                    'colour': '#fcd3c4',
                    'values': [
                        100, 94.31445193, 92.78320676, 91.90357903, 91.2939122, 90.90089481, 90.75631778, 90.7087786, 90.6861952,
                        90.65362509, 90.77821022, 90.88472756, 91.21548324, 91.38059976, 91.8116976, 92.10545605, 92.52066607, 92.86064154,
                        93.23520924, 93.74122589, 94.08521112
                    ]

                },
                {
                    'legend': '85-95 Percentile (9.49% - 12.01%)',
                    'colour': '#fcd3c4',
                    'values': [
                        100, 120.2178725, 132.9763868, 143.611229, 146.1713498, 157.873848, 165.6773378, 169.5576884, 181.1025587, 198.2134769,
                        202.1003569, 209.5327794, 207.1553986, 219.7162461, 233.322561, 238.4267563, 244.4441827, 262.7485066, 267.9523383,
                        279.6877548, 278.5197527
                    ]
                }
            ],
            [
                {
                    'legend': '15-25 Percentile (1.15% - 2.58%)',
                    'colour': '#fabdab',
                    'values': [
                        100, 96.94318684, 96.39455058, 96.2983783, 96.36481207, 96.57385015, 96.91692406, 97.34175087, 97.75935603,
                        98.19276322, 98.81208997, 99.42257656, 100.0976781, 100.7442876, 101.3188735, 101.9850113, 102.786514, 103.550853,
                        104.2687428, 105.1004939, 105.9052475
                    ]
                },
                {
                    'legend': '75-85 Percentile (8.01% - 9.49%)',
                    'colour': '#fabdab',
                    'values': [
                        100, 105.8360256, 109.1945291, 112.1772617, 114.9681701, 117.6928431, 120.3650338, 122.944911, 125.575886, 128.1379134,
                        130.8037642, 133.3764468, 135.9226612, 138.6525799, 141.1677464, 143.9597555, 146.6406697, 149.2499755, 151.898579,
                        154.7116183, 157.3377108
                    ]
                }
            ],
            [
                {
                    'legend': '25-35 Percentile (2.58% - 3.72%)',
                    'colour': '#f6977f',
                    'values': [
                        100, 98.48386391, 98.59117845, 98.95981163, 99.50293576, 100.0311198, 100.6879248, 101.4333722, 102.2394937,
                        102.9626001, 103.8178677, 104.7460425, 105.5994917, 106.5508306, 107.4662904, 108.3440076, 109.3450002, 110.418744,
                        111.3602214, 112.4305739, 113.5811524
                    ]
                },
                {
                    'legend': '65-75 Percentile (6.85% - 8.01%)',
                    'colour': '#f6977f',
                    'values': [
                        100, 104.2627948, 106.8937112, 109.2506691, 111.5384561, 113.7528443, 116.0382822, 118.1544228, 120.3525746,
                        122.476844, 124.6130424, 126.7670571, 129.0042675, 131.2020521, 133.3435287, 135.5968644, 137.8296117, 140.0906068,
                        142.4877864, 144.7476939, 146.9767009
                    ]
                }
            ],
            [
                {
                    'legend': '35-45 Percentile (3.72% - 4.77%)',
                    'colour': '#f3705c',
                    'values': [
                        100, 99.72555561, 100.3082343, 101.0980283, 102.0075034, 102.8704245, 103.8378401, 104.8216123, 105.8855499,
                        106.9512118, 108.0423277, 109.2282828, 110.2659915, 111.4225427, 112.5657517, 113.7213538, 114.950587, 116.2181605,
                        117.5114181, 118.7146136, 120.0606516
                    ]
                },
                {
                    'legend': '55-65 Percentile (5.79% - 6.85%)',
                    'colour': '#f3705c',
                    'values': [
                        100, 103.0284803, 105.0989489, 106.9862878, 108.8488007, 110.7105891, 112.5474876, 114.412709, 116.2568825,
                        118.0422221, 119.865928, 121.7172738, 123.6587515, 125.5971046, 127.3829853, 129.3367791, 131.2001427,
                        133.1643284, 135.2239641, 137.2157483, 139.2742591
                    ]
                }
            ],
            [
                {
                    'legend': '45-55 Percentile (4.77% - 5.79%)',
                    'colour': '#ed1b2c',
                    'values': [
                        100, 100.8201016, 101.8934419, 103.0488503, 104.2538853, 105.4523116, 106.6915278, 107.9734368, 109.2889881,
                        110.6070293, 111.9080968, 113.2503969, 114.5932875, 115.9690258, 117.4245413, 118.7819594, 120.2472993,
                        121.7088, 123.2087931, 124.7313817, 126.2069092
                    ]
                },
                {
                    'legend': '45-55 Percentile (4.77% - 5.79%)',
                    'colour': '#ed1b2c',
                    'values': [
                        100, 101.9163867, 103.4655985, 104.9751789, 106.4911819, 108.0111717, 109.5131731, 111.1143175, 112.6645658,
                        114.1780486, 115.769861, 117.371306, 118.98326, 120.6170213, 122.2499261, 123.8962259, 125.4940965, 127.2388879,
                        129.0082188, 130.8293137, 132.5031038
                    ]
                }
            ]
        ],
        'lines': [
            {
                'legend': 'Mean Line',
                'colour': '#ed1b2c',
                'type': 'thick',
                'values': [
                    100, 101.3791144, 102.7887534, 104.2007943, 105.6476765, 107.1027879, 108.5972258, 110.1083862, 111.629564, 113.138157,
                    114.7098033, 116.3056165, 117.9062566, 119.5528414, 121.1614306, 122.8313323, 124.5396604, 126.2524429, 128.0040327,
                    129.758176, 131.5282613
                ]
            },
            {
                'legend': 'Target Line',
                'colour': '#000000',
                'type': 'dotted',
                'values': [
                    100, 100.4962932, 100.9950494, 101.4962809, 102, 102.506219, 103.0149504, 103.5262065, 104.04, 104.5563434, 105.0752494,
                    105.5967307, 106.1208, 106.6474703, 107.1767544, 107.7086653, 108.243216, 108.7804197, 109.3202895, 109.8628386,
                    110.4080803
                ]
            }
        ]
    }

    pctEvDiverse = {
        'current': {
            'pctEquityVol': 20,
            'weightedPctEquityVol': 40
        },
        'proposed': {
            'pctEquityVol': 50,
            'weightedPctEquityVol': 100
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
