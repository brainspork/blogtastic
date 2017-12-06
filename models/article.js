const mongoose = require('mongoose');


//Article Schema
const ArticleSchema = mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  pubDate: {
    type: String,
    required: true
  },
  pubTime: {
    type: Number,
    required: true
  },
  authorName: {
    type: String,
    required: true
  },
  author_id: {
    type: String,
    required: true
  },
  articleBody: {
    type: String,
    required: true
  },
  views: {
    type: Number
  },
  upVotes: {
    type: Number
  },
  downVotes: {
    type: Number
  },
  tags: {
    type: [String]
  }
});

const Article = module.exports = mongoose.model('Article', Article);

module.exports.getArticleById = function(id, callback) {
  Article.findbyId(id, callback);
}

module.exports.getArticleByTag = function(tag, callback) {
  const query = {tags: tag};
  User.find(query, callback);
}
