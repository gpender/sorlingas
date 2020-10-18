



module.exports = function(app,passport){  
    app.post('/webhook', function(req, res, next) {
        console.log(req.body);
        return res.status(200).json(req.body);
        const { email, password, firstName, lastName, parentClientId } = req.body;
        createUser({ email, password, firstName, lastName, parentClientId }).then(user =>
            res.json({ user, msg: 'account created successfully' })
        ).catch(function(err){
            return res.status(400).json({ message: err.errors[0].message})
        });
    });    
}