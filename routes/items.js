// routes/items.js
const express = require('express');
const router = express.Router();
const Item = require('../models/item');  // Assuming your Item model is in models/item.js

// Middleware to ensure the user is authenticated
function isAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    } else {
        res.status(401).json({ message: 'Unauthorized' });
    }
}

// CREATE - Add a new item
router.post('/', isAuthenticated, (req, res) => {
    const { name, description } = req.body;
    const newItem = new Item({
        name,
        description,
        userId: req.user.id,  // Assuming user is authenticated
    });

    newItem.save()
        .then(item => res.status(201).json(item))  // 201 Created
        .catch(err => res.status(400).json({ error: err.message }));  // 400 Bad Request
});

// READ - Get all items for a user
router.get('/', isAuthenticated, (req, res) => {
    Item.find({ userId: req.user.id })
        .then(items => res.json(items))  // Return the items as a JSON response
        .catch(err => res.status(400).json({ error: err.message }));
});

// UPDATE - Update an existing item by ID
router.put('/:id', isAuthenticated, (req, res) => {
    const { id } = req.params;
    const { name, description } = req.body;

    Item.findOneAndUpdate(
        { _id: id, userId: req.user.id },  // Ensure the item belongs to the authenticated user
        { name, description },  // Fields to update
        { new: true }  // Return the updated item
    )
    .then(item => {
        if (item) {
            res.json(item);  // Return the updated item
        } else {
            res.status(404).json({ message: 'Item not found' });  // 404 Not Found
        }
    })
    .catch(err => res.status(400).json({ error: err.message }));
});

// DELETE - Delete an item by ID
router.delete('/:id', isAuthenticated, (req, res) => {
    const { id } = req.params;

    Item.findOneAndDelete({ _id: id, userId: req.user.id })
        .then(item => {
            if (item) {
                res.status(204).send();  // 204 No Content (successful delete)
            } else {
                res.status(404).json({ message: 'Item not found' });  // 404 Not Found
            }
        })
        .catch(err => res.status(400).json({ error: err.message }));
});

module.exports = router;
