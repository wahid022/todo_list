const mongoose=require('mongoose');


//defining the schema for mongodb
const todolistSchema=new mongoose.Schema(
    {
        description:
        {
            type:String,
            required:true
        },

        category:
        {
            type:String,
            required:true
        },
        date:
        {
            type:String,
            required:true
        }
    }
);


const Todolist=mongoose.model('Todolist',todolistSchema);

//exporting to index.js
module.exports=Todolist;