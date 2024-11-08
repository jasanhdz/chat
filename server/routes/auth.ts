import { Router } from 'express'
import { check } from 'express-validator'
import { createUser, login, renewToken } from '@/controllers/auth';
import { validateFields } from '@/middlewares/validate-fields';

const router = Router()

//  Create new user
router.post('/new', [
  check('fullName', 'FullName is required').not().isEmpty(),
  check('password', 'password is required').not().isEmpty(),
  check('email', 'email is required').isEmail(),
], createUser); 

// Login
router.post('/', [
  check('email', 'email is required').isEmail(),
  check('password', 'password is required').not().isEmpty(),
  validateFields
], login)

// revalid token
router.get('/renew', renewToken)

export default router;