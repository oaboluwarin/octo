import express from 'express';

const router = express.Router();

router.route('/')
  .get((req, res) => {
    const title = 'Home';
    res.render('home', {
      title,
    });
  });

export default router;
