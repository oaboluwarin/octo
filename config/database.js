const databaseFunction = () => {
  if (process.env.NODE_ENV === 'production') {
    return { mongoURI: process.env.PRODUCTION_DB_URI };
  }
  return { mongoURI: process.env.DEV_DB_URI };
};

export default databaseFunction;
