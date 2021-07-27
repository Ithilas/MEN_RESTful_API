
const chai = require('chai');
const expect = chai.expect;
const should = chai.should();
const chaiHttp = require('chai-http');
const server = require('../server');

chai.use(chaiHttp);




describe('/First Test Collection', () => {

    it('test default API welcome route...', (done) => {

        chai.request(server)
        .get('/api/welcome')
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
        done();
        });
    });

    // Test of projects in the DB

    it('should verify that we have 0 projects in the DB', (done) => {
        chai.request(server)
        .get('/api/projects')
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('array');
            res.body.length.should.be.eql(0);
            done();
        });
    });

    it('should POST a valid project', (done) => {

        let project = {
            name: "Test Project",
            describtion: "Test Project Description",
            complete: true,
        }

        chai.request(server)
        .post('/api/projects')
        .send(project)
        .end((err, res) => {
            res.should.have.status(201);            
            done();
        });
    });

    it('should verify that we have 1 projects in the DB', (done) => {
        chai.request(server)
        .get('/api/projects')
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('array');
            res.body.length.should.be.eql(1);
            done();
        });
    });


    // Test of assignments in the DB

    it('should verify that we have 0 Assignments in the DB', (done) => {
        chai.request(server)
        .get('/api/assignments')
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('array');
            res.body.length.should.be.eql(0);
            done();
        });
    });

    it('should POST a valid Assignment', (done) => {

        let assignment = {
            name: "Test assignment",
            description: "Test assignment description",
            project_id: 1,
            to_do: false,
            in_progress: false,
            complete: true
        }

        chai.request(server)
        .post('/api/assignments')
        .send(assignment)
        .end((err, res) => {
            res.should.have.status(201);            
            done();
        });
    });

    it('should verify that we have 1 Assignment in the DB', (done) => {
        chai.request(server)
        .get('/api/assignments')
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('array');
            res.body.length.should.be.eql(1);
            done();
        });
    });

    // Test of Users in the DB


    it('should test two values....', () => {

        let expectedVal = 10;
        let actualVal = 10;

        expect(actualVal).to.be.equal(expectedVal);
    })

});


