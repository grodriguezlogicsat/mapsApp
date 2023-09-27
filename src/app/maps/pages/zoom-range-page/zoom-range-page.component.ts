import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import {LngLat, Map} from 'mapbox-gl';

@Component({
  templateUrl: './zoom-range-page.component.html',
  styleUrls: [ './zoom-range-page.component.css'
  ]
})
export class ZoomRangePageComponent implements AfterViewInit, OnDestroy{


  @ViewChild('map')
  public divMap?: ElementRef;

  public zoom: number = 15;
  public map?: Map;
  public currenCenterLngLat: LngLat = new LngLat(-56.138465817161176, -34.90564989380244)

  ngAfterViewInit(): void {

    if(!this.divMap) throw 'El Elemento HTML no fue encontrado';

    this.map = new Map({
      container: this.divMap?.nativeElement, // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: this.currenCenterLngLat, // starting position [lng, lat]
      zoom: this.zoom, // starting zoom
    });

    this.mapListeners();
  }

  ngOnDestroy(): void {
    this.map?.remove();
  }

  mapListeners():void{
    if(!this.map) throw 'El mapa no esta creado.'

    this.map.on('zoom', (ev) =>{
      this.zoom = this.map!.getZoom();
    })

    this.map.on('zoomend', (ev) =>{
      if(this.map!.getZoom() < 18) return;
      this.map!.zoomTo(18);
    })

  this.map.on('move', () =>{
      this.currenCenterLngLat = this.map!.getCenter();
      const {lng, lat} = this.currenCenterLngLat;

    })
  }

  zoomIn(){
    this.map?.zoomIn();
  }

  zoomOut(){
    this.map?.zoomOut();
  }


  zoomChanged(value: string){
    this.zoom = Number(value);
    this.map!.zoomTo(this.zoom);
  }

}
