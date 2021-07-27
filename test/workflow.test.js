
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


    // Test of Users in the DB

    it('should register + login a user, create project and verify 1 in DB', (done) => {

        // 1) Register new user
        let user = {
            name: "Peter Bannow",
            email: "mail@gmail.com",
            password: "123456"
        }
        chai.request(server)
            .post('/api/user/register')
            .send(user)
            .end((err, res) => {
                
                // Asserts
                expect(res.status).to.be.equal(200);   
                expect(res.body).to.be.a('object');
                expect(res.body.error).to.be.equal(null);
               
                // 2) Login the user
                chai.request(server)
                    .post('/api/user/login')
                    .send({
                        "email": "mail@gmail.com",
                        "password": "123456"
                    })
                    .end((err, res) => {
                        // Asserts                        
                        expect(res.status).to.be.equal(200);
                        expect(res.body.error).to.be.equal(null);                        
                        let token = res.body.data.token;

                        // 3) Create new project
                        let project =
                        {
                            name: "Test Project",
                            description: "Test Project Description",
                            complete: true
                        };

                        chai.request(server)
                            .post('/api/projects')
                            .set({ "auth-token": token })
                            .send(project)
                            .end((err, res) => {
                                
                                // Asserts
                                expect(res.status).to.be.equal(201);                                
                                expect(res.body).to.be.a('array');
                                expect(res.body.length).to.be.eql(1);
                                
                                let savedProject = res.body[0];
                                expect(savedProject.name).to.be.equal(project.name);
                                expect(savedProject.description).to.be.equal(project.description);
                                expect(savedProject.complete).to.be.equal(project.complete);


                                // 4) Verify one project in test DB
                                chai.request(server)
                                    .get('/api/projects')
                                    .end((err, res) => {
                                        
                                        // Asserts
                                        expect(res.status).to.be.equal(200);                                
                                        expect(res.body).to.be.a('array');                                
                                        expect(res.body.length).to.be.eql(1);
                                
                                        done();
                                    });
                            });
                    });
            });
    });

    it('should register + login a user, create project and delete it from DB', (done) => {

        // 1) Register new user
        let user = {
            name: "Peter Bannow",
            email: "mail@gmail.com",
            password: "123456"
        }
        chai.request(server)
            .post('/api/user/register')
            .send(user)
            .end((err, res) => {
                
                // Asserts
                expect(res.status).to.be.equal(200);
                expect(res.body).to.be.a('object');
                expect(res.body.error).to.be.equal(null);
                
                // 2) Login the user
                chai.request(server)
                    .post('/api/user/login')
                    .send({
                        "email": "mail@gmail.com",
                        "password": "123456"
                    })
                    .end((err, res) => {
                        // Asserts                        
                        expect(res.status).to.be.equal(200);                         
                        expect(res.body.error).to.be.equal(null);                        
                        let token = res.body.data.token;

                        // 3) Create new project
                        let project =
                        {
                            name: "Test Project",
                            description: "Test Project Description",
                            complete: true
                        };

                        chai.request(server)
                            .post('/api/projects')
                            .set({ "auth-token": token })
                            .send(project)
                            .end((err, res) => {
                                
                                // Asserts
                                expect(res.status).to.be.equal(201);                                
                                expect(res.body).to.be.a('array');
                                expect(res.body.length).to.be.eql(1);
                                
                                let savedProject = res.body[0];
                                expect(savedProject.name).to.be.equal(project.name);
                                expect(savedProject.description).to.be.equal(project.description);
                                expect(savedProject.complete).to.be.equal(project.complete);


                                // 4) Delete project
                                chai.request(server)
                                    .delete('/api/projects/' + savedProject._id)
                                    .set({ "auth-token": token })
                                    .end((err, res) => {
                                        
                                        // Asserts
                                        expect(res.status).to.be.equal(200);                                        
                                        const actualVal = res.body.message;
                                        expect(actualVal).to.be.equal('Project was successfully deleted.');        
                                        done();
                                    });
                            });
                    });
            });
    });


    // // Test of projects in the DB

    // it('should verify that we have 0 projects in the DB', (done) => {
    //     chai.request(server)
    //     .get('/api/projects')
    //     .end((err, res) => {
    //         res.should.have.status(200);
    //         res.body.should.be.a('array');
    //         res.body.length.should.be.eql(0);
    //         done();
    //     });
    // });

    // it('should POST a valid project', (done) => {

    //     let project = {
    //         name: "Test Project",
    //         describtion: "Test Project Description",
    //         complete: true,
    //     }

    //     chai.request(server)
    //     .post('/api/projects')
    //     .send(project)
    //     .end((err, res) => {
    //         res.should.have.status(201);            
    //         done();
    //     });
    // });

    // it('should verify that we have 1 projects in the DB', (done) => {
    //     chai.request(server)
    //     .get('/api/projects')
    //     .end((err, res) => {
    //         res.should.have.status(200);
    //         res.body.should.be.a('array');
    //         res.body.length.should.be.eql(1);
    //         done();
    //     });
    // });


    // // Test of assignments in the DB

    // it('should verify that we have 0 Assignments in the DB', (done) => {
    //     chai.request(server)
    //     .get('/api/assignments')
    //     .end((err, res) => {
    //         res.should.have.status(200);
    //         res.body.should.be.a('array');
    //         res.body.length.should.be.eql(0);
    //         done();
    //     });
    // });

    // it('should POST a valid Assignment', (done) => {

    //     let assignment = {
    //         name: "Test assignment",
    //         description: "Test assignment description",
    //         project_id: 1,
    //         to_do: false,
    //         in_progress: false,
    //         complete: true
    //     }

    //     chai.request(server)
    //     .post('/api/assignments')
    //     .send(assignment)
    //     .end((err, res) => {
    //         res.should.have.status(201);            
    //         done();
    //     });
    // });

    // it('should verify that we have 1 Assignment in the DB', (done) => {
    //     chai.request(server)
    //     .get('/api/assignments')
    //     .end((err, res) => {
    //         res.should.have.status(200);
    //         res.body.should.be.a('array');
    //         res.body.length.should.be.eql(1);
    //         done();
    //     });
    // });


    // it('should test two values....', () => {

    //     let expectedVal = 10;
    //     let actualVal = 10;

    //     expect(actualVal).to.be.equal(expectedVal);
    // })

});


