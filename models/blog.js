const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//the schema defines the structure
const blogSchema = new Schema({
    title: {
        type: String,
        required : true
    },
    snippet: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    
},
{
    timestamps: true
});

//model
const Blog = mongoose.model('Blog', blogSchema); 
module.exports = Blog;
