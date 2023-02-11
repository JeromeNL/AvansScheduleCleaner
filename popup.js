
let btn = document.getElementById('submitBtn');
let allSubjects = {"subjects": []};
btn.addEventListener('click', function() {
    const subjectInput = document.querySelector('#firstSubject').value;
    addSubject(subjectInput)
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