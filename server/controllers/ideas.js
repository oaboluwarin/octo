/* eslint-disable no-param-reassign */
import mongoose from 'mongoose';
import '../models/Idea';

// Load Idea model
const Idea = mongoose.model('ideas');

export default {
  getAllIdeas(req, res) {
    Idea.find({user: req.user.id })
      .sort({ date: 'desc' })
      .then(ideas => res.render('ideas/index', { ideas }));
  },
  addNewIdea(req, res) {
    const errors = [];
    const { body: { title, details }, user } = req;
    if (!title) errors.push({ text: 'Please, add a title' });
    if (!details) errors.push({ text: 'Please, add details' });

    if (errors.length) {
      return res.render('ideas/add', { errors, title, details });
    }
    const newUser = { title, details, user: user.id };
    return new Idea(newUser)
      .save()
      .then(() => {
        req.flash('success_msg', 'Idea added');
        res.redirect('/ideas');
      })
      .catch(err => {
        console.log(err);
      });
  },
  postIdeasForm(req, res) {
    res.render('ideas/add');
  },
  editIdea(req, res) {
    const {
      params: { id },
      body: { title, details }
    } = req;

    Idea.findOne({
      _id: id
    })
      .then(idea => {
        idea.title = title;
        idea.details = details;
        idea.save()
          .then((updatedIdea) => {
            req.flash('success_msg', `${updatedIdea.title} updated`);
            res.redirect('/ideas');
          });
      });
  },
  editIdeaForm(req, res) {
    const { id } = req.params;
    Idea.findOne({
      _id: id
    })
      .then(idea => {
        if (idea.user !== req.user.id) {
          req.flash('error_msg', 'Not authorized');
          return res.redirect('/ideas');
        }
        return res.render('ideas/edit', { idea });
      });
  },
  deleteIdea(req, res) {
    const { id } = req.params;
    Idea.remove({
      _id: id
    })
      .then(() => {
        req.flash('success_msg', 'Idea removed');
        res.redirect('/ideas');
      });
  }
};
