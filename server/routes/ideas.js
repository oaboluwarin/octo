import express from 'express';
import { ideasController } from '../controllers';

const router = express.Router();

const {
  getAllIdeas,
  addNewIdea,
  postIdeasForm,
  editIdea,
  editIdeaForm,
  deleteIdea
} = ideasController;

router.route('/')
  .get(getAllIdeas)
  .post(addNewIdea);

// Add ideas form
router.route('/add')
  .get(postIdeasForm);

// Edit ideas form
router.route('/edit/:id')
  .get(editIdeaForm);

router.route('/:id')
  .put(editIdea)
  .delete(deleteIdea);

export default router;
