module.exports = function(app) {

    app.get('/api/loginUser', function(req, res) {
        res.send({ express: 'This is new data'});
    });

}