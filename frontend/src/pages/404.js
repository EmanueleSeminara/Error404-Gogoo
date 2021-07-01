import React, { Component } from "react";

import { Jumbotron, Container } from "reactstrap";



class NotFoundPage extends Component {
  render() {
    return (
      <div class="ez" style={{ minHeight: "100vh" }}>
      

        <div
          class="row h-100 justify-content-md-center"
          style={{ minHeight: "83vh" }}
        >
          <div class="col-sm-12 col-md-8 col-lg-4 my-auto">
            <Jumbotron>
              <Container fluid>
                <center>
                  <br />
                  <br />
                  <h1 class="glacialReg">ERROR 404</h1>

                  <hr />
                  <h3 class="glacialReg">Sembra proprio che ti sia perso!</h3>
                  <a
                    href="/"
                    style={{
                      color: "red",
                      fontSize: "20px",
                      textDecoration: "none",
                    }}
                    class="glacialRegular"
                  >
                    Clicca qui per tornare alla home
                  </a>
                </center>
              </Container>
            </Jumbotron>
          </div>
        </div>

 
      </div>
    );
  }
}

export default NotFoundPage;