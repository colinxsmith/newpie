import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pctbar',
  standalone: true,
  imports: [CommonModule, PctbarComponent],
  templateUrl: './pctbar.component.html',
  styleUrl: './pctbar.component.scss'
})
export class PctbarComponent {

}
