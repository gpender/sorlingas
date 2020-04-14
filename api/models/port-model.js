
module.exports = function(sequelize, DataTypes){
  var Port = sequelize.define("Port",{
    name:{
      type:DataTypes.STRING
    },

  })
  return Port;
};
//This is a fix by Samaila Philemon Bala in case you want to use ES6
//and the above is not working

//User.beforeCreate(user => {
  //  user.password = bcrypt.hashSync(
    //  user.password,
      //bcrypt.genSaltSync(10),
      //null
    //);
  //});