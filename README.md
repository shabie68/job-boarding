# 🚀 Job Board & Recruitment Platform

A full-stack job board application built with Laravel and React, featuring role-based access, real-time communication, and an admin dashboard.

---

## 📌 Features

### 👤 Authentication & Authorization
- Token-based authentication using Laravel Sanctum  
- Role-based access control (Recruiter & Candidate)  
- Authorization handled via Gates & Policies  

### 💼 Recruiter Features
- Create and manage job postings  
- Manage company profiles  
- Accept or reject candidates  
- Real-time notifications on candidate actions  

### 🧑‍💻 Candidate Features
- Search and apply for jobs  
- Provide feedback/reviews for companies  
- Receive real-time updates on application status  
- Chat with recruiters  

### ⚡ Real-Time Functionality
- Instant messaging between recruiters and candidates  
- Live notifications for job application updates (accept/reject)  
- Powered by Pusher  

### 📊 Admin Dashboard
- Manage users, jobs, and applications  
- Monitor platform activity  
- Role-based access for secure operations  

---

## 🛠️ Tech Stack

**Backend:**
- PHP (Laravel 8)
- Laravel Sanctum (Authentication)
- RESTful APIs  

**Frontend:**
- React 18  
- React Router  
- Formik  
- Bootstrap 5  

**Real-Time:**
- Pusher  
- Laravel Echo  

**Other Tools:**
- MySQL  
- Redis (via Predis)  
- Axios  

---

## ⚙️ Installation

```bash
git clone https://github.com/shabie68/job-boarding.git
cd your-repo

# Install backend dependencies
composer install

# Setup environment
cp .env.example .env
php artisan key:generate

# Configure your database in .env

# Run migrations
php artisan migrate

# Install frontend dependencies
npm install

# Run development server
npm run dev

# Start Laravel server
php artisan serve
