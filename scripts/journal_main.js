function displayJournalDynamically(collection) {
    firebase.auth().onAuthStateChanged(function () {
        UserID = firebase.auth().currentUser.uid
        db.collection("users").doc(UserID).get().then(function (querySnapshot) {
            occupation_stored = querySnapshot.data().occupation
            let cardTemplate = document.getElementById("PreviousJournalPlaceHolder");
            db.collection(collection).limit(5).where("occupation", "==", occupation_stored)// UserID) //.orderBy("timestamp", "desc")
                .get()
                .then((allPost) => {
                    allPost.forEach((doc) => {
                        var content = doc.data().content
                        var picture = doc.data().picture
                        var tag = doc.data().tag
                        var timestamp = doc.data().timestamp
                        let newcard = cardTemplate.content.cloneNode(true);
                        var d = new Date(timestamp.seconds * 1000)
                        var postID = doc.id
                        switch (tag) {
                            case "Happy":
                                var emoji = "😀"
                                break;
                            case "Sad":
                                var emoji = "😢"
                                break;
                            case "Angry":
                                var emoji = "😡"
                                break;
                            case "Fear":
                                var emoji = "😨"
                                break;
                            case "Disgust":
                                var emoji = "🤢"
                                break;
                        }
                        // //update title and text and image
                        newcard.querySelector('#journal-content').innerHTML = `<span style="opacity: 100%; font-weight:400">${content}</span>`
                        newcard.querySelector('#journal-picture').src = picture;
                        if (picture == "") {
                            newcard.querySelector('#picture-container').remove();
                        }
                        // newcard.querySelector('.postcontent').innerHTML = postcontent;
                        newcard.querySelector('#journal-timestamp').innerHTML = emoji + " " + d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate() + " " +
                            d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
                        newcard.querySelector('#journal-tag').innerHTML = tag;
                        newcard.querySelector('#journal-tag').classList.add("tag-" + tag);
                        newcard.querySelector('#journal-timestamp').classList.add("journal-" + tag + "-mood");
                        document.getElementById("previous-journal-go-here").appendChild(newcard);
                    });
                }
                )
        })
    }
    )
}


var ImageFile;
function listenFileSelect() {
    // listen for file selection
    var fileInput = document.getElementById("uploadimage"); // pointer #1
    const image = document.getElementById("mypic-goes-here"); // pointer #2

    // When a change happens to the File Chooser Input
    fileInput.addEventListener('change', function (e) {
        ImageFile = e.target.files[0];   //Global variable
        var blob = URL.createObjectURL(ImageFile);
        // image.src = blob; // Display this image
    })
}

listenFileSelect();

function uploadPic(JournalID) {
    var storageRef = storage.ref("images/" + JournalID + ".jpg");
    if (ImageFile == undefined) {
        console.log("No image to upload")
        return
    }
    storageRef.put(ImageFile)
        .then(function () {
            console.log('Uploaded to Cloud Storage.');
            storageRef.getDownloadURL()
                .then(function (url) {
                    console.log("Got the download URL.");
                    db.collection("journals").doc(JournalID).update({
                        "picture": url
                    })
                        .then(function () {
                            console.log('Added pic URL to Firestore.');
                        })
                })
        })
        .catch((error) => {
            console.log("error uploading to cloud storage");
        })
}

function add_journal() {
    if ($("#mood-tag").val() != null) {
        firebase.auth().onAuthStateChanged(function () {
            uID = firebase.auth().currentUser.uid
            db.collection("users").doc(uID).get().then(function (querySnapshot) {
                occupation_stored = querySnapshot.data().occupation
                if ($('.occupation-choice').val() != null) {
                    occupation_stored = $('.occupation-choice').val()
                    db.collection("users").doc(uID).update({
                        "occupation": $('.occupation-choice').val()
                    })
                        .then(function () {
                            console.log('Added occupation to Firestore.');
                        })
                }
            }).then(db.collection("users").doc(firebase.auth().currentUser.uid).get().then(function (querySnapshot) {
                occupation_stored = querySnapshot.data().occupation
                db.collection("journals").add({
                    content: $("#journal-input").val(),
                    picture: "",
                    tag: $("#mood-tag").val(),
                    occupation: occupation_stored,
                    timestamp: firebase.firestore.FieldValue.serverTimestamp()
                }).then(function (journal) {
                    uploadPic(journal.id)
                    console.log("Journal added")
                })
            }))
        })
    }
    else {
        alert("Please select a mood tag")
    }
}
$(document).ready(function () {
    $('.occupation-choice').select2();
    firebase.auth().onAuthStateChanged(function () {
        uID = firebase.auth().currentUser.uid
        db.collection("users").doc(uID).get().then(function (querySnapshot) {
            if (querySnapshot.data().occupation == undefined) {
                $(".occupation-check").removeClass("hidden-block")
            }
            else {
                $("#occupation-on-title").text(`${querySnapshot.data().occupation}`)
            }
        })
    })
    $.get('text/list_of_job_title.csv', function (data) {
        var textByLine = data.split("\n")
        for (var i = 0; i < textByLine.length; i++) {
            $('.occupation-choice').append(`<option>${textByLine[i]}</option>`)
        }
    }, 'text');

});


displayJournalDynamically("journals")
