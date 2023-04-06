const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.ObjectId



const instacloneSchema = new Schema ({
    name: {type: String }, 
    location: {type: String },
    likes: {type: Number },
    description: {type: String },
    image: {name: String, data: Buffer, contentType: String},
    date: {type: Date}
})

module.exports = mongoose.model('user', instacloneSchema)
