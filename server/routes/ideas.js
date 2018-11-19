import express from 'express';
import { ideasController } from '../controllers';
import authorization from '../middlewares';

const { ensureAuthenticated } = authorization;

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
  .all(ensureAuthenticated)
  .get(getAllIdeas)
  .post(addNewIdea);

// Add ideas form
router.route('/add')
  .get(ensureAuthenticated, postIdeasForm);

// Edit ideas form
router.route('/edit/:id')
  .get(ensureAuthenticated, editIdeaForm);

router.route('/:id')
  .all(ensureAuthenticated)
  .put(editIdea)
  .delete(deleteIdea);

export default router;
