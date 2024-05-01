import app from 'express'
import {createUser, getAllUsers, getUserById, loginUser, updateUserById} from '../controllers/user.controller'

const router = app.Router()

router.get('/', getAllUsers)
router.post('/', createUser)
router.post('/login', loginUser)
router.get('/:userId', getUserById)
router.put('/:userId', updateUserById)

module.exports = router
