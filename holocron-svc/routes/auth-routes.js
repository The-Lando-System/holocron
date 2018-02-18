var configFile = require('../config');
var request = require('request');

module.exports = function(app) {

  // Google Auth ===================================

  // Get the Google OAuth client ID from a config file
  app.get('/google/client-id', function (req, res) {
    if (configFile.google_client_id) {
      res.send({'client_id':configFile.google_client_id});
    } else {
      res.status(500);
      res.send({'ERROR':'Could not get the google client id! Check to see that it is present in config.js'});
    }
  });

  // Verify the OAuth access token against Google's identity provider
  app.use(function(req,res,next){
    var access_token = req.headers['x-access-token'];

    if (!access_token) {
      return res.status(400).json({
        'error' : 'No access token provided!',
        'type' : 'NO_TOKEN',
        'details' : 'The header [x-access-token] must be provided in the request'
      });
    }

    var options = {
      url: `https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=${access_token}`,
      method: 'POST'
    };
    request(options, function(error, response, body) {
      
      let tokenInfo;
      try {
        tokenInfo = JSON.parse(body);
      } catch(e) {
        console.log(e);
        return res.status(500).json({
          'error' : 'Unknown error occurred',
          'type' : 'UNKNOWN',
          'details' : e
        });
      }

      if (!tokenInfo || !tokenInfo.email) {
        var error_message = {
          'error' : `Failed to verify access token!`,
          'type' : 'VERIFY_FAIL',
          'details' : `Access token [${access_token}]`
        };
        if (error && error.message) {
          error_message.details = error.message;
        }
        return res.status(400).json(error_message);
      }
      req.id = tokenInfo.email;

      // I am the only one allowed to make posts to the blog
      if (req.id !== 'matt.voget@gmail.com') {
        return res.status(400).json({
          'error' : 'You are not authorized to access this route!',
          'type' : 'NO_PERMISSION',
          'details' : 'You are not Matt, therefore you do not have access to this route'
        });
      }

      next();
    });
  });


  // Secured routes for Posts ================================

  app.post('/post', function (req, res) {

    var newPost = {
      'id': uuidv4(),
      'title': req.body.title,
      'date': req.body.date,
      'content': req.body.content
    };

    Post.create(newPost, function(err, post){
      if (err) { res.send(err); return; }
      res.send(post);
    });
  });

  app.put('/post/:id', function (req, res) {
    Post.find({'id':req.params.id}, function(err,posts){
      if (err) { res.send(err); return; }
      if (posts.length > 1) { res.send({'error':'Found more than one post with id: ' + req.params.id}); return; }
      if (posts.length === 0) { res.send({'error':'Found no posts with id: ' + req.params.id}); return; }

      var post = posts[0];

      post.title = req.body.title || post.title;
      post.date = req.body.date || post.date;
      post.content = req.body.content || post.content;
      
      post.save(function(err){
        if (err) { res.send(err); return; }
        
        res.json({ message: 'Post with ID ' + req.params.id + ' was successfully updated!' });
      });
    });
  });

  app.delete('/post/:id', function(req,res) {
    Post.find({'id':req.params.id}, function(err,posts){
      if (err) { res.send(err); return; }
      if (posts.length > 1) { res.send({'error':'Found more than one post with id: ' + req.params.id}); return; }
      if (posts.length === 0) { res.send({'error':'Found no posts with id: ' + req.params.id}); return; }

      Post.remove({'id': req.params.id }, function(err,post){
        if (err) { res.send(err); return; }
        
        res.send(post);
      });
    });
  });
};