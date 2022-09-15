import { Router } from 'express';
import CarController from '../controllers/Cars';
import CarModel from '../models/Cars';
import CarService from '../services/Cars';

const model = new CarModel();
const service = new CarService(model);
const controller = new CarController(service);

const routeCar = Router();

routeCar.post('/', (req, res) => controller.create(req, res));

routeCar.get('/', (req, res) => controller.read(req, res));

routeCar.get('/:id', (req, res) => controller.readOne(req, res));

routeCar.put('/:id', (req, res) => controller.update(req, res));

routeCar.delete('/:id', (req, res) => controller.delete(req, res));

export default routeCar;