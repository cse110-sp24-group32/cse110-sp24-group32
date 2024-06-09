import { getManagerObject } from './index.js'

const submitbtn = document.getElementById('submitButton')
const mytextInput = document.getElementById('Botinput')
const responseTextarea = document.getElementById('outputField')

let API_KEY = null
let initialSystemMessage = null
let man = null

document.addEventListener('DOMContentLoaded', init)

async function init () {
  man = await getManagerObject() // Wait for the Manager instance to be initialized

  document.getElementById('bot-button').addEventListener('click', function () {
    if (!man.curNoteId) return
    document.getElementById('BotpopupContainer').style.display = 'block'
  })

  document.querySelector('.close').addEventListener('click', function () {
    document.getElementById('BotpopupContainer').style.display = 'none'
  })

  document.getElementById('apiKeyForm').addEventListener('submit', function (event) {
    event.preventDefault()

    const apiKey = document.getElementById('apiKey').value

    if (apiKey) {
      // Replace the console log with the necessary logic to handle the API key
      localStorage.setItem('api-key', apiKey)
      alert('Successfully inputted OpenAI API key')
    } else {
      alert('Please enter your OpenAI API key.')
    }
  })
}

submitbtn.addEventListener('click', async () => {
  const mytext = mytextInput.value.trim()

  if (mytext) {
    try {
      const allnotes = man.getNote(man.curNoteId)
      initialSystemMessage = { role: 'system', content: 'You are a chatbot part of a notetaking app built for developers. The developer has this project open, and it has these note files given as a JSON object: ' + JSON.stringify(allnotes) }
      API_KEY = localStorage.getItem('api-key')
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${API_KEY}`
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [initialSystemMessage, { role: 'user', content: mytext }],
          temperature: 1.0,
          top_p: 0.7,
          n: 1,
          stream: false,
          presence_penalty: 0,
          frequency_penalty: 0
        })
      })

      if (response.ok) {
        const data = await response.json()
        responseTextarea.textContent = data.choices[0].message.content
      } else {
        const errorData = await response.json()
        console.error('Error response:', errorData)
        responseTextarea.textContent = `Error: ${errorData.error.message}`
      }
    } catch (error) {
      console.error('Fetch error:', error)
      responseTextarea.textContent = 'Error: Unable to process your request.'
    }
  }
})
