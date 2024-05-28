# Meeting Minutes

# Team Information: Number 32 , Name : Memory Munchers
## Meeting Information

**Meeting Date/Time:** 5/20/2024,2 - 3 pm (1 hours) 

**Meeting Purpose:** First sprint progress, standup and other decisions
**Meeting Location:** Discord 
**Note Taker:** Anthony Chapov


- Christopher
- Justin
- Richard
- Arjun K
- Arjun V
- Thomas
- Philip (Yu)
- Thanh
- Anthony
- Hailani
- David

# Agenda


# Backend progress

Thomas showed off the backend Manager class he worked on over the weekend to get the team onboarded with the backend classes

Manager class – storing persistent data of projects and notes
Save function takes from Manager and stores in local storage -> call save and it will save
Proxy – is an important function – every time we try to set property -> it will automatically save
Everything (nodes & projects) is added to proxy
The manager also manages markdown (a little UI managing), but mostly nodes & projects managing
If manually edit a property with =, it will save

# UI for adding notes progress

UI was started by Justin to add notes from a template -- it has a popup
However, we decided we do not want the UI to have hard coded buttons for each template. It should be dynamic

# Decision on how to merge

Whenever you have a merge request, you need someone else to review it. Also, it should be linked to the issue before the merge is completed.
To do this, in the description of the merge request, type `close #<num>` where `<num>` is the id/number of the Github Issue the merge request is related to.

![image](https://github.com/cse110-sp24-group32/cse110-sp24-group32/assets/32114256/f3e7a75a-e7ff-4ea3-a75e-6bdaa653aecc)


# What to do this week

1. Thomas and Justin can work to make the buttons dynamic from the given list of templates that our JS have, also add way to close popup
<br><br>
2. Github Issues:
- Philip will edit the "sub issues" for our main "team issues" so that the sub issues have corresponding tasks to the main issue. Also go through each team issue and create any sub issues that don't exist yet.

- For **each team**, go through all the subissues for your team and figure out amongst yourself who will be assigned to each sub issue.
  <br><br>
3. Finish the ADR for the backend this week

- Write down specs for each class and general methods/properties they hold
- Diagram for how classes interact with each other:
- ![image](https://github.com/cse110-sp24-group32/cse110-sp24-group32/assets/32114256/ec968394-115f-4e8b-9655-3f9e30cb13b3)
- https://docs.google.com/document/d/1h34JzSBb7GVkonsbbuZmN0x2qHmUsI_PyzeQZ-V6nps/edit?usp=sharing
<br><br>
4. Sprint video due Sunday

- Get more info on this from Dev during wed meeting
<br><br>
5. Any other deadlines in Github project https://github.com/orgs/cse110-sp24-group32/projects/3
<br><br>
6. Leads dev meeting on Wednesday
- ask about prof 1-1 and also sprint video due sunday

