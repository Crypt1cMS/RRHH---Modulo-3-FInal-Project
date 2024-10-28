import { Router } from 'express';
import * as rolesControllers from '../controllers/rolesControllers';

const router = Router();

router.get('/', rolesControllers.getRoles);
router.get('/:id', rolesControllers.getRoleById);
router.delete('/:id', rolesControllers.deleteRole);

export default router;