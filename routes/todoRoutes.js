import express from 'express';
import { 
  getTodos, 
  createTodo, 
  updateTodo, 
  editTodo, 
  updateTodoBoth, 
  updateTodoPriority, 
  deleteTodo 
} from '../controllers/todoController.js';

const router = express.Router();

router.get('/', getTodos);
router.post('/', createTodo);
router.post('/:id/update', updateTodo);
router.get('/:id/edit', editTodo);
router.post('/:id/update-both', updateTodoBoth);
router.post('/:id/priority', updateTodoPriority);
router.post('/:id/delete', deleteTodo);

export default router;