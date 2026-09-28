## Info

### basic project info
- The project is a static screen with one actual funcionality.
- We must replicate the design mockup creating a responsive frontend UI.
- The project is in React+Vite+Tailwind.
- There is no backend. We use the file public\signals_dummy.json to simulate backend calls. we must call it asynchronously to more faithfully replicate an API usage.

### UI design mockups
- entire screen: UI_design.svg
- dropdown menu for the "Action" button: UI_design_dropdown.png

### principles
- make code human readable (line breaks)
- new buttons must be clickable but do nothing
- use the icons provided in public\icons\ when possible
- if you can't find an icon, leave it empty
- All other sections in the main dashboard: no functionality, just:
- UI responsiveness
- follow the mockup for design. including exact pixel sizes if you are able to.
- Every section must be each inside their own subfolder in the components dir.
- Use plain ASCII apostrophes (') instead of typographic curly apostrophes (’) in all source code and UI text to avoid character-encoding issues.

###
- use h2 for section titles, except for that of WelcomeComponent

## Tasks
we will develop new components inside the src/dashboard/components directory, one for each of the cards visible in the body of the screen in the mockup. They'll be named:
- Welcome
- Replies
- MothlyPerformance
- Onboarding
- TodaysTasks

### T1: Welcome component
simple. title and subtitle

### T2: Replies component
don't do the company logos for now.
do: 
- the section
- title
- "open inbox" button
- big green section with the inbox.svg icon

### T3: TodaysTasks component
- section
- title
- the big colored shapes are buttons
- use the warning.svg icon for the error alert

### T4: User corner
- the little element at the bottom of the Sidebar (in the mock up, the one that says "William Robertson"): create it in the Sidebar. instead of William Robertson, use an object of global variables, something like LOGGED_USER.NAME and LOGGED_USER.SURNAME
- use the crono-logo-small.svg icon
- make it clickable, a button.
- also, in the, Welcome component's text, replace Alex for LOGGED_USER.NAME

### T4: MothlyPerformance component

### T5: Onboarding component
- each of the 5 sections is a button
- each section's title is a <h2>
- use the icons in public/icons/onboarding. reference them using ```import.meta.env.BASE_URL```, like so:
```
src={`${import.meta.env.BASE_URL}icons/onboarding/extension.svg`}
```

### T6: fix SignalsList's dropdown menu
- Currently, if the user clicks action on the last element of the list, the dropdown menu renders inside of the scrollable element. It must not be confined in this element. It must render over top of everything else, over top of the screen.