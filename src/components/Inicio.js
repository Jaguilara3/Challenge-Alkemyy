import React, { Component } from "react";
import { Container, Alert } from "react-bootstrap";
import PowerStat from "./PowerStat";
import { errorMensaje } from "./aux";
import HeroeDetallado from "./HeroeDetallado";
import UsuarioServicio from "../services/UsuarioServicio";

class Inicio extends Component {
  constructor(props) {
    super(props);
    this.state = { nuevoCampeon: 0 };
    this.agregarCampeon = this.agregarCampeon.bind(this);
    this.eliminarCampeon = this.eliminarCampeon.bind(this);
  }

  agregarCampeon(heroe) {
    const resultado = UsuarioServicio.agregarHeroeEquipo(heroe);
    if (resultado.status === "error") errorMensaje(resultado.mensaje);

    this.setState((state) => ({ nuevoCampeon: state.nuevoCampeon + 1 }));
  }

  eliminarCampeon(heroe) {
    UsuarioServicio.borrarHeroeEquipo(heroe);
    this.setState((state) => ({ nuevoCampeon: state.nuevoCampeon + 1 }));
  }

  render() {
    const equipo = UsuarioServicio.mostrarEquipo();

    return (
      <div>
        <Container style={{ backgroundColor: "#000" }}>
          <div class="jumbotron">
            <h1 class="display-6">{"Alkemy Team"}</h1>
            <p class="lead">
              Aquí podrás comparar y analizar la inteligencia, fuerza,
              velocidad, poder, peso, altura del superhéroe que quieras. También
              podrás crear tu propio equipo de superhéroes y observar sus
              fortalezas y debilidades.
            </p>
            <hr class="my-4" />
          </div>

          {equipo?.length > 0 ? (
            <>
              <PowerStat equipo={equipo} />
              <hr />
              <h3 className="text-warning text">Miembros de tu Equipo:</h3>
              <div class="row">
                {equipo?.map((post) => (
                  <HeroeDetallado
                    eliminarCampeon={this.eliminarCampeon}
                    agregarCampeon={this.agregarCampeon}
                    heroe={post}
                  />
                ))}
              </div>
            </>
          ) : (
            <Alert variant="dark">
              Cuando agregues un superhéroe al equipo, aquí se mostrarán las
              estadísticas de cada uno y de tu equipo.
            </Alert>
          )}
        </Container>
      </div>
    );
  }
}

export default Inicio;
