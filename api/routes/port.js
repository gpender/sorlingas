import { Port } from '../sequelize/sequelize';

const getAllPorts = async () => {
    return await Port.findAll();
  };

export default function(app,passport){
    app.get('/Ports', passport.authenticate('jwt', { session: false }), function(req, res) {
        getAllPorts().then(port => res.json(port)); 
    });  
}
