import * as sinon from 'sinon';
import chai from 'chai';
import { Model } from 'mongoose';
import CarController from '../../../controllers/Cars';
import CarService from '../../../services/Cars';
import CarModel from '../../../models/Cars';
import { ICar } from '../../../interfaces/ICar';
import { Request, Response } from 'express';
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
  _id: '6323641b3bd18401fb821e47'
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
  _id: '6323641b3bd18401fb821e47'
}

describe('Car Service', () => {
  const model = new CarModel();
  const service = new CarService(model);
  const controller = new CarController(service);
  const req = {} as Request;
  const res = {} as Response;
  
  before(async () => {
    sinon.stub(service, 'create').resolves(carMockWithId);
    sinon.stub(service, 'read').resolves([carMockWithId]);
    sinon.stub(service, 'readOne').resolves(carMockWithId);
    sinon.stub(service, 'update').resolves(carMockChangeWithId);
    sinon.stub(service, 'delete').resolves(carMockWithId);
    res.status = sinon.stub().returns(res);
    res.end = sinon.stub().returns(res);
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
      req.params = {id: 'a validação é feita no model'};
      req.body = carMockChange;
      await controller.update(req,res);
      expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(carMockChangeWithId)).to.be.true;
    });
  });

  describe('delete', () => {
    it('passaaaaaa', async () => {
        req.params = {id: 'a validação é feita no model'}
        await controller.delete(req,res);
        expect((res.status as sinon.SinonStub).calledWith(204)).to.be.true;
        expect((res.end as sinon.SinonStub).calledWith()).to.be.true;
      });
  });

});