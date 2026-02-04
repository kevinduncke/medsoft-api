# **Medsoft API**
Backend service for the Medsoft platform - A modular medical management system designed for clinics and small healthcare teams.

Medsoft API provides secure authentication, patient records, appointment scheduling, consultation workflows, billing, and administrative tools.
The service is built with **Node.js**, **Express.js**, **TypeScript**, **Prisma ORM**, using **PostgreSQL** as the primary database.

---

## **Features**

- Authentication & Authorization
  - JWT-Based Login.
  - Role-Based Access Control (Admin, Doctor, Receptionist).
- Patient Management
  - CRUD Operations.
  - Demographics, Contact Info, Medical History.
- Appointments
  - Scheduling, Rescheduling, Cancellation.
  - Conflict Detection for Doctors.
- Consultations
  - Notes, Diagnoses, Prescriptions.
- Billing
  - Invoice Generation.
  - Payment Tracking.
- Administrative Panel
  - User Management.
  - Clinic Settings.
 
---

## **Tech Stack**
- Node.js + Express.js.
- TypeScript.
- Prisma ORM.
- PostgreSQL.
- JWT Authentication.
- Zod for Validation.

---

## **Project Structure**
src/
  config/
  controllers/
  middleware/
  models/
  routes/
  services/
  app.ts
  server.ts

---
