
let addBtn = document.getElementById('submitBtn');
let clearBtn = document.getElementById('clearBtn')
let allSubjects = {"subjects": []};
addBtn.addEventListener('click', function() {
    const subjectInput = document.querySelector('#firstSubject').value;
    if(checkValidInput(subjectInput)){
        addSubject(subjectInput)
    }
});

clearBtn.addEventListener('click', function() {
    chrome.storage.sync.get(['SubjectsList']).then((result) => {
        chrome.storage.sync.remove("SubjectsList", function () {
            console.log("Key subjectslist removed");
        });
    });

});

    function addSubject(subjectString) {
        let storage = chrome.storage.sync;

        storage.get("SubjectsList", function (result) {
            if (result.SubjectsList != undefined) {
                for(let i = 0; i < result.SubjectsList.subjects.length; i++){
                    allSubjects.subjects.push(result.SubjectsList.subjects[i]);
                };
                storage.remove("SubjectsList", function () {
                    console.log("Key subjectslist removed");
                });
            };
                allSubjects.subjects.push(subjectString)
                storage.set({"SubjectsList": allSubjects}, function () {
                    console.log("Key subjectsList has been set")
                    chrome.storage.sync.get(['SubjectsList']).then((result) => {
                        console.log("CURRENT subjets: " + JSON.stringify(result));
                    });
                });
        });
    }

    function removeSubject(subjectString) {
        chrome.storage.sync.get("SubjectsList", function (result) {
        if (result.SubjectsList != undefined) {
            for(let i = 0; i < result.SubjectsList.subjects.length; i++){
                allSubjects.subjects.push(result.SubjectsList.subjects[i]);
            };
            chrome.storage.sync.remove("SubjectsList", function () {
                console.log("Key subjectslist removed");
            });
        };

        for(let i = 0; i < allSubjects.subjects.length; i++){
            if(allSubjects.subjects[i] == subjectString){
                allSubjects.subjects.splice(i, 1);
                break;
            }
        }
            chrome.storage.sync.set({"SubjectsList": allSubjects}, function () {
            console.log("Key subjectsList has been set")
            chrome.storage.sync.get(['SubjectsList']).then((result) => {
                console.log("CURRENT subjets: " + JSON.stringify(result));
            });
        });
    });
}

    function checkValidInput(newInput){
        if(newInput == ""){
            return false
        }
        return true;
    }