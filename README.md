# 🚀 FastAPI Crons Dashboard

[![FastAPI](https://img.shields.io/badge/FastAPI-async%20framework-009688?style=flat&logo=fastapi)](https://fastapi.tiangolo.com/)
[![React](https://img.shields.io/badge/Frontend-React-blue?style=flat&logo=react)](https://react.dev/)
[![Docker](https://img.shields.io/badge/Deployed%20With-Docker-2496ED?style=flat&logo=docker)](https://www.docker.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![Status](https://img.shields.io/badge/Status-Stable-success)]()

---

A **real-time, standalone dashboard** built for the [fastapi_crons](https://github.com/mE-uMAr/fastapi-crons) package — designed to **monitor, visualize, and manage scheduled tasks effortlessly**.  

---

## ✨ Key Features

- 📅 **Track and visualize** all cron jobs and their schedules  
- ⚙️ **Monitor execution history** and task statuses in real time  
- 🕹️ **Control jobs** — trigger, pause, or resume them directly from your browser  
- 📊 **Clean and modern UI**, perfect for production use or admin tools  

> Ideal for developers using **FastAPI** who want full visibility and control over background task scheduling.

---

## 🧩 Run the Project

Spin up the full stack (**frontend + backend**) using Docker Compose:  

```bash
docker compose up --build -d
```

- 🌐 Frontend:  [http://0.0.0.0:3000](http://0.0.0.0:3000)
- ⚙️ Backend API:  [http://0.0.0.0:8080](http://0.0.0.0:8080)



## 🎥 Demo Video

Take a look at the live demonstration below 👇

[Screencast from 2025-09-29 20-13-47.webm](https://github.com/user-attachments/assets/00803b25-9080-4b34-97b3-adc6a1570027)

## 🗂️ Project Structure

```
fastapi-crons-dashboard/
├── backend/
│   ├── app/
│   │   ├── main.py
│   ├── Dockerfile
│   └── pyproject.toml
│
├── frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── Dockerfile
│
├── docker-compose.yml
└── README.md
```

## 💬 Contributing

Contributions are welcome!
If you have ideas, suggestions, or improvements — feel free to open an issue or submit a pull request 🤝

```bash
# Fork the repo
git clone https://github.com/yourusername/fastapi-crons-dashboard.git
cd fastapi-crons-dashboard

# Create a branch
git checkout -b feature/your-feature

# Commit your changes
git commit -m "Add your feature"

# Push and open a PR
git push origin feature/your-feature
```
