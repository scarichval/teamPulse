const express = require('express');
const mongoose = require('mongoose');
const verifyToken = require('../middleware/auth');
const Tasks = require('../models/Tasks');

const router = express.Router();

router.post('/', verifyToken, async(req, res) => {
    const {title, status} = req.body;

    try {
        const task = await Tasks.create({
            title,
            status, 
            createdBy: req.user.id
        });
        res.status(202).json({task});

    } catch (err) {
         res.status(400).json({error: err.message});
    }
});

router.get('/', verifyToken, async(req, res) => {
    try {
        const tasks = await Tasks.find({createdBy: req.user.id});
        res.json({tasks});
    } catch (err) {
         res.status(400).json({error: err.message});
    }
});


router.put('/:id', verifyToken, async(req, res) => {
    try {
        const task = await Tasks.findOneAndUpdate(
            {_id: req.params.id, createdBy: req.user.id},
            req.body,
            { new: true }
        );

        if(!task) return res.status(404).json({message: "Task not found"});
        res.json(task);
    } catch (error) {
        res.status(400).json({ error: err.message });
    }
});

router.delete('/:id', verifyToken, async(req, res) => {
    try {
        const task = await Tasks.findOneAndDelete({
            _id: req.params.id,
            createdBy: req.user.id
        });

        if(!task) return res.status(404).json({error: "Task not found"});
        res.json({message: "Task deleted"});
    } catch (err) {
        res.status(400).json({error: err.message});
    }
});


module.exports = router;