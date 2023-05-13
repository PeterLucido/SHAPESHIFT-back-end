import { Router } from 'express'
import * as daysCtrl from '../controllers/days.js'
import { decodeUserFromToken, checkAuth } from '../middleware/auth.js'

const router = Router()

/*---------- Public Routes ----------*/


/*---------- Protected Routes ----------*/
router.use(decodeUserFromToken)
router.get('/', checkAuth, daysCtrl.index)
router.get('/:daysId', checkAuth, daysCtrl.show)
router.post('/', checkAuth, daysCtrl.create)
router.post('/:daysId/notes', checkAuth, daysCtrl.createNote)
router.post('/:daysId/sleep', checkAuth, daysCtrl.createSleep)
router.post('/:daysId/meals', checkAuth, daysCtrl.createMeal)
router.post('/:daysId/exercise', checkAuth, daysCtrl.createExercise)
router.put('/:daysId/notes', checkAuth, daysCtrl.updateNote)
router.put('/:daysId/sleep', checkAuth, daysCtrl.updateSleep)
router.put('/:daysId/meals', checkAuth, daysCtrl.updateMeal)
router.put('/:daysId/exercise', checkAuth, daysCtrl.updateExercise)
router.put('/:daysId', checkAuth, daysCtrl.update)
router.delete('/:daysId', checkAuth, daysCtrl.delete)

export { router }