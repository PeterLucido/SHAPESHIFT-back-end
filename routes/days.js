import { Router } from 'express'
import { decodeUserFromToken, checkAuth } from '../middleware/auth.js'
import * as daysCtrl from '../controllers/days.js'

const router = Router()

/*---------- Public Routes ----------*/


/*---------- Protected Routes ----------*/
router.use(decodeUserFromToken)
router.get('/days', checkAuth, daysCtrl.index)
router.get('/:daysId', checkAuth, daysCtrl.show)
router.post('/days', checkAuth, daysCtrl.create)
// router.post('/:daysId/notes', checkAuth, daysCtrl.createNote)
router.put('/:daysId', checkAuth, daysCtrl.update)
router.delete('/:daysId', checkAuth, daysCtrl.delete)

export { router }