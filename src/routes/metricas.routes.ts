import { Router } from "express"
import MetricasController from "../controllers/Metricas/MetricasController";

const MetricasRouter = Router();
const metricasController = new MetricasController();
/**
 * Post track
 * @openapi
 * /users:
 *    get:
 *      tags:
 *        - Users
 *      summary: "Perfil del Usuario"
 *      description: Este endpoint es para obtener los datos para el Perfil 
 *      responses:
 *        '200':
 *          description: Retorna los Datos del Perfil
 *        '422':
 *          description: Error de validacion.
 */
MetricasRouter.get("/total_empleados/:empresa_id", metricasController.TotalEmpleados);

MetricasRouter.get("/EmpleadosEstressPorcentaje/:empresa_id", metricasController.EmpleadosEstressPorcentaje);

MetricasRouter.get("/UsanFuncyHoy/:empresa_id", metricasController.EmpleadosUsaronFuncy);

MetricasRouter.get("/CausasEstres/:areaId", metricasController.CausaEstres);

MetricasRouter.get("/total_empl_estres/:empresa_id", metricasController.TotalEmplEstres);

MetricasRouter.get("/InteraccionApp/:empresa_id", metricasController.InteraccionApp);

MetricasRouter.get("/InteraccionApp2/:dia/:empresa_id", metricasController.InteraccionApp2);

MetricasRouter.get("/EstresSegunFuncy/:user_id", metricasController.EstresSegunFuncy);

MetricasRouter.get("/estrellasdia/:dia/:empresa_id", metricasController.EstrellasDia);

export default MetricasRouter;