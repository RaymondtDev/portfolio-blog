const mongoose = require("mongoose")
const { Schema } = mongoose;
const slugify = require("slugify");

const BlogPostSchema = new Schema({
  cover: {
    type: String,
    default: "https://via.placeholder.com/600x400?text=No+Image"
  },
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  tags: [String],
  createdAt: {
    type: Date,
    default: Date.now
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: "Admin",
    required: true
  },
  updatedAt: { type: Date },
  slug: {
    type: String,
    required: true,
    unique: true
  }
});

BlogPostSchema.pre("save", function(next) {
  this.updatedAt = new Date();
  next();
});

BlogPostSchema.pre("validate", function(next) {
  if (this.title && !this.slug) {
    this.slug = slugify(this.title, { lower: true, strict: true });
  }
  next();
});

module.exports = mongoose.model("BlogPost", BlogPostSchema);