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

router.get('/todos', getTodos);
router.post('/todos', createTodo);
router.post('/todos/:id/update', updateTodo);
router.get('/todos/:id/edit', editTodo);
router.post('/todos/:id/update-both', updateTodoBoth);
router.post('/todos/:id/priority', updateTodoPriority);
router.post('/todos/:id/delete', deleteTodo);

export default router;