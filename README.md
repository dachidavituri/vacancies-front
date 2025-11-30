# Gstore Careers Platform

This project is a small career application system built with modern frontend architecture. It includes:

- Careers Page (Frontend)
- Application Form Modal (with validation and CV upload)
- Admin Panel for reviewing applications

---

## 📁 Project Structure

```
/src
  /api
  /data
  /lib
  /routes
  /schema
  /react-query
  /components
  /pages
    - about
    - admin
    - not-found
    - vacancies
  /data
    - index.ts
```

---

## 🚀 Features

### 1. Careers Page (`/vacancies`)

Displays all open Gstore vacancies.
Each vacancy card includes:

- Title
- Short description
- **Apply** button (opens Modal).

---

#### Validation Rules

- All fields are required
- Email must be valid
- Phone must be valid
- Only **PDF** file type allowed

#### Additional

- Shows success/error messages
- Modern, clean UI

---

### 3. Admin Panel (`/admin/applications`)

Displays candidate submissions in a table:

**Columns:**

- Name
- Email
- Vacancy
- Date
- Resume (Download PDF)

#### Admin Tools

- Filter by vacancy
- Filter by date
- Sorting (A→Z / Z→A / Date)
- Search (optional bonus)

---

## 🛠️ Tech Stack

- React + Vite
- TailwindCSS
- React Hook Form / Zod for Validation
- Database

---

## 📦 Installation

```
npm install
npm run dev
```

---

## 📝 Notes

- UI/UX should be clean and modern
- Make sure file upload strictly checks for PDF
- Include helpful feedback messages

---

## ✔️ Requirements Checklist

- [ ] Careers page with vacancy list
- [ ] Apply form with validation
- [ ] PDF-only upload
- [ ] Success/error notifications
- [ ] Admin panel with filtering & sorting
- [ ] Resume download links

---
