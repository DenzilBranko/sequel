
var express = require('express')
var app = express();
var bodyParser = require('body-parser');
const models = require('./models/index');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post('/api/userpost',(req,res) => {
    models.User.create({
        name : req.body.name,
        email : req.body.email
    })
    .then(()=>{
        res.status(200).send("success");
    })
    .catch(()=> {
        res.status(500).send("oops..!something went wrong");
    })
});

app.post('/api/addtasks',(req,res) => {
    models.Task.create({
        taskName : req.body.name,
        UserId : req.body.userid
    })
    .then(()=>{
        res.status(200).send("success");
    })
    .catch((err)=> {
        res.status(500).send(`${err}`);
    })
});


app.get('/api/getall',(req,res) => {
    models.User.findAll({
        include: [{
                model: models.Task,
                required:true
            }]
    })
    .then((task) => {
        res.status(200).send(task)
    })
    .catch((err)=>{
        res.status(200).send(err)
    })

})

app.put('/api/updatetask/:id', (req, res) => {
    let user_id = req.params.id;
    let task_name = req.body.name;
    models.Task.update(
        {taskName : task_name},
        {where:{UserId:user_id}}
    )
    .then(() => {
        res.status(200).send("success")
    })
    .catch((err) => {
        res.status(500).send(err);
    })
     
})

app.delete('/api/deleteuser/:id', (req, res) => {
    let user_id = req.params.id;
    models.User.destroy({
        where : {id:user_id}
    })
    .then(()=>{
        res.status(200).send("successfully deleted")
    })
    .catch((err) => {
        res.status(500).send(err)
    })
})


module.exports = app;

