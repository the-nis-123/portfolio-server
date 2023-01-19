const mongoose = require('mongoose');

module.exports = (app) => {
  const PORT = process.env.PORT || 9000;
  const DB_CONNECTION = process.env.DB_CONNECTION;

  mongoose.connect(DB_CONNECTION,{
    useUnifiedTopology: true,
    useNewUrlParser: true
  })
  .then(() => {
    app.listen(PORT, ()=>{console.log(`listening on ${PORT}`)});
  })
  .catch((err) => {
    //do something here with the error
    console.log('db error', err);
  })
}
