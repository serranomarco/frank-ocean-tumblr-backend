const express = require("express");
const bcrypt = require("bcryptjs");
const { check } = require("express-validator");
const { asyncHandler, handleValidationErrors } = require("../utils");
const { getUserToken, requireAuth } = require("../auth");
const { Op } =
  require('sequelize');

const router = express.Router();
const db = require("../db/models");

const { User } = db;

const validateEmailAndPassword = [
  check("email")
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage("Please provide a valid email."),
  check("password")
    .exists({ checkFalsy: true })
    .withMessage("Please provide a password."),
  handleValidationErrors,
];
//create a user
router.post(
  "/register",
  check("userName")
    .exists({ checkFalsy: true })
    .withMessage("Please provide a username"),
  validateEmailAndPassword,
  asyncHandler(async (req, res) => {
    const {
      userName,
      email,
      password,
    } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      userName,
      email,
      hashedPassword,
      profilePicPath: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSVOp3hYOhOho5p9WvL1r4RuT4S-PUS5zFKtg&usqp=CAU'
    });

    const token = getUserToken(user);
    res.status(201).json({ token, user: { id: user.id, userName: user.userName } });
  })
);

//create user token on login
router.post(
  "/token",
  [
    check("email")
      .exists({ checkFalsy: true })
      .withMessage("Please provide a valid username or email."),
    check("password")
      .exists({ checkFalsy: true })
      .withMessage("Please provide a password."),
    handleValidationErrors,
  ],
  asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;
    const user = await User.findOne({
      where: {
        [Op.or]: [{ email: email }, { userName: email }]
      },
    });



    if (!user || !user.validatePassword(password)) {
      const err = new Error("Login failed");
      err.status = 401;
      err.title = "Login failed";
      err.errors = ["The provided credentials were invalid."];
      return next(err);
    }
    const token = getUserToken(user);
    res.json({ token, user: { id: user.id, userName: user.userName } });
  })
);

const userNotFoundError = (id) => {
  const err = Error("User not found");
  err.errors = [`User with id of ${id} could not be found.`];
  err.title = "User not found.";
  err.status = 404;
  return err;
};

const userIsFound = (type) => {
  const err = Error('User found')
  err.errors = [`The following ${type} has already been taken.`];
  err.title = "User found";
  return err;
}

//get list of all users
// router.get(
//   "/all",
//   asyncHandler(async (req, res) => {
//     const users = await User.findAll({ attributes: ['id', 'userName', 'email'] });
//     res.json({ users });
//   })
// );

//get info for specific user
router.get(
  "/:id(\\d+)",
  requireAuth,
  asyncHandler(async (req, res, next) => {
    const user = await User.findByPk(req.params.id, { attributes: ['id', 'userName', 'email', 'profilePicPath'] });
    if (user) {
      res.json({ user });
    } else {
      next(userNotFoundError(req.params.id));
    }
  })
);

//edit profile
router.put(
  "/:id(\\d+)",
  requireAuth,
  asyncHandler(async (req, res, next) => {
    const user = await User.findByPk(req.params.id, { attributes: ['id', 'userName', 'email', 'profilePicPath'] });

    if (user) {
      if (req.user.id != user.id) {
        //KDEV change req.body.user to req.user
        const err = new Error("Unauthorized");
        err.status = 401;
        err.message = "You are not authorized to edit this user.";
        err.title = "Unauthorized";
        throw err;
      }
      await user.update({
        userName: req.body.userName,
        email: req.body.email,
      });
      res.json({ user });
    } else {
      next(userNotFoundError(req.params.id));
    }
  })
);

//edits profile pic
router.put("/:id(\\d+)/profile-pic", requireAuth, asyncHandler(async (req, res, next) => {
  const user = await db.User.findByPk(req.params.id);
  const {
    profilePicPath
  } = req.body;
  if (req.user.id != user.id) {
    //KDEV change to req.user.id
    const err = new Error("Unauthorized");
    err.status = 401;
    err.message = "You are not authorized to update this profile.";
    err.title = "Unauthorized";
    throw err;
  }
  if (user) {
    await user.update({
      profilePicPath
    });
    res.json({ user })
  } else {
    next(userNotFoundError(req.params.id));
  }
}))

//delete a user
router.delete(
  "/:id(\\d+)",
  requireAuth,
  asyncHandler(async (req, res, next) => {
    const user = await User.findByPk(req.params.id);

    if (user) {
      if (req.user.id != user.id) {
        //KDEV change to req.user.id
        const err = new Error("Unauthorized");
        err.status = 401;
        err.message = "You are not authorized to delete this user.";
        err.title = "Unauthorized";
        throw err;
      }
      await user.destroy();
      res.json({ message: `Deleted user with id of ${req.params.id}.` });
    } else {
      next(userNotFoundError(req.params.id));
    }
  })
);

//get all followers for a user
router.get(
  "/:id(\\d+)/followers",
  asyncHandler(async (req, res) => {
    const user = await User.findByPk(req.params.id, {
      attributes: ['userName'],
      include: {
        model: db.User,
        as: "followers",
        attributes: ["id", "userName"],
        through: {
          attributes: [],
        },
      },
    });
    res.json({ user });
  })
);


//get all the people user is following
router.get(
  "/:id(\\d+)/following",
  asyncHandler(async (req, res) => {
    const user = await User.findByPk(req.params.id, {
      attributes: ['userName'],
      include: {
        model: db.User,
        as: "following",
        attributes: ["id", "userName"],
        through: {
          attributes: [],
        },
      },
    });
    res.json({ user });
  })
);

//follow someone
router.post(
  "/:id(\\d+)/following/",
  requireAuth,
  asyncHandler(async (req, res) => {
    if (req.user.id != req.params.id) { //31 = 2
      //KDEV change to req.user.id

      const err = new Error("Unauthorized");
      err.status = 401;
      err.message = "You are not authorized to follow this user.";
      err.title = "Unauthorized";
      throw err;
    }
    const follow = await db.Follow.create({
      followerId: req.user.id,
      followingId: req.body.id
    });
    res.json({ follow });
  })
);

//unfollow someone
router.delete(
  "/:id(\\d+)/following/:followingId(\\d+)",
  requireAuth,
  asyncHandler(async (req, res) => {
    if (req.user.id != req.params.id) {
      //KDEV change to req.user.id
      const err = new Error("Unauthorized");
      err.status = 401;
      err.message = "You are not authorized to unfollow this user.";
      err.title = "Unauthorized";
      throw err;
    }
    const follow = await db.Follow.findOne({
      where: {
        followerId: req.user.id,
        followingId: req.params.followingId,
      },
    });
    if (follow) {
      follow.destroy();
      res.json({ follow });
    } else {
      res.json({ err: ["You were not following this person."] });
    }
  })
);

router.post('/check/:type', asyncHandler(async (req, res, next) => {
  const type = req.params.type;
  let user;

  if (type === 'email') {
    user = await db.User.findOne({
      where: {
        email: req.body.value
      }
    })

  } else if (type === 'username') {
    user = await db.User.findOne({
      where: {
        userName: req.body.value
      }
    })
  }
  if (user) {
    next(userIsFound(type));
  } else {
    res.json({ message: true })
  }
}));

module.exports = router;
