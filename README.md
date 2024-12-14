# Dynamic Event Calendar Application

This is a **Dynamic Event Calendar** built with React.js. It allows users to manage and track events in a calendar view, featuring the ability to add, edit, delete, and list events. This project demonstrates advanced React.js logic, UI design, and data persistence capabilities.

---

## **Live Link**

Here by clicking on this link, you can preview the project [Live](https://event-manager-by-satendra.vercel.app/).

---

## **Table of Contents**

1. [Project Overview](#project-overview)
2. [Features](#features)
3. [UI Design](#ui-design)
4. [Technologies Used](#technologies-used)
6. [Usage](#usage)
7. [Installation](#installation)
8. [Bonus Features](#bonus-features)
9. [Deployment](#deployment)
10. [License](#license)
11. [Contact](#contact)

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

## **Installation**
To run this project locally, follow these steps:

## Prerequisites

Ensure that you have Node.js and npm installed. You can check if they are installed by running the following commands:

```bash
node -v
npm -v
```
If they are not installed, download and install Node.js first.

## Steps to Run the App
1. **Clone the repository:**
   - Clone the repository to your local machine using the following command:
     
   ```bash
   git clone https://github.com/satendra03/DacoidDigitalAssignment.git
   ```
   
2. **Navigate to the project directory**
   - Go into the project directory:
     
   ```bash
   cd DacoidDigitalAssignment
   ```
   
3. **Install dependencies:**
   - Install the required dependencies using npm:
     
   ```bash
   npm install
   ```

4. **Start the development server**
   - Start the local development server using npm:
     
   ```bash
   npm run dev
   ```

   This will run the app on http://localhost:5173 by default. Open the URL in your browser to view the app.
     


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


## **Contact**:

1. **GitHub Issues**: You can open an issue directly on this repository for bugs, feature requests, or general inquiries.
   - [Open an Issue](https://github.com/satendra03/trip-planner-by-satendra/issues)

2. **Email**: Reach out to us via email at:
   - **satendrakumarparteti.work@gmail.com** 

3. **Social Media**:
   - **Instagram**: [@_satendra_03](https://www.instagram.com/_satendra_03/)
   - **LinkedIn**: [Satendra Kumar Parteti](https://www.linkedin.com/in/connect-satendra/)
4. **Buy Me A Coffee**:
   - **Small Contibution**:  <a href="https://buymeacoffee.com/satendra03" target="_blank"><img src="https://img.shields.io/badge/Buy%20Me%20A%20Coffee-FFDD00.svg?style=for-the-badge&logo=Buy-Me-A-Coffee&logoColor=black"></a>
---
