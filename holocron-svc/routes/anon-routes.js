var Post = require('../models/post');

module.exports = function(app) {

  // Get all posts 
  app.get('/post', function (req, res) {
    Post.find({}, function(err, posts){
      if (err) { res.send(err); return; }
      res.json(posts);
      return;
    });
  });

  // Get post by ID
  app.get('/post/:id', function (req, res) {
    Post.find({'id':req.params.id}, function(err,posts){
      if (err) { res.send(err); return; }
      if (posts.length > 1) { res.send({'error':'Found more than one post with id: ' + req.params.id}); return; }
      if (posts.length === 0) { res.send({'error':'Found no posts with id: ' + req.params.id}); return; }

      res.json(posts[0]);
    });
  });

};