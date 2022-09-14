import { ICar } from '../interfaces/ICar';
import MongoController from './MongoController';

export default class CarController extends MongoController<ICar> {}
