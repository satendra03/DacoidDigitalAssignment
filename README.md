# Dynamic Event Calendar Application

This is a **Dynamic Event Calendar** built with React.js. It allows users to manage and track events in a calendar view, featuring the ability to add, edit, delete, and list events. This project demonstrates advanced React.js logic, UI design, and data persistence capabilities.

---

## **Table of Contents**

1. [Project Overview](#project-overview)
2. [Features](#features)
3. [UI Design](#ui-design)
4. [Technologies Used](#technologies-used)
6. [Usage](#usage)
7. [Bonus Features](#bonus-features)
8. [Deployment](#deployment)
10. [License](#license)

---

## **Project Overview**

The Dynamic Event Calendar allows users to manage their events with a calendar interface. Users can add events to specific dates, edit event details, and delete them. The calendar will highlight the current day, and users can navigate between months. Event data is persisted using **localStorage**.

---

## **Features**

1. **Calendar View**:
   - Displays a grid for the current month with proper day alignment.
   - Allows users to navigate between months using "Previous" and "Next" buttons.

2. **Event Management**:
   - Users can add, edit, and delete events by clicking on a specific day.
   - Each event has:
     - Event name
     - Start time and end time
     - Optional event description

3. **Event List**:
   - Displays a list of all events for a selected day in a table.

4. **Data Persistence**:
   - Events are saved to **localStorage** to persist data across page refreshes.

5. **Complex Logic**:
   - Prevents overlapping events.
   - Allows users to filter events by keyword.

---

## **UI Design**

- The UI is clean and modern, built using **Shadcn** components.
- Days are displayed in a grid with clear separation for weekends and weekdays.
- The current day and selected day are visually highlighted.

---

## **Technologies Used**

-  <img src="https://img.shields.io/badge/Vite-646CFF.svg?style=for-the-badge&logo=Vite&logoColor=white" alt="vite-icon" />
-  <img src="https://img.shields.io/badge/React-61DAFB.svg?style=for-the-badge&logo=React&logoColor=black" alt="react-icon" />
-  <img src="https://img.shields.io/badge/Tailwind%20CSS-06B6D4.svg?style=for-the-badge&logo=Tailwind-CSS&logoColor=white" alt="tailwind-icon" />
-  <img src="https://img.shields.io/badge/shadcn/ui-000000.svg?style=for-the-badge&logo=shadcn/ui&logoColor=white" alt="shadcn-icon" />

---

## **Usage**

### On the main calendar view, users can:
- Click on any day to add an event.
- View a list of events for the selected day in a modal or side panel.
- Edit or delete existing events.

### Event details:
When adding or editing an event, users can provide:
- Event name
- Start time and end time
- Event description (optional)

### Event filtering:
- Use the search bar to filter events by name.

---

## **Bonus Features**

### Color Coding for Events:
- Events are color-coded based on categories like "Work", "Personal", and "Social".

### Exporting Events:
- Users can export the event list for a specific month as a **JSON** file.

---

## **Deployment**

- The project is deployed on Vercel
- You can view the live application here: [Live](https://event-manager-by-satendra.vercel.app/).

---

## **License**

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
