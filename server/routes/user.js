import express from 'express';

const router = express.Router();

const users = [
  {
    name: 'oreoluwade',
    sex: 'male',
  },
  {
    name: 'Folabomi',
    sex: 'female',
  },
  {
    name: 'Pelumi',
    sex: 'Male',
  },
];

router.get('/all', (req, res) => {
  res.send(users);
});

export default router;
