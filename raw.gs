document.addEventListener("DOMContentLoaded", function() {
    const loginForm = document.getElementById("loginForm");
    const loginButton = document.getElementById("loginButton");
    const logoutButton = document.getElementById("logoutButton");
    const cameraFeed = document.getElementById("camera-feed");
    const captureBtn = document.getElementById("capture-btn"); 

    let photoCaptured = false;


    loginButton.addEventListener("click", function() {
        const username = document.getElementById("username").value;
        const workflow = document.getElementById("workflow").value;
        
        if (!validateUsername(username)) {
            alert("Username must include '@gmail.com'");
            return;
        }

        if (!photoCaptured) {
        alert("Please capture a photo before submitting.");
        return;
        }
        
        if (username.trim() === "" || workflow.trim() === "") {
            alert("All fields are required");
            return;
        }

        submitForm("login Button is pressed");
      
    });

    logoutButton.addEventListener("click", function() {
         const username = document.getElementById("username").value;
         const workflow = document.getElementById("workflow").value;
        
        if (!validateUsername(username)) {
            alert("Username must include '@gmail.com'");
            return;
        }

        if (!photoCaptured) {
        alert("Please capture a photo before submitting.");
        return;
       }
        
        if (username.trim() === "" || workflow.trim() === "") {
            alert("All fields are required");
            return;
        }

        submitForm("logout Button is pressed");
    });

    // Add these lines to access the video element
    const video = document.getElementById("camera-feed");
    navigator.mediaDevices
        .getUserMedia({
            video: true
        })
        .then(function(stream) {
            video.srcObject = stream;
        })
        .catch(function(error) {
            console.error('Camera access denied:', error);
        });

    

    captureBtn.addEventListener('click', function() {
     const canvas = document.createElement('canvas');
                canvas.width = video.videoWidth;
                canvas.height = video.videoHeight;
                canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
                const imageData = canvas.toDataURL('image/png');

    const username = document.getElementById('username').value;
    const workflow = document.getElementById('workflow').value;

    const action = loginButton.disabled ? "Logout Button Pressed" : "Login Button Pressed";

    // Set the flag to true after capturing the photo
    photoCaptured = true;

    google.script.run
        .withSuccessHandler(function(response) {
            console.log(response); // Logging the response from the server
        })
        .capturePhoto(username, workflow, action, imageData);
}); 

    function validateUsername(username) {
        return username.endsWith("@gmail.com");
    }

    function submitForm(action) {
        const username = document.getElementById("username").value;
        const workflow = document.getElementById("workflow").value;

    if (loginButton.disabled) {
        action = "Logout Button Pressed";
    }

        google.script.run
            .withSuccessHandler(function(response) {
                // Display success message
                const successMessage = document.createElement("p");
                successMessage.textContent = "Your form submitted successfully";
                successMessage.style.color = "green";
                loginForm.appendChild(successMessage);

                // Clear form fields
                document.getElementById("username").value = "";
                document.getElementById("workflow").value = "";

                // Refresh the page after a brief delay
                setTimeout(function() {
                    location.reload();
                }, 2000); // Refresh after 2 seconds
            })
            .recordData(username, workflow, action);
    }
});