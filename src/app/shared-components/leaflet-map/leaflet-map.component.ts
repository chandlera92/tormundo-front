import {Component, OnInit} from '@angular/core';

import * as L from 'leaflet';

@Component({
  selector: 'app-leaflet-map',
  templateUrl: './leaflet-map.component.html',
  styleUrls: ['./leaflet-map.component.scss']
})
export class LeafletMapComponent implements OnInit {

  public map: any;

  constructor() {
  }

  ngOnInit() {
    this.initMap();
    this.correctZoomPositioning();
  }

  // todo: Add this as input

  correctZoomPositioning() {
    this.map.zoomControl.setPosition('topright');

  }

  initMap() {
    // set up the map
    this.map = new L.map('map');

    // create the tile layer with correct attribution
    const osmUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
    const osm = new L.TileLayer(osmUrl, {});

    // start the map in South-East England
    // this.map.setView(new L.LatLng(51.3, 0.7), 9);
    this.map.addLayer(osm, {
      zoomControl: true
    });

    const france = [46.227638, 2.213749];
    const myBounds = new L.LatLngBounds([france]);

    console.log(myBounds)


    this.map.fitBounds(myBounds);


  }

}
