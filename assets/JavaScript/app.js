// Firebase cofiguration
var config = {
    apiKey: "AIzaSyAu3dFqhU9N5gUNYDX-ixCrUs6TKoa9oXE",
    authDomain: "train-schedule-b10ab.firebaseapp.com",
    databaseURL: "https://train-schedule-b10ab.firebaseio.com",
    projectId: "train-schedule-b10ab",
    storageBucket: "train-schedule-b10ab.appspot.com",
    messagingSenderId: "477839403359"
  };
  firebase.initializeApp(config);
// firebase database variable
var database = firebase.database();

var currentTime = $("#current-time").text(moment().format("h:mm:ss a"));
  database.ref().set({
      CurrentTime: currentTime
  });


// on click function of submit button
$("#submit").on("click", () => {
    clickEvent();
})

// function of pushing data into database when button is clicked
function clickEvent () {
    var name = $("#name").val().trim();
    var destination = $("#destination").val().trim();
    var firstTrain = $("#first-train").val().trim();
    var frequency = $("#frequency").val().trim();
    console.log(name);


    database.ref("trains").push({
        name: name,
        destination: destination,
        firstTrain: firstTrain,
        frequency: frequency,
        
    }, (error) => {
        console.log(error);
    })
}

// checking if database had any child updates & updating html
database.ref("trains").on("child_added", function(childSnapshot) {
    var tableText = 
    "<tr>" +
    "<td>" + childSnapshot.val().name + "</td>" +
    "<td>" + childSnapshot.val().destination + "</td>" +
    "<td>" + childSnapshot.val().frequency + "</td>" +
    //"<td>" + childSnapshot.val().monthsWorked + "</td>" +
    "<td>" + childSnapshot.val().firstTrain + "</td>";

    $("#form-body").append(tableText);
}, (error) => {
    console.log(error);
})