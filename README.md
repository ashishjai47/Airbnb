Airbnb Clone (Node.js + Express + MongoDB)

A full-stack Airbnb-style home rental application built using Node.js, Express, MongoDB (Mongoose), and EJS.
Users can register, log in, host properties with images, and view available listings — all in a simple and intuitive UI.

🚀 Features

🔐 User Authentication

Register, login, and manage sessions with express-session and MongoDB store.

🏡 Host Management

Add, edit, or delete your listed homes.

Upload home images using multer (stored in /public/uploads).

💾 MongoDB Integration

Homes and users are persisted using Mongoose models.

🖼️ Dynamic UI

Server-rendered with EJS templates.

⚙️ Secure Sessions

Managed with connect-mongodb-session.

🎨 Responsive Design

Styled with Tailwind CSS.

🧱 Tech Stack
Layer	Technology
Backend	Node.js, Express.js
Frontend	EJS, Tailwind CSS
Database	MongoDB (Atlas)
File Uploads	Multer
Session Management	express-session + connect-mongodb-session
Templating	EJS
ODM	Mongoose
📁 Project Structure
airbnb-proj/
├── controllers/
│   ├── authcontroller.js
│   ├── hostcontroller.js
│   └── errors.js
├── models/
│   ├── home.js
│   └── user.js
├── routes/
│   ├── authrouter.js
│   ├── hostrouter.js
│   └── storerouter.js
├── public/
│   ├── css/
│   └── uploads/
├── utils/
│   ├── database.js
│   └── pathutils.js
├── views/
│   ├── partials/
│   ├── host/
│   ├── auth/
│   └── store/
├── index.js
└── package.json

⚙️ Installation & Setup
1️⃣ Clone the repository
git clone https://github.com/<your-username>/airbnb-proj.git
cd airbnb-proj

2️⃣ Install dependencies
npm install

3️⃣ Setup environment variables

Create a .env file in the project root (or update dbpath in index.js):

MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/airbnb
SESSION_SECRET=mysecret
PORT=4001


💡 You can use a free MongoDB Atlas cluster.

4️⃣ Run the project
npm start


Server will start at:
👉 http://localhost:4001

📸 Screenshots

(You can add screenshots later in your repo like this)

Home Page	Add Property Page

	
🧠 Folder Highlights

routes/ – All Express route handlers

controllers/ – Business logic for auth, hosting, and error handling

models/ – Mongoose schemas for Homes and Users

views/ – EJS templates for server-side rendering

public/ – Static assets (CSS, images, uploads)

🧰 Example Home Schema
const mongoose = require('mongoose');

const homeSchema = new mongoose.Schema({
  houseName: { type: String, required: true },
  Price: { type: Number, required: true },
  location: { type: String, required: true },
  Rating: { type: Number, required: true },
  photo: { type: String, required: true },
});

module.exports = mongoose.model('Home', homeSchema);

💬 Future Improvements

Implement user roles (Admin, Host, Guest)

Add search and filter functionality

Add booking system and calendar view

Integrate Stripe for payments

Add React frontend or Next.js migration

🤝 Contributing

Contributions, issues, and feature requests are welcome!
Feel free to open a PR or issue on the repository.

🧑‍💻 Author

Ashish Jain
📧 [ashishjain935bgarh@gmail.com]
🌐 LinkedIn www.linkedin.com/in/ashish-jain-a1a001252

🪪 License

This project is licensed under the MIT License.
