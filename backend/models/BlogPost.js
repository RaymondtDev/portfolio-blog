const mongoose = require("mongoose")
const { Schema } = mongoose;
const slugify = require("slugify");

const BlogPostSchema = new Schema({
  cover: {
    url: {
      type: String,
      required: true,
      default: "https://picsum.photos/1200/1080"
    },
    public_id: { type: String }
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
  embeddedImages: [
    { url: String, public_id: String }
  ],
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