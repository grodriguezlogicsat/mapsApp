import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import {LngLat, Map, Marker} from 'mapbox-gl';


interface MarkerAndColor {
  marker:Marker;
  color:string;
}

interface PlainMarker{
  color:string;
  lngLat: number[];
}

@Component({
  templateUrl: './markers-page.component.html',
  styleUrls: [ './markers-page.component.css'
  ]
})
export class MarkersPageComponent implements AfterViewInit{

  public map?: Map;
  public currenCenterLngLat: LngLat = new LngLat(-56.138465817161176, -34.90564989380244)
  public markers: MarkerAndColor[] = [];

  @ViewChild('map')
  public divMap?: ElementRef;

  ngAfterViewInit(): void {

    if(!this.divMap) throw 'El Elemento HTML no fue encontrado';

    this.map = new Map({
      container: this.divMap?.nativeElement, // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: this.currenCenterLngLat, // starting position [lng, lat]
      zoom: 15, // starting zoom
    });

    this.readToLocalStorage();

    const markerHtml = document.createElement('div');
    markerHtml.innerHTML = 'GRodriguez'

    const marker =new Marker({
      // color:'#fafafa'
      element: markerHtml
    })
    .setLngLat(this.currenCenterLngLat)
    .addTo(this.map)
  }


  createMarker(){
    if(!this.map) return;

    const color = '#xxxxxx'.replace(/x/g, y=>(Math.random()*16|0).toString(16));
    const lngLat =this.map.getCenter()
    this.addMarker(lngLat, color);
  }

  addMarker(lngLat: LngLat, color:string ){
    if(!this.map) return;

    const marker = new Marker({
      color: color,
      draggable:true
    }).setLngLat(lngLat)
    .addTo(this.map);

    this.markers.push({color, marker});
    this.saveToLocalStorage()

    marker.on('dragend', () =>{
      this.saveToLocalStorage();
    })

  }

  deleteMarker(index: number){
    this.markers[index].marker.remove();
    this.markers.splice(index,1);
  }

  flyTo(marker: Marker){
    this.map?.flyTo({
      zoom:15,
      center:marker.getLngLat()
    })
  }

  saveToLocalStorage(){
    const plainMarkers: PlainMarker[] = this.markers.map(({color, marker}) =>{
      return{
        color,
        lngLat: marker.getLngLat().toArray()
      }
    })

    localStorage.setItem('plainMarkers', JSON.stringify(plainMarkers))

  }

  readToLocalStorage(){
    const plainMarkerString = localStorage.getItem('plainMarkers') ?? '[]';
    const plainMarker: PlainMarker[] = JSON.parse(plainMarkerString);
    plainMarker.forEach(({color, lngLat}) =>{
      const [lng,lat] = lngLat;
      const coords = new LngLat(lng, lat);
      this.addMarker( coords, color);
    })
  }
}
