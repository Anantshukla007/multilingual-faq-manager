# Multilingual FAQ Management System

## Project Overview
This project is a **Multilingual FAQ Management System** built using **Node.js** and **Express.js**, featuring:
- **Rich-text WYSIWYG editor** for FAQ content management
- **Multi-language support** using **Google Translate API**
- **Redis caching** for optimized performance
- **Admin Panel** for FAQ management via **AdminJS**
- **Comprehensive REST API** for CRUD operations
- **Unit testing** using **Mocha, Chai, and Supertest**
- **Linting & Code Quality** with ESLint
- **Git version control** with structured commit messages

## Folder Structure
```
multilingual-faq-system/
│── src/
│   ├── models/
│   │   ├── faq.js            # FAQ Model
│   ├── routes/
│   │   ├── faqRoutes.js      # API Routes for FAQs
│   ├── utils/
│   │   ├── translate.js      # Google Translate API Utility
│   ├── admin/
│   │   ├── adminPanel.js     # AdminJS Integration
│── tests/
│   ├── faqRoutes.test.js     # Unit Tests
│── .env                      # Environment Variables
│── server.js                 # Entry Point of the Application
│── package.json              # Dependencies and Scripts
│── README.md                 # Project Documentation
│── .gitignore                 # Ignored Files
```

## Installation & Setup
### Prerequisites
Ensure you have the following installed:
- **Node.js** (v16+)
- **MongoDB** (local or cloud - e.g., MongoDB Atlas)
- **Redis** (for caching)

### Install Dependencies
Run the following command in the root directory:
```sh
npm install
```

### Environment Variables
Create a `.env` file in the root directory and add:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
GOOGLE_TRANSLATE_API_KEY=your_google_translate_api_key
REDIS_HOST=127.0.0.1
REDIS_PORT=6379
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=securepassword
```

### Running the Server
Start the server with:
```sh
npm start
```
For development with hot-reloading:
```sh
npm run dev
```

### Running Unit Tests
Execute tests using:
```sh
npm test
```

---
## API Endpoints
### 1. Create a new FAQ (POST)
**Request:**
```sh
POST /api/faqs/
Content-Type: application/json
{
  "question": "What is Node.js?",
  "answer": "Node.js is a JavaScript runtime...",
  "translations": {}
}
```
**Response:**
```json
{
  "_id": "12345",
  "question": "What is Node.js?",
  "answer": "Node.js is a JavaScript runtime...",
  "translations": {},
  "__v": 0
}
```

### 2. Get all FAQs with language selection (GET)
**Request:**
```sh
GET /api/faqs?lang=hi
```
**Response:**
```json
[
  {
    "_id": "12345",
    "question": "Node.js क्या है?",
    "answer": "Node.js एक जावास्क्रिप्ट रनटाइम है..."
  }
]
```

### 3. Get single FAQ by ID (GET)
**Request:**
```sh
GET /api/faqs/12345?lang=es
```
**Response:**
```json
{
  "_id": "12345",
  "question": "¿Qué es Node.js?",
  "answer": "Node.js es un entorno de ejecución de JavaScript..."
}
```

### 4. Translate FAQ using Google Translate API (POST)
**Request:**
```sh
POST /api/faqs/translate
Content-Type: application/json
{
  "text": "What is Node.js?",
  "targetLang": "fr"
}
```
**Response:**
```json
{
  "translatedText": "Qu'est-ce que Node.js?"
}
```

### 5. Update an FAQ (PUT)
**Request:**
```sh
PUT /api/faqs/12345
Content-Type: application/json
{
  "question": "Updated Question",
  "answer": "Updated Answer"
}
```

### 6. Delete an FAQ (DELETE)
**Request:**
```sh
DELETE /api/faqs/12345
```

---
## Caching with Redis
- **FAQs are cached** in Redis to reduce database queries.
- If an FAQ exists in Redis, it is **served from cache**.
- Cache **expires after 1 hour** to ensure updated translations.

---
## Admin Panel (AdminJS)
- Admin panel available at `/admin`
- Default credentials (update in `.env`):
  - **Email:** `admin@example.com`
  - **Password:** `securepassword`

**Features:**
- CRUD operations on FAQs
- Rich text editor support (WYSIWYG)
- Multi-language translations management

---
## Future Improvements
- **OAuth Authentication** for admin access
- **Role-based access control (RBAC)** for FAQ management
- **Docker support** for easy deployment
- **ElasticSearch integration** for advanced search capabilities
- **Machine Learning-based translation suggestions**
- **Deployment to AWS/GCP/Heroku** for cloud hosting

---
## Contributing
Pull requests are welcome! Follow these steps:
1. Fork the repository
2. Create a new feature branch (`git checkout -b feature-name`)
3. Commit changes (`git commit -m "feat: add new feature"`)
4. Push to GitHub (`git push origin feature-name`)
5. Open a pull request 🚀

---
## License
This project is **open-source** under the **MIT License**.

