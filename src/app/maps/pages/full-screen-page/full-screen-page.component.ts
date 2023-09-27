import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import {Map} from 'mapbox-gl';

@Component({
  templateUrl: './full-screen-page.component.html',
  styleUrls: [ './full-screen-page.component.css'
  ]
})
export class FullScreenPageComponent implements AfterViewInit{

  @ViewChild('map')
  public divMap?: ElementRef;

  ngAfterViewInit(): void {

    if(!this.divMap) throw 'El Elemento HTML no fue encontrado';

    const map = new Map({
      container: this.divMap?.nativeElement, // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: [-74.21157728574313, 4.706900620947451], // starting position [lng, lat]
      zoom: 15, // starting zoom
    });
  }


}
