
let btn = document.getElementById('submitBtn');

btn.addEventListener('click', function() {

    const subjects = {
        subOne: 'SWEN4',
        subTwo: 'WEBPHP'
    };

    chrome.storage.sync.set({"SubjectsList": subjects}, function(){
        console.log("success");
    });

    chrome.storage.sync.get(['SubjectsList'], function(result){
        alert("button clicked: " + Object.values(subjects)[0]);
    })

});
