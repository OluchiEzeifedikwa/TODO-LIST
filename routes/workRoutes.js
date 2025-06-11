import express from 'express';
import { 
  getWorks, 
  createWork, 
  updateWork, 
  editWork, 
  updateWorkBoth, 
  updateWorkPriority, 
  deleteWork 
} from '../controllers/workController.js';

const router = express.Router();

router.get('/work', getWorks);
router.post('/work', createWork);
router.post('/work/:id/update', updateWork);
router.get('/work/:id/edit', editWork);
router.post('/work/:id/update-both', updateWorkBoth);
router.post('/work/:id/priority', updateWorkPriority);
router.post('/work/:id/delete', deleteWork);

export default router;