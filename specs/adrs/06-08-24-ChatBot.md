ADR Topics: Authorization, Access, Chatbot Functionality

Context of decision making:
 Given that our tool does not try to “reinvent the bicycle,” as a team we decided to leave off calendar functionality simply because most developers and the industry use Google Calendar anyway. For that reason, we decided to manage our remaining time properly and add functionality that makes our app more novel and useful for the core functionality of note-taking: adding AI Assistant functionality into the project’s notes.   
Methodology & Outcome: 
The proper use of localStorage allows us to integrate ChatBot functionality, particularly with the usage of the OpenAI key, without worrying about security issues. Future work would involve integrating authentication methods similar to Django’s or cloud services and simplifying the process of using the ChatBot, but due to the overall simplicity of the app and lack of any sensitive data like credit cards or document information, we decided not to waste our time building security for something that probably does not even need it.

Assumptions & Limitations: 
Intended users – who are developers by the assumption made at the beginning of the quarter -- are familiar with local Storage (used to store the OpenAI API key) and basic understanding of how to retrieve that key from OpenAI. 
If users are not willing to learn these tools – the Chatbot functionality is simply an addition to the main note-taking functionality and does not prevent a user from using our app and manually searching queries/notes using the search bar we implemented earlier. 

Potential issues later: 
3.5 Version of OpenAI Api might become unsupported due to the recent update of OpenAI API.  However, this is a very easy fix – just change 3.5 to 4o in the chatbot.js
