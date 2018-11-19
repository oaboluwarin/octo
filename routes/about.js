import express from 'express';

const router = express.Router();

router.route('/')
  .get((req, res) => {
    const title = 'About';
    res.render('about', {
      title,
    });
  });

export default router;
