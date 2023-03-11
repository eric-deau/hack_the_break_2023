function displayJournalDynamically(collection) {
    let cardTemplate = document.getElementById("PreviousJournalPlaceHolder");
    // UserID = firebase.auth().currentUser.uid
    db.collection(collection)//.where("uid", "==", "doKjmclscimyVuTztVxp")// UserID) //.orderBy("timestamp", "desc")
        .get()
        .then((allPost) => {
            allPost.forEach((doc) => {
                console.log(doc.data())
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
                newcard.querySelector('#journal-content').innerHTML = content;
                newcard.querySelector('#journal-picture').src = picture;
                // newcard.querySelector('.postcontent').innerHTML = postcontent;
                newcard.querySelector('#journal-timestamp').innerHTML = emoji + " " + d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate() + " " +
                    d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
                newcard.querySelector('#journal-tag').innerHTML = tag;
                newcard.querySelector('#journal-tag').classList.add("tag-"+tag);
                newcard.querySelector('#journalCard').classList.add("journal-"+tag+"-mood");
                newcard.querySelector('#journal-tip').classList.add("tag-" + tag);
                document.getElementById("previous-journal-go-here").appendChild(newcard);
                console.log("HI")
            });
        }
        )
}

displayJournalDynamically("journals")