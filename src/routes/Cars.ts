import { Router } from 'express';
import CarController from '../controllers/Cars';
import CarModel from '../models/Cars';
import CarService from '../services/Cars';

const model = new CarModel();
const service = new CarService(model);
const controller = new CarController(service);

const route = Router();

route.post('/', (req, res) => controller.create(req, res));

route.get('/', (req, res) => controller.read(req, res));

route.get('/:id', (req, res) => controller.readOne(req, res));

route.put('/:id', (req, res) => controller.update(req, res));

route.delete('/:id', (req, res) => controller.delete(req, res));

export default route;