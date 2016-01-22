'use strict';

var faker = require('faker');


module.exports = {
  up: function (queryInterface, Sequelize) {
    var photos = [];
    for (var i = 0; i < 25; i++){
      photos.push({
        author: faker.name.findName(),
        link: faker.image.image(),
        description: faker.lorem.sentence(), 
        createdAt: new Date(),
        updatedAt: new Date()
      });
    }
    return queryInterface.bulkInsert('Pixes', photos, {});
    
  },

  down: function (queryInterface, Sequelize) {
      return queryInterface.bulkDelete('Pixes', null, {});
  
  }
};
