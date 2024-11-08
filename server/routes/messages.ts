import { Router } from "express";
import { getChat } from "@/controllers/messages";
import { validateJwt } from "@/middlewares/validate-jwt";

const router = Router()

router.get('/:from', validateJwt, getChat)

export default router