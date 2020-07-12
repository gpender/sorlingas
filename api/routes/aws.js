const Client = require('../sequelize/sequelize').Client;
const AWS = require('aws-sdk');
const uuid = require('node-uuid');
AWS.config.update({region:'eu-west-2'});

var ec2 = new AWS.EC2();

    var defaultInstanceId = "i-0aebed2106f91338d";

    var getParams = (req) => {
        const reqQueryObject = req.query // returns object with all parameters
        console.log(reqQueryObject);
        var instanceId = req.query.instanceId; // returns "12354411"
        if(instanceId == undefined){
            instanceId = defaultInstanceId
        }
        return { InstanceIds: [ instanceId ]};
    }

    const startInstance = async ()=>{
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
        var guy = getParams(req);
        return await ec2.stopInstances(guy, function(err,data){
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
        return await ec2.startInstances(getParams(req), function(err,data){
            if(err){
                res.status(400).send(err);
            }
            else{
                res.status(200).send(data);
            }
        });
    });

    app.get('/stopServer', async function(req, res) {
        return await ec2.stopInstances(getParams(req), function(err,data){
            if(err){
                res.status(400).send(err);
            }
            else{
                res.status(200).send(data);
            }
        });
    });    
    app.get('/describeInstances', async function(req, res) {
        return await new AWS.EC2({apiVersion: '2014-10-01'}).describeInstances(function(error, data) {
            if (error) {
              res.status(400).send(error); // an error occurred
            } else {
                res.status(200).send(data);
            }
          });
    });
    app.get('/describeInstanceStatus', async function(req, res) {
        return await new AWS.EC2({apiVersion: '2014-10-01'}).describeInstanceStatus({InstanceIds: ["i-0bd2edd447559793b"],IncludeAllInstances: true},function(error, data) {
            if (error) {
              res.status(400).send(error); // an error occurred
            } else {
                res.status(200).send(data);
            }
          });
    });
}
