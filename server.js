const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
app.use(cors())
app.use(express.json());
mongoose.connect('mongodb+srv://vaibhavmeshram2908:vaibhav123@cluster0.1pkf5.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0',{
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
const TaskSchema = new mongoose.Schema({
    name : String,
    completed : Boolean,

});
const Task = mongoose.model('Task',TaskSchema);
app.post('/tasks', async(req,res) => {
    const tasks = new Task(req.body);
    await tasks.save();
    res.send(tasks);
})
app.get('/tasks',async(req,res) => {
    const tasks = await Task.find();
    res.send(tasks);
})
app.put('/tasks/:id', async(req,res) => {
    const tasks = await Task.findByIdAndUpdate(req.params.id,req.body,{new: true});
    res.send(tasks);
})
app.delete('/tasks', async(req,res) => {
    await Task.findByIdAndDelete(req.params.id);
    res.send({message: 'Task Deleted'})
})
app.listen(3001, () => {
    console.log("server is running");
    print("Hello")
})