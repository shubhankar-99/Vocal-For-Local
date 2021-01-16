const express = require("express");
const router = new express.Router();
const Blog = require("../models/blogModel");
const auth = require("../auth/auth");
const sharp = require("sharp");
const multer = require("multer");
const upload = multer().single("media");

router.get("/blogs/me", auth, async (req, res) => {
  try {
    await req.user
      .populate({
        path: "blogs",
      })
      .execPopulate();

      const id = req.user._id.toString();
      
      req.user.blogs.forEach((blog)=>{
        blog.liked = blog.likes.some((e)=>{
          return (e.likedBy==id)
        })
      })
      
      req.user.blogs.reverse()

    res.send(req.user.blogs);
  } catch (e) {
    res.status(404).send(e);
  }
});

// /blogs?state=&city=
router.get("/blogs", auth, async (req, res) => {
  try {
    var blog;
    if (req.query.state && req.query.city)
      blog = await Blog.find({
        ownerState: req.query.state,
        ownerCity: req.query.city,
      });
    if (blog) return res.send(blog);
    if (req.query.city) blog = await Blog.find({ ownerCity: req.user.city });
    if (blog) return res.send(blog);
    if (req.query.state) blog = await Blog.find({ ownerState: req.user.state });
    if (blog) return res.send(blog);
    blog = await Blog.find({});

    const id = req.user._id.toString();

   blog.forEach((item) => {
      item.liked = item.likes.some((e) => {
        return e.likedBy == id;
      });
    });

    blog.reverse()

    // console.log(blog)
    res.send(blog);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.post("/blogs", auth, upload, async (req, res) => {
  try {
    const blog = new Blog(req.body);
    (blog.owner = req.user._id), (blog.ownerName = req.user.firstname);
    blog.liked = false;
    blog.likesCount = 0;
    if (req.file) {
      const buffer = await sharp(req.file.buffer)
        .resize({
          width: 360,
          height: 270,
        })
        .toBuffer();
      blog.media = buffer;
    }
    await blog.save();
    res.status(201).send("successful");
  } catch (e) {
    res.status(400).send(e);
  }
});

router.post("/blogs/:id", auth, async (req, res) => {
  try {
    const blog = await Blog.findOne({ _id: req.params.id });
    let likedBy = req.user._id.toString();

    const liked = blog.likes.some((e) => {
      return e.likedBy == likedBy;
    });

    let count;
    if (!liked) count = await blog.increaseLike(likedBy);
    else count = await blog.decreaseLike(likedBy);

    res.status(200).send({ count });
  } catch (e) {
    res.status(500).send(e);
  }
});

router.delete("/blogs/:id", auth, async (req, res) => {
  try {
    const blog = await Blog.findOneAndDelete({
      _id: req.params.id,
      owner: req.user._id,
    });
    if (!blog) return res.status(400).send();
    res.send("successful");
  } catch (e) {
    res.status(400).send(e);
  }
});

module.exports = router;
