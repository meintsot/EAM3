import express, { type Request, type Response } from 'express'
import connectDB from './config/db'
import dotenv from 'dotenv'
import userRouter from './routes/userRoutes'
import courseRouter from './routes/courseRoutes'
import declarationRouter from './routes/declarationRoutes'
import gradingSystemRouter from './routes/gradingSystemRoutes'
import certificateRouter from './routes/certificateRoutes'
import studentGradeRoutes from './routes/studentGradeRoutes'

dotenv.config()

void (async () => {
  await connectDB()

  const app = express()

  app.use(express.json())

  app.use('/api', userRouter)
  app.use('/api', courseRouter)
  app.use('/api', declarationRouter)
  app.use('/api', gradingSystemRouter)
  app.use('/api', certificateRouter)
  app.use('/api', certificateRouter)
  app.use('/api', studentGradeRoutes)

  app.get('/', (req: Request, res: Response) => {
    res.send('Hello World!')
  })

  app.listen(Number(process.env.PORT ?? 8888), () => {
    console.log(`Server started on port ${process.env.PORT}`)
  })
})()
