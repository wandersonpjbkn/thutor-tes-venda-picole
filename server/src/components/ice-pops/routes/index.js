import express from 'express'
import controller from './../controller'

const router = express()

router.post('/', controller.addIcePops) // Ao receber uma solicitação POST, invoca a função especifica
router.get('/', controller.listIcePops) // Ao receber uma solicitação GET, invoca a função especifica
router.put('/:id', controller.updateIcePops) // Ao receber uma solicitação PUT com id, invoca a função especifica
router.put('/delete/:id', controller.deleteIcePops) // Ao receber uma solicitação PUT com id na url '/delete', invoca a função especifica
router.delete('/:id', controller.permaDeleteIcePops) // Ao receber uma solicitação DELETE, invoca a função especifica

export default router
