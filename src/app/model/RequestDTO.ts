import {VehicleForRequestDTO} from './VehicleForRequestDTO';

export class RequestDTO {
  id: number;
  owner_username: string;
  status: string;
  vehicles: Set<VehicleForRequestDTO>;
}
