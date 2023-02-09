
window.addEventListener("load", () => {
    loadFullProcess();
});


function loadFullProcess() {
    loadAllClassesForWeek();
}


function loadAllClassesForWeek() {
    setTimeout(function() {
        console.log("Chrome Extensie wordt herkend!");

        let allClassesForWeek = document.getElementsByClassName('wc-cal-event ui-corner-all');
        console.log(allClassesForWeek);
        removeSubjectFromTimetable('WEBPHP', allClassesForWeek);

    }, 2000)
}


function removeSubjectFromTimetable(subject, allClasses){
    console.log(typeof allClasses)

    for(let i = 0; i < allClasses.length; i++){
        if(allClasses[i].innerText.includes(subject)){
            allClasses[i].remove();
        }
    }
}
