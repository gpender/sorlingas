const {GraphQLClient, gql } = require('graphql-request');
const Board = require('../sequelize/sequelize').Board;
const Pulse = require('../sequelize/sequelize').Pulse;

const endpoint = 'https://api.monday.com/v2'
const graphQLClient = new GraphQLClient(endpoint,{
    headers:{
        authorization:'eyJhbGciOiJIUzI1NiJ9.eyJ0aWQiOjg4MzY2MTU0LCJ1aWQiOjExNzI4NzY1LCJpYWQiOiIyMDIwLTEwLTE4VDEyOjAxOjUwLjAwMFoiLCJwZXIiOiJtZTp3cml0ZSJ9.v5lu-jdXzllMdHdguRyTA7ibTmXfeOITs-8bwztm9wk'
    },
})


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

async function getBoardsFromMonday(){
    const query = gql`
    query {
       
        # boards(ids:[13542, 68097]) {
            
        boards() {
          id
          name
          workspace_id
          workspace(){
              name
          }
          state
        }
      }
    `
    const data = await graphQLClient.request(query);//data;
    return data;
}


async function getPulsesFromMonday(boardId){
    // const graphQLClient = new GraphQLClient(endpoint,{
    //     headers:{
    //         authorization:'eyJhbGciOiJIUzI1NiJ9.eyJ0aWQiOjg4MzY2MTU0LCJ1aWQiOjExNzI4NzY1LCJpYWQiOiIyMDIwLTEwLTE4VDEyOjAxOjUwLjAwMFoiLCJwZXIiOiJtZTp3cml0ZSJ9.v5lu-jdXzllMdHdguRyTA7ibTmXfeOITs-8bwztm9wk'
    //     },
    // })

    const query2 = gql`
        query { boards (ids: 802770868) { columns { title settings_str } } }
    `
    const query = gql`
    query {
       
        # boards(ids:[13542, 68097]) {
            
        boards(ids:[${boardId}, 68097],limit:1) {

          columns { title settings_str }
          id
          name
          groups {
              title
            id
          }
          updates (){
            id
          }
          items {
            id
            name
            created_at
            group {
              id
            }
            
            updates{
                text_body
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
    const data = await graphQLClient.request(query);//data;
    return data;
}


module.exports = function(app,passport){  

    app.get('/monday/boards', function(req, res) {
        getBoardsFromMonday().then((data) => {
            res.status(200).json(data); 
        });
    });
    app.get('/monday/pulses', function(req, res) {
        var boardId = req.query.id;
        getPulsesFromMonday(boardId).then((data) => {
            console.log(JSON.stringify(data, undefined,2));
            res.status(200).json(data); 
        });
    });
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