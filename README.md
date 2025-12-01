# SRM Unigram — Backend

This is the backend repository for **SRM Unigram**, a full-stack social media platform built exclusively for SRM students & faculty, 
where students & faculty can share photos, professional posts, events, certifications, and news — all in one place.

The backend handles:
- Authentication
- Post management
- Secure student verification
- All server-side logic

---

## Core Responsibilities
- Strict SRM email–based authentication (signup, login)
- OTP verification system (Mailjet)
- JWT-based session handling
- Secure password hashing with **bcrypt**
- Handling three categories of posts:
  - Photo posts (Instagram-style)
  - Professional posts (LinkedIn-style)
  - Text/news posts (Twitter-style)
- Feed system combining all SRM students (no department-wise feeds)
- Protected routes with auth middleware
- MySQL database integration

---

## API Endpoints

### Auth
- `POST /api/auth/signup` → Register new SRM student  
- `POST /api/auth/login` → Login and receive JWT  
- `POST /api/auth/verify-otp` → Verify SRM email OTP  
- `POST /api/auth/resend-otp` → Resend OTP  

### Users
- `GET /api/user/profile` → Get user data  
- `PUT /api/user/update` → Update profile details  

> All user routes require `Authorization: Bearer <token>`

### Posts
- `POST /api/posts/create` → Create a new post  
- `GET /api/posts/feed` → Fetch global SRM feed  
- `GET /api/posts/:id` → Fetch single post details  

### Interaction
- `POST /api/posts/like/:id` → Like/Unlike a post  
- `POST /api/posts/comment/:id` → Comment on a post  
- `GET /api/posts/comments/:id` → Fetch comments  

---

## Technologies Used
- Node.js + Express.js  
- MySQL (**mysql2**)  
- JWT for authentication  
- Bcrypt for password hashing  
- Mailjet for OTP-delivered email verification  
- Multer / Cloud Storage for images (if used)  
- Render for backend deployment  

---

## Security & Verification
- Only SRM university email IDs can create accounts  
- Passwords are hashed before storing  
- OTP verification ensures no outsider can access the platform  
- JWT-protected private routes  
- Clean database structure with traceable student IDs  

---

## Deployment
- Backend is deployed on **Render**  
- Push changes → manually trigger a deployment from the Render dashboard  

---

## 👨‍💻 Developer
**Kevin Antony** — Full-stack Developer & Creator of SRM Unigram  

---

## 📜 License
Backend code © 2025 **Kevin Antony**  
All rights reserved. Redistribution or replication is not permitted without written consent.  

The SRM logo is the property of **SRM Institute of Science and Technology** and is used under permission for official purposes only.
