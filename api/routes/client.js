const Client = require('../sequelize/sequelize').Client;

const getAllClients = async () => {
    return await Client.findAll();
  };
const getClient = async (id) => {
    return await Client.findOne({where: {Client_Id:id}});
};
const updateClient = async ({ Client_Id,Name,ClientType,SorlingasClient,IndirectClient,NonSorlingasCell,ENCProvider,Conglomerate,Contact }) => {
    return await Client.update(
        {Client_Id,Name,ClientType,SorlingasClient,IndirectClient,NonSorlingasCell,ENCProvider,Conglomerate,Contact},
        {returning: false, where: {Client_Id: Client_Id} }
    )
    .then(function(updatedClient) {
        //updateClient2 = Client.findById(Client_Id)
        return updatedClient;
    })
};


module.exports = function(app,passport){  
    // app.get('/clients', passport.authenticate('jwt', { session: false }), function(req, res) {
    //     getAllClients().then(clients => res.json(clients)); 
    // });
    app.get('/clients', function(req, res) {
        getAllClients().then(clients => res.json(clients)); 
    });
    app.get('/client', function(req,res){
        var id = req.query.id;
        getClient(id).then(client => res.json(client));
    });
    app.put('/client', function(req, res, next) {
        const {Client_Id,Name,ClientType,SorlingasClient,IndirectClient,NonSorlingasCell,ENCProvider,Conglomerate,Contact} = req.body; 
        // Client.update(
        //     {Client_Id:Client_Id,Contact:Contact},//,Name:params.Name,Contact:params.Contact},
        //     {returning: true, where: {Client_Id: Client_Id} }
        // )
        // .then(function(rowsUpdated) {
        //     res.json(rowsUpdated)
        // })
        // .catch(next)

        updateClient({Client_Id,Name,ClientType,SorlingasClient,IndirectClient,NonSorlingasCell,ENCProvider,Conglomerate,Contact})
            .then(client =>
                res.json({client, msg: 'Client updated successfully'})
            )
            .catch(function(err){
                return res.status(400);//.json({ message: err})
            });
    });
}
