import { Component, OnInit } from '@angular/core';
import {VehicleDTO} from '../model/VehicleDTO';
import { AddCarService } from './addCar.service';
import {Router} from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-add-car',
  templateUrl: './add-car.component.html',
  styleUrls: ['./add-car.component.css']
})
export class AddCarComponent implements OnInit {
  carDTO: VehicleDTO;
  brand: string;
  model: string;
  fuel_type : string;
  transmission: string;
  vehicle_class : string;
  price : number;
  mileage : number;
  companyUsername : string;
  startDate : Date;
  endDate : Date;
  limited_rent_mileage : boolean;
  allowed_mileage : number;
  collision_damage_waiver: boolean;
  child_seat: number;

  public brojac: number;
  public base64Image: string;
  public base64Images: Set<string>;

  constructor(private service: AddCarService, private  router: Router, private domSanitizer: DomSanitizer) {
    this.carDTO = new VehicleDTO();
    this.carDTO.images = new Array<string>();
    this.brojac = 0;
    this.base64Images = new Set<string>();
  }

  ngOnInit(): void {
    /*
    if (localStorage.getItem('role') !== 'admin'){
    this.router.navigate(['home']);
    }
    */
  }

  onSubmitCreate() {
    /*this.service.createCertificate(this.subjectData, CurValue, alias, tempate).subscribe(result => {
      alert('Successfully');
      location.reload();
    });*/
    const e = (document.getElementById('gasType')) as HTMLSelectElement;

    this.carDTO.brand = this.brand;
    this.carDTO.model = this.model;
    this.carDTO.fuelType = this.fuel_type;
    this.carDTO.transmission = this.transmission;
    this.carDTO.vehicleClass = this.vehicle_class;
    this.carDTO.price = this.price;
    this.carDTO.mileage = this.mileage;
    this.carDTO.companyUsername = this.companyUsername;
    this.carDTO.startDate = this.startDate;
    this.carDTO.endDate = this.endDate;
    this.carDTO.limitedRentMileage = this.limited_rent_mileage;
    this.carDTO.allowedMileage = this.allowed_mileage;
    this.carDTO.collisionDamageWaiver = this.collision_damage_waiver;
    this.carDTO.childSeat = this.child_seat;

    this.carDTO.fuelType = e.value;

    this.service.createCar(this.carDTO).subscribe(result => {
      alert('Successfully');
      this.router.navigate(['home']);
    });
  }

  changeListener($event): void {
    this.readThis($event.target);
  }

  readThis(inputValue: any): void {
    var file: File = inputValue.files[0];
    var myReader: FileReader = new FileReader();

    myReader.onloadend = (e) => {
      this.base64Image = myReader.result as string;
      this.base64Images.add(myReader.result as string);
      this.carDTO.images.push(myReader.result as string);
    }
    myReader.readAsDataURL(file);

  }

  removeImage(imageName: string){
    this.base64Images.delete(imageName);
    //this.carDTO.images.delete(imageName);
  }

}
