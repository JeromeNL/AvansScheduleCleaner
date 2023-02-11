
let btn = document.getElementById('submitBtn');
let keyName = "SubjectsList";
let allSubjects = {"subjects": ['MBDI']};
btn.addEventListener('click', function() {
    const subjectInput = document.querySelector('#firstSubject').value;
    addSubject(subjectInput)
});

    function getSubjects() {
        let returnValue;
        chrome.storage.sync.get(['SubjectsList']).then((result) => {
            returnValue = result;
        });
        return returnValue;
    }

    function setSubjects() {
        chrome.storage.sync.set({"SubjectsList": allSubjects}, function () {

        });
    }

    function addSubject(subjectString) {
        let storage = chrome.storage.sync;

        storage.get("SubjectsList", function (result) {
            if (result.SubjectsList != undefined) {
                for(let i = 0; i < result.SubjectsList.subjects.length; i++){
                    allSubjects.subjects.push(result.SubjectsList.subjects[i]);
                }
                storage.remove("SubjectsList", function () {
                    console.log("Key subjectslist removed");
                });
            }
                allSubjects.subjects.push(subjectString)
                storage.set({"SubjectsList": allSubjects}, function () {
                    console.log("Key subjectsList has been set")
                    chrome.storage.sync.get(['SubjectsList']).then((result) => {
                        console.log("CURRENT subjets: " + JSON.stringify(result));
                    });

                });

        })
    }




//
//
//     chrome.storage.sync.get(['SubjectsList'], function(result){
//         console.log("Result of current list: " + JSON.stringify(result))
//         if (typeof result.SubjectsList === 'undefined') {
//             console.log("bestaat nog niet!!!!")
//         } else {
//             console.log("bestaat al!!!!")
//             //let newArray = allSubjects.subjects.concat(result.SubjectsList.subjects)
//             for(let i = 0; i < result.SubjectsList.subjects.length; i++){
//                 console.log("lets add an item" + result.SubjectsList.subjects[i])
//                 allSubjects.subjects.push(result.SubjectsList.subjects[i]);
//                 console.log("De ARRAY is nu: " + JSON.stringify(allSubjects))
//             }
//             //allSubjects.subjects.push(newArray);
//             console.log(JSON.stringify("bestaande items: " + result.SubjectsList.subjects));
//             chrome.storage.sync.remove('SubjectsList');
//         }
//
//
//
//
//     });
//
//
//     const subjectInput = document.querySelector('#firstSubject').value;
//     console.log("Current items before add new: " + JSON.stringify(allSubjects))
//     allSubjects.subjects.push(subjectInput.toString());
//     console.log("Input value: " + subjectInput);
//     console.log("new state: " + JSON.stringify(allSubjects.subjects));
//
//
//     chrome.storage.sync.set({"SubjectsList": allSubjects}, function () {
//         console.log("list with new items incl. added!")
//     });
//
//
//     chrome.storage.sync.get(('SubjectsList'), function(result){
//         //alert("button clicked: " + result.SubjectsList);
//         console.log("Result of current list: " + JSON.stringify(result))
//     })
//
// });
