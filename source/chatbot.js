// const submitbtn = document.getElementById('submitButton');
// const mytextInput = document.getElementById('Botinput');
// const responseTextarea = document.getElementById('response');

// const API_KEY = '';


// document.getElementById("bot-button").addEventListener("click", function() {
//     document.getElementById("BotpopupContainer").style.display = "block";
//   });
  
// document.querySelector(".close").addEventListener("click", function() {
//     document.getElementById("BotpopupContainer").style.display = "none";
//   });


//   submitbtn.addEventListener('submit', async (e) => {
//     e.preventDefault();
//     const mytext = mytextInput.value.trim();

//     if (mytext) {
//         try {
//             const response = await fetch('https://api.openai.com/v1/chat/completions', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                     'Authorization': `Bearer ${API_KEY}`,
//                 },
//                 body: JSON.stringify({
//                     model: 'gpt-3.5-turbo',
//                     messages: [{role: 'user', content: mytext }],
//                     temperature: 1.0,
//                     top_p: 0.7,
//                     n: 1,
//                     stream: false,
//                     presence_penalty: 0,
//                     frequency_penalty: 0,
//                 }),
//             });

//             if (response.ok) {
//                 const data = await response.json();
//                 responseTextarea.value = data.choices[0].message.content;
//             } else {
//                 responseTextarea.value = 'Error: Unable to process your request.';
//             }
//         } catch (error) {
//             console.error(error);
//             responseTextarea.value = 'Error: Unable to process your request.';
//         }
//     }
// });

const submitbtn = document.getElementById('submitButton');
const mytextInput = document.getElementById('Botinput');
const responseTextarea = document.getElementById('outputField');

const API_KEY ='';

document.getElementById("bot-button").addEventListener("click", function() {
    document.getElementById("BotpopupContainer").style.display = "block";
});

document.querySelector(".close").addEventListener("click", function() {
    document.getElementById("BotpopupContainer").style.display = "none";
});

submitbtn.addEventListener('click', async () => {
    const mytext = mytextInput.value.trim();

    if (mytext) {
        try {
            const response = await fetch('https://api.openai.com/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${API_KEY}`,
                },
                body: JSON.stringify({
                    model: 'gpt-3.5-turbo',
                    messages: [{role: 'user', content: mytext }],
                    temperature: 1.0,
                    top_p: 0.7,
                    n: 1,
                    stream: false,
                    presence_penalty: 0,
                    frequency_penalty: 0,
                }),
            });

            if (response.ok) {
                const data = await response.json();
                responseTextarea.textContent = data.choices[0].message.content;
            } else {
                responseTextarea.textContent = 'Error: Unable to process your request.';
            }
        } catch (error) {
            console.error(error);
            responseTextarea.textContent = 'Error: Unable to process your request.';
        }
    }
});
