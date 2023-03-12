console.log("thisisatest")
function showHomeCoordinates() {
    firebase.auth().onAuthStateChanged(user => {
        console.log("hello")
        if (user) {
            console.log("User logged in3: ", user);
            $('.login_out').empty();
            $('.login_out').append(`<a class="nav-link" href="login.html"><img src="./images/box-arrow-in-left.svg" alt="login"> Logout </a>`);
        }
    });
}
showHomeCoordinates();