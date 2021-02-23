import React from "react";
import { Row, Col, Container, Modal, FormGroup, Button } from "react-bootstrap";

import { ApiService } from "../../services/ApiService";
import { datetimeFormatter } from "../../utils/dateFormatters";

import { Icon, IconButton } from "@material-ui/core";

import Card from "../../components/Card/Card";
import CardFooter from "../../components/Card/CardFooter";
import CardHeader from "../../components/Card/CardHeader";
import CardIcon from "../../components/Card/CardIcon";
import { DigitalTwinsUpdateResponse } from "@azure/digital-twins-core";

interface Props {}

class FloorsPage extends React.Component<Props, IFloorsPage> {
  state: IFloorsPage = {
    message: "",
    data: [],
    showModal: false,
    twinId: "",
    modalName: "",
    modalColor: "",
    modalIcon: "",
    modalOrder: 0,
  };

  componentDidMount() {
    this.listTwins();
  }

  public handleCloseModal = () => {
    this.setState({ showModal: false });
  };

  public handleShowModal = (twin: ITwin) => {
    this.setState({
      twinId: twin.name,
      modalName: twin.display.name,
      modalColor: twin.display.color,
      modalIcon: twin.display.icon,
      modalOrder: twin.display.order,
      showModal: true,
    });
  };

  public handleSaveClick = async () => {
        
    const patch = [
      { op: "replace", path: `/Display/Name`, value: `${this.state.modalName}` },
      { op: "replace", path: `/Display/Icon`, value: `${this.state.modalIcon}` },
      { op: "replace", path: `/Display/Color`, value: `${this.state.modalColor}`},
      { op: "replace", path: `/Display/Order`, value: this.state.modalOrder }
    ];

   // [
   //   {
   //     "op": "replace",
   //     "path": "/Display/Order",
   //     "value": { "Name": "Garage", "Icon": "info_outline", "Color": "info", "Order": 1 }
   //   }
   // ] 
 
    try {
      const api = new ApiService();
      const response: DigitalTwinsUpdateResponse = await api.updateTwin(this.state.twinId, patch)

      if (response._response.status === 204)
      {
        this.setState({ showModal: false, twinId: "", modalName: "", modalColor: "", modalIcon: "", modalOrder: 0});
        this.listTwins();
      }

    } catch (exc) {
      console.log(`error updating twin: ${exc}`)
    }    
  };

  private handleInputChanges = (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault();

    if (
      e.currentTarget.type === "number" &&
      isNaN(parseInt(e.currentTarget.value))
    ) {
      this.setState(({
        [e.currentTarget.name]: e.currentTarget.value,
      } as unknown) as Pick<IFloorsPage, keyof IFloorsPage>);
    } else {
      this.setState(({
        [e.currentTarget.name]:
          e.currentTarget.type === "number"
            ? parseInt(e.currentTarget.value)
            : e.currentTarget.value,
      } as unknown) as Pick<IFloorsPage, keyof IFloorsPage>);
    }

    //this.validateForm();
  };

  private async listTwins() {
    const api = new ApiService();
    const twinResult = await api.queryTwins(
      "SELECT * FROM digitaltwins WHERE IS_OF_MODEL('dtmi:com:hellem:dtsample:floor;1')"
    );

    var floorsData: ITwin[] = twinResult.map((x) => {
      let floor: ITwin = {
        name: x.$dtId,
        temperature: Math.round(x.Temperature),
        humidity: Math.round(x.Humidity),
        lastUpdated: x.$metadata.Humidity.lastUpdateTime,
        warning: false,
        display: {
          name: x.$dtId,
          order: 0,
          icon: "content_copy",
          color: "primary",
        },
      };

      if (x.Display != null) {
        floor.display.color = x.Display.Color;
        floor.display.icon = x.Display.Icon;
        floor.display.order = x.Display.Order;
        floor.display.name = x.Display.Name;
      }

      return floor;
    });

    this.setState({ data: floorsData });
  }

