const Client = require('../sequelize/sequelize').Client;
const AWS = require('aws-sdk');
const uuid = require('node-uuid');
AWS.config.update({region:'eu-west-2'});

var ec2 = new AWS.EC2();

var params = {
        InstanceIds: [
            "i-0bd2edd447559793b"
        ]
    };

    const startInstance = async ()=>{
        //console.log("Starting Instance");
        return await ec2.startInstances(params, function(err,data){
            if(err){
                console.log(err,err.stack);
            }
            else{
                //console.log(data);
                return data.body;//JSON.stringify(data,censor(data));
            }
        });
    }

    const stopInstance = async ()=>{        
        return await ec2.stopInstances(params, function(err,data){
            if(err){
                console.log(err,err.stack);
            }
            else{
                return this.httpResponse;
                //return data.body;//JSON.stringify(data,censor(data));
            }
        });
    }

module.exports = function(app,passport){  
    app.get('/startServer', async function(req, res) {
        return await ec2.startInstances(params, function(err,data){
            if(err){
                res.status(400).send(err);
            }
            else{
                res.status(400).send(data);
            }
        });
    });
    app.get('/stopServer', async function(req, res) {
        return await ec2.stopInstances(params, function(err,data){
            if(err){
                res.status(400).send(err);
            }
            else{
                res.status(400).send(data);
            }
        });
    });    
    app.get('/describeInstances', async function(req, res) {
        return await new AWS.EC2({apiVersion: '2014-10-01'}).describeInstances(function(error, data) {
            if (error) {
              res.status(400).send(error); // an error occurred
            } else {
                res.status(400).send(data);
            }
          });
    });
    app.get('/describeInstanceStatus', async function(req, res) {
        return await new AWS.EC2({apiVersion: '2014-10-01'}).describeInstanceStatus({InstanceIds: ["i-0bd2edd447559793b"],IncludeAllInstances: true},function(error, data) {
            if (error) {
              res.status(400).send(error); // an error occurred
            } else {
                res.status(400).send(data);
            }
          });
    });
}
