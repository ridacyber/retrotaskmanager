# RetroTask — Vintage Task Management App

A full-stack task management web application with a retro/vintage aesthetic. Users can create accounts, log in, and manage their personal tasks with a nostalgic 1980s computer interface.

## 🎨 Features

- **User Authentication**: Secure signup/login with JWT and bcrypt password hashing
- **Task Management**: Full CRUD operations (Create, Read, Update, Delete)
- **Retro Design**: Vintage terminal aesthetic with pixelated borders and retro colors
- **Email Notifications**: Welcome emails sent via Nodemailer
- **Responsive Design**: Works on desktop and mobile devices
- **Protected Routes**: Dashboard and task pages require authentication

## 🛠 Tech Stack

### Frontend
- **React** — Component-based UI
- **Tailwind CSS** — Styling with retro customization
- **React Router** — Page navigation
- **Axios** — API calls to backend

### Backend
- **Node.js** — Runtime environment
- **Express.js** — Server and routing
- **JWT** — Authentication tokens
- **bcrypt** — Password hashing
- **Nodemailer** — Email notifications

### Database
- **PostgreSQL** — Relational database
- **Supabase** — Recommended for hosting (free tier available)

## 📁 Project Structure

```
retrotask/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── pages/         # Page components
│   │   │   ├── Landing.tsx
│   │   │   ├── Signup.tsx
│   │   │   ├── Login.tsx
│   │   │   ├── Dashboard.tsx
│   │   │   └── TaskDetail.tsx
│   │   ├── context/       # React context
│   │   │   └── AuthContext.tsx
│   │   ├── App.tsx        # Main app component
│   │   └── index.css      # Tailwind CSS + custom styles
│   ├── package.json
│   └── tailwind.config.js
├── server/                # Node.js backend
│   ├── routes/           # API routes
│   │   ├── auth.js       # Authentication routes
│   │   └── tasks.js      # Task CRUD routes
│   ├── middleware/       # Express middleware
│   │   └── auth.js       # JWT authentication
│   ├── services/         # Business logic
│   │   └── emailService.js
│   ├── config/           # Configuration
│   │   └── db.js         # Database connection
│   ├── index.js          # Main server file
│   ├── schema.sql        # Database schema
│   └── package.json
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- PostgreSQL database
- Gmail account (for email notifications)

### 1. Clone and Setup

```bash
git clone <repository-url>
cd retrotaskmanager
```

### 2. Database Setup

Create a PostgreSQL database named `retrotask` and run the schema:

```bash
# Create database
createdb retrotask

# Run schema (from server directory)
cd server
psql -d retrotask -f schema.sql
```

### 3. Backend Setup

```bash
cd server

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Edit .env with your configuration:
# - Database credentials
# - JWT secret
# - Gmail app password for email
```

### 4. Frontend Setup

```bash
cd ../client

# Install dependencies
npm install

# Create environment file
echo "REACT_APP_API_URL=http://localhost:5000/api" > .env
```

### 5. Run the Application

Start both servers:

```bash
# Terminal 1 - Backend
cd server
npm run dev

# Terminal 2 - Frontend
cd client
npm start
```

The app will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

## 🔧 Environment Variables

### Backend (.env)
```env
# Database
DB_HOST=localhost
DB_PORT=5432
DB_NAME=retrotask
DB_USER=postgres
DB_PASSWORD=your_password

# JWT
JWT_SECRET=your_jwt_secret_here

# Email (Gmail)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_gmail_app_password

# Server
PORT=5000
NODE_ENV=development
```

### Frontend (.env)
```env
REACT_APP_API_URL=http://localhost:5000/api
```

## 📧 Email Setup

1. Enable 2-factor authentication on your Gmail account
2. Generate an App Password:
   - Go to Google Account settings
   - Security → 2-Step Verification → App passwords
   - Generate a new app password for "Mail"
3. Use this app password in your `.env` file

## 🎨 Retro Design Features

- **Color Palette**: Muted greens, creams, browns with terminal green accents
- **Typography**: Monospace fonts (Courier New) for retro terminal feel
- **UI Elements**: Pixelated borders, retro button styles, vintage card designs
- **Interactive Effects**: Shadow effects that disappear on hover for that retro button press feel

## 📱 Pages

1. **Landing Page**: Retro hero section with app overview and CTAs
2. **Sign Up Page**: User registration with welcome email
3. **Login Page**: Secure user authentication
4. **Dashboard**: Task management with status columns (To Do, In Progress, Done)
5. **Task Detail Page**: Full task view with edit/delete functionality

## 🔐 Security Features

- Password hashing with bcrypt
- JWT token authentication
- Protected API routes
- Input validation and sanitization
- CORS configuration

## 🚀 Deployment

### Frontend (Vercel)
```bash
cd client
npm run build
# Deploy build folder to Vercel
```

### Backend (Render/Heroku)
```bash
cd server
# Set environment variables in hosting platform
# Deploy to Render or similar platform
```

### Database (Supabase)
1. Create a new Supabase project
2. Run the schema.sql in the Supabase SQL editor
3. Update environment variables with Supabase credentials

## ⚠️ Demo Notice

This is a demonstration application. Please do not enter real personal information or sensitive data. All data is for testing purposes only.

## 🛠 Development Scripts

### Backend
```bash
npm start      # Production server
npm run dev    # Development with nodemon
```

### Frontend
```bash
npm start      # Development server
npm run build  # Production build
npm test       # Run tests
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is for educational purposes. Feel free to use and modify for learning.

## 🐛 Troubleshooting

### Common Issues

1. **Database Connection Error**
   - Check PostgreSQL is running
   - Verify database credentials in .env
   - Ensure database exists

2. **Email Not Sending**
   - Verify Gmail app password is correct
   - Check 2-factor authentication is enabled
   - Ensure less secure apps are allowed if needed

3. **CORS Issues**
   - Ensure frontend URL is whitelisted
   - Check API URL in frontend .env

4. **JWT Token Issues**
   - Verify JWT_SECRET is set in backend .env
   - Check token expiration (24 hours)

## 📞 Support

For issues or questions, please create an issue in the repository or contact the development team.

---

**RetroTask** © 2024 | Built with React, Node.js, and Retro Style
