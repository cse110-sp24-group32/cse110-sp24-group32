/**
 * Default markdown templates for various note types.
 */

const MEETING_NOTES = '# Meeting Notes\n\n**Date:** date\n**Time:** time\n\n## Attendees\n- attendee1\n- attendee2\n- attendee3\n\n## Agenda\n1. agenda_item1\n2. agenda_item2\n3. agenda_item3\n\n## Discussion\n- **Topic 1:** discussion_topic1\n  - Details: discussion_details1\n- **Topic 2:** discussion_topic2\n  - Details: discussion_details2\n\n## Action Items\n- **Action Item 1:** action_item1 - **Assigned to:** assigned_to1\n- **Action Item 2:** action_item2 - **Assigned to:** assigned_to2'
const FREEFORM_MD = '# title\n\ncontent'
const DESIGN_NOTES = '# Design Notes\n\n**Project:** project_name\n**Date:** date\n\n## Overview\noverview\n\n## Design Specifications\n- **Specification 1:** specification1\n- **Specification 2:** specification2\n\n## Diagrams\n\n\n## Additional Notes\nadditional_notes'
const GITHUB_NOTES = '# GitHub Notes\n\n**Repository:** [repository_name](repository_url)\n**Branch:** branch\n\n## Commits\n- **Commit 1:** [commit_message1](commit_url1)\n- **Commit 2:** [commit_message2](commit_url2)\n\n## Pull Requests\n- **PR 1:** [pr_title1](pr_url1)\n- **PR 2:** [pr_title2](pr_url2)\n\n## Issues\n- **Issue 1:** [issue_title1](issue_url1)\n- **Issue 2:** [issue_title2](issue_url2)'
const CODE_AND_BUG_SNIPPETS = '# Code and Bug Snippets\n\n**File:** file_name\n**Date:** date\n\n## Code Snippet\n```javascript\ncode_snippet\n```\n\n## Bug Description\nbug_description\n\n## Steps to Reproduce\n1. step1\n2. step2\n3. step3\n\n## Solution\nsolution'

export { MEETING_NOTES, FREEFORM_MD, DESIGN_NOTES, GITHUB_NOTES, CODE_AND_BUG_SNIPPETS }
