# Donor Bridge (Organ Donor Portal)

Donor Bridge is a centralized platform connecting organ donors with recipients in need. It streamlines the transplantation process, ensures transparency, and helps save lives by integrating donors, recipients, and administrators in a single unified system.

## 🚀 Key Features

- **Role-Based Dashboards**: Dedicated interfaces for Donors, Recipients, and System Administrators.
- **Unified Authentication**: Secure Google Sign-In with an intuitive post-login role selection onboarding flow.
- **Real-Time Data**: Built on Firebase Firestore for instant updates on statuses, matches, and notifications.
- **Direct Messaging System**: Integrated chat allowing verified Donors and Recipients to communicate securely.
- **AI Support Chatbot**: Integrated AI assistant to help users navigate the platform and answer common questions.
- **Notification Alerts**: In-app notifications to keep users updated on verification statuses and important alerts.
- **Admin Verification Workflow**: Secure admin portal to review user details, approve/reject verifications, and monitor system statistics.

## 🛠️ Technology Stack

- **Frontend Framework**: React 19 + Vite
- **Routing**: React Router DOM (v7)
- **Styling**: Tailwind CSS (v4)
- **Icons**: Lucide React
- **Backend & Database**: Firebase (Auth & Firestore)
- **Language**: JavaScript (ES6+)

## 📦 Getting Started

### Prerequisites

Ensure you have the following installed on your local machine:

- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- npm or yarn

### Installation

1.  **Clone the repository/Navigate to directory:**

    ```bash
    cd organ-donor-portal
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

3.  **Firebase Configuration:**
    Ensure your `src/lib/firebase.js` file is correctly configured with your Firebase project credentials. You need Authentication (Google Provider) and Firestore enabled in your Firebase Console.

4.  **Start the Development Server:**

    ```bash
    npm run dev
    ```

5.  Open your browser and navigate to `http://localhost:5173`.

## 🔒 Roles and Access

- **Donor**: Can create a medical profile, list their organ availability, and browse verified recipients. Must be verified by an admin to communicate with recipients.
- **Recipient**: Can submit organ requests, update medical details, and browse verified donors. Must be verified by an admin to communicate with donors.
- **Admin**: System administrators who verify user accounts and manage the platform.
  - _Note: Admin access must be securely assigned manually in the Firestore database by changing the user's `role` field to `admin`._

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## 📄 License

This project is licensed under the MIT License.
