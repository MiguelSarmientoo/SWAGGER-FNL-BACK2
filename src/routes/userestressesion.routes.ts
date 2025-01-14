import {Router} from "express"
import UserEstresSessionController from "../controllers/User/userEstresSessionController";


const UserEstresSesionRoutes = Router();

// Ruta para obtener el nivel de estrés de un usuario por su user_id
/**
 * Post track
 * @openapi
 * /userestresessions/{userId}/nivel:
 *    get:
 *      tags:
 *        - User Estres Sessions
 *      summary: "Nivel de estres del usuario"
 *      description: Este endpoint es para obtener el nivel de estres del usuario
 *      parameters: 
 *        - name: userId
 *          in: path
 *          description: ID del usuario necesario
 *          required: true
 *      responses:
 *        '200':
 *          description: Retorna el estres_nivel_id
 *        '422':
 *          description: Error de validacion.
 */
UserEstresSesionRoutes.get('/userestresessions/:user_id/nivel', UserEstresSessionController.getEstresNivelByUserId);

/**
 * Post track
 * @openapi
 * /userestresessions/assign:
 *    post:
 *      tags:
 *        - User Estres Sessions
 *      summary: "Nivel de estres del usuario"
 *      description: Este endpoint es para obtener el nivel de estres del usuario
 *      requestBody:
 *          description: Asignar un nivel de estress
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  user_id:
 *                      type: integer
 *                  estres_nivel_id:
 *                      type: integer
 *      responses:
 *        '200':
 *          description: Retorna confirmacion y la sesion de estress asignada
 *        '422':
 *          description: Error de validacion.
 */
UserEstresSesionRoutes.post('/userestresessions/assign', UserEstresSessionController.assignEstresNivel);


export default UserEstresSesionRoutes;