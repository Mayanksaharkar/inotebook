const mongoose = require('mongoose')
const connectToMongo = () => {
    mongoose.connect("mongodb://localhost:27017/inotebook?directConnection=true")
}
module.exports = connectToMongo;