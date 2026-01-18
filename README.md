# Storm ⚡

Storm is a **prototype Next.js application** built with a modern full-stack setup.  
It is designed as a **reference project** that developers can quickly clone, copy, and adapt for real-world apps.

## Tech Stack

- **Next.js** (App Router)
- **PostgreSQL**
- **Axios** (API communication)
- **REST APIs**
- **Environment-based configuration**

## Purpose

- Serve as a **starter / boilerplate**
- Demonstrate **API-driven architecture**
- Easy to **copy–paste modules** (auth, API calls, DB logic)
- Not production-ready yet — focused on learning & prototyping

## Getting Started

Install dependencies:
```bash
npm install
````

Run the development server:

```bash
npm run dev
```

Open in browser:

```
http://localhost:3000
```
## Environment Variables

Create a `.env` file:

```env
DATABASE_URL=postgresql://user:password@localhost:5432/dbname
NEXT_PUBLIC_API_BASE_URL=http://localhost:3000/api
```

## Notes

* PostgreSQL is used as the primary database
* Axios handles all client-side API requests
* Authentication & authorization can be extended easily
* Ideal for **assignments, demos, and experimentation**

---

Feel free to fork, modify, and build on top of this project 🚀
