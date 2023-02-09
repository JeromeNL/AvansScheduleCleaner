
window.addEventListener("load", () => {
    loadFullProcess();
});

let subjectsToFilter = ['SWEN4', 'WEBPHP', 'WEBJS'];


function loadFullProcess() {
    loadAllClassesForWeek();
}


function loadAllClassesForWeek() {
    setTimeout(function() {
        console.log("Chrome Extensie wordt herkend!");

        let allClassesForWeek = document.getElementsByClassName('wc-cal-event ui-corner-all');
        console.log(allClassesForWeek);
        removeSubjectFromTimetableAtRefresh(allClassesForWeek);

    }, 2000)
}


function removeSubjectFromTimetableAtRefresh(allClasses){
    for(let index = 0; index < subjectsToFilter.length; index++){
        for(let i = 0; i < allClasses.length; i++){
            if(allClasses[i].innerText.includes(subjectsToFilter[index])){
                allClasses[i].remove();
            }
        }
    }
}
