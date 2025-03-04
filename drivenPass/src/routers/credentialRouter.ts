import { Router } from 'express';
import * as credentialController from '../controllers/credentialController';
import { validateSchema } from '../middlewares/validationMiddleware';
import { credentialSchema } from '../schemas/credentialSchema';
import { authenticateToken } from '../middlewares/authMiddleware';
import { validateId } from '../middlewares/validationMiddleware';

const credentialRouter = Router();

credentialRouter.use(authenticateToken);

credentialRouter.post('/', validateSchema(credentialSchema), credentialController.createCredential);
credentialRouter.get('/', credentialController.getAllCredentials);
credentialRouter.get('/:id', validateId, credentialController.getCredentialById);
credentialRouter.put('/:id', validateId, validateSchema(credentialSchema), credentialController.updateCredential);
credentialRouter.delete('/:id', validateId, credentialController.deleteCredential);

export default credentialRouter;