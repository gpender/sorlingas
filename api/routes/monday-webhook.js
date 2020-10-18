const Board = require('../sequelize/sequelize').Board;
const Pulse = require('../sequelize/sequelize').Pulse;





module.exports = function(app,passport){  
    app.post('/webhook', function(req, res, next) {
        //console.log(req.body);
        var event = req.body.event;
//        console.log(event.boardId)
 //       console.log(event.pulseId)
  //      console.log(event.pulseName)
    //    console.log(event.type)
        switch(event.type){
            case 'create_pulse':
                console.log(`create pulse ${event.pulseId} ${pulse.pulseName}`);
                break;
            case 'create_update':
                console.log(`update pulse ${event.pulseId} ${pulse.pulseName}`);
                break;
            case 'update_column_value':
                console.log(`update pulse ${event.pulseId} ${pulse.pulseName}`);
                break;
        }
        return res.status(200).json(req.body);
        const { email, password, firstName, lastName, parentClientId } = req.body;
        createUser({ email, password, firstName, lastName, parentClientId }).then(user =>
            res.json({ user, msg: 'account created successfully' })
        ).catch(function(err){
            return res.status(400).json({ message: err.errors[0].message})
        });
    });    
}