module.exports = function(app) {

    console.log("this");

    app.get('/api/getData', function(req, res) {
        res.send({ express: 'This is new data'});
    });

}