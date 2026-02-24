# Mental Health Support Platform

> A full-stack web application providing structured mental health support for students through curated resources, therapist appointments, and role-based access control.

[![Frontend](https://img.shields.io/badge/Frontend-Vercel-black?logo=vercel)](https://mental-support-two.vercel.app)
[![Backend](https://img.shields.io/badge/Backend-Render-46E3B7?logo=render)](https://mentalsupport.onrender.com)
[![Database](https://img.shields.io/badge/Database-MongoDB%20Atlas-47A248?logo=mongodb)](https://www.mongodb.com/atlas)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](#)

---

## Table of Contents

- [Overview](#overview)
- [Live Deployment](#live-deployment)
- [System Architecture](#system-architecture)
- [Features](#features)
- [Project Structure](#project-structure)
- [Environment Variables](#environment-variables)
- [Getting Started](#getting-started)
- [Deployment](#deployment)
- [Security](#security)
- [Technical Highlights](#technical-highlights)
- [Future Enhancements](#future-enhancements)
- [Author](#author)

---

## Overview

The **Mental Health Support Platform** is a cloud-deployed, full-stack application built to connect students with mental health resources and licensed therapists. The system enforces strict role-based access control across two primary user roles:

| Role | Capabilities |
|---|---|
| **Student** | Browse resources, view therapist profiles, book and manage therapy appointments |
| **Admin** | Manage resources and therapist profiles, oversee and update all appointments |

---

## Live Deployment

| Service | URL |
|---|---|
| Frontend (Vercel) | [https://mental-support-two.vercel.app](https://mental-support-two.vercel.app) |
| Backend (Render) | [https://mentalsupport.onrender.com](https://mentalsupport.onrender.com) |
| Database | MongoDB Atlas (Cloud-hosted) |

---

## System Architecture

### Frontend

- **React** (Vite) — Component-based UI framework
- **React Router** — Client-side navigation and route protection
- **Axios** — HTTP client for API communication
- **Context API** — Global authentication state management
- Role-based protected routing for admin and student views

### Backend

- **Node.js** + **Express.js** — RESTful API server
- **MongoDB** + **Mongoose** — ODM-based data modelling
- **JWT Authentication** — Stateless, token-based session management
- **Role-based authorization middleware** — Route-level access enforcement
- **Slot-based appointment logic** — Server-validated booking with race condition prevention

### Database

MongoDB Atlas with the following collections and relational references:

```
User → Appointment → Therapist → Resource
```

---

## Features

### Authentication & Authorization

- JWT-based login with role-encoded tokens
- Role-based access control (Admin / Student)
- Protected API routes with middleware validation
- Environment-based secret management

### Resource Management

**Admin:**
- Create, update, and delete mental health resources

**Student:**
- Browse and view all available resources

### Therapist Management

**Admin:**
- Create and manage therapist profiles
- Define available dates and bookable time slots

**Student:**
- View therapist profiles and available slots

### Appointment System

- Slot-based booking with real-time availability
- Double-booking prevention enforced server-side
- Automatic slot removal upon confirmation
- Appointment status tracking: `pending` → `confirmed` / `cancelled`
- Students can view and manage their own appointments
- Admins can view and update all appointments across the system

---

## Project Structure

### Backend

```
backend/
├── config/             # Database connection and environment configuration
├── controllers/        # Route handler logic
├── middleware/         # JWT verification and role-based authorization
├── models/             # Mongoose schemas (User, Resource, Therapist, Appointment)
├── routes/             # Express route definitions
├── server.js           # Application entry point
└── .env                # Environment variables (not committed)
```

### Frontend

```
src/
├── components/         # Reusable UI components
├── context/            # Authentication context and state management
├── pages/
│   ├── admin/          # Admin-facing views
│   ├── student/        # Student-facing views
│   └── auth/           # Login and registration pages
├── routes/             # Protected and role-based route configuration
├── services/           # Axios API service functions
└── App.jsx             # Root application component
```

---

## Environment Variables

### Backend — `.env` (Render)

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secure_secret
CLIENT_URL=https://mental-support-two.vercel.app
```

### Frontend — Vercel Environment Variables

```env
VITE_API_URL=https://mentalsupport.onrender.com/api
```

> **Note:** Never commit `.env` files to version control. Use platform-level environment variable configuration for all deployments.

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- MongoDB Atlas account (or local MongoDB instance)

### Backend

```bash
cd backend
npm install
npm run dev
```

### Frontend

```bash
npm install
npm run dev
```

For local development, ensure the frontend `.env` is configured as:

```env
VITE_API_URL=http://localhost:5000/api
```

---

## Deployment

| Step | Service | Details |
|---|---|---|
| 1 | **Render** | Backend deployed as a web service |
| 2 | **MongoDB Atlas** | Cloud-hosted database with connection via `MONGO_URI` |
| 3 | **Vercel** | Frontend deployed with automatic Git integration |
| 4 | **CORS** | Restricted to frontend origin via `CLIENT_URL` environment variable |
| 5 | **API URL** | Production URL injected at build time via Vercel environment settings |

---

## Security

- JWT tokens signed with a secret stored exclusively in environment variables
- CORS restricted to the configured frontend origin
- Role-based middleware prevents unauthorized access to admin routes
- Slot availability validated server-side to prevent race conditions and double-booking
- All sensitive configuration excluded from version control

---

## Technical Highlights

- **Separation of concerns** enforced across Routes → Controllers → Models → Middleware
- **Environment-aware configuration** supporting seamless development and production switching
- **Double-booking protection** with server-side slot validation and transactional-like mutation
- **Cloud-native architecture** with independent, scalable service deployments
- **Clean deployment pipeline** with no manual build steps required after initial configuration

---

## Future Enhancements

- Email notifications for appointment confirmation and reminders
- Real-time slot updates using WebSockets
- Pagination and search/filter for resources and therapists
- Rate limiting and request throttling for API protection
- Admin analytics dashboard with appointment and usage metrics
- UI modernization with Tailwind CSS or a component library

---

## Author

**Nakul Ojha**
Full Stack Developer
Academic Project — FSAD Semester

---

*This platform was developed as part of an academic full-stack application development module. It is intended for educational and demonstration purposes.*