# TODO stack

increase productivity by prioritising tasks in a visual way

## About

This project is a high-performance, offline-first task management application built with React and TypeScript. It focuses on delivering a seamless, native-feeling user experience with a custom-built drag-and-drop interface, smooth CSS animations, and responsive design. All data is persisted locally in the browser using IndexedDB, ensuring tasks are saved instantly and remain available without a network connection.

## Functionality

- **Custom Drag and Drop Reordering:** Smoothly rearrange tasks using a tailored HTML5 drag-and-drop implementation that mathematically calculates index shifts to prevent data overwriting.
- **Contextual Task Insertion:** Hover between any two existing tasks to reveal hidden insertion points, allowing new items to be added exactly where they belong in the list.
- **Full CRUD Capabilities:** Create, read, update, and delete tasks and detailed descriptions instantly via a modal interface.
- **Offline Persistence:** Powered by IndexedDB to safely store tasks, unique UUIDs, and custom sorting orders locally on the user's device.
- **Touch-Screen Optimization:** Includes a toggleable UI state that permanently reveals hidden insertion buttons for users navigating with coarse touch pointers on mobile devices.
- **Type-Safe Architecture:** Built strictly with TypeScript interfaces to eliminate runtime errors and ensure highly predictable data flow across the application.

## How to use?

1. Navigate to the src directory:

```bash
cd src
```

2. Start the React application:

```bash
npm run dev
```

## 💻 Technologies

- ⚛️ **React.js**
- 🗄️ **IndexedDB**

## ⚖️ License

This project is open-source and available under the [MIT License](LICENCE).

## 📫 Contact

Created by **[Vilém Učík / wiliams12]** - feel free to contact me or contribute to this repository!
