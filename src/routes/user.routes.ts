import {Router} from "express"
import UserController from "../controllers/User/userController";

import  { upload_xlsx, upload } from "../middlewares/uploadMiddleware";
import { Authorization } from "../middlewares/authMiddleware";


const UserRoutes = Router();
// Rutas de usuario

/**
 * Post track
 * @openapi
 * /login:
 *    post:
 *      tags:
 *        - Users
 *      summary: "Logear Usuario"
 *      description: Este endpoint es para Logear al Usuario 
 *      requestBody:
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/login"
 *      responses:
 *        '200':
 *          description: Retorna el Token
 *        '401':
 *          description: Credenciales invalidas
 *        '403': 
 *          description: Usuario sin rol
 *        '500':
 *          description: Error de validacion.
 */
UserRoutes.post('/login', UserController.login);

/**
 * Post track
 * @openapi
 * /register:
 *    post:
 *      tags:
 *        - Users
 *      summary: "Registrar Usuario"
 *      description: Este endpoint es para Registrar al Usuario 
 *      requestBody:
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/user"
 *      responses:
 *        '201':
 *          description: Se creo el Usuario
 *        '422':
 *          description: Error de validacion.
 */
UserRoutes.post('/register', UserController.createUser);

UserRoutes.post('/register/bulk', upload_xlsx.single("file"),UserController.registerBulk);

// Rutas sin middleware de token

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
UserRoutes.get('/users', UserController.getAllUsers);

/**
 * Post track
 * @openapi
 * /users/{userId}:
 *    put:
 *      tags:
 *        - Users
 *      summary: "Actualizar datos del Usuario"
 *      description: Este endpoint es para actualizar datos del Usuario
 *      responses:
 *        '200':
 *          description: Retorna confirmacion y datos actualizados del Usuario
 *        '422':
 *          description: Error de validacion.
 */
UserRoutes.put('/users/:id', UserController.updateUser);

/**
 * Post track
 * @openapi
 * /datos/users/{userId}:
 *    get:
 *      tags:
 *        - Users
 *      summary: "Datos del Usuario"
 *      description: Este endpoint es para obtener los datos del Usuario
 *      responses:
 *        '200':
 *          description: Retorna los Datos del Usuario
 *        '422':
 *          description: Error de validacion.
 */
UserRoutes.get('/datos/users/:id', UserController.getUserById);

/**
 * Post track
 * @openapi
 * /perfilUsuario/{userId}:
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
UserRoutes.get('/perfilUsuario/:id', UserController.getUserProfile);

/**
 * Post track
 * @openapi
 * /actualizarPerfil/{userId}:
 *    post:
 *      tags:
 *        - Users
 *      summary: "Actualizar Perfil del Usuario"
 *      description: Este endpoint es para actualizar los datos para el Perfil 
 *      parameters: 
 *        - name: userId
 *          in: path
 *          description: ID del usuario necesario
 *          required: true
 *      requestBody:
 *          content:
 *            application/octet-stream:
 *              schema:
 *                $ref: "#/components/schemas/userProfile"
 *      responses:
 *        '200':
 *          description: Retorna los Datos nuevos del Perfil
 *        '422':
 *          description: Error de validacion.
 */
UserRoutes.post('/actualizarPerfil/:id', upload, UserController.updateProfile);

/**
 * Post track
 * @openapi
 * /users/empresa:
 *    get:
 *      tags:
 *        - Users
 *      summary: "Obtener todos los Usuarios por la empresa del administrador"
 *      description: Este endpoint es para obtener todos los Usuarios por empresa
 *      responses:
 *        '200':
 *          description: Retorna los Usuarios
 *        '422':
 *          description: Error de validacion.
 */
UserRoutes.get('/users/empresa', Authorization,UserController.listCompanyUsers);

UserRoutes.get('/users/empresa/estres/sedes', Authorization,UserController.listEstresporSede);

UserRoutes.get('/users/getpermisos/:user_id', UserController.getPermisos);

export default UserRoutes;