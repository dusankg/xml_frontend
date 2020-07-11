import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Gps } from '../model/Gps';
import { interval, Subscription } from 'rxjs';
import { GpsMapService } from './gps-map.service';
import {Router} from '@angular/router';
import { VehicleGpsDTO } from '../model/VehicleGpsDTO';


@Component({
  selector: 'app-gps-map',
  templateUrl: './gps-map.component.html',
  styleUrls: ['./gps-map.component.css']
})
export class GpsMapComponent implements OnInit {

  subscription: Subscription;
 
  lat: number = 45.25738;
  lng: number = 19.83406;
  zoom: number = 15;
  source = interval(5000);
  vehicleGps: VehicleGpsDTO;

  constructor(private service: GpsMapService, private  router: Router) {
      this.subscription = new Subscription();
      this.vehicleGps = new VehicleGpsDTO();
   }

  ngOnInit(): void {
     this.subscription = this.source.subscribe(val => this.updateCoordinates());
  }

  updateCoordinates(){
      //this.service.updateCoordinates(1).subscribe(response => {this.lat = response.latitude; this.lng = response.longitude;})
      this.lat = 45.26112;
      this.lng= 19.82653;
    }

}
