import { Component, OnInit } from '@angular/core';
import {CarDTO} from '../model/CarDTO';
import {CustomerDTO} from '../model/CustomerDTO';
import {AdminService} from '../admin/admin.service';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  users: Set<CustomerDTO>;

  constructor(private adminService: AdminService) { }

  ngOnInit(): void {
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
}
