export let lastEditPressed = null;
export let lastDelPressed = null;

export function addPressed() {
    // get the add dialog box and show it when add is clicked
    document.getElementById('adding_dialog').showModal();
}

export function editPressed(e) {
    lastEditPressed = e.target.id;

    //splice values
    let list_item = document.getElementById(lastEditPressed).parentElement;

    let splicedTitle = list_item.innerText.substring(list_item.innerText.indexOf('Title:') + 7, list_item.innerText.indexOf(' Date:'));
    let splicedDate =  list_item.innerText.substring(list_item.innerText.indexOf('Date:') + 6, list_item.innerText.indexOf(' Summary:'));
    let splicedSummary =  list_item.innerText.substring(list_item.innerText.indexOf('Summary:') + 9, list_item.innerText.indexOf(' Edit Delete'));

    document.getElementById('title_edit').value = splicedTitle;
    document.getElementById('date_edit').value = splicedDate;
    document.getElementById('summary_edit').value = splicedSummary;

    document.getElementById('editing_dialog').showModal();
}

export function delPressed(e) {
    document.getElementById('delete_dialog').showModal();
    
    lastDelPressed = e.target.id;
}

export function addCancelPressed() {
    // reset inputs to "blank" for checkable value + prevent console errors
    // if set to empty string, you get "An invalid form control with name=... is not focusable"
    document.getElementById('title_input').value = '____';
    document.getElementById('date_input').value = '1000-01-01';
    document.getElementById('summary_input').value = '____';

    document.getElementById('adding_dialog').close();
}

export function delCancelPressed() {
    document.getElementById('delete_dialog').close();
}

export function editCancelPressed() {
    // reset inputs to "blank" for checkable value + prevent console errors
    // if set to empty string, you get "An invalid form control with name=... is not focusable"
    document.getElementById('title_edit').value = '____';
    document.getElementById('date_edit').value = '1000-01-01';
    document.getElementById('summary_edit').value = '____';

    document.getElementById('delete_dialog').close();
}