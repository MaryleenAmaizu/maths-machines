# Maths Machines: Interactive Machine Learning Explainer

An interactive visualization tool that helps students learn how machine learning algorithms work through hands-on exploration. Currently featuring **Linear Regression** and **K-Nearest Neighbors** with guided step-by-step discovery.

![Linear Regression Explainer](https://img.shields.io/badge/Built%20with-Svelte-FF3E00?style=for-the-badge&logo=svelte&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

## 🌐 Live Demo

**Try Maths Machines: [https://maryleenamaizu.github.io/maths-machines/](https://maryleenamaizu.github.io/maths-machines/)**

## 🎯 Features

- **🎓 Interactive Step-by-Step Tutorial**: Guided discovery experience inspired by the Transformer Explainer - learn at your own pace with progressive feature unlocking
- **📊 Interactive Data Visualization**: Real-time scatter plot with D3.js showing the relationship between temperature and ice cream sales
- **✏️ Data Manipulation**: Add, edit, or remove data points and watch the regression line adapt instantly
- **🎮 Line Fitting Challenge**: Try to fit the line manually and see how close you can get to the optimal solution
- **🧪 Experiment Playground**: Add outliers, generate random datasets, and explore different scenarios
- **💡 Live Calculations**: Adjust temperature with a slider and see predictions update instantly
- **📐 Formula Breakdown**: Step-by-step explanation of gradient (m) and y-intercept (c) calculations
- **🎯 Visual Highlighting**: Components highlight automatically as you progress through the tutorial
- **🆘 Floating Help**: Always-accessible help button to restart the tutorial or view your current step
- **🏆 Educational Content**: Integrated "maths treasures" showing curriculum connections (Years 7-9)
- **🌓 Dark Mode Support**: Automatic theme switching based on system preferences
- **📱 Responsive Design**: Works beautifully on desktop and mobile devices

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v20 or higher) - [Download here](https://nodejs.org/)
- **npm** (v10 or higher) - Comes with Node.js

To check if you have Node.js installed, run:
```bash
node --version
npm --version
```

### Installation

1. **Install Node.js** (if not already installed):
   - Download from [nodejs.org](https://nodejs.org/)
   - Choose the LTS (Long Term Support) version
   - Run the installer and follow the prompts
   - Restart your terminal after installation

2. **Install project dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```

4. **Open your browser**:
   Navigate to `http://localhost:5173`

## 📦 Project Structure

```
linear-regression-explainer/
├── src/
│   ├── components/
│   │   ├── Header.svelte           # Title and description
│   │   ├── DataTable.svelte        # Ice cream sales data table
│   │   ├── ScatterPlot.svelte      # Interactive D3.js graph
│   │   ├── FormulaExplainer.svelte # Breakdown of y=mx+c
│   │   ├── PredictionCalculator.svelte # Live prediction tool
│   │   └── TreasureList.svelte     # Educational curriculum links
│   ├── stores/
│   │   └── dataStore.ts            # Svelte stores for state management
│   ├── App.svelte                  # Main application component
│   ├── main.ts                     # Application entry point
│   └── app.css                     # Global styles
├── index.html                      # HTML entry point
├── package.json                    # Project dependencies
├── vite.config.ts                  # Vite configuration
├── tailwind.config.js              # Tailwind CSS configuration
└── tsconfig.json                   # TypeScript configuration
```

## 🛠️ Tech Stack

- **[Svelte](https://svelte.dev/)** - Reactive UI framework
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe JavaScript
- **[Vite](https://vitejs.dev/)** - Fast build tool
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework
- **[D3.js](https://d3js.org/)** - Data visualization library

## 📚 Educational Content

This explainer teaches:
- **Sequences and Patterns** (Year 7)
- **Coordinates and Scatter Graphs** (Year 8)
- **Line of Best Fit** (Year 8)
- **Gradient and Rate of Change** (Year 9)
- **Y-Intercept** (Year 9)
- **Linear Equations (y = mx + c)** (Year 9)

## 🎮 How to Use

1. **Explore the Data**: View the ice cream sales table showing temperature vs sales
2. **Visualize the Pattern**: Enable "Show Line of Best Fit" to see the trend
3. **Learn the Formula**: Expand the gradient and y-intercept sections to see calculations
4. **Make Predictions**: Adjust the temperature slider to predict sales for any temperature
5. **Collect Treasures**: See which Year 7-9 maths concepts you're using

## 🏗️ Build Commands

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Type-check the code
npm run check
```

## 🌟 Inspired By

This project is inspired by the excellent [Transformer Explainer](https://github.com/poloclub/transformer-explainer) by the Polo Club of Data Science at Georgia Tech, which demonstrates complex ML concepts through interactive visualization.

## 📄 License

MIT License - feel free to use this for educational purposes!

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the issues page.

## 📧 Contact

For questions or feedback, please open an issue on GitHub.

---

Built with ❤️ for mathematics education
