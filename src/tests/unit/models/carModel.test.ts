import * as sinon from 'sinon';
import chai from 'chai';
import { Model } from 'mongoose';
import CarModel from '../../../models/Cars';
import { ICar } from '../../../interfaces/ICar';
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
  _id: '192954136bdf8401i24az182'
}

const carMockChange: ICar & {_id: string} = {
  model: "Ferrari Maranello",
  year: 1963,
  color: "yellow",
  buyValue: 3500000,
  seatsQty: 2,
  doorsQty: 2,
  _id: '192954136bdf8401i24az182'
}



describe('Car Model', () => {
  const model = new CarModel();

  before(async () => {
    sinon
      .stub(Model, 'create')
      .resolves(carMockWithId);
  });

  after(()=>{
    sinon.restore();
  })

  describe('create', () => {
    it('', async () => {
      const created = await model.create(carMock);
      expect(created).to.be.deep.equal(carMockWithId)
    })
  });

  describe('read', () => {
    it('', async () => {
      const list = await model.read();
      expect(list).to.be.deep.equal([carMockWithId])
    })
  });

  describe('readOne', () => { 
    it('', async () => {
      const carId = await model.readOne('192954136bdf8401i24az182');
      expect(carId).to.be.deep.equal(carMockWithId)
    })
  });

  describe('update', () => {
        it('', async () => {
      const change = await model.update('192954136bdf8401i24az182', carMockWithId);
      expect(change).to.be.deep.equal(carMockChange)
    })
  });

  describe('delete', () => {
    it('', async () => {
      const carDelete = await model.delete('192954136bdf8401i24az182');
      expect(carDelete).to.be.deep.equal(carMockWithId)
    })
  });

});