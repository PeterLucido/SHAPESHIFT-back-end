import { Router } from 'express'
import * as daysCtrl from '../controllers/days.js'
import { decodeUserFromToken, checkAuth } from '../middleware/auth.js'

const router = Router()

/*---------- Public Routes ----------*/


/*---------- Protected Routes ----------*/
router.use(decodeUserFromToken)
router.get('/', checkAuth, daysCtrl.index)
router.get('/:dayId', checkAuth, daysCtrl.show)
router.post('/', checkAuth, daysCtrl.create)
router.post('/:dayId/notes', checkAuth, daysCtrl.createNote)
router.post('/:dayId/sleep', checkAuth, daysCtrl.createSleep)
router.post('/:dayId/meals', checkAuth, daysCtrl.createMeal)
router.post('/:dayId/exercise', checkAuth, daysCtrl.createExercise)
router.put('/:dayId', checkAuth, daysCtrl.update)
router.delete('/:dayId', checkAuth, daysCtrl.delete)

export { router }