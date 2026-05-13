function showMessage() {
    var name = document.getElementById("name").value;

    if(name === ""){
        alert("Please enter your name.");
        return;
    }

    alert("Hey " + name + "! Your message has been sent to Rabanad's Eatery! Thank you for reaching out to us.");
}