//jshint esversion:6
const  { Seeder } = require('mongo-seeding');

const db = require('../key').MongoURI;

const config = {
    database: db,
    dropDatabase: true,
  };
const seeder = new Seeder(config);

const path = require('path');
const collections = seeder.readCollectionsFromPath(path.resolve("./src/database/seeders"));

seeder
  .import(collections)
  .then(() => {
  })
  .catch(err => {
  console.log(err);
});
