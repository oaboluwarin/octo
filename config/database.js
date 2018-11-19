const databaseFunction = () => {
  if (process.env.NODE_ENV === 'production') {
    return { mongoURI: 'mongodb://oreoluwade:aster01d@ds229648.mlab.com:29648/octojot-prod' };
  }
  return { mongoURI: 'mongodb://localhost/octojot-dev' };
};

export default databaseFunction;
