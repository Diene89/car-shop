import * as sinon from 'sinon';
import chai from 'chai';
import { Model } from 'mongoose';
import CarController from '../../../controllers/Cars';
import CarService from '../../../services/Cars';
import CarModel from '../../../models/Cars';
import { ICar } from '../../../interfaces/ICar';
import { Request, Response } from 'express';
import MongoController from '../../../controllers/MongoController';
const { expect } = chai;

const carMock: ICar = {
  model: "Ferrari Maranello",
  year: 1963,
  color: "red",
  buyValue: 3500000,
  seatsQty: 2,
  doorsQty: 2
}

const carMockWithId: ICar & {_id: string} = {
  model: "Ferrari Maranello",
  year: 1963,
  color: "red",
  buyValue: 3500000,
  seatsQty: 2,
  doorsQty: 2,
  _id: '6323641b3bd18401fb123456'
}

const carMockChange: ICar = {
  model: "Carroça",
  year: 1973,
  color: "unicorn-rainbow",
  buyValue: 3500001,
  seatsQty: 2,
  doorsQty: 2,
}

const carMockChangeWithId: ICar & {_id: string} = {
  model: "Carroça",
  year: 1973,
  color: "unicorn-rainbow",
  buyValue: 3500001,
  seatsQty: 2,
  doorsQty: 2,
  _id: '6323641b3bd18401fb123456'
}

describe('Car Service', () => {
  const model = new CarModel();
  const service = new CarService(model);
  const controller = new CarController(service);
  const req = {} as Request;
  const res = {} as Response;
  
  before(async () => {
    sinon.stub(service, 'create').resolves(carMockWithId);
    sinon.stub(Model, 'find').resolves([carMockWithId]);
    sinon.stub(Model, 'findOne').resolves(carMockWithId);
    sinon.stub(Model, 'findByIdAndUpdate').resolves(carMockWithId);
    sinon.stub(Model, 'findByIdAndDelete').resolves(carMockWithId);
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
  });

  after(()=>{
    sinon.restore();
  });

  describe('create', () => {
    
    it('', async () => {
      req.body = carMock;
      await controller.create(req,res);
      expect((res.status as sinon.SinonStub).calledWith(201)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(carMockWithId)).to.be.true;
    });
  });

  describe('read', () => {
    it('', async () => {
      await controller.read(req,res);
      expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith([carMockWithId])).to.be.true;
    });
  });

  describe('readOne', () => { 
    it('passaaaaaa', async () => {
      req.params = {id: 'a validação é feita no model'}
      await controller.readOne(req,res);
      expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(carMockWithId)).to.be.true;
    });

  });

  describe('update', () => {
     it('', async () => {
      const change = await service.update('6323641b3bd18401fb123456', carMockChange);
      expect(change).to.be.deep.equal(carMockChangeWithId)
    });
  });

  describe('delete', () => {
    it('', async () => {
      const carDelete = await service.delete('6323641b3bd18401fb123456');
      expect(carDelete).to.be.deep.equal(carMockWithId)
    });
  });

});