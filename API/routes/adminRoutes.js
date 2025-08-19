import express, { Router } from "express"
import { login, registerAdmin } from "../controllers/adminControllers.js"

const router = Router()

router.post('/register', registerAdmin)
router.post('/login', login)

export default router