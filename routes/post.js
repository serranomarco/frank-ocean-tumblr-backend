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
    const {
        postTypeId
    } = req.body

    const post = await db.Post.create({
        userId: req.user.id,
        postTypeId
    });

    res.json({ post });
}));

//gets a post
router.get('/posts/:postId', asyncHandler(async (req, res, next) => {
    const postId = req.params.postId;
    const post = await db.Post.findByPk(postId, {
        attributes: [],
        include: [{
            model: db.Text
        }]
    });
    if (post) {
        res.json({ post })
    } else {
        next(postNotFound(postId))
    }
}));

//updates a text post
router.put('/posts/:postId', requireAuth, asyncHandler(async (req, res, next) => {
    const postId = req.params.postId;
    const post = await db.Post.findByPk(postId);
    const textPost = await db.Text.findOne({ where: { postId } });
    if (req.user.id !== post.userId) { //Checks if user is signed in and can edit their own tweet
        const err = new Error('Unauthorized');
        err.status = 401;
        err.message = 'You are not authorized to delete this post.';
        err.title = 'Unauthorized';
        throw err
    }
    if (textPost) {
        await textPost.update({
            title: req.body.title,
            text: req.body.text
        });
        res.json({ textPost });
    } else {
        next(postNotFound(postId))
    }
}))

//make a text post
router.post('/posts/text', requireAuth, asyncHandler(async (req, res) => {
    const {
        postId,
        title,
        text,
        postTypeId
    } = req.body;

    const textPost = await db.Text.create({
        postId,
        title,
        text,
        postTypeId
    });

    res.json({ textPost })
}));

router.get('/posts/following/:userId(\\d+)', requireAuth, asyncHandler(async (req, res, next) => {
    const userId = req.params.userId;
    const user = await db.User.findByPk(userId);
    if (req.user.id !== user.dataValues.id) { //Checks if user is signed in and can edit their own tweet
        const err = new Error('Unauthorized');
        err.status = 401;
        err.message = 'You are not authorized to view these post.';
        err.title = 'Unauthorized';
        throw err
    }
    if (user) {
        const followerPosts = await db.User.findByPk(userId, {
            attributes: ['id', 'userName'],
            include: [
                {
                    model: db.User,
                    as: 'following',
                    attributes: ['id', 'userName'],
                    through: { attributes: [] },
                    include: {
                        model: db.Post,
                        order: [['createdAt', 'DESC']],
                        include: [
                            {
                                model: db.Text,
                                attributes: ['title', 'text']
                            },
                            {
                                model: db.User,
                                attributes: ['userName', 'profilePicPath']
                            },
                            {
                                model: db.Comment,
                                attributes: ['id', 'commenterId', 'comment', 'createdAt'],
                                order: [['createdAt', 'DESC']],
                                include: {
                                    model: db.User,
                                    attributes: ['userName', 'profilePicPath']
                                }
                            }, {
                                model: db.Like,
                                attributes: ['userId'],
                                include: {
                                    model: db.User,
                                    attributes: ['userName', 'profilePicPath']
                                }
                            }
                        ],
                    }
                },
                {
                    model: db.Post,
                    include: [
                        {
                            model: db.Text,
                            attributes: ['title', 'text']
                        },
                        {
                            model: db.User,
                            attributes: ['userName', 'profilePicPath']
                        },
                        {
                            model: db.Comment,
                            attributes: ['id', 'commenterId', 'comment', 'createdAt'],
                            order: [['createdAt', 'DESC']],
                            include: {
                                model: db.User,
                                attributes: ['userName', 'profilePicPath']
                            }
                        }, {
                            model: db.Like,
                            attributes: ['userId'],
                            include: {
                                model: db.User,
                                attributes: ['userName', 'profilePicPath']
                            }
                        }
                    ],
                }
            ],
        })

        const followingPosts = followerPosts.dataValues.following.flatMap((following) => following.posts)
        const userPosts = followerPosts.dataValues.Posts;
        followingPosts.push(...userPosts)
        const sortedPosts = followingPosts.sort((a, b) => b.createdAt - a.createdAt)

        res.json({ sortedPosts });
    } else {
        next(userNotFound(userId));
    }
    //delete a post
    router.delete('/posts/:postId(\\d+)', requireAuth, asyncHandler(async (req, res, next) => {
        const postId = req.params.postId
        const post = await db.Post.findByPk(postId);
        if (req.user.id !== post.userId) { //Checks if user is signed in and can edit their own tweet
            const err = new Error('Unauthorized');
            err.status = 401;
            err.message = 'You are not authorized to delete this post.';
            err.title = 'Unauthorized';
            throw err
        }
        if (post) {
            await post.destroy();
            res.json({ post })
        } else {
            next(postNotFound(postId));
        }
    }));

    //delete a text post
    router.delete('/posts/:postId(\\d+)/text', requireAuth, asyncHandler(async (req, res, next) => {
        const postId = req.params.postId;
        const textPost = await db.Text.findOne({
            where: { postId }
        });

        if (textPost) {
            await textPost.destroy();
            res.json({ textPost });
        } else {
            next(postNotFound(postId))
        }
    }))
}));

module.exports = router;
