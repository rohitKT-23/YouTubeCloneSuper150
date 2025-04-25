# YouTubeCloneSuper150
 Here is a video demonstrating the functionality of my project:
![Video](https://github.com/rohitKT-23/YouTubeCloneSuper150/blob/main/YTClone.mkv)
# YouTube Clone (MERN Stack)

A full-stack YouTube clone built with MongoDB, Express, React, and Node.js (MERN stack) with Tailwind CSS for styling.

## Features

- Responsive home page with video grid, header, and toggleable sidebar
- Complete user authentication system with JWT (registration, login, profile)
- Functional video player page with title, description, likes, and comments
- Search functionality and category-based filtering
- Comment system allowing users to add, edit, and delete comments

## Tech Stack

### Frontend
- React
- React Router
- Tailwind CSS
- Axios for API requests
- Lucide React for icons

### Backend
- Node.js
- Express.js
- MongoDB & Mongoose
- JWT for authentication

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas URI)

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd client
cd server
```

2. Install dependencies
```bash
npm install
```

3. Setup environment variables
```bash
# Copy the example env file in the server directory
touch server/.env
# PORT=5000
# MONGODB_URI=mongodb://localhost:27017/youtube-clone
# JWT_SECRET=f7a1af306ebe5ee8746c4fa6718b1dc77ec0a50d940bad2c7fa9274697b775dec19a07bdf57e66b210ecc2d9a9fade41f2433997ab3bc001d3e573fcc329c8a9
# CLIENT_URL=http://localhost:5173
# NODE_ENV=development
# SEED_DB=true
# Edit the .env file with your MongoDB URI and JWT secret
```

4. Seed the database (optional)
```bash
# Make sure SEED_DB=true in your server/.env file
```

5. Run the development server
```bash
# Run both frontend and backend
npm run dev

# Run only frontend
npm run dev -> client

# Run only backend
npm run dev -> server
```

## Project Structure

```
youtube-clone/
📦client
 ┣ 📂public
 ┃ ┗ 📜youtube-icon.png
 ┣ 📂src
 ┃ ┣ 📂components
 ┃ ┃ ┣ 📜CategoryFilter.jsx
 ┃ ┃ ┣ 📜Comment.jsx
 ┃ ┃ ┣ 📜CommentForm.jsx
 ┃ ┃ ┣ 📜CommentList.jsx
 ┃ ┃ ┣ 📜Header.jsx
 ┃ ┃ ┣ 📜Logo.jsx
 ┃ ┃ ┣ 📜ProtectedRoute.jsx
 ┃ ┃ ┣ 📜Sidebar.jsx
 ┃ ┃ ┣ 📜VideoCard.jsx
 ┃ ┃ ┣ 📜VideoGrid.jsx
 ┃ ┃ ┗ 📜VideoPlayer.jsx
 ┃ ┣ 📂context
 ┃ ┃ ┗ 📜AuthContext.jsx
 ┃ ┣ 📂pages
 ┃ ┃ ┣ 📜Auth.jsx
 ┃ ┃ ┣ 📜Home.jsx
 ┃ ┃ ┣ 📜NotFound.jsx
 ┃ ┃ ┣ 📜SearchResults.jsx
 ┃ ┃ ┗ 📜VideoPage.jsx
 ┃ ┣ 📂services
 ┃ ┃ ┣ 📜authService.js
 ┃ ┃ ┣ 📜commentService.js
 ┃ ┃ ┗ 📜videoService.js
 ┃ ┣ 📂utils
 ┃ ┃ ┣ 📜constants.js
 ┃ ┃ ┣ 📜dateUtils.js
 ┃ ┃ ┗ 📜formatUtils.js
 ┃ ┣ 📜App.jsx
 ┃ ┣ 📜index.css
 ┃ ┗ 📜main.jsx
 ┣ 📜.env
 ┣ 📜.gitignore
 ┣ 📜eslint.config.js
 ┣ 📜index.html
 ┣ 📜package-lock.json
 ┣ 📜package.json
 ┣ 📜postcss.config.js
 ┣ 📜tailwind.config.js
 ┗ 📜vite.config.ts
📦server
 ┣ 📂src
 ┃ ┣ 📂middleware
 ┃ ┃ ┗ 📜auth.js
 ┃ ┣ 📂models
 ┃ ┃ ┣ 📜Comment.js
 ┃ ┃ ┣ 📜User.js
 ┃ ┃ ┗ 📜Video.js
 ┃ ┣ 📂routes
 ┃ ┃ ┣ 📜auth.js
 ┃ ┃ ┣ 📜comments.js
 ┃ ┃ ┗ 📜videos.js
 ┃ ┣ 📂utils
 ┃ ┃ ┗ 📜seedDatabase.js
 ┃ ┗ 📜index.js
 ┣ 📜.env
 ┣ 📜.gitignore
 ┣ 📜package-lock.json
 ┗ 📜package.json
```

## API Endpoints

### Auth
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login a user
- `GET /api/auth/me` - Get current user
- `POST /api/auth/logout` - Logout user

### Videos
- `GET /api/videos` - Get all videos
- `GET /api/videos/:id` - Get a specific video
- `GET /api/videos/search` - Search videos
- `POST /api/videos/:id/like` - Like a video
- `POST /api/videos/:id/dislike` - Dislike a video

### Comments
- `GET /api/comments/:videoId` - Get comments for a video
- `POST /api/comments/:videoId` - Add a comment
- `PUT /api/comments/:videoId/:commentId` - Update a comment
- `DELETE /api/comments/:videoId/:commentId` - Delete a comment

## License

This project is for educational purposes.
