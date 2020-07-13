const express = require('express');
const { check } = require('express-validator');
const { asyncHandler, handleValidationErrors } = require('../utils');
const db = require('../db/models');
const { requireAuth } = require('../auth');
const upload = require('../services/image-upload');
const { Op } = require('sequelize');

const singleImageUpload = upload.single('image');

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
        include: [
            {
                model: db.Text
            },
            {
                model: db.Photo
            },
            {
                model: db.Quote
            },
        ]
    });
    if (post) {
        res.json({ post })
    } else {
        next(postNotFound(postId))
    }
}));

//updates a text post
router.put('/posts/:postId/text', requireAuth, asyncHandler(async (req, res, next) => {
    const postId = req.params.postId;
    const post = await db.Post.findByPk(postId);
    const textPost = await db.Text.findOne({ where: { postId } });
    if (req.user.id !== post.userId) { //Checks if user is signed in and can edit their own tweet
        const err = new Error('Unauthorized');
        err.status = 401;
        err.message = 'You are not authorized to update this post.';
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

//updates a quote post
router.put('/posts/:postId/quote', requireAuth, asyncHandler(async (req, res, next) => {
    const postId = req.params.postId;
    const post = await db.Post.findByPk(postId);
    const quotePost = await db.Quote.findOne({ where: { postId } });
    if (req.user.id !== post.userId) { //Checks if user is signed in and can edit their own tweet
        const err = new Error('Unauthorized');
        err.status = 401;
        err.message = 'You are not authorized to update this post.';
        err.title = 'Unauthorized';
        throw err
    }
    if (quotePost) {
        await quotePost.update({
            quote: req.body.quote,
            source: req.body.source
        });
        res.json({ quotePost });
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

//make a quote post
router.post('/posts/quote', requireAuth, asyncHandler(async (req, res) => {
    const {
        postId,
        quote,
        source,
        postTypeId
    } = req.body;
    const quotePost = await db.Quote.create({
        postId,
        quote,
        source,
        postTypeId
    });
    res.json({ quotePost })
}));

//make a photo post
router.post('/posts/photo', requireAuth, singleImageUpload, asyncHandler(async (req, res) => {
    const {
        postId,
        caption,
        postTypeId
    } = req.body;

    const photoPost = await db.Photo.create({
        postId,
        caption,
        photoUrl: req.file.location,
        postTypeId
    });

    return res.json({ photoPost });
}));

//get a users feed
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
                    include: [
                        {
                            model: db.Post,
                            include: [
                                {
                                    model: db.Text
                                },

                                {
                                    model: db.Quote
                                },
                                {
                                    model: db.Photo
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
                                },
                                {
                                    model: db.Like,
                                    attributes: ['userId'],
                                    include: {
                                        model: db.User,
                                        attributes: ['userName', 'profilePicPath']
                                    }
                                },
                            ]
                        }
                    ]
                },
                {
                    model: db.Post,
                    include: [
                        {
                            model: db.Text,
                        },
                        {
                            model: db.Quote
                        },
                        {
                            model: db.Photo
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

        const followingPosts = followerPosts.dataValues.following.flatMap((following) => following.Posts)
        const userPosts = followerPosts.dataValues.Posts;
        followingPosts.push(...userPosts)
        const sortedPosts = followingPosts.sort((a, b) => b.createdAt - a.createdAt)

        const likedPosts = await db.Like.findAll({
            where: {
                userId
            },
            attributes: ['postId']
        })

        res.json({ sortedPosts, likedPosts });
    } else {
        next(userNotFound(userId));
    }
}))
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
    const post = await db.Post.findByPk(postId);
    if (req.user.id !== post.userId) { //Checks if user is signed in and can edit their own tweet
        const err = new Error('Unauthorized');
        err.status = 401;
        err.message = 'You are not authorized to delete this post.';
        err.title = 'Unauthorized';
        throw err
    }

    const textPost = await db.Text.findOne({
        where: { postId }
    });

    if (textPost) {
        await textPost.destroy();
        res.json({ textPost });
    } else {
        next(postNotFound(postId))
    }
}));

//delete a quote post
router.delete('/posts/:postId(\\d+)/quote', requireAuth, asyncHandler(async (req, res, next) => {
    const postId = req.params.postId;
    const post = await db.Post.findByPk(postId);
    if (req.user.id !== post.userId) { //Checks if user is signed in and can edit their own tweet
        const err = new Error('Unauthorized');
        err.status = 401;
        err.message = 'You are not authorized to delete this post.';
        err.title = 'Unauthorized';
        throw err
    }
    const quotePost = await db.Quote.findOne({
        where: { postId }
    });

    if (quotePost) {
        await quotePost.destroy();
        res.json({ quotePost });
    } else {
        next(postNotFound(postId))
    }
}));

//delete a photo post
router.delete('/posts/:postId(\\d+)/photo', requireAuth, asyncHandler(async (req, res, next) => {
    const postId = req.params.postId;
    const post = await db.Post.findByPk(postId);
    if (req.user.id !== post.userId) { //Checks if user is signed in and can edit their own tweet
        const err = new Error('Unauthorized');
        err.status = 401;
        err.message = 'You are not authorized to delete this post.';
        err.title = 'Unauthorized';
        throw err
    }
    const photoPost = await db.Photo.findOne({
        where: { postId }
    });

    if (photoPost) {
        await photoPost.destroy();
        res.json({ photoPost });
    } else {
        next(postNotFound(postId))
    }
}));

//add a like
router.post('/posts/:postId(\\d+)/like', requireAuth, asyncHandler(async (req, res) => {
    const postId = req.params.postId;
    const existingLike = await db.Like.findOne({
        where: {
            userId: req.user.id,
            postId
        }
    });
    if (!existingLike) {
        const like = await db.Like.create({
            userId: req.user.id,
            postId
        });
        res.json({ like });
    }
    res.json({ message: 'Like exists' })
}));

//delete a like
router.delete('/posts/:postId(\\d+)/like', requireAuth, asyncHandler(async (req, res, next) => {
    const postId = req.params.postId;
    const existingLike = await db.Like.findOne({
        where: {
            userId: req.user.id,
            postId
        }
    });

    if (existingLike) {
        existingLike.destroy();
        res.json({ existingLike })
    }
}))

router.get('/quick/:userId', asyncHandler(async (req, res) => {
    const userId = req.params.userId;
    const post = await db.Post.findAll({ where: { userId } })
    res.json({ post })
}))

module.exports = router;
