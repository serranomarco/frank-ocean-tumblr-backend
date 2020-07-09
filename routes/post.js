const express = require('express');
const { check } = require('express-validator');
const { asyncHandler, handleValidationErrors } = require('../utils');
const db = require('../db/models');
const { requireAuth } = require('../auth');
const { Op } = require('sequelize');

const router = express.Router();

const postNotFound = (id) => {
    const err = Error('Post not found');
    err.errors = [`Post with id of ${id} could not be found`];
    err.title = 'Post not found';
    err.status = 404;
    return err;
}

const userNotFound = (id) => {
    const err = Error('User not found');
    err.errors = [`User with id of ${id} could not be found`];
    err.title = 'User not found';
    err.status = 404;
    return err;
}

const commentNotFound = (id) => {
    const err = Error('Comment not found');
    err.errors = [`Comment with id of ${id} could not be found`];
    err.title = 'Comment not found';
    err.status = 404;
    return err;
}

const likeNotFound = (id) => {
    const err = Error('Like not found');
    err.errors = [`Like with id of ${id} could not be found`];
    err.title = 'Like not found';
    err.status = 404;
    return err;
}

//create a post
router.post('/posts', requireAuth, asyncHandler(async (req, res) => {

    const post = await db.Post.create({
        userId: req.user.id, // replace with req.user.id so it's based on who is logged in
    });

    res.json({ post });
}));

router.post('/posts/text', requireAuth, asyncHandler(async (req, res) => {
    const {
        postId,
        title,
        text
    } = req.body;

    const textPost = await db.Text.create({
        postId,
        title,
        text
    });

    res.json({ textPost })
}))

module.exports = router;
