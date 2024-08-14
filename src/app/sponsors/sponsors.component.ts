import { Component } from '@angular/core';

export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
}

@Component({
  selector: 'app-sponsors',
  templateUrl: './sponsors.component.html',
  styleUrls: ['./sponsors.component.scss']
})
export class SponsorsComponent {
  tiles: Tile[] = [
    {text: '../../../assets/images/RBHS_REVWHITE.png', cols: 2, rows: 2, color: '#000000'},
    {text: '../../../assets/images/RWJBH.png', cols: 2, rows: 2, color: 'white'},
    {text: '', cols: 1, rows: 1, color: '#cc0033'},
    {text: '', cols: 2, rows: 1, color: 'black'},
  ];
}
