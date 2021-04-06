import React from "react";
import { Row, Col, Container } from "react-bootstrap";

import { Icon, IconButton } from "@material-ui/core";

import Card from "../../components/Card/Card";
import CardHeader from "../../components/Card/CardHeader";
import CardFooter from "../../components/Card/CardFooter";
import CardIcon from "../../components/Card/CardIcon";

import { ApiService } from "../../services/ApiService";

interface Props {}

class DashboardPage extends React.Component<Props, IDashboardPage> {
  state: IDashboardPage = {
    message: "",
  };

  componentDidMount() {
    this.listTwins();
  }

  private handleRefreshPage = () => {
    this.listTwins();
  };

  private async listTwins() {
    const api = new ApiService();
    const twinResult = await api.queryTwins(
      "SELECT COUNT() FROM digitaltwins WHERE IS_OF_MODEL('dtmi:com:hellem:dtsample:room;1')"
    );

    console.log(twinResult);
  }

  render() {
    return (
      <div>
        <div className="content">
          <div>
            <Container fluid>
              <Row>
                <Col md={1} lg={2} sm={2}>
                  <div>
                    <h2>Dashboard</h2>
                  </div>
                </Col>
                <Col md={1} lg={1} sm={2}>
                  <div
                    style={{
                      alignItems: "center",
                      verticalAlign: "middle",
                      marginTop: "22px",
                    }}
                  >
                    <IconButton
                      onClick={(e: any) => this.handleRefreshPage()}
                      aria-label="refresh list"
                    >
                      <span className="material-icons">refresh</span>
                    </IconButton>
                  </div>
                </Col>
              </Row>
              <Row>
                <Col md={4} lg={3} sm={8}>
                  <Card>
                    <CardHeader color="success" stats icon>
                      <CardIcon color="success">
                        <Icon>living</Icon>
                      </CardIcon>
                      <h1
                        style={{
                          color: "#999",
                          margin: "0",
                          fontSize: "24px",
                          marginTop: "0",
                          paddingTop: "10px",
                          marginBottom: "0",
                        }}
                      >
                        Rooms
                      </h1>
                      <h3
                        style={{
                          color: "#3C4858",
                          marginTop: "0px",
                          minHeight: "auto",
                          fontWeight: "normal",
                          fontSize: "40px",
                          marginBottom: "3px",
                          textDecoration: "none",
                        }}
                      >                       
                        5
                      </h3>
                    </CardHeader>
                    <CardFooter stats>
                      <div>
                        <span style={{ fontSize: 13 }}>Hello</span>
                      </div>
                    </CardFooter>
                  </Card>
                </Col>
                <Col md={4} lg={3} sm={8}>
                  <Card>
                    <CardHeader color="warning" stats icon>
                      <CardIcon color="warning">
                        <Icon>thermostat</Icon>
                      </CardIcon>
                      <h1
                        style={{
                          color: "#999",
                          margin: "0",
                          fontSize: "24px",
                          marginTop: "0",
                          paddingTop: "10px",
                          marginBottom: "0",
                        }}
                      >
                        Sensors
                      </h1>
                      <h3
                        style={{
                          color: "#3C4858",
                          marginTop: "0px",
                          minHeight: "auto",
                          fontWeight: "normal",
                          fontSize: "40px",
                          marginBottom: "3px",
                          textDecoration: "none",
                        }}
                      >                       
                        3
                      </h3>
                    </CardHeader>
                    <CardFooter stats>
                      <div>
                        <span style={{ fontSize: 13 }}>Hello</span>
                      </div>
                    </CardFooter>
                  </Card>
                </Col>
              </Row>              
            </Container>
          </div>
        </div>
      </div>
    );
  }
}

export default DashboardPage;

export interface IDashboardPage {
  message: string;
}
