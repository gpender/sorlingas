const {request, gql } = require('graphql-request');
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

async function getPulsesFromMonday(){
    const endpoint = 'https://api.monday.com/v2'
    const graphQLClient=new GraphQLClient(endpoint,{
        headers:{
            authorization:'eyJhbGciOiJIUzI1NiJ9.eyJ0aWQiOjg4MzY2MTU0LCJ1aWQiOjExNzI4NzY1LCJpYWQiOiIyMDIwLTEwLTE4VDEyOjAxOjUwLjAwMFoiLCJwZXIiOiJtZTp3cml0ZSJ9.v5lu-jdXzllMdHdguRyTA7ibTmXfeOITs-8bwztm9wk'
        },
    })
    const query = gql`
    query {
        me {
          name
        }
        
        # boards(ids:[13542, 68097]) {
        boards(limit:1) {
          name
          
          columns {
            title
            id
            type
          }
          
          groups {
              title
            id
          }
          
          items {
            name
            group {
              id
            }
            
            column_values {
              id
              value
              text
            }
          }
        }
      }
    `
    const data = await graphQLClient.request(query);
    console.log(JSON.stringify(data, undefined,2));
}


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
        getPulsesFromMonday().catch((err) =>console.log(err));

        return res.status(200).json(req.body);
        const { email, password, firstName, lastName, parentClientId } = req.body;
        createUser({ email, password, firstName, lastName, parentClientId }).then(user =>
            res.json({ user, msg: 'account created successfully' })
        ).catch(function(err){
            return res.status(400).json({ message: err.errors[0].message})
        });
    });    
}