# 🚀 Quick Start Guide

## Step 1: Install Node.js

Node.js is required to run this project. If you don't have it installed:

1. Go to **https://nodejs.org/**
2. Download the **LTS version** (Long Term Support)
3. Run the installer
4. Follow the installation wizard
5. **Restart your terminal** after installation

## Step 2: Verify Installation

Open a new terminal and run:

```powershell
node --version
npm --version
```

You should see version numbers (e.g., v20.x.x and 10.x.x).

## Step 3: Install Project Dependencies

In the project directory, run:

```powershell
npm install
```

This will install all required packages (Svelte, Vite, D3.js, Tailwind CSS, etc.).

## Step 4: Start the Development Server

```powershell
npm run dev
```

You should see output like:

```
  VITE v5.0.8  ready in 500 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```

## Step 5: Open in Browser

Navigate to **http://localhost:5173** in your web browser.

You should see the Linear Regression Explainer!

---

## 🎮 Using the Explainer

1. **View the data table** - See the ice cream sales data
2. **Check "Show Line of Best Fit"** - Visualize the linear relationship
3. **Expand the formula sections** - Learn how gradient (m) and y-intercept (c) are calculated
4. **Adjust the temperature slider** - Make predictions for different temperatures
5. **See the step-by-step calculation** - Understand how y = mx + c works

---

## 🛠️ Other Commands

```powershell
# Build for production
npm run build

# Preview production build
npm run preview

# Type-check the code
npm run check
```

---

## ❓ Troubleshooting

### "npm is not recognized"
- Make sure Node.js is installed
- Restart your terminal after installation
- Try opening a new PowerShell window

### Port 5173 already in use
- Kill the process using that port, or
- Vite will automatically use the next available port

### Module not found errors
- Run `npm install` again
- Delete `node_modules` folder and `package-lock.json`, then run `npm install`

---

## 📚 Learn More

- [Svelte Tutorial](https://svelte.dev/tutorial)
- [Vite Documentation](https://vitejs.dev/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [D3.js Examples](https://d3js.org/)

Enjoy exploring linear regression! 🎉
