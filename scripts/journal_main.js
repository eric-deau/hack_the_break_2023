function displayJournalDynamically(collection) {
    let cardTemplate = document.getElementById("PreviousJournalPlaceHolder");
    // UserID = firebase.auth().currentUser.uid
    db.collection(collection)//.where("uid", "==", "doKjmclscimyVuTztVxp")// UserID) //.orderBy("timestamp", "desc")
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
                // newcard.querySelector('.postcontent').innerHTML = postcontent;
                newcard.querySelector('#journal-timestamp').innerHTML = emoji + " " + d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate() + " " +
                    d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
                newcard.querySelector('#journal-tag').innerHTML = tag;
                newcard.querySelector('#journal-tag').classList.add("tag-" + tag);
                newcard.querySelector('#journal-timestamp').classList.add("journal-" + tag + "-mood");
                newcard.querySelector('#journal-tip').classList.add("tag-" + tag);
                document.getElementById("previous-journal-go-here").appendChild(newcard);
            });
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
    firebase.auth().onAuthStateChanged(function () {
        uID = firebase.auth().currentUser.uid
        console.log(uID)
        db.collection("journals").add({
            content: $("#journal-input").val(),
            picture: "",
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        }).then(function (journal) {
            uploadPic(journal.id)
            console.log("Journal added")
        })
    })
}

displayJournalDynamically("journals")
