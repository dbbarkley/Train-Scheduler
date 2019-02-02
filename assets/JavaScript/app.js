// Firebase cofiguration
var config = {
    apiKey: "AIzaSyCsRWEEkJvavE-KCgWcmTRYjei7rzvQOCA",
    authDomain: "timestamp-2.firebaseapp.com",
    databaseURL: "https://timestamp-2.firebaseio.com",
    projectId: "timestamp-2",
    storageBucket: "",
    messagingSenderId: "330033825461"
  };
  firebase.initializeApp(config);
// firebase database variable
var database = firebase.database();

// on click function of submit button
$("#submit").on("click", () => {
    clickEvent();
})

// function of pushing data into database when button is clicked
function clickEvent () {
    var name = $("#name").val().trim();
    var destination = $("#Destination").val().trim();
    var firstTrain = $("#first-train").val().trim();
    var frequency = $("#frequency").val().trim();

    var convertedDate = moment(date, "MM/DD/YYYY");
    var convertedToMonths = moment().diff(convertedDate, "months");
    var total = convertedToMonths * rate;

    database.ref().push({
        name: name,
        destination: destination,
        firstTrain: firstTrain,
        frequency: frequency,
        monthsWorked: convertedToMonths,
        total: total
        
    }, (error) => {
        console.log(error);
    })
}

// checking if database had any child updates & updating html
database.ref().on("child_added", function(childSnapshot) {
    var tableText = 
    "<tr>" +
    "<td>" + childSnapshot.val().name + "</td>" +
    "<td>" + childSnapshot.val().destination + "</td>" +
    "<td>" + childSnapshot.val().firstTrain + "</td>" +
    "<td>" + childSnapshot.val().monthsWorked + "</td>" +
    "<td>" + childSnapshot.val().frequency + "</td>" +

    $("#form-body").append(tableText);
}, (error) => {
    console.log(error);
})