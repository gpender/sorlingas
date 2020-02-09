// Requiring bcrypt for password hashing.
var bcrypt = require("bcrypt");

module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    // The email cannot be null, and must be a proper email before creation
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    // The password cannot be null
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    isAdmin:{
      type:DataTypes.BOOLEAN,
      default:false
    }
  });

  User.beforeCreate(function(user, options, fn) {
    user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null);
  });

  return User;





  // User.prototype.findByCredentials = function(email,password){
  //   var User = this
  //   return User.findOne({email}).then((user)=>{
  //       if(!user){
  //           return Promise.reject()
  //       }
  //       return new Promise((resolve,reject)=>{
  //           bcrypt.compare(password, user.password, (err,res)=>{
  //               if(res){
  //                   resolve(user);
  //               }else{
  //                   reject()
  //               }
  //           })
  //       }
  //   )})
  // };  
  // User.prototype.findByToken = function(jwt_payload){
  //   var User = this
  //   return User.findOne({
  //     where: {
  //       email: jwt_payload.id,
  //     }
  //   })
  // };

  // Creating a custom method for our User model. 
  //This will check if an unhashed password entered by the 
  //user can be compared to the hashed password stored in our database
// User.prototype.validPassword = function(password) {
//   return bcrypt.compareSync(password, this.password);
// };
  // Hooks are automatic methods that run during various phases of the User Model lifecycle
  // In this case, before a User is created, we will automatically hash their password


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