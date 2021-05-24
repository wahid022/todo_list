//Requiring the express
const express=require('express');

//Server running on port number 9000
const port=9000;

//requiring the path for view engine 
const path=require('path');

//requiring mongoose.js file from config folder or directory 
const db=require('./config/mongoose');

//varible to fetch the schema of the database defined in todolist
const Todolist=require('./models/todolist');




const app=express();

//middle ware to access the static files such as css etc
app.use(express.static('assets'));

//this middleware fetches data from front end and bring back data in req.body 
app.use(express.urlencoded());

//setting up the view engine
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));


//controller for fetching data from the database
app.get('/',function(req,res)
{
    Todolist.find({},function(err,todolist)
    {
        
        

        if(err)
        {
            console.log('Error in loading and fetching from the db');
            return;
        }
        return res.render('home',{
            title: "Todo list",
            todolist:todolist
        });
    });
});


//controller to fetch data from the form 
app.post('/create-list',function(req,res)
{
    console.log(req.body);



    Todolist.create(
    {
        description:req.body.description,
        category:req.body.category,
        date:req.body.date
    },function(err,newList)
    {
        if(err)
        {
            console.log('Error in Creating a Todolist');
            return;
        }
        console.log('****',newList);
        return res.redirect('back');
    });
});


//controller to delete data from the database
app.get('/delete-list',function(req,res)
{
    console.log(req.query);
    let id=req.query.id;

    Todolist.findByIdAndDelete(id,function(err)
    {
        if(err)
        {
            console.log("Error in Deleting From Database");
            return ;
        }
    });
    return res.redirect('back');
});

//setting up the server 
app.listen(port,function(err)
{
    if(err)
    {
        console.log("Error in connecting to express server ",err);
        return;
    }

    console.log("Express is up and running on port",port);
});