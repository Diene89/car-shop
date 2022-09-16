import { Request, Response } from 'express';
import { IService } from '../interfaces/IService';

abstract class MongoController<T> {
  protected _service:IService<T>;
  invalidError = 'Invalid MongoId';

  constructor(service:IService<T>) {
    this._service = service;
  }

  public async create(
    req: Request, 
    res: Response<T>,
  ) {
    const created = await this._service.create(req.body);
    return res.status(201).json(created);
  }

  public async read(
    req: Request, 
    res: Response<T[]>,
  ) {
    const cars = await this._service.read();
    return res.status(200).json(cars);
  }

  public async readOne(
    req: Request,
    res: Response<T>,
  ) {
    const car = await this._service.readOne(req.params.id);
    return res.status(200).json(car);
  }

  public async update(
    req: Request,
    res: Response<T>,
  ) {
    const update = await this._service.update(req.params.id, req.body);
    return res.status(200).json(update);
  }

  public async delete(
    req: Request,
    res: Response<T>,
  ) {
    await this._service.delete(req.params.id);
    return res.status(204).end();
  }
}

export default MongoController;