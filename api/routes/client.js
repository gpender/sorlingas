const Client = require('../sequelize/sequelize').Client;

const getAllClients = async () => {
    return await Client.findAll();
  };
const getClient = async id => {
    console.log(id);
    return await Client.findOne({where: {Client_Id:id}});
};


module.exports = function(app,passport){  
    app.get('/clients', passport.authenticate('jwt', { session: false }), function(req, res) {
        getAllClients().then(clients => res.json(clients)); 
    });
    app.get('/client', function(req,res){
        var id = req.query.id;
        getClient(id).then(client => res.json(client));
    });
    // protected route
    // app.get('/protected', passport.authenticate('jwt', { session: false }), function(req, res) {
    //     res.json({ msg: 'Congrats! You are seeing this because you are authorized'});
    // });
    // app.post('/register', function(req, res, next) {
    //     console.log(req.body);
    //     const { email, password, firstName, lastName, parentClientId } = req.body;
    //     createUser({ email, password, firstName, lastName, parentClientId }).then(user =>
    //         res.json({ user, msg: 'account created successfully' })
    //     ).catch(function(err){
    //         return res.status(400).json({ message: err.errors[0].message})
    //     });
    // });

/*     app.post('/login',(req,res,next) =>{
        //console.log(user);
        passport.authenticate('login', (err,user,info) => {
            if(err){
                console.log(err);
            }
            if(info != undefined){
                console.log(info.message);
                res.send(info.message);
            }else{
                req.login(user,err =>{
                    User.findOne({
                        where: {
                            email:user.email,
                        },
                    }).then(user=>{
                        const token= "JWT " + jwt.sign({id:user.email},process.env.JWT_SECRET);
                        console.log(user);
                        res.status(200).send({
                            user,
                            token,
                            message:'user found and logged in'
                        });                        
                    });
                });
            }
        })(req,res,next);
    }); */

    // Endpoint to get current user
    // app.get('/client', function(req, res){
    //     console.log(req.user);
    //     res.send(req.user);
    // });

    // app.delete('/client', function(req,res){
    //     console.log(req.user);
    //     return;
    //     deleteUser(req.user);
    // })
}
