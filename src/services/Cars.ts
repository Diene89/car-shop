import { ICar, CarZodSchema } from '../interfaces/ICar';
import { IModel } from '../interfaces/IModel';
import MongoService from './MongoService';

export default class CarService extends MongoService<ICar> {
  constructor(_model: IModel<ICar>, _carSchema = CarZodSchema) {
    super(_model);
  }
}
