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

// Get current time and display it on page
function currentTime () {
    $("#current-time").text(moment().format("h:mm:ss a"));
};
var myTimer = setInterval(currentTime, 1000);

// on click function of submit button
$("#submit").on("click", () => {
    clickEvent();
});
// function of pushing data into database when button is clicked
function clickEvent (e) {

    var name = $("#name").val().trim();
    var destination = $("#destination").val().trim();
    var firstTrain = $("#first-train").val().trim();
    var frequency = $("#frequency").val().trim();

    // Calculations for next train arrival
    var converted = moment(firstTrain, "HH:mm").subtract(1, "years");

    var findDiff = moment().diff(moment(converted), "minutes");

    var timeRemainder = findDiff % frequency;

    var minutesLeft = frequency - timeRemainder;

    var nextTrain = moment().add(minutesLeft, "minutes").format("hh:mm a");

    // Push to Firebase
    database.ref("trains").push({
        name: name,
        destination: destination,
        train: nextTrain,
        frequency: frequency,
        arrival: minutesLeft
        
        // Check for errors
    }, (error) => {
        console.log(error);
    });
return false;
};

// checking if database had any child updates & appending html
database.ref("trains").on("child_added", function(childSnapshot) {
    var tableText = 
    "<tr>" +
    "<td>" + childSnapshot.val().name + "</td>" +
    "<td>" + childSnapshot.val().destination + "</td>" +
    "<td>" + childSnapshot.val().frequency + "</td>" +
    "<td>" + childSnapshot.val().train + "</td>" +
    "<td>" + childSnapshot.val().arrival + "</td>";

    $("#form-body").append(tableText);
}, (error) => {
    console.log(error);
});