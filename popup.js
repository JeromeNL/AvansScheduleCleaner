
let btn = document.getElementById('submitBtn');

btn.addEventListener('click', function() {

    const subjects = {
        subOne: 'SWEN4',
        subTwo: 'WEBPHP'
    };

    const subjectInput = document.querySelector('#firstSubject').value;
    subjects.subThree = subjectInput;

    chrome.storage.sync.set({"SubjectsList": subjects}, function(){
        console.log("success");
    });

    chrome.storage.sync.get(['SubjectsList'], function(result){
        alert("button clicked: " + Object.values(subjects));
    })

});
