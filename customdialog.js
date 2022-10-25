// Test file is correctly linked
// console.log('Check!');

export function alertPressed() {
    // clear msg
    document.getElementById('btn_message').innerHTML = '';
    // get the alert dialog box and show it when alert is clicked
    document.getElementById('alert_dialog').showModal();
}

export function confirmPressed() {
    // clear msg
    document.getElementById('btn_message').innerHTML = '';
    // get the alert dialog box and show it when alert is clicked
    document.getElementById('confirm_dialog').showModal();
}

export function promptPressed() {
    // clear msg
    document.getElementById('btn_message').innerHTML = '';
    // get the alert dialog box and show it when alert is clicked
    document.getElementById('prompt_dialog').showModal();

    // reset return for if they type a msg --> click ok --> open prompt again --> type nothing
    document.getElementById('prompt_ok_btn').value = '';
}

export function updateConfirmMessage(e) {
    // update message
    // e is the Event. e.target is the confirm's dialog box. Thus, e.target.returnValue is the value returned by the form.
    // It's true or false since in customdialogs.html I set the button's form values to true and false.
    document.getElementById('btn_message').innerHTML = `The value returned by the confirm method is : ${e.target.returnValue}`;
    // console.dir(e)
}

export function updatePromptReturn() {
    document.getElementById('prompt_ok_btn').value = DOMPurify.sanitize(document.getElementById('first_name').value, { USE_PROFILES: { html: true } });
}

export function defaultPromptMessage() {
    document.getElementById('prompt_cancel_btn').value = 'User didn\'t enter anything';
}

export function updatePromptMessage(e) {
    // here the e.target.returnValue (the return of the form) is the input field's value b/c of updatePromptReturn()
    if(e.target.returnValue !== 'User didn\'t enter anything')
        document.getElementById('btn_message').innerHTML = `The value returned by the prompt method is : ${e.target.returnValue}`;
    else
    document.getElementById('btn_message').innerHTML = 'User didn\'t enter anything';
    // console.dir(e)

    // reset input field
    document.getElementById('first_name').value = '';
}