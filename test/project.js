//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

let mongoose = require("mongoose");
const Project = require('../models/projects');

//Require the dev-dependencies
var supertest = require("supertest");
var should = require("should");

var server = supertest.agent("http://localhost:3000");

const wait = ms => new Promise(resolve => setTimeout(resolve, ms));

describe("Time tracker unit test", function() {

    //Empty database at start
    Project.deleteMany({}).exec();

    // #1 should start project1
    it("should start project1", function(done) {
        //calling /projects/start api
        server
            .post('/api/v1/projects/start')
            .send({ name: 'PROJECT1' })
            .expect("Content-type", /json/)
            .expect(200)
            .end(function(err, res) {
                res.status.should.equal(200);
                res.body.success.should.equal(true);
                done();
            });

    });

    // #2 should start project1
    it("should start project2", function(done) {
        //calling /projects/start api
        server
            .post('/api/v1/projects/start')
            .send({ name: 'PROJECT2' })
            .expect("Content-type", /json/)
            .expect(200)
            .end(function(err, res) {
                res.status.should.equal(200);
                res.body.success.should.equal(true);
                done();
            });

    });

    // #3 should start project3
    it("should start project3", function(done) {
        //calling /projects/start api
        server
            .post('/api/v1/projects/start')
            .send({ name: 'PROJECT3' })
            .expect("Content-type", /json/)
            .expect(200)
            .end(function(err, res) {
                res.status.should.equal(200);
                res.body.success.should.equal(true);
                done();
            });

    });

    // #4 should start project1-FAILURE
    it("should start project1 and fail", function(done) {
        //calling /projects/start api
        server
            .post('/api/v1/projects/start')
            .send({ name: 'PROJECT1' })
            .expect("Content-type", /json/)
            .expect(200)
            .end(function(err, res) {
                res.status.should.equal(404);
                res.body.message.should.equal('Project PROJECT1 is already started');
                done();
            });

    });

    //#5 should stop project1
    it("should stop project1", function(done) {
        //calling /projects/stop api
        server
            .post('/api/v1/projects/stop')
            .send({ name: 'PROJECT1' })
            .expect("Content-type", /json/)
            .expect(200)
            .end(function(err, res) {
                res.status.should.equal(200);
                res.body.success.should.equal(true);
                done();
            });

    });

    //#6 should stop project2
    it("should stop project2", function(done) {
        //calling /projects/stop api
        server
            .post('/api/v1/projects/stop')
            .send({ name: 'PROJECT2' })
            .expect("Content-type", /json/)
            .expect(200)
            .end(function(err, res) {
                res.status.should.equal(200);
                res.body.success.should.equal(true);
                done();
            });

    });

    //#7 should stop project2 and fail
    it("should stop project2 and fail", function(done) {
        //calling /projects/stop api
        server
            .post('/api/v1/projects/stop')
            .send({ name: 'PROJECT2' })
            .expect("Content-type", /json/)
            .expect(200)
            .end(function(err, res) {
                res.status.should.equal(404);
                res.body.success.should.equal(false);
                done();
            });

    });

    //#8 should get all closed projects
    it("should return closed projects", function(done) {
        server
            .get("/api/v1/projects")
            .expect("Content-type", /json/)
            .expect(200)
            .end(function(err, res) {
                res.status.should.equal(200);
                res.body.success.should.equal(true);
                res.body.total.should.equal('2 projects');
                done();
            });
    });

    // #9 should start project1 again
    it("should start project1 again", function(done) {
        //calling /projects/start api
        server
            .post('/api/v1/projects/start')
            .send({ name: 'PROJECT1' })
            .expect("Content-type", /json/)
            .expect(200)
            .end(function(err, res) {
                res.status.should.equal(200);
                res.body.success.should.equal(true);
                done();
            });

    });

    //#10 should stop project1
    it("should stop project1 again", function(done) {
        //calling /projects/stop api
        server
            .post('/api/v1/projects/stop')
            .send({ name: 'PROJECT1' })
            .expect("Content-type", /json/)
            .expect(200)
            .end(function(err, res) {
                res.status.should.equal(200);
                res.body.success.should.equal(true);
                done();
            });

    });

    //#11 should get all PROJECT1
    it("should return project1 segments", function(done) {
        server
            .get("/api/v1/projects/PROJECT1")
            .expect("Content-type", /json/)
            .expect(200)
            .end(function(err, res) {
                res.status.should.equal(200);
                res.body.success.should.equal(true);
                res.body.segments.should.equal(2);
                done();
            });
    });

});