# BookingHub - Modern Space Booking Platform

![BookingHub](https://images.pexels.com/photos/7688460/pexels-photo-7688460.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)

BookingHub is a modern, full-featured space booking platform built with React and TypeScript. It provides an intuitive interface for users to browse and book various spaces like meeting rooms, conference halls, and workspaces.

## Features

- 🎨 Modern, dark-themed UI with dynamic spotlight effects
- 🔍 Real-time search and filtering
- 📅 Interactive calendar booking system
- 👤 User authentication and authorization
- 📊 User dashboard for managing bookings
- ⚡ Admin panel for space and availability management
- 📱 Fully responsive design

## Tech Stack

- React 18
- TypeScript
- Tailwind CSS
- React Router v6
- Lucide React Icons
- Vite

## Getting Started

### Prerequisites

- Node.js 16.x or later
- npm 7.x or later

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/bookinghub.git
cd bookinghub
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## Project Structure

```
bookinghub/
├── src/
│   ├── components/        # Reusable UI components
│   │   ├── BookingCalendar.tsx
│   │   ├── BookingCard.tsx
│   │   ├── BookingList.tsx
│   │   ├── Footer.tsx
│   │   ├── Header.tsx
│   │   ├── Layout.tsx
│   │   └── ServiceFilter.tsx
│   ├── context/          # React Context providers
│   │   ├── AuthContext.tsx
│   │   └── BookingContext.tsx
│   ├── pages/            # Page components
│   │   ├── AdminDashboard.tsx
│   │   ├── BookingForm.tsx
│   │   ├── Dashboard.tsx
│   │   ├── Home.tsx
│   │   ├── Login.tsx
│   │   ├── NotFound.tsx
│   │   └── Register.tsx
│   ├── routes/           # Route components
│   │   ├── AdminRoute.tsx
│   │   └── PrivateRoute.tsx
│   ├── App.tsx          # Main application component
│   └── main.tsx         # Application entry point
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Demo Accounts

For testing purposes, you can use these demo accounts:

- Admin User:
  - Email: admin@example.com
  - Password: password

- Regular User:
  - Email: user@example.com
  - Password: password

## Features in Detail

### User Features

- Browse available spaces with real-time search and category filtering
- Interactive calendar for selecting booking dates and times
- View and manage personal bookings
- Cancel upcoming bookings
- View booking history

### Admin Features

- Comprehensive admin dashboard
- Manage spaces and services
- View all bookings across the platform
- Add and manage time slots
- Monitor booking statistics

## UI Components

### Spotlight Effect

The application features a unique spotlight effect that follows the user's cursor, creating an engaging and modern user experience. This is implemented using CSS gradients and custom mouse tracking.

### Dark Theme

BookingHub uses a carefully crafted dark theme with:
- Rich blacks and dark grays for backgrounds
- Accent colors for interactive elements
- Proper contrast ratios for accessibility
- Subtle gradients and transitions

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Lucide Icons](https://lucide.dev/) for the beautiful icon set
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [Pexels](https://www.pexels.com/) for the stock images