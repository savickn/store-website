/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var User = require('../api/user/user.model.js');
var Computer = require('../api/computer/computer.model.js');
var ComputerFactory = require('../api/computer/computer.factory.js');


/*
* auto generate Products on seed
*/

Computer.find({}).remove(function() {
  Computer.create(
    ComputerFactory.build(),
    ComputerFactory.build(),
    ComputerFactory.build(),
    ComputerFactory.build(),
    function() {
      console.log('finished populating computers');
    })
})

User.find({}).remove(function() {
  User.create({
    provider: 'local',
    name: 'Test User',
    email: 'test@test.com',
    password: 'test'
  }, {
    provider: 'local',
    role: 'admin',
    name: 'Admin',
    email: 'admin@admin.com',
    password: 'admin'
  }, function() {
      console.log('finished populating users');
    }
  );
});
