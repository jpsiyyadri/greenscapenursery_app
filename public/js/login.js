  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  window.addEventListener("DOMContentLoaded", () => {
    var token = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

    var firebaseConfig = {
      apiKey: "AIzaSyD4rNoiOXMswq5YNHEqiEea7hiIEpIvTp4",
      authDomain: "test-api-55d38.firebaseapp.com",
      databaseURL: "https://test-api-55d38-default-rtdb.firebaseio.com",
      projectId: "test-api-55d38",
      storageBucket: "test-api-55d38.appspot.com",
      messagingSenderId: "147745458537",
      appId: "1:147745458537:web:63d5309b667b8d264815f8",
      measurementId: "G-E6Z1NVWF9M"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.NONE)

    var provider = new firebase.auth.GoogleAuthProvider();
    var uiConfig = {
      signInOptions: [
          // Google sign in option
          firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      ],
    
      // Terms of service url/callback.
      tosUrl: '<your-tos-url>',
    
      // Privacy policy url/callback.
      privacyPolicyUrl: function () {
          window.location.assign(
                  '<your-privacy-policy-url>');
      },
    
      callbacks: {
          signInSuccess: function (user, 
              credential, redirectUrl) {
                
                  // User successfully signed in.
                  user.getIdToken().then(function (idToken) {
                    return fetch("/sessionLogin", {
                      method: "POST",
                      headers: {
                        'Accept': 'application/json',
                        'Content-type': 'application/json',
                        'CSRF-Token': token
                      },
                      "body": JSON.stringify({'idToken': idToken})
                    })
                  })
                  .then(() => {
                    return firebase.auth().signOut()
                  }).then(() => {
                    window.location.href = "/"
                  }).catch(error => {
                      console.log(error);
                  });
              }
      }
  };
    
  // Initialize the FirebaseUI Widget using Firebase.
  var ui = new firebaseui.auth.AuthUI(firebase.auth());
    
  // The start method will wait until the DOM is loaded.
  ui.start('#firebaseui-auth-container', uiConfig);
})
