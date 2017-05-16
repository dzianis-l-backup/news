var expect  = require("chai").expect;
var assert  = require("chai").assert;
var request = require("request");
var dataModel = require('../public/js/model.js');

var Users = dataModel.Users;
var Sessions = dataModel.Sessions;
var Devices = dataModel.Devices;
var Clinics = dataModel.Clinics;
var Data = dataModel.Data;
var Prescriptions = dataModel.Prescriptions;
var Games = dataModel.Games;

describe("data model API", function() {

    var tokenPatient;
    var tokenTherapist;
    var sessionPatient;
    var sessionTherapist;
    var userPatient;
    var userTherapist;
    var data;//user's data
    var prescription;
    var game;

    describe("Users API", function() {

        beforeEach(function() { console.log("***Users class***") });
        after(function(){console.log("");console.log(); });
        it("delete Mike the user if it exists", function(done) {
            Users.delete("Mike",function(){

                console.log("Mike is deleted");
                console.log();
                done();

            });
        });

        it("sign up Mike the user, password - Mike, salt - 0.555", function(done) {
            Users.add("Mike","Mike","0.555",function(token){
                assert(token);//not null
                console.log("Mike is signed up");
                console.log("token - "+token);
                console.log();
                done();

            });
        });


        it("sign in as a user Mike with a password Mike", function(done) {
           Users.getUser("Mike","Mike",function(_token){

               assert(_token);//not null
               console.log("Mike is signed in");
               console.log("token - "+_token);
               tokenPatient = _token;
               sessionPatient = Sessions.sessions[tokenPatient];
               userPatient = sessionPatient.user;

               done();

           });
        });

        it("delete Dr.Bob the user if it exists", function(done) {
            Users.delete("Dr.Bob",function(){

                console.log("Dr.Bob is deleted");
                console.log();
                done();

            });
        });

        it("sign up Dr.Bob the user, password - Dr.Bob, salt - 0.333", function(done) {
            Users.add("Dr.Bob","Dr.Bob","0.333",function(token){
                assert(token);//not null
                console.log("Dr.Bob is signed up");
                console.log("token - "+token);
                console.log();
                done();

            });
        });


        it("sign in as a user Dr.Bob  with a password Dr.Bob ", function(done) {
            Users.getUser("Dr.Bob","Dr.Bob",function(_token){

                assert(_token);//not null
                console.log("Dr.Bob is signed in");
                console.log("token - "+_token);
                tokenTherapist = _token;
                sessionTherapist = Sessions.sessions[tokenTherapist];
                userTherapist = sessionTherapist.user;

                done();

            });
        });


    });

    describe("Clinics API",function(){
        beforeEach(function() { console.log("***Clinics class***") });
        after(function(){console.log("");console.log(); });
        it("delete St.Paul clinic if it exists", function(done) {
            Clinics.delete("St.Paul",function(){

                console.log("St.Paul is deleted");
                console.log();
                done();

            });
        });

        it("create St.Paul clinic", function(done) {
            Clinics.create("St.Paul","clinic for students",function(clinic){
                assert.equal(clinic instanceof Clinics,true);
                console.log("St.Paul clinic is created");
                console.log();
                done();

            });
        });


        it("get St.Paul clinic", function(done) {
            Clinics.getClinic("St.Paul",function(clinic){

                assert.equal(clinic instanceof Clinics,true);
                console.log("St.Paul clinic is returned");
                console.log();
                done();

            });
        });

    });

    describe("Devices API",function(){
        beforeEach(function() { console.log("***Devices class***") });
        after(function(){console.log("");console.log(); });
        it("delete macbook if it exists", function(done) {
            Devices.delete("e7wef3",function(){

                console.log("macbook is deleted");
                console.log();
                done();

            });
        });

        it("create St.Paul clinic", function(done) {
            Devices.create("e7wef3",function(device){
                assert.equal(device instanceof Devices,true);
                console.log("e7wef3 device is created");
                console.log();
                done();

            },"5f");
        });


        it("get e7wef3 device", function(done) {
            Devices.getDevice("e7wef3",function(device){

                assert.equal(device instanceof Devices,true);
                console.log("e7wef3 clinic is returned");
                console.log();
                done();

            });
        });
    });

    describe("Data API",function(){
        beforeEach(function() { console.log("***Data class***") });
        after(function(){console.log("");console.log(); });


        it("creates data session", function(done) {
            Data.startSession(userPatient,function(_data){

                assert.equal(_data instanceof Data,true);
                data = _data;
                console.log("data session is started");
                console.log();
                done();

            },sessionPatient);
        });
        it("puts data", function(done) {
            data.put('2016-11-21','16:23:00','16:48:55','strongman','0','5','500','-10','50',function(_data){

                assert.equal(_data instanceof Data,true);
                data = _data;
                console.log("data session is started");
                console.log();
                done();

            });
        });
    });

    describe("Prescriptions API",function(){
        beforeEach(function() { console.log("***Prescriptions class***") });
        after(function(){console.log("");console.log(); });

        it("a game creation", function(done) {
          Games.getGame('strongman',function(_game){
              assert.equal(_game instanceof Games,true);
              game = _game;
              console.log("game  is created");
              console.log();
              done();
          });
        });

        it("creates new prescription", function(done) {
            Prescriptions.create(userTherapist,userPatient,'2016-11-23',game,1,2,3,function(_prescription){
                assert.equal(_prescription instanceof Prescriptions,true);
                prescription = _prescription;
                console.log("prescription  is created");
                console.log();
                done();
            });
        });
        it("update prescription", function(done) {
            prescription.update('2016-11-21',game,3,2,1,function(_prescription){

                assert.equal(_prescription instanceof Prescriptions,true);
                prescription = _prescription;
                console.log("prescription  is updated");
                console.log();
                done();

            });
        });
    });
});