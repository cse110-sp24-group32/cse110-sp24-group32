# Meeting Minutes

# Team Information: Number 32 , Name : Memory Munchers
## Meeting Information

**Meeting Date/Time:** 5/26/2024, 2:30 - 3:30 pm (1 hours) 

**Meeting Purpose:** Sprint 1 Review
**Meeting Location:** Discord
**Note Taker:** Arjun V

# Attendance

- Christopher
- Anthony
- Arjun V
- David
- Justin
- Thanh
- Richard
- Philip (Yu)
- Thomas

# Adding notes / Manager

Manager class – storing persistent data of projects and notes
Save function takes from Manager and stores in local storage -> call save and it will save
Proxy – is an important function – every time we try to set property -> it will automatically save
Everything (nodes & projects) is added to proxy
The manager also manages markdown (a little UI managing), but mostly nodes & projects managing
If manually edit a property with =, it will save

Also added functionality to actually add a note and edit it

Added functionality to tags of a note - you can create and delete tags

# Sidebar
Chris, David - for the sidebar, we can now create new projects, and when we make new notes, they are automatically grouped by their tags. Implemented a new project function, a render sidebar function-populates all created projects. We can reload the page and the notes are saved in localstorage, we can add and remove tags and the note would automatcically get regrouped by their first tag. 


# Search bar
Philip,Anthony, Richard  - Friday, we made the search function using the manager instance and an eventlistener, and find the content and tags matching the query. All of the matching notes would be populated in the pop up bar and when you would click on a note then the main page would open up that note. 
Arjun - Added some header css and html by adding the logo and a button to the chat assistant page. Added the export functionality which allows user to save a particular note as a json file. 

# Plans for Sprint 2
- bug fixes(dangling notes-can create notes without creating a project, if note has no tag its not displayed)
- design touches (sidebar for project notes and top note bar)
- UI design
- CI/CD pipeline changes with linter and additional testing (jest and possibly E2E with Pupeteer)
- Commenting and cleaning code and factoring code into multiple js files
- Create detailed templates
- Export all notes in all projects/save localStorage as file
- Import exported project json file to localStorage



