let subjectsToFilter = [];
let previousWeekButton = document.querySelector('[title="Vorige week"]');
let nextWeekButton = document.querySelector('[title="Volgende week"]');
let otherButtons = document.querySelectorAll('.ui-button-text');

function loadFullProcess() {
    loadAllClassesForWeek();


}

window.addEventListener("load", () => {
    loadFullProcess();
});

previousWeekButton.addEventListener ('click', function(event) {
    loadFullProcess();
});

nextWeekButton.addEventListener ('click', function(event) {
    loadFullProcess();
});

for(let i = 0; i < otherButtons.length; i++){
    otherButtons[i].addEventListener ('click', function(event) {
        loadFullProcess();
    });
}

function addSubjectsToFilter(){
    chrome.storage.sync.get(['SubjectsList']).then((result) => {
        console.log("CURRENT subjets: " + JSON.stringify(result));
    });
}

function loadAllClassesForWeek() {
    setTimeout(function() {
        console.log("Chrome Extensie wordt herkend!");

        chrome.storage.sync.get(['SubjectsList']).then((result) => {
            subjectsToFilter.push(result.SubjectsList);
            console.log("CURRENT set in subjectsToFilter: " + JSON.stringify(subjectsToFilter));
        });

        
        let allClassesForWeek = document.getElementsByClassName('wc-cal-event ui-corner-all');
        console.log(allClassesForWeek);
        removeSubjectFromTimetable(allClassesForWeek);

    }, 2000)
}


function removeSubjectFromTimetable(allClasses){

    for(let index = 0; index < subjectsToFilter.length; index++){
        for(let i = 0; i < allClasses.length; i++){
            if(allClasses[i].innerText.includes(subjectsToFilter[index])){
                allClasses[i].remove();
            }
        }
    }
}

