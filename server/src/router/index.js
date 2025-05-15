import productRouter from './productRoute.js'
import cartRouter from './cartRoute.js'
import authRouter from './authRoute.js'
import orderRouter from './orderRoute.js'
import addressRouter from './addressRoute.js'
import reviewRouter from './reviewRoute.js'
import brandRouter from './brandRoute.js'
import categoryRouter from './categoryRoute.js'
import { chatbox } from '../Controllers/chatboxController.js'

const routers = (app) => {

    app.use('/product', productRouter)
    app.use('/cart', cartRouter)
    app.use('/auth', authRouter)
    app.use('/order', orderRouter)
    app.use('/address', addressRouter)
    app.use('/review', reviewRouter)
    app.use('/brand', brandRouter)
    app.use('/category', categoryRouter)
    app.post('/chatbox', chatbox)
    app.use('/', (req, res) => {
        res.send('home')
    })
}

export default routers

