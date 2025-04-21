# 🖥️ System Panel - eDEX-UI Clone

A real-time system monitoring panel inspired by the eDEX-UI interface. Built with **React**, **Tailwind CSS**, **Node.js**, **Express**, and the `systeminformation` package to display live system stats.

---

## 📁 Project Structure

```
System-Panel/
├── client/               # Frontend (React + Tailwind CSS)
│   ├── public/
│   └── src/
│       ├── components/   # React components
│       ├── App.jsx
│       └── main.jsx
├── server/               # Backend (Node.js + Express)
│   ├── routes/
│   └── index.js
├── package.json
└── README.md
```

---

## 🧩 Components

### 🔹 Frontend Components (React)

- `ClockDisplay`: Displays the current time.
- `SystemInfoBar`: Shows date, uptime, OS type, and power status.
- `HardwareSpecs`: Displays hardware info such as CPU, memory, and GPU.
- `CpuUsagePanel`: Real-time CPU usage graphs.
- `MemoryGraph`: Visual blocks for RAM usage (updates color only on change).
- `TopProcesses`: Displays top 5 CPU-consuming processes (PID, Name, CPU%, Memory%).

### 🔹 Backend API (Node.js + Express)

- `GET /api/system/info` – Returns system info (uptime, OS, memory, etc.)
- `GET /api/system/cpu` – Returns CPU stats, core usage, and top processes

Uses the [`systeminformation`](https://www.npmjs.com/package/systeminformation) package for data.

---

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/Masihh143/System-Panel.git
cd System-Panel
```

### 2. Install dependencies
#### Backend
```bash
cd server
npm install
```

#### Frontend
```bash
cd ../client
npm install
```

### 3. Start the servers
#### Start backend
```bash
cd ../server
node index.js
```

#### Start frontend
```bash
cd ../client
npm run dev
```

---

## 📡 API Endpoints

| Endpoint             | Description                        |
|---------------------|------------------------------------|
| `/api/system/info`  | System info (uptime, OS, memory)   |
| `/api/system/cpu`   | CPU stats & top 5 processes        |

---


## 🙌 Credits
- Inspired by **eDEX-UI**
- Built using `systeminformation`, `React`, `Express`, `Tailwind CSS`

---

## 📜 License
This project is licensed under the MIT License.

