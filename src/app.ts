import express, { Application } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import path from "path";
import swaggerUi from "swagger-ui-express";
import swaggerSetup from "./config/swagger"
import MessagesRoutes from "./routes/messages.routes";
import UserRoutes from "./routes/user.routes";
import OpenaiRoutes from "./routes/openai.routes";
import MaintanceRoutes from "./routes/maintance.routes";
import UserResponseRoutes from "./routes/userResponse.routes";
import TestEstresRoutes from "./routes/testEstres.routes";
import EstresNivelesRoutes from "./routes/estresNiveles.routes";
import UserEstresSesionRoutes from "./routes/userestressesion.routes";
import UserProgramaRouter from "./routes/userprograma.routes";
//import TipoTecnicasRoutes from "./routes/tipotecnicas.routes";
import TestEstresSalidaRoutes from "./routes/testEstresSalida.routes";
import MetricasRouter from "./routes/metricas.routes";
import EmpresaRouter from "./routes/empresa.routes";
import role_router from "./routes/user.roles";
import EmocionesDiariasRoutes from "./routes/emocionesDiarias.routes";
import SpeechTextRoutes from "./routes/speechtext.routes";

class App {
  private server: Application;
  constructor() {
    this.server = express();
    this.middlewares();
    this.routes();
  }
  private middlewares(): void {
    this.server.use(
      cors({
        origin: "*",
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
        optionsSuccessStatus: 204,
      })
    );
    this.server.use(bodyParser.json());
    this.server.use(
      "/imagenes",
      express.static(path.join(__dirname, "imagenes"))
    );
    this.server.use("/documentation", swaggerUi.serve, swaggerUi.setup(swaggerSetup))
  }
  private routes(): void {
    // Configuración de rutas
    this.server.use("/api", UserRoutes);
    this.server.use("/api/v1/maintance", MaintanceRoutes);
    this.server.use("/api", TestEstresRoutes);
    this.server.use("/api", MessagesRoutes);
    this.server.use("/api", OpenaiRoutes);
    this.server.use("/api", EstresNivelesRoutes);
    this.server.use("/api", UserEstresSesionRoutes);
    this.server.use("/api", UserResponseRoutes);
    this.server.use("/api/userprograma", UserProgramaRouter);
    this.server.use("/api", TestEstresSalidaRoutes); //cambiar ruta
    this.server.use("/api/metricas", MetricasRouter);
    this.server.use("/api/empresa", EmpresaRouter);
    this.server.use("/api", role_router);
    this.server.use("/api", EmocionesDiariasRoutes); 
    this.server.use("/api/voice", SpeechTextRoutes); 
    //this.server.use("/api", TipoTecnicasRoutes);

  }
  public getServer(): Application {
    return this.server;
  }
}

export default new App().getServer();
