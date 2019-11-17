module.exports = function(app) {
    
    app.get('/api/loginUser', function(req, res) {

        res.send({express: 'hello world'});

    });

}