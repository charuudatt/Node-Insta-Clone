const mongoose = require('mongoose')
mongoose.set('strictQuery', true)

async function conn () {
    await mongoose.connect('mongodb://127.0.0.1:27017/instaclone')
}

module.exports = conn