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

function add_journal() {
    firebase.auth().onAuthStateChanged(function (user) {
        uID = firebase.auth().currentUser.uid
        db.collection("journal").add({
            content: $(".journal-input").val(),
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            uid: uID
        }).then(function () {
            console.log("Journal added")
        })
    })
}

function uploadPic(postDocID) {
    console.log("inside uploadPic " + postDocID);
    var storageRef = storage.ref("images/" + postDocID + ".jpg");

    storageRef.put(ImageFile)   //global variable ImageFile

        // AFTER .put() is done
        .then(function () {
            console.log('Uploaded to Cloud Storage.');
            storageRef.getDownloadURL()

                // AFTER .getDownloadURL is done
                .then(function (url) { // Get URL of the uploaded file
                    console.log("Got the download URL.");
                    db.collection("posts").doc(postDocID).update({
                        "picture": url // Save the URL into users collection
                    })

                        // AFTER .update is done
                        .then(function () {
                            console.log('Added pic URL to Firestore.');
                        })
                })
        })
        .catch((error) => {
            console.log("error uploading to cloud storage");
        })
}

displayJournalDynamically("journals")
