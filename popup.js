let addBtn = document.getElementById('submitBtn');
let clearBtn = document.getElementById('clearBtn')
let allSubjects = {"subjects": []};

addBtn.addEventListener('click', function() {
    const subjectInput = document.querySelector('#firstSubject').value;
    if(checkValidInput(subjectInput)){
        addSubject(subjectInput);
    }
});

clearBtn.addEventListener('click', function() {
    chrome.storage.sync.get(['SubjectsList']).then((result) => {
        chrome.storage.sync.remove("SubjectsList", function () {
        });
    });
});

window.addEventListener('click',function(e){
    if(e.target.href!==undefined){
        chrome.tabs.create({url:e.target.href})
    }
})


// add on enter hit, moet nog clear all cancellen
addBtn.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        const subjectInput = document.querySelector('#firstSubject').value;
        if(checkValidInput(subjectInput)){
            addSubject(subjectInput);
        }
    }
});

    function addSubject(subjectString) {
        let storage = chrome.storage.sync;

        storage.get("SubjectsList", function (result) {
            if (result.SubjectsList != undefined) {
                for(let i = 0; i < result.SubjectsList.subjects.length; i++){
                    allSubjects.subjects.push(result.SubjectsList.subjects[i]);
                };
                storage.remove("SubjectsList", function () {});
            };
                allSubjects.subjects.push(subjectString)
                storage.set({"SubjectsList": allSubjects}, function () {
                    chrome.storage.sync.get(['SubjectsList']).then((result) => {});
                });
        });
    }

    function removeSubject(subjectString) {
        chrome.storage.sync.get("SubjectsList", function (result) {
        if (result.SubjectsList != undefined) {
            for(let i = 0; i < result.SubjectsList.subjects.length; i++){
                allSubjects.subjects.push(result.SubjectsList.subjects[i]);
            };
            chrome.storage.sync.remove("SubjectsList", function () {});
        };

        for(let i = 0; i < allSubjects.subjects.length; i++){
            if(allSubjects.subjects[i] == subjectString){
                allSubjects.subjects.splice(i, 1);
                break;
            }
        }
            chrome.storage.sync.set({"SubjectsList": allSubjects}, function () {
        });
    });
}

    function checkValidInput(newInput){
        if(newInput == ""){
            return false;
        }
        return true;
    }