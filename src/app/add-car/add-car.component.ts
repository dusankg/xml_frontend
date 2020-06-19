import { Component, OnInit } from '@angular/core';
import {VehicleDTO} from '../model/VehicleDTO';
import { AddCarService } from './addCar.service';
import {Router} from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import {BrandDTO} from '../model/BrandDTO';
import {FuelType} from '../model/FuelType';
import {TransmissionTypeDTO} from '../model/TransmissionTypeDTO';
import {VehicleClass} from '../model/VehicleClass';
import {ModelDTO} from '../model/ModelDTO';
import {AdminService} from '../admin/admin.service';

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

  brands: Set<BrandDTO>;
  fuelTypes: Set<FuelType>;
  transmissions: Set<TransmissionTypeDTO>;
  vehicleClasses: Set<VehicleClass>;
  models: Set<String>;

  public brojac: number;
  public base64Image: string;
  public base64Images: Set<string>;

  constructor(private service: AddCarService, private  router: Router, private domSanitizer: DomSanitizer) {
    this.carDTO = new VehicleDTO();
    this.carDTO.images = new Array<string>();
    this.brojac = 0;
    this.base64Images = new Set<string>();

    this.brands = new Set<BrandDTO>();
    this.fuelTypes = new Set<FuelType>();
    this.transmissions = new Set<TransmissionTypeDTO>();
    this.vehicleClasses = new Set<VehicleClass>();
    this.models = new Set<String>();

  }

  ngOnInit(): void {
    this.getAllBrands();
    this.getAllFuelTypes();
    this.getAllTransmissions();
    this.getAllVehicleClasses();
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
    this.carDTO.images = Array.from(this.base64Images);
    this.service.createCar(this.carDTO).subscribe(result => {
      alert('Successfully');
      this.router.navigate(['home']);
    });
    location.reload();
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
      //this.carDTO.images.push(myReader.result as string);
    }
    myReader.readAsDataURL(file);

  }

  removeImage(imageName: string){
    this.base64Images.delete(imageName);
  }

  public getAllBrands(){
    this.service.getAllBrands().subscribe(response => this.brands = response);
  }
  public getAllFuelTypes(){
    this.service.getAllFuelTypes().subscribe(response => this.fuelTypes = response);
  }
  public getAllTransmissions(){
    this.service.getAllTransmissions().subscribe(response => this.transmissions = response);
  }
  public getAllVehicleClasses(){
    this.service.getAllVehicleClasses().subscribe(response => this.vehicleClasses = response);
  }

  public getModelsFromBrand(){
    this.models = new Set<String>();
    // tslint:disable-next-line:prefer-const
    console.log('Pozove se');
    for (var item of this.brands.values()){
      if(item.name === this.brand){
        for(var pom of item.models.values()){
          this.models.add(pom.modelName);
        }
      }
    }
  }

}
