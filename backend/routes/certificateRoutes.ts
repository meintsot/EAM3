import express from 'express'
import AuthMiddleware from '../middleware/authMiddleware'
import { type RetrieveCertificatesRequest } from '../models/types/certificate'
import CertificateController from '../controllers/certificateController'

const router = express.Router()

router.get('/certificates', AuthMiddleware.authenticateJWT, AuthMiddleware.rolesAllowed(['student']),
    AuthMiddleware.queryParamsMiddleware<RetrieveCertificatesRequest>, CertificateController.retrieveCertificates)
router.get('/certificates/:certificateId', AuthMiddleware.authenticateJWT, AuthMiddleware.rolesAllowed(['student']), CertificateController.retrieveCertificate)
router.post('/certificates', AuthMiddleware.authenticateJWT, AuthMiddleware.rolesAllowed(['student']), CertificateController.submitCertificateRequest)
router.post('/certificates/:certificateId/confirm', AuthMiddleware.authenticateJWT, AuthMiddleware.rolesAllowed(['student']), CertificateController.confirmCertificate)

export default router
