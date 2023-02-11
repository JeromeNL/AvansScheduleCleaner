let subjectsToFilter = [];
let previousWeekButton = document.querySelector('[title="Vorige week"]');
let nextWeekButton = document.querySelector('[title="Volgende week"]');
let otherButtons = document.querySelectorAll('.ui-button-text');

window.addEventListener("load", () => {
    startFilteringSubjects();
});

previousWeekButton.addEventListener ('click', function(event) {
    startFilteringSubjects();
});

nextWeekButton.addEventListener ('click', function(event) {
    startFilteringSubjects();
});

for(let i = 0; i < otherButtons.length; i++){
    otherButtons[i].addEventListener ('click', function(event) {
        startFilteringSubjects();
    });
}


function startFilteringSubjects(){
    setTimeout(function(){
        chrome.storage.sync.get(['SubjectsList']).then((result) => {
            if(typeof result[Object.keys(result)[0]] == "undefined"){
                return;
            }

            let subjects = Object.values(result[Object.keys(result)]);
            for(let i = 0; i < subjects.length; i++){
                subjectsToFilter.push(subjects[i]);
            }
            loadAllClassesForWeek();
        });
    }, 100);
}


function loadAllClassesForWeek() {
    setTimeout(function() {
        let allClassesForWeek = document.getElementsByClassName('wc-cal-event ui-corner-all');
        removeSubjectFromTimetable(allClassesForWeek);
    }, 500);
}


function removeSubjectFromTimetable(allClasses){
   let length = subjectsToFilter[0].length;
    for(let subject = 0; subject < length; subject++){
        for(let scheduleClass = 0; scheduleClass < allClasses.length; scheduleClass++){
            if(allClasses[scheduleClass].innerText.includes(subjectsToFilter[0][subject].toUpperCase())){
                allClasses[scheduleClass].remove();
            }
        }
    }
}



