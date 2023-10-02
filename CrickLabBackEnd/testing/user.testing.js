const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../app"); // Replace with the correct path to your Express app

chai.use(chaiHttp);
const expect = chai.expect;

describe("User Testing", () => {
  let createdTodoId;

  // Create a new todo
  it("should create a new User", (done) => {
    const newTodo = {
      name: "Testing_1",
      email: "test@gmail.com",
      phone: "987656676567",
      password: "12345",
    };
    chai
      .request(app)
      .post("/users/signup")
      .send(newTodo)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an("object");
        expect(res.body).to.have.property("success", true);
        createdTodoId = res.body.id; // Store the created todo's ID for later tests
        done();
      });
  });

    // login user
    it("should login user", (done) => {
      const newTodo = {
        email: "test@gmail.com",
        password: "12345",
      };
      chai
        .request(app)
        .post("/users/login")
        .send(newTodo)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an("object");
          expect(res.body).to.have.property("success", true);
          createdTodoId = res.body.id; // Store the created todo's ID for later tests
          done();
        });
    });
  

  //   // Update a todo by ID
  //   it('should update an existing todo', (done) => {
  //     const updatedTodo = { title: 'Updated Todo', completed: true };
  //     chai
  //       .request(app)
  //       .put(`/todos/${createdTodoId}`)
  //       .send(updatedTodo)
  //       .end((err, res) => {
  //         expect(res).to.have.status(200);
  //         expect(res.body).to.be.an('object');
  //         expect(res.body).to.have.property('title', 'Updated Todo');
  //         expect(res.body).to.have.property('completed', true);
  //         done();
  //       });
  //   });

  //   // Delete a todo by ID
  //   it('should delete an existing todo', (done) => {
  //     chai
  //       .request(app)
  //       .delete(`/todos/${createdTodoId}`)
  //       .end((err, res) => {
  //         expect(res).to.have.status(204);
  //         done();
  //       });
  //   });

  //   // Ensure the todo was deleted
  //   it('should confirm the todo was deleted', (done) => {
  //     chai
  //       .request(app)
  //       .get('/todos')
  //       .end((err, res) => {
  //         expect(res).to.have.status(200);
  //         const deletedTodo = res.body.find((todo) => todo.id === createdTodoId);
  //         expect(deletedTodo).to.be.undefined;
  //         done();
  //       });
  //   });
});
