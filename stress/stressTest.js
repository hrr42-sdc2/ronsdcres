const faker = require('faker');

const randomData = (context, ee, next) => {
  const FIRSTNAME = faker.name.firstName();
  const LASTNAME = faker.name.lastName();
  const restId = 10000019;
  const name = FIRSTNAME + ' ' + LASTNAME;
  const guests = Math.floor(Math.random() * 6);
  const time = '2020-01-11T08:30:00.016Z';

  context.vars.restId = restId;
  context.vars.name = name;
  context.vars.guests = guests;
  context.vars.time = time;

  next();

};

module.exports = { randomData };


