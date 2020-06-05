import {ModelDTO} from '../model/ModelDTO';
export class BrandDTO {
  id: number;
  name: string;
  models: Set<ModelDTO>;
}
