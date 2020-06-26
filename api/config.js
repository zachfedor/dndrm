module.exports = {
  port: process.env.PORT || 3030,
  dburl: process.env.DATABASE_URL,
  secret: process.env.process === 'production' ? process.env.SECRET : 'secret',
};
