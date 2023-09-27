import { Component, Input, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import {LngLat, Map, Marker} from 'mapbox-gl';

@Component({
  selector: 'map-mini-map',
  templateUrl: './mini-map.component.html',
  styleUrls: ['./mini-map.component.css'
  ]
})
export class MiniMapComponent implements AfterViewInit{

  public map?: Map;
  public currenCenterLngLat: LngLat = new LngLat(-56.138465817161176, -34.90564989380244)

  @Input() lngLat?: [number,number];


  @ViewChild('map')
  public divMap?: ElementRef;


  ngAfterViewInit(): void {
    if(!this.divMap?.nativeElement) throw "Map Div Not Found"
    if(!this.lngLat) throw "LngLat can't be null"

    const [lng,lat] = this.lngLat;
    const coords = new LngLat(lng, lat);

    this.map = new Map({
      container: this.divMap?.nativeElement, // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: coords, // starting position [lng, lat]
      zoom: 15, // starting zoom
      interactive:false,
    });

    const marker = new Marker({
      // color: color,
      // draggable:true
    }).setLngLat(coords)
    .addTo(this.map);

  }

}
