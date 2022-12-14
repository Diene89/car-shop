import { CarZodSchema } from '../interfaces/ICar';
import { IModel } from '../interfaces/IModel';
import { IService } from '../interfaces/IService';
import { ErrorTypes } from '../middlewares/errorCatalog';

abstract class MongoService<T> implements IService<T> {
  constructor(protected _model:IModel<T>, protected _carSchema = CarZodSchema) {
  }

  public async create(obj:T):Promise<T> {
    const parsed = this._carSchema.safeParse(obj);
    if (!parsed.success) {
      throw parsed.error;
    }
    const created = await this._model.create(obj);
    return created;
  }

  public async read(): Promise<T[]> {
    const cars = await this._model.read();
    return cars;
  }

  public async readOne(_id:string):Promise<T> {
    const car = await this._model.readOne(_id);
    if (!car) throw Error(ErrorTypes.EntityNotFound);
    return car;
  }

  public async update(_id:string, obj: T): Promise<T> {
    const parsed = CarZodSchema.safeParse(obj);
    if (!parsed.success) throw Error(ErrorTypes.InvalidMongoId);
    const update = await this._model.update(_id, obj);
    if (!update) throw Error(ErrorTypes.EntityNotFound);
  
    return update;
  }

  public async delete(_id:string): Promise<T> {
    const car = await this._model.delete(_id);
    if (!car) throw Error(ErrorTypes.EntityNotFound);
    return car;
  }
}

export default MongoService;