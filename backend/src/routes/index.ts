import { Router } from 'express';
import auth from './auth';
import user from './user';
import link from './links'

const router: Router = Router();

router.use('/auth', auth);
router.use('/users', user);
router.use("/links", link);


export default router;