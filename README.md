# Plan-and-Do

This is a Task Manager app built with a modern tech stack to help users manage and organize their tasks effectively. The app allows users to create, update, and delete tasks, with each user having access to their own set of tasks, ensuring privacy, authentication and data security. It can be accessed live at [Task Manager](https://spin-request-nuxt.vercel.app).

## Features

- User Authentication: Secure user authentication with Firebase, ensuring each user’s data is isolated.
- Task Management: Create, update, and delete tasks. Tasks are categorized by status: Pending, In Progress, and Completed.
- Real-time Data: Firebase Firestore integration allows for real-time updates, ensuring that users always see the latest data.
- State Management: Pinia is used for state management, providing a seamless and reactive experience.
- Responsive Design: Built with Tailwind CSS and Vuetify, the app is fully responsive and mobile-friendly.

## Tech Stack

- Nuxt js: An open source framework that makes web development intuitive and powerful used for building the user interface.
- Pinia: A state management library that works seamlessly with Nuxt.
- Firebase: Used for backend services, including Firestore for database management and Firebase Authentication for user authentication.
- TypeScript: Ensures type safety and enhanced code quality throughout the project.
- Vuetify: A Material Design component framework used for building a clean and accessible UI.
- Tailwind CSS: A utility-first CSS framework used for responsive and customizable designs.

## Installation

To get started with the project, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/Casmir293/SpinRequest-Nuxt

   ```

2. Navigate to the project directory:

   ```bash
   cd SpinRequest-Nuxt

   ```

3. Install dependencies:

   ```bash
   npm install

   ```

4. Set up Firebase:

- Create a Firebase project and configure Firestore and Firebase Authentication.
- Add your Firebase configuration to your .env file.

5. Run the development server:

   ```bash
   npm run dev

   ```

## Contributing

Contributions are welcome! If you have any suggestions or improvements, feel free to create a pull request or open an issue.
