// Test file is correctly linked
// console.log('Check!');

function confirmPrompt() {
    // clear message
    document.getElementById('btn_message').innerHTML = '';

    // push back the confirm dialog to until after the stack is empty so the message gets cleared
    // even though the clear message code is before alert(),confirm(),prompt(), these are built in functions
    // so their event queues have more priorty than your own code.
    setTimeout( function cb() {
        let confirmResult = confirm('Do you confirm this?');

        // update message
        document.getElementById('btn_message').innerHTML = `The value returned by the confirm method is : ${confirmResult}`;
    }, 0);
}

function promptPrompt() {
    // clear message
    document.getElementById('btn_message').innerHTML = '';

    // push back the prompt dialog to until after the stack is empty so the message gets cleared
    // even though the clear message code is before alert(),confirm(),prompt(), these are built in functions
    // so their event queues have more priorty than your own code.
    setTimeout( function cb() {
        let promptResult = prompt('What is your name?');

        // update message
        // prompt returns null if the user clicked cancel
        if(promptResult != null)
            document.getElementById('btn_message').innerHTML = `The value returned by the prompt method is : ${promptResult}`;
        else
            document.getElementById('btn_message').innerHTML = 'User didn\'t enter anything';
    }, 0);
}

function safePromptPrompt() {
    // clear message
    document.getElementById('btn_message').innerHTML = '';

    setTimeout( function cb() {
        let safePromptResult = prompt('What is your name?');
        
        // purify user input using DOMPurify
        let cleanResult = DOMPurify.sanitize(safePromptResult, { USE_PROFILES: { html: true } });

        // update message
        // prompt returns null if the user clicked cancel
        if(safePromptResult != null)
            document.getElementById('btn_message').innerHTML = `The value returned by the prompt method is : ${cleanResult}`;
        else
            document.getElementById('btn_message').innerHTML = 'User didn\'t enter anything';
    }, 0);
}

// Attach event listener to alert_btn using arrow function
document.getElementById('alert_btn').addEventListener('click', () => {
    // clear message
    document.getElementById('btn_message').innerHTML = '';

    // push back the prompt dialog to until after the stack is empty so the message gets cleared
    // even though the clear message code is before alert(),confirm(),prompt(), these are built in functions
    // so their event queues have more priorty than your own code.
    setTimeout( function cb() {
        alert('Alert pressed!');
    }, 0);
});

// Attach event listener to confirm_btn to run confirmPrompt
document.getElementById('confirm_btn').addEventListener('click', confirmPrompt);

// Attach event listener to prompt_btn to run promptPrompt
document.getElementById('prompt_btn').addEventListener('click', promptPrompt);

// Attach event listener to s_prompt_btn to run safePromptPrompt
document.getElementById('s_prompt_btn').addEventListener('click', safePromptPrompt);