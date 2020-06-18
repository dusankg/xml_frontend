import { Component, OnInit } from '@angular/core';
import {VehicleDTO} from '../model/VehicleDTO';
import {CustomerDTO} from '../model/CustomerDTO';
import {AdminService} from '../admin/admin.service';
import {BrandDTO} from '../model/BrandDTO';
import {FuelType} from '../model/FuelType';
import {TransmissionTypeDTO} from '../model/TransmissionTypeDTO';
import {VehicleClass} from '../model/VehicleClass';
import {ModelDTO} from '../model/ModelDTO';
import {Observable} from 'rxjs';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  users: Set<CustomerDTO>;
  newBrandName: string;
  newFuelTypeName: string;
  newTransmissionName: string;
  newClassName: string;
  selectedBrandNameFormodel: string;
  newModelName: string;

  newBrandDTO: BrandDTO;
  newFuelTypeDTO: FuelType;
  newTransmissionDTO: TransmissionTypeDTO;
  newVehicleClassDTO: VehicleClass;
  newModelDTO: ModelDTO;

  brands: Set<BrandDTO>;
  fuelTypes: Set<FuelType>;
  transmissions: Set<TransmissionTypeDTO>;
  vehicleClasses: Set<VehicleClass>;
  models: Set<ModelDTO>;

  constructor(private adminService: AdminService) {
    this.newBrandDTO = new BrandDTO();
    this.newFuelTypeDTO = new FuelType();
    this.newTransmissionDTO = new TransmissionTypeDTO();
    this.newVehicleClassDTO = new VehicleClass();
    this.newModelDTO = new ModelDTO();

    this.brands = new Set<BrandDTO>();
    this.fuelTypes = new Set<FuelType>();
    this.transmissions = new Set<TransmissionTypeDTO>();
    this.vehicleClasses = new Set<VehicleClass>();
    this.models = new Set<ModelDTO>();
  }

  ngOnInit(): void {
    this.getAllBrands();
    this.getAllFuelTypes();
    this.getAllTransmissions();
    this.getAllVehicleClasses();
  }

  private getAllUsers(){
    this.adminService.getAllUsers();
  }

  public blockUser(userId: number){
    this.adminService.blockUser(userId);
  }

  public activateUser(userId: number){
    this.adminService.activateUser(userId);
  }
  public deleteUser(userId: number){
    this.adminService.deleteUser(userId);
  }

  public getAllBrands(){
    this.adminService.getAllBrands().subscribe(response => this.brands = response);
  }
  public getAllFuelTypes(){
    this.adminService.getAllFuelTypes().subscribe(response => this.fuelTypes = response);
  }
  public getAllTransmissions(){
    this.adminService.getAllTransmissions().subscribe(response => this.transmissions = response);
  }
  public getAllVehicleClasses(){
    this.adminService.getAllVehicleClasses().subscribe(response => this.vehicleClasses = response);
  }
  public deleteBrand(name: string){
    this.adminService.deleteBrand(name).subscribe();
    window.location.reload();
  }
  public deleteFuelType(name: string){
    this.adminService.deleteFuelType(name).subscribe();
    window.location.reload();
  }
  public deleteTransmission(name: string){
    this.adminService.deleteTransmission(name).subscribe();
    window.location.reload();
  }
  public deleteClass(name: string){
    this.adminService.deleteClass(name).subscribe();
    window.location.reload();
  }
  public deleteModel(name: string){
    this.adminService.deleteModel(name).subscribe();
    window.location.reload();
    }


  public addNewBrand(){
    this.newBrandDTO.name = this.newBrandName;
    this.adminService.addNewBrand(this.newBrandDTO).subscribe(result => {
      alert('Successfully');
    });
    window.location.reload();
  }

  public addNewModel(){
    this.newModelDTO.modelName = this.newModelName;
    this.newModelDTO.brandName = this.selectedBrandNameFormodel;
    this.adminService.addNewModel(this.newModelDTO).subscribe(result => {
      alert('Successfully');
    });
    window.location.reload();
  }

  public addNewFuelType(){
    this.newFuelTypeDTO.name = this.newFuelTypeName;
    this.adminService.addNewFuelType(this.newFuelTypeDTO).subscribe(result => {
      alert('Successfully');
    });
    window.location.reload();
  }
  public addNewTransmission(){
    this.newTransmissionDTO.name = this.newTransmissionName;
    this.adminService.addNewTransmission(this.newTransmissionDTO).subscribe(result => {
      alert('Successfully');
    });
    window.location.reload();
  }
  public addNewClass(){
    this.newVehicleClassDTO.name = this.newClassName;
    this.adminService.addNewClass(this.newVehicleClassDTO).subscribe(result => {
      alert('Successfully');
    });
    window.location.reload();
  }

}
