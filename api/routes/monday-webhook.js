const Board = require('../sequelize/sequelize').Board;
const Pulse = require('../sequelize/sequelize').Pulse;

const updateOrCreate = async (model,where,newItem,beforeCreate) => {
    return await Pulse.findOne({where})
        .then(item => {
            if(!item){
                Promise.resolve(beforeCreate)
                .then(() =>
                model.create(newItem)
                    .then(item=>({}))
                )
            }
            return model
                .update(newItem, {where: where})
                .then(item => ({item, created:false}))
    })
};


module.exports = function(app,passport){  
    app.post('/monday/webhook', function(req, res, next) {
        var event = req.body.event;
        console.log(event);
        switch(event.type){
            case 'create_pulse':
                updateOrCreate(Pulse, {pulseId:event.pulseId},event,null).then(pulse =>
                    console.log(`${pulse} created successfully`)
                ).catch(function(err){
                    return res.status(400).json({ message: err.errors[0].message})
                });
                console.log(`create pulse ${event.pulseId} ${event.pulseName}`);
                break;
            case 'create_update':
            case 'update_name':
            case 'update_column_value':
                if(event.value.name) event.pulseName = event.value.name;
                updateOrCreate(Pulse, {pulseId:event.pulseId},event,null).then(pulse =>
                    console.log(`${pulse.pulseName} updated successfully`)
                ).catch(function(err){
                    return res.status(400).json({ message: err.errors[0].message})
                })
                console.log(`update pulse ${event.pulseId} ${event.pulseName}`);
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