const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost:27017/resumly', { useNewUrlParser: true, useUnifiedTopology: true}).then(()=> {
    console.log('Resumly database connected successfully!');
}).catch((e)=> {
    console.log("Error while connecting to db!");
    console.log(e);
});

mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);

module.exports = { mongoose };