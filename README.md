# FaithConnect - Community Event Platform

A React web application that connects people of all faiths through events and community support.

## Live Demo

[View Live Demo](https://faithconnect-snowy.vercel.app/)

## Features

- **Home Page**: Welcome message and introduction to FaithConnect
- **Events Page**: Browse, filter, and add community events
- **About Page**: Learn about our mission and values
- **Responsive Design**: Works seamlessly on both desktop and mobile devices
- **Animated UI**: Smooth transitions and interactive elements

## Pages

### Home Page
- Welcoming hero section with "Connecting People Across Faiths & Interests"
- Brief description about the platform's purpose
- Call-to-action buttons to explore events
- Featured upcoming events section
- Community testimonials
- Footer with quick links

### Events Page
- Comprehensive event listing with details (title, date, location, description)
- Filter events by category (Religious, Social, Charity, Educational, Cultural, Community)
- Filter by date range (Today, This Week, This Month)
- Search functionality
- Add new events via an intuitive form
- Toggle between grid and list view

### About Page
- Our mission and values
- What we do
- Core values
- Contact information

## Technologies Used

- **React.js**: Frontend library
- **Firebase**: Authentication and Firestore database
- **React Router**: Navigation and routing
- **Tailwind CSS**: Styling and responsive design
- **Vercel**: Deployment platform

## Installation and Setup

1. Clone the repository:
   ```
   git clone https://github.com/SachinBorse-2003/faithconnect
   cd faith-connect
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file in the root directory with your Firebase configuration:
   ```
   REACT_APP_FIREBASE_API_KEY=your_api_key
   REACT_APP_FIREBASE_AUTH_DOMAIN=your_auth_domain
   REACT_APP_FIREBASE_PROJECT_ID=your_project_id
   REACT_APP_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
   REACT_APP_FIREBASE_APP_ID=your_app_id
   REACT_APP_FIREBASE_MEASUREMENT_ID=your_measurement_id
   ```

4. Start the development server:
   ```
   npm start
   ```

## Deployment

This project is deployed on Vercel. To deploy your own version:

1. Push your code to GitHub
2. Connect your GitHub repository to Vercel
3. Configure the build settings (Build command: `npm run build`, Output directory: `build`)
4. Add environment variables in the Vercel dashboard
5. Deploy


## Submission Details

This project was created as part of the CommunionHub React Developer Assignment with the following objectives:
- Build a simple two-page React web app (Home and Events pages)
- Create a responsive UI that works on both desktop and mobile
- Implement animated UI with smooth transitions
- Use proper React.js practices

## License

This project is licensed under the MIT License.
