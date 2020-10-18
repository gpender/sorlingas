const Board = require('../sequelize/sequelize').Board;
const Pulse = require('../sequelize/sequelize').Pulse;

const getAllBoards = async () => {
    return await Board.findAll();
  };
const getAllPulses = async () => {
    return await Pulse.findAll();
};
const getClientPulses = async (boardId) => {
    return await Pulse.findAll({where: {boardId:boardId}});
};

// const updateClient = async ({ Client_Id,Name,ClientType,SorlingasClient,IndirectClient,NonSorlingasCell,ENCProvider,Conglomerate,Contact }) => {
//     return await Client.update(
//         {Client_Id,Name,ClientType,SorlingasClient,IndirectClient,NonSorlingasCell,ENCProvider,Conglomerate,Contact},
//         {returning: false, where: {Client_Id: Client_Id} }
//     )
//     .then(function(updatedClient) {
//         //updateClient2 = Client.findById(Client_Id)
//         return updatedClient;
//     })
// };


module.exports = function(app,passport){  
       
    //BOARDS
    app.get('/mondaymysql/boards', passport.authenticate('jwt', { session: false }), function(req, res) {
        getAllBoards().then(boards => res.json(boards)); 
    });
    // PULSES
    // app.get('/mondaymysql/pulses', passport.authenticate('jwt', { session: false }), function(req, res) {
    //     getAllPulses().then(pulses => res.json(pulses)); 
    // });
    app.get('/mondaymysql/pulses', function(req, res) {
        getAllPulses().then(pulses => res.json(pulses)); 
    });    
    app.get('/mondaymysql/clientpulses', passport.authenticate('jwt', { session: false }), function(req,res){
        var boardId = req.query.boardId;
        getClientPulses(id).then(clientPulses => res.json(clientPulses));
    });



    // Update client
    app.put('/client', passport.authenticate('jwt', { session: false }), function(req, res, next) {
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
