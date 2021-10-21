process.env.NODE_ENV = 'test';

const Project = require('../models/project');
const Assignment = require('../models/assignment');
const User = require('../models/user');
const Object = require('../models/object');


beforeEach((done) => {
    Project.deleteMany({}, function(err) {});
    Assignment.deleteMany({}, function(err) {});
    User.deleteMany({}, function(err) {});
    Object.deleteMany({}, function(err) {});
    done();
});

afterEach((done) => {
    Project.deleteMany({}, function(err) {});
    Assignment.deleteMany({}, function(err) {});
    User.deleteMany({}, function(err) {});
    Object.deleteMany({}, function(err) {});
    done();
});