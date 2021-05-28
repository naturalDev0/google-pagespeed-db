import {run, setUpQuery, showLighthouseContent} from "./google-api.js";

// Global variables
var rowCounter = 1;
var slugViewer = document.getElementById("SlugViewer");
// var targetId = "";

/**
 *  Functions 
 * 
 * */

function AddSlugRow() {

    let slugComponent = '<tr id="slugRow' + rowCounter + '">' +
        '<td>' +
        '<input id="slugTrash' + rowCounter + '"class="hide-col form-check-input" type="checkbox" value="' + rowCounter + '" aria-label="Trash Checkbox"><span>' + rowCounter + '</span></td>' +
        '<td><input type="text" id="slugURL' + rowCounter + '" class="form-control" placeholder="Please enter a URL..."></td>' +
        '<td> --- </td>' +
        '<td> --- </td>' +
        '<td> --- </td>' +
        '<td> --- </td>' +
        '<td> --- </td>' +
        '<td> --- </td>' +
        '</tr>';
    slugViewer.insertAdjacentHTML('beforeend', slugComponent);
    rowCounter++;

}

function checkForDeleteRow(els) {

    els.forEach((item, index) => {
        item.parentNode.parentNode.remove();
    });

    // if (els.checked) {
    //     let targetRow = els.parentNode.parentNode;
    //     targetRow.remove();
    // }
}

// function addClassName(el, cName) {
//     let name, arr;    
//     name = cName;
//     arr = el.className.split(" ");
//     if (arr.indexOf(name) == -1) {
//         element.className += " " + name;
//     }
// }

function transactionTable() {
    
    // let showTrashBox = document.querySelectorAll('[id^="slugTrash"]');    
    let totalNoTrash = slugViewer.childNodes.length;
    let firstRowCount = 0;    
    let collectCheckedRows = [];  

    if (totalNoTrash > 0) {
        for (let i = firstRowCount; i < totalNoTrash; i++) {

            let els = slugViewer.childNodes[i].childNodes[0].childNodes[0];
            if (els === null) continue;            
            let elsTrash = slugViewer.childNodes[i].childNodes[0].childNodes[1];                
            if (els.classList.contains("hide-col")) {
                els.className = els.className.replace(/\bhide-col\b/g, "show-col");                
                elsTrash.classList.add("hide-col");
                                                
            } else if (els.classList.contains("show-col")) {
                
                if (els.checked) collectCheckedRows.push(els);
                els.className = els.className.replace(/\bshow-col\b/g, "hide-col");
                elsTrash.classList.remove("hide-col");                
            }
        }
        checkForDeleteRow(collectCheckedRows);
    }
}

function ShowHideTrashCol() {

    // Check if Slug viewer has elements within; Otherwise skip.
    if (slugViewer.childNodes.length > 0) {

        let addSlugMode = document.getElementById("addSlugRow");
        let getGgPagespeed = document.getElementById("getGgPageSpeed");
        // Check if addSlugRow button has 'disabled' attr active.
        if (addSlugMode.getAttribute("disabled") && getGgPagespeed.getAttribute("disabled")) {
            // Remove 'disabled' attr.
            addSlugMode.removeAttribute("disabled");
            getGgPagespeed.removeAttribute("disabled");
        } else {
            // Enable 'disabled' attr.            
            addSlugMode.setAttribute("disabled", true);
            getGgPagespeed.setAttribute("disabled", true);
        }
        transactionTable();

    } else {
        alert("Add a new slug row first, before you can delete one.");
    };


}

function retrieveAllURL() {
    const getURLs = document.querySelectorAll('[id^="slugRow"]');
    return getURLs;
}

// function showModal() {
//     let myModal = new bootstrap.Modal(document.getElementById('showAndDelSlugRow'));
//     let showModal = document.getElementById("exampleModal");
//     myModal.show(showModal);
// }

/**
 * Google Pagespeed API - Default
 * 
 * * 22 May 2021
 * * Require some modfication to have the data pump into table row
 */

run();
setUpQuery(queryURL);
showLighthouseContent(targetId, lighthouseMetrics);