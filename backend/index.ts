import express, { type Request, type Response } from 'express'
import cors from 'cors'
import connectDB from './config/db'
import dotenv from 'dotenv'
import userRouter from './routes/userRoutes'
import courseRouter from './routes/courseRoutes'
import declarationRouter from './routes/declarationRoutes'
import gradingSystemRouter from './routes/gradingSystemRoutes'
import certificateRouter from './routes/certificateRoutes'
import studentGradeRoutes from './routes/studentGradeRoutes'
import multer from 'multer'
import errorMiddleware from './middleware/errorMiddleware'

dotenv.config()

void (async () => {
  await connectDB()

  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + file.mimetype.replace('/', '.'))
    }
  })

  const upload = multer({ storage })

  const app = express()

  app.use(cors())

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

  app.post('/api/profile-image', upload.single('image'), (req: Request, res: Response) => {
    if (req.file == null) {
      return res.status(400).send('No file uploaded.')
    }

    // Send back the URL or path of the uploaded file
    res.json({ fileURL: `uploads/${req.file.filename}` })
  })

  app.use(errorMiddleware)

  app.listen(Number(process.env.PORT ?? 8888), () => {
    console.log(`Server started on port ${process.env.PORT}`)
  })
})()
