import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {ControlPosition} from '@agm/core/services/google-maps-types';
import {ActivatedRoute, Params} from '@angular/router';
import {GoogleMapsAPIWrapper, MapsAPILoader} from '@agm/core';

declare var google: any;

@Component({
  selector: 'app-explore-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  @Input() initData;

  // @ViewChild('agmMap') map: any;

  public lat = 48.85661400000001;
  public lng = 2.3522219000000177;
  public mapService: any;
  public mapServiceActive = false;
  public map: any;
  private queryParams: any;
  public mapInitZoom: number = 15;

  public zoomControlOptions = {
    position: ControlPosition.TOP_LEFT,
    style: 'opacity: 1'
  };

  public mapStyles = [
    {
      'featureType': 'water',
      'elementType': 'geometry.fill',
      'stylers': [
        {
          'color': '#a4ddf5'
        }
      ]
    },

    {
      'featureType': 'poi.attraction',
      'stylers': [
        {
          'visibility': 'off'
        }
      ]
    },
    {
      'featureType': 'poi.business',
      'stylers': [
        {
          'visibility': 'off'
        }
      ]
    },
    {
      'featureType': 'poi.government',
      'stylers': [
        {
          'visibility': 'off'
        }
      ]
    },
    {
      'featureType': 'poi.medical',
      'stylers': [
        {
          'visibility': 'off'
        }
      ]
    },
    {
      'featureType': 'poi.park',
      'elementType': 'labels.text',
      'stylers': [
        {
          'visibility': 'off'
        }
      ]
    },
    {
      'featureType': 'poi.place_of_worship',
      'stylers': [
        {
          'visibility': 'off'
        }
      ]
    },
    {
      'featureType': 'poi.school',
      'stylers': [
        {
          'visibility': 'off'
        }
      ]
    },
    {
      'featureType': 'poi.sports_complex',
      'stylers': [
        {
          'visibility': 'off'
        }
      ]
    }

  ];


  constructor(private activatedRoute: ActivatedRoute,
              private mapsAPILoader: MapsAPILoader,
              public gMap: GoogleMapsAPIWrapper) {
  }

  getCoords() {
    const geoCode = new google.maps.Geocoder();

    geoCode.geocode({placeId: this.queryParams.id}, (res, status) => {
      const geo = res[0].geometry;

      this.map.setCenter(geo.location);
      this.map.fitBounds(geo.viewport);
    });

    /*    this.mapService.getDetails({placeId: this.queryParams.id}, (res, status) => {

          console.log(res);

          if (res.types.includes('country')) {
            this.mapInitZoom = 4;
          }
          else {
            this.mapInitZoom = 15;
          }

          const coOrds =
          this.lat = coOrds.lat();
          this.lng = coOrds.lng();
          const position = new google.maps.LatLng(coOrds.lat(), coOrds.lng());

          this.map.panTo(position);


          /!*this.map.latitude = coOrds.lat();
          this.map.lng = coOrds.lng();*!/
          // console.log(this.lat);
          // console.log(this.lng);
        });*/
  }

  mapReady(e: any) {
    this.mapService = new google.maps.places.PlacesService(e);
    this.mapServiceActive = true;
    this.map = e;
    if (this.queryParams.id) {
      this.getCoords();
    }
  }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      this.queryParams = params;
      if (this.mapServiceActive) {
        this.getCoords();
      }
    });

    /*
    if (window.navigator && window.navigator.geolocation) {

      window.navigator.geolocation.getCurrentPosition(
        position => {
          console.log(1);
          console.log(position);

          /!*          this.lat = position.coords.latitude;
                    this.lng = position.coords.longitude;
                    console.log(this.lat);
                    console.log(this.lng);*!/
        },
        error => {
          console.log(2);
          console.log(error);
        },
        {
          maximumAge: Infinity,
          timeout: 5000
        }
      );
    }
    else {
      console.log('what');
    }*/

  }
}
