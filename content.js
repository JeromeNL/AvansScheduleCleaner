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
            console.log("BINNENKOMEND RESULT: " + JSON.stringify(result[Object.keys(result)[0]]))

            if(typeof result[Object.keys(result)[0]] == "undefined"){
                console.log("DIT BESTAAT HELEMAAL NIET!!")
                return;
            }

            let subjects = Object.values(result[Object.keys(result)])
            console.log("Waarde: " + JSON.stringify(subjects));

            for(let i = 0; i < subjects.length; i++){
                subjectsToFilter.push(subjects[i]);
            }

            console.log("CURRENT set in subjectsToFilter: " + JSON.stringify(subjectsToFilter));
            loadAllClassesForWeek();
        });
    }, 2000)

}

function loadAllClassesForWeek() {
    setTimeout(function() {
        console.log("Chrome Extensie wordt herkend!");
        let allClassesForWeek = document.getElementsByClassName('wc-cal-event ui-corner-all');
        console.log(allClassesForWeek);
        removeSubjectFromTimetable(allClassesForWeek);

    }, 2000)

}


function removeSubjectFromTimetable(allClasses){
    console.log("CURRENT set in REMOVE: " + JSON.stringify(subjectsToFilter));
   let lengte = subjectsToFilter[0].length;
   console.log("LENGTE: " + lengte)
    for(let subject = 0; subject < lengte; subject++){
        console.log("index: " + subject);
        for(let scheduleClass = 0; scheduleClass < allClasses.length; scheduleClass++){
            if(allClasses[scheduleClass].innerText.includes(subjectsToFilter[0][subject].toUpperCase())){
                allClasses[scheduleClass].remove();
                console.log("Item REMOVED: " + allClasses[scheduleClass])
            }
        }
    }
}



