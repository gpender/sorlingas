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
}
