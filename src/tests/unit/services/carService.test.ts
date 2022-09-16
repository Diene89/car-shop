// import * as sinon from 'sinon';
// import chai from 'chai';
// import { Model } from 'mongoose';
// import CarService from '../../../services/Cars';
// import CarModel from '../../../models/Cars';
// import { ICar } from '../../../interfaces/ICar';
// const { expect } = chai;

// const carMock: ICar = {
//   model: "Ferrari Maranello",
//   year: 1963,
//   color: "red",
//   buyValue: 3500000,
//   seatsQty: 2,
//   doorsQty: 2
// }

// const carMockWithId: ICar & {_id: string} = {
//   model: "Ferrari Maranello",
//   year: 1963,
//   color: "red",
//   buyValue: 3500000,
//   seatsQty: 2,
//   doorsQty: 2,
//   _id: '6323641b3bd18401fb123456'
// }

// const carMockChange: ICar = {
//   model: "Carroça",
//   year: 1973,
//   color: "unicorn-rainbow",
//   buyValue: 3500001,
//   seatsQty: 2,
//   doorsQty: 2,
// }

// const carMockChangeWithId: ICar & {_id: string} = {
//   model: "Carroça",
//   year: 1973,
//   color: "unicorn-rainbow",
//   buyValue: 3500001,
//   seatsQty: 2,
//   doorsQty: 2,
//   _id: '6323641b3bd18401fb123456'
// }

// describe('Car Service', () => {
//   const model = new CarModel();
//   const service = new CarService(model);
  
//   describe('create', () => {
//     before(async () => {
//       sinon.stub(Model, 'create').resolves(carMockWithId);
//     })
//     after(()=>{
//       sinon.restore();
//     })
    
//     it('', async () => {
//       const created = await service.create(carMock);
//       expect(created).to.be.deep.equal(carMockWithId)
//     });
//   });

//   describe('read', () => {
//     before(async () => {
//       sinon.stub(Model, 'find').resolves([carMockWithId]);
//     })
//     after(()=>{
//       sinon.restore();
//     })

//     it('', async () => {
//       const list = await service.read();
//       expect(list).to.be.deep.equal([carMockWithId])
//     });
//   });

//   describe.only('readOne', () => { 
//     before(async () => {
//       sinon.stub(Model, 'findOne').resolves(carMockWithId);
//     })
//     after(()=>{
//       sinon.restore();
//     })

//     it('passaaaaaa', async () => {
//       const carId = await service.readOne('6323641b3bd18401fb123456');
//       expect(carId).to.be.deep.equal(carMockWithId);
//     });

//   });

//   describe('update', () => {
//     before(async () => {
//       sinon.stub(Model, 'findByIdAndUpdate').resolves(carMockWithId);
//     })
//     after(()=>{
//       sinon.restore();
//     })

//     it('', async () => {
//       const change = await service.update('6323641b3bd18401fb123456', carMockChange);
//       expect(change).to.be.deep.equal(carMockChangeWithId)
//     });
//   });

//   describe('delete', () => {
//     before(async () => {
//       sinon.stub(Model, 'findByIdAndDelete').resolves(carMockWithId);
//     })
//     after(()=>{
//       sinon.restore();
//     })

//     it('', async () => {
//       const carDelete = await service.delete('6323641b3bd18401fb123456');
//       expect(carDelete).to.be.deep.equal(carMockWithId)
//     });
//   });

// });