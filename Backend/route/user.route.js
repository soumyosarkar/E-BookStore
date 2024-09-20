import express from 'express'
import { signup , login} from '../controller/user.controller.js'
const userRouter = express.Router()


userRouter.post("/signup",signup)
userRouter.post("/login",login)


export default userRouter