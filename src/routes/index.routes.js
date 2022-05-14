import express from "express";

import {indexController as IC} from "../controllers/indexController.js";
import { recetasController as RC } from "../controllers/recetasController.js";
import { alreadyAuthenticated, isAdmin, isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.get('/',IC.HomePage)
router.get('/login',alreadyAuthenticated,IC.Login)
router.get('/register',alreadyAuthenticated,IC.Register)
router.get('/profile',isAuthenticated,IC.Profile)
router.get('/newRecipe',isAuthenticated,IC.NewRecipe)
router.get('/newcategory',isAdmin,IC.NewCategory)
router.get('/busqueda',RC.getRecetasByNombre)
router.get('/myrecipes',isAuthenticated,RC.getRecetasByUsuario)

export default router;