  render() {
    return (
      <div>
        <div className="content">
          <div>
            <Container fluid>
              <Row>
                {this.state.data.map((x, key) => (
                  <Col md={6} lg={4} sm={8} key={key}>
                    <Card>
                      <CardHeader color={x.display.color} stats icon>
                        <CardIcon color={x.display.color}>
                          <Icon>{x.display.icon}</Icon>
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
                          {x.name}
                        </h1>
                        <h3
                          style={{
                            color: "#3C4858",
                            marginTop: "0px",
                            minHeight: "auto",
                            fontWeight: "normal",
                            fontFamily:
                              "'Roboto', 'Helvetica', 'Arial', 'sans-serif'",
                            marginBottom: "3px",
                            textDecoration: "none",
                          }}
                        >
                          {x.temperature} °F
                          <br />
                          {x.humidity}% Humidity
                        </h3>
                      </CardHeader>
                      <CardFooter stats>
                        <div>
                          <span style={{ fontSize: 13 }}>
                            {datetimeFormatter(x.lastUpdated)}
                          </span>
                        </div>
                        <div>
                          <IconButton
                            onClick={(e: any) => this.handleShowModal(x)}
                            aria-label="edit twin"
                          >
                            <span className="material-icons">mode_edit</span>
                          </IconButton>
                        </div>
                      </CardFooter>
                    </Card>
                  </Col>
                ))}
              </Row>
            </Container>
          </div>
          <div>
            <Modal
              size="lg"
              show={this.state.showModal}
              onHide={() => this.handleCloseModal()}
              animation={false}
              backdrop="static"
            >
              <Modal.Header closeButton>
                <Modal.Title>{this.state.modalName}</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Container fluid>
                  <Row>
                    <Col md={12} sm={12}>
                      
                        <FormGroup>
                          <label htmlFor="basic-url">Display Name</label>
                          <input
                            type="text"
                            name="modalName"
                            className="form-control form-control-lg"
                            value={this.state.modalName}
                            onChange={(e) => this.handleInputChanges(e)}
                          />
                        </FormGroup>

                        <FormGroup>
                          <label htmlFor="basic-url">Color</label>
                          <input
                            type="text"
                            name="modalColor"
                            className="form-control form-control-lg"
                            value={this.state.modalColor}
                            onChange={(e) => this.handleInputChanges(e)}
                          />
                        </FormGroup>

                        <FormGroup>
                          <label htmlFor="basic-url">Icon</label>
                          <input
                            type="icon"
                            name="modalIcon"
                            className="form-control form-control-lg"
                            value={this.state.modalIcon}
                            onChange={(e) => this.handleInputChanges(e)}
                          />
                        </FormGroup>

                        <FormGroup>
                          <label htmlFor="basic-url">Order</label>
                          <input
                            type="number"
                            name="modalOrder"
                            className="form-control form-control-lg"
                            value={this.state.modalOrder}
                            onChange={(e) => this.handleInputChanges(e)}
                          />
                        </FormGroup>
                      
                    </Col>
                  </Row>
                </Container>
              </Modal.Body>
              <Modal.Footer>
                <Button
                  onClick={() => this.handleCloseModal()}
                  className="btn btn-fill btn-warning"
                >
                  Cancel
                </Button>
                <Button
                  onClick={(e) => this.handleSaveClick()}
                  className="btn btn-fill btn-primary"
                >
                  Save Changes
                </Button>
              </Modal.Footer>
            </Modal>
          </div>
        </div>
      </div>
    );
  }
}

export default FloorsPage;

export interface IFloorsPage {
  message: string;
  data: ITwin[];
  twinId: string;
  showModal: boolean;
  modalName: string;
  modalColor: string;
  modalIcon: string;
  modalOrder: number;
}
export interface IDisplay {
  name: string;
  order: number;
  icon: string;
  color: string;
}

export interface ITwin {
  name: string;
  temperature: number;
  humidity: number;
  warning: boolean;
  display: IDisplay;
  lastUpdated: Date;
}
