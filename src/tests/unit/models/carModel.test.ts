import * as sinon from 'sinon';
import chai from 'chai';
import { Model } from 'mongoose';
import CarModel from '../../../models/Cars';
import { ICar } from '../../../interfaces/ICar';
import { ErrorTypes } from '../../../middlewares/errorCatalog';
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

describe('Car Model', () => {
  const model = new CarModel();

  before(async () => {
    sinon.stub(Model, 'create').resolves(carMockWithId);
    sinon.stub(Model, 'find').resolves([carMockWithId]);
    sinon.stub(Model, 'findOne').resolves(carMockWithId);
    sinon.stub(Model, 'findByIdAndUpdate').resolves(carMockChangeWithId);
    sinon.stub(Model, 'findByIdAndDelete').resolves(carMockWithId);
  })
  after(()=>{
    sinon.restore();
  })
  

  describe('create', () => {

    it('', async () => {
      const created = await model.create(carMock);
      expect(created).to.be.deep.equal(carMockWithId)
    });
  });

  describe('read', () => {

    it('', async () => {
      const list = await model.read();
      expect(list).to.be.deep.equal([carMockWithId])
    });
  });

  describe('readOne', () => { 

    it('passaaaaaa', async () => {
      const carId = await model.readOne('6323641b3bd18401fb123456');
      expect(carId).to.be.deep.equal(carMockWithId);
    });

    it('errooooooo', async () => {
      try {
        await model.readOne('invalidId');
      } catch (error: any) {
        expect(error.message).to.be.eq('InvalidMongoId');
      }
    });

  });

  describe('update', () => {

    it('', async () => {
      try {
        await model.update('invalidId', carMockChange);
      } catch (error: any) {
        expect(error.message).to.be.equal(ErrorTypes.InvalidMongoId);
      }
    })

    it('', async () => {
      const change = await model.update('6323641b3bd18401fb123456', carMockChange);
      expect(change).to.be.deep.equal(carMockChangeWithId)
    });
  });

  describe('delete', () => {

    it('', async () => {
      try {
        await model.delete('invalidId');
      } catch (error: any) {
        expect(error.message).to.be.equal(ErrorTypes.InvalidMongoId);
      }
    });

    it('', async () => {
      const carDelete = await model.delete('6323641b3bd18401fb123456');
      expect(carDelete).to.be.deep.equal(carMockWithId)
    });
  });

});
