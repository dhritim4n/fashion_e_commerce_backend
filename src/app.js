import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import user_router from './routes/user.routes.js'
import product_router from './routes/product.routes.js'
import bodyParser from 'body-parser';
import cart_router from './routes/cart.routes.js'

const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN
}))
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static("public"))
app.use(cookieParser())
app.use(bodyParser.json())

app.use("/auth",user_router)
app.use("/product",product_router)
app.use("/cart",cart_router)


export default app;