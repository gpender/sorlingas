const jwt = require('jsonwebtoken');
const User = require('../sequelize/sequelize').User;


// create some helper functions to work on the database
const createUser = async ({ email, password, firstName, lastName, parentClientId }) => { 
    return await User.create({ email, password, firstName, lastName, parentClientId });
  };  
const getAllUsers = async () => {
    return await User.findAll();
  };
const getUser = async obj => {
    return await User.findOne({where: obj,});
};
const deleteUser = async user => {
    console.log(user);
    const userObj = await User.findOne({where: {email:user.email,}});
    return await userObj.destroy();
};
  
module.exports = function(app,passport){  
    app.get('/users', function(req, res) {
        getAllUsers().then(user => res.json(user)); 
    });
    // protected route
    app.get('/protected', passport.authenticate('jwt', { session: false }), function(req, res) {
        res.json({ msg: 'Congrats! You are seeing this because you are authorized'});
    });
    app.post('/register', function(req, res, next) {
        console.log(req.body);
        const { email, password, firstName, lastName, parentClientId } = req.body;
        createUser({ email, password, firstName, lastName, parentClientId }).then(user =>
            res.json({ user, msg: 'account created successfully' })
        ).catch(function(err){
            return res.status(400).json({ message: err.errors[0].message})
        });
    });

    app.post('/login',(req,res,next) =>{
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
                        const token= jwt.sign({id:user.email},process.env.JWT_SECRET);
                        res.redirect(307,'https://portal.sorlingas.com');
                        //res.status(200).send({
                        //    user,
                        //    message:'user found and logged in'
                        //});
                    });
                });
            }
        })(req,res,next);
    });

    // Endpoint to get current user
    app.get('/user', function(req, res){
        console.log(req.user);
        res.send(req.user);
    });

    app.delete('/user', function(req,res){
        console.log(req.user);
        return;
        deleteUser(req.user);
    })
    // app.post('/login', async function(req, res, next) { 
    //     const { name, password } = req.body;
    //     if (name && password) {
    //         // we get the user with the name and save the resolved promise returned
    //         let user = await getUser({ name });

    //         console.log(user);
    //         if (!user) {
    //             res.status(401).json({ msg: 'No such user found', user });
    //         }
    //         if (user.password === password) {
    //             // from now on we’ll identify the user by the id and the id is
    //             // the only personalized value that goes into our token
    //             let payload = { id: user.id };
    //             let token = jwt.sign(payload, jwtOptions.secretOrKey);
    //             res.json({ msg: 'ok', token: token });
    //         } else {
    //             res.status(401).json({ msg: 'Password is incorrect' });
    //         }
    //     }
    // });
}
