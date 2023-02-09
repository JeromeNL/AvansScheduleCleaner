
window.addEventListener("load", () => {
    setTimeout(function() {
    console.log("Chrome Extensie wordt herkend!");

    let allClassesForWeek = document.getElementsByClassName('wc-cal-event ui-corner-all');

    let allFullDays = document.getElementsByClassName('wc-full-height-column wc-day-column-inner');
    console.log(allClassesForWeek);

    allClassesForWeek.item(0).remove();


    }, 2000)
});




function loadAllClasses() {
    let allClassesForWeek = document.getElementsByClassName('wc-cal-event ui-corner-all');
    let allFullDays = document.getElementsByClassName('wc-full-height-column wc-day-column-inner');

    console.log(allClassesForWeek)
    console.log(allClassesForWeek.item(0))
}
