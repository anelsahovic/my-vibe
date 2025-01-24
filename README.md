<h1 align="center"> My Vibe - Social App </h1>

![Demo App](/public/screenshot-for-readme.png)

# My Vibe

My Vibe is a modern social media app designed to help you connect with friends, discover events, and share your vibe with the world. Built with the latest web technologies, My Vibe focuses on user experience, performance, and scalability.

🌐 **Live Demo**: [My Vibe on Vercel](https://anelsahovic-geo-world.vercel.app/)

---

## ✨ Features

### Core Features

- **User Authentication**: Powered by [Kinde](https://kinde.com) for secure and scalable auth.
- **Dynamic User Profiles**: Edit profiles, manage followers, and view user-specific content.
- **Social Interactions**:
  - Follow/unfollow users.
  - Like, comment, and delete posts.
  - Notifications for post interactions, events, and more.
- **Event Management**:
  - Create, edit, and delete events.
  - Track user attendance and send notifications.
- **Image Uploads**: Upload and manage images in posts.

### Enhanced UX

- **Search Functionality**: Search for posts, events, and users.
- **Notifications**: Stay updated with customizable notifications.
- **Responsive Design**: Fully optimized for mobile and desktop using Tailwind CSS.

---

## 🔧 Tech Stack

### Frontend

- **Framework**: [Next.js 15](https://nextjs.org/) (with TypeScript)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)

### Backend

- **Database**: [Neon Database](https://neon.tech/) (PostgreSQL) with [Prisma ORM](https://www.prisma.io/)

### Authentication

- **Auth Provider**: [Kinde](https://kinde.com)

### Deployment

- **Platform**: [Vercel](https://vercel.com/)

---

## 📦 Dependencies

### Key Dependencies

- **Prisma**: Database management and ORM.
- **Kinde Auth**: User authentication and session handling.
- **UploadThing**: Image upload and management.
- **Radix UI**: Accessible and customizable UI components.
- **React Hot Toast**: Notifications.
- **Date-fns**: Date manipulation and formatting.

### Dev Dependencies

- **TypeScript**: Type safety and developer experience.
- **Tailwind CSS**: Modern utility-first CSS framework.
- **Eslint**: Code quality and linting.

---

## ⚙️ Setup Instructions

### Prerequisites

- **Node.js** >= 18
- **pnpm** (Preferred package manager)

### Installation

1. Clone the repository

   ```bash
   git clone https://github.com/anelsahovic/my-vibe.git
   cd my-vibe
   ```

2. Install dependencies

   ```bash
   pnpm install
   ```

3. Set up environment variables
   ```bash
   KINDE_CLIENT_ID=<your_kinde_client_id>
   KINDE_CLIENT_SECRET=<your_kinde_client_secret>
   KINDE_ISSUER_URL=<your_kinde_issuer_url>
   KINDE_SITE_URL=<your_kinde_site_url>
   KINDE_POST_LOGOUT_REDIRECT_URL=<your_kinde_logout_redirect_url>
   KINDE_POST_LOGIN_REDIRECT_URL=<your_kinde_login_redirect_url>
   DATABASE_URL=<your_database_url>
   UPLOADTHING_TOKEN=<your_uploadthing_token>
   ```
4. Set up the database
   ```bash
   pnpm prisma db push
   ```

## Author

Developed by [Anel Sahovic](https://github.com/anelsahovic)
