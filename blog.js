// Test file is correctly linked
// console.log('Check!');

// need these button functions since we are programmatically building the edit and delete buttons
import { editPressed, lastEditPressed, delPressed, lastDelPressed } from "./blog_buttons.js"; 

// default list for demo
let default_posts = [['How to cook Mac n Cheese', '2022-02-25', 'Learn the procedures to cook Kraft Mac n Cheese'], ['How to Ruin Your Sleep Schedule', '2022-02-26', 'Self explanatory...'],
['Good Morning Vietnam!', '2022-02-27', 'Skippity Bop Boop']];

// try to parse posts + listCount from LocalStorage
let posts = JSON.parse(localStorage.getItem('Liam_posts'));
let listCount = Number(JSON.parse(localStorage.getItem('num_total_posts')));

// if empty, go with the defaults so we can see some content
if(posts === null || posts.length === 0) {
    localStorage.setItem('Liam_posts', JSON.stringify( default_posts ));
    posts = JSON.parse(localStorage.getItem('Liam_posts'));

    localStorage.setItem('num_total_posts', JSON.stringify( posts.length - 1 ));
    listCount = posts.length - 1;
}

// keep track of input on add dialog
export let current_title = '';
export let current_date = '';
export let current_sum = '';

export function buildList() {
    // traverse posts
    for( let i = 0; i < posts.length; i++) {
        // create the list item
        let new_item = document.createElement('li');

        // set it
        new_item.innerHTML = `Title: ${posts[i][0]} Date: ${posts[i][1]} Summary: ${posts[i][2]} <button id="edit_btn${i}">Edit</button> <button id="delete_btn${i}">Delete</button>`;

        // append to list
        document.getElementById('blog_list').appendChild(new_item);

        // add event listeners to buttons
        document.getElementById(`edit_btn${i}`).addEventListener('click', editPressed);
        document.getElementById(`delete_btn${i}`).addEventListener('click', delPressed);
    }
}

export function saveNewPost() {
    // if not set to default value used by cancel button...
    if(document.getElementById('title_input').value != '____' && document.getElementById('date_input').value != '1000-01-01' && 
    document.getElementById('summary_input').value != '____') {
        // push onto array
        posts.push([current_title, current_date, current_sum]);
        // update local storage to match array
        localStorage.setItem('Liam_posts', JSON.stringify( posts ));

        // create the list item
        let new_item = document.createElement('li');

        // keep track of total number of posts made so we can addEventListeners w/o conflicts
        listCount++;
        // update local storage
        localStorage.setItem('num_total_posts', JSON.stringify( listCount ));

        // set it
        new_item.innerHTML = `Title: ${posts[posts.length-1][0]} Date: ${posts[posts.length-1][1]} Summary: ${posts[posts.length-1][2]} <button id="edit_btn${listCount}">Edit</button> <button id="delete_btn${listCount}">Delete</button>`;

        // append to list
        document.getElementById('blog_list').appendChild(new_item);

        // add event listeners to buttons
        document.getElementById(`edit_btn${listCount}`).addEventListener('click', editPressed);
        document.getElementById(`delete_btn${listCount}`).addEventListener('click', delPressed);
    }

    // reset input fields (for when they click Add again)
    document.getElementById('title_input').value = '';
    document.getElementById('date_input').value = '';
    document.getElementById('summary_input').value = '';

    // reset current input (for if they click Add and instantly click Ok)
    current_title = '';
    current_date = '';
    current_sum = '';
}

export function editPost() {
    // update list item
    let list_item = document.getElementById(lastEditPressed).parentElement;

    // need to re-attach listeners
    let listNumber = lastEditPressed.substring(lastEditPressed.indexOf('btn') + 3);

    // save values for later
    let splicedTitle = list_item.innerHTML.substring(list_item.innerHTML.indexOf('Title:') + 7, list_item.innerHTML.indexOf(' Date:'));
    let splicedDate =  list_item.innerHTML.substring(list_item.innerHTML.indexOf('Date:') + 6, list_item.innerHTML.indexOf(' Summary:'));
    let splicedSummary =  list_item.innerHTML.substring(list_item.innerHTML.indexOf('Summary:') + 9, list_item.innerHTML.indexOf(' <button id=\"edit_btn'));
    
    // set it to new values from edit dialog
    list_item.innerHTML = `Title: ${DOMPurify.sanitize(document.getElementById('title_edit').value, { USE_PROFILES: { html: true } })} Date: ${DOMPurify.sanitize(document.getElementById('date_edit').value,
    { USE_PROFILES: { html: true } })} Summary: ${DOMPurify.sanitize(document.getElementById('summary_edit').value,
    { USE_PROFILES: { html: true } })} <button id="edit_btn${listNumber}">Edit</button> <button id="delete_btn${listNumber}">Delete</button>`

    // re-attach listeners
    document.getElementById(`edit_btn${listNumber}`).addEventListener('click', editPressed);
    document.getElementById(`delete_btn${listNumber}`).addEventListener('click', delPressed);

    //edit array
    let index = -1;
    for(let i = 0; i < posts.length; i++) {
        if(posts[i][0] === splicedTitle && posts[i][1] === splicedDate && posts[i][2] === splicedSummary)
            index = i;
    }
    posts[index] = [DOMPurify.sanitize(document.getElementById('title_edit').value, { USE_PROFILES: { html: true } }), DOMPurify.sanitize(document.getElementById('date_edit').value,
    { USE_PROFILES: { html: true } }), DOMPurify.sanitize(document.getElementById('summary_edit').value, { USE_PROFILES: { html: true } })];

    // update local storage to match array
    localStorage.setItem('Liam_posts', JSON.stringify( posts ));
}

export function deletePost() {
    // remove from list
    let list_item = document.getElementById(lastDelPressed).parentElement;

    // save values for later
    let splicedTitle = list_item.innerHTML.substring(list_item.innerHTML.indexOf('Title:') + 7, list_item.innerHTML.indexOf(' Date:'));
    let splicedDate =  list_item.innerHTML.substring(list_item.innerHTML.indexOf('Date:') + 6, list_item.innerHTML.indexOf(' Summary:'));
    let splicedSummary =  list_item.innerHTML.substring(list_item.innerHTML.indexOf('Summary:') + 9, list_item.innerHTML.indexOf(' <button id=\"edit_btn'));

    // remove from ul
    list_item.parentNode.removeChild(list_item);
    
    // remove from array
    let index = -1;
    for(let i = 0; i < posts.length; i++) {
        if(posts[i][0] === splicedTitle && posts[i][1] === splicedDate && posts[i][2] === splicedSummary)
            index = i;
    }
    posts.splice(index, 1);

    // update local storage to match array
    localStorage.setItem('Liam_posts', JSON.stringify( posts ));

}

export function updateTitle() {
    // purifies user input and grabs from title input
    current_title = DOMPurify.sanitize(document.getElementById('title_input').value, { USE_PROFILES: { html: true } });
}

export function updateDate() {
    // purifies user input and grabs from date input
    current_date = DOMPurify.sanitize(document.getElementById('date_input').value, { USE_PROFILES: { html: true } });
}

export function updateSummary() {
    // purifies user input and grabs from summary input
    current_sum = DOMPurify.sanitize(document.getElementById('summary_input').value, { USE_PROFILES: { html: true } });
}