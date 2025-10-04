const BlogPost = require("../models/BlogPost");
const sanitize = require("mongo-sanitize");
const slugify = require("slugify");
const cloudinary = require("../config/cloudinary");
const extractCloudinaryIds = require("../utils/extractCloudinaryIds");
const path = require("path");
const fs = require("fs");


exports.getBlogPosts = async (req, res) => {
  try {
    
    const { tag } = req.query;

    let filter = {};
    if (tag && tag !== "latest") {
      filter.tags = tag;
    }

    const blogPosts = await BlogPost.find(filter)
      .sort({ createdAt: -1 })
      .populate("author", "username email");
    
    if (tag === "latest") {
      return res.json(blogPosts.slice(0, 10))
    }

    res.json(blogPosts);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createPost = async (req, res) => {
  try {

    const { title, content, tags } = req.body;

    const publicUrls = extractCloudinaryIds(content);

    const blogPost = new BlogPost({
      title: sanitize(title),
      content: sanitize(content),
      tags: tags?.map(tag => sanitize(tag)),
      author: req.admin.id,
      cover: {
        url: req.file?.path || undefined,
        public_id: req.file?.filename || undefined
      },
      embeddedImages: publicUrls.map(id => ({
        url: `https://res.cloudinary.com/${process.env.CLOUDINARY_CLOUD_NAME}/image/upload/${id}`,
        public_id: id
      }))
    });
    await blogPost.save();
    res.status(201).json(blogPost);

  } catch (error) {
    console.error("Error creating blog post:", error);
    res.status(400).json({ error: "An error occurred while creating the blog post." });
  }
};

exports.getPostBySlug = async (req, res) => {
  try {
    
    const slug = sanitize(req.params.slug);

    const blogPost = await BlogPost.findOne({ slug })
      .populate("author", "username email");
    
    if (!blogPost) return res.status(404).send("Blog post not found");

    res.json(blogPost);

  } catch (error) {
    res.status(500).json({ error: error.messsage });
  }
};


exports.updatePost = async (req, res) => {
  try {
    
    const { id } = req.params;
    const { title, content, tags } = req.body;

    const blogPost = await BlogPost.findById(sanitize(id));
    if (!blogPost) return res.status(404).send("Blog post not found");

    if (title && title !== blogPost.title) {
      blogPost.title = sanitize(title);
      blogPost.slug = slugify(blogPost.title, { lower: true, strict: true });
    }

    if (content) {
      blogPost.content = content;

      // Extract new embedded image IDs from the updated content
      const newEmbeddedImageIds = extractCloudinaryIds(content);

      // Find and delete removed images from Cloudinary
      for (const image of blogPost.embeddedImages) {
        if (!newEmbeddedImageIds.includes(image.public_id)) {
          await cloudinary.uploader.destroy(image.public_id);
        }
      }

      // Update the embeddedImages array with the new list
      blogPost.embeddedImages = newEmbeddedImageIds.map(id => ({
        url: `https://res.cloudinary.com/${process.env.CLOUDINARY_CLOUD_NAME}/image/upload/${id}`,
        public_id: id
      }));
    }

    if (tags) {
      // If tags are provided, sanitize and update them
      blogPost.tags = tags.map(tag => sanitize(tag));
    }

    // if there is a new cover image, update it
    if (req.file) {
      if (blogPost.cover?.public_id) {
        await cloudinary.uploader.destroy(blogPost.cover.public_id);
      }

      blogPost.cover = {
        url: req.file.path,
        public_id: req.file.filename
      };
    }

    const updatedPost = await blogPost.save();

    res.status(200).json(updatedPost);

  } catch (error) {
    res.status(400).json({ error: "An error occured while updating blog post." });
  }
};

exports.deletePost = async (req, res) => {
  try {
    
    const { id } = req.params;

    const blogPost = await BlogPost.findById(sanitize(id));
    if (!blogPost) return res.status(404).send("Blog post not found");

    if (blogPost.cover?.public_id) {
      await cloudinary.uploader.destroy(blogPost.cover.public_id);
    }

    // Delete embedded images from Cloudinary
    for (const image of blogPost.embeddedImages) {
      if (image.public_id) {
        await cloudinary.uploader.destroy(image.public_id);
      }
    }

    await blogPost.deleteOne();

    res.status(200).send("Blog post deleted successfully");

  } catch (error) {
    res.status(500).json({ error: "An error occurred while deleting the blog post." });
  }
};