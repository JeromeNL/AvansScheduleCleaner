let subjectsToFilter = [];
let previousWeekButton = document.querySelector('[title="Vorige week"]');
let nextWeekButton = document.querySelector('[title="Volgende week"]');
let otherButtons = document.querySelectorAll('.ui-button-text');

function loadFullProcess() {
    //loadAllClassesForWeek();
    addSubjectsToFilter();


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
    setTimeout(function(){
        chrome.storage.sync.get(['SubjectsList']).then((result) => {
            console.log("BINNENKOMEND RESULT: " + JSON.stringify(result[Object.keys(result)[0]]))

            if(typeof result[Object.keys(result)[0]] == "undefined"){
                console.log("DIT BESTATA HELEMAAL NIET!!")
                return;
            }
            let waardes = Object.values(result[Object.keys(result)])
            console.log("Waarde: " + JSON.stringify(waardes));

            for(let i = 0; i < waardes.length; i++){
                subjectsToFilter.push(waardes[i]);
            }

            console.log("CURRENT set in subjectsToFilter: " + JSON.stringify(subjectsToFilter));
            loadAllClassesForWeek();
        });
    }, 2000)

}

function loadAllClassesForWeek() {
    setTimeout(function() {
        console.log("Chrome Extensie wordt herkend!");

        // see addSubjecgtsToFilter method
        // chrome.storage.sync.get(['SubjectsList']).then((result) => {
        //     subjectsToFilter.push(result.SubjectsList);
        //     console.log("CURRENT set in subjectsToFilter: " + JSON.stringify(subjectsToFilter));
        // });

        
        let allClassesForWeek = document.getElementsByClassName('wc-cal-event ui-corner-all');
        console.log(allClassesForWeek);
        removeSubjectFromTimetable(allClassesForWeek);

    }, 2000)

}

// probleem: subjectsToFilter.subjects.length werkt niet.
function removeSubjectFromTimetable(allClasses){
    console.log("CURRENT set in REMOVE: " + JSON.stringify(subjectsToFilter));
   let lengte = subjectsToFilter[0].length;
   console.log("LENGTE: " + lengte)
    for(let index = 0; index < lengte; index++){
        console.log("index: " + index);
        for(let i = 0; i < allClasses.length; i++){
            //console.log("i: " + i)
            //console.log("content: " + subjectsToFilter[0][index]);
            //console.log("Allclasses.innertext: " + allClasses[i].innerText)
            if(allClasses[i].innerText.includes(subjectsToFilter[0][index])){
                allClasses[i].remove();
                console.log("Item REMOVED: " + allClasses[i])
            }
        }
    }
}



