<div align="center">
  <h1>🍳 Recipe Explorer</h1>
  <p>A modern recipe discovery application built with Vue 3 and TheMealDB API</p>

  <p>
    <a href="#features">Features</a> •
    <a href="#demo">Demo</a> •
    <a href="#installation">Installation</a> •
    <a href="#tech-stack">Tech Stack</a> •
    <a href="#architecture">Architecture</a>
  </p>

  <img src="https://img.shields.io/badge/vue.js-v3.2-brightgreen.svg" alt="Vue.js Version" />
  <img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="License" />
  <img src="https://img.shields.io/badge/PRs-welcome-orange.svg" alt="PRs Welcome" />
</div>

---

## ✨ Features

- 🔍 **Smart Search**: Search recipes by name with real-time results
- 📑 **Browse by Letter**: Explore recipes alphabetically
- 🥗 **Ingredient Explorer**: Find recipes by ingredients
- 📱 **Responsive Design**: Perfect experience on all devices
- ⚡ **Fast & Optimized**: Caching and performance optimizations
- 🎨 **Modern UI**: Clean and intuitive interface

## 🚀 Demo

Experience the live application: [Recipe Explorer Live Demo](https://tc-search-meals.netlify.app/)

<div align="center">
  <img src="screenshot.png" alt="Recipe Explorer Screenshot" width="800px" />
</div>

## 💻 Installation

1. Clone the repository

```bash
git clone https://github.com/Devmangrani/Recipe-Book.git
cd Recipe-Book
```

2. Install dependencies

```bash
npm install
```

3. Run the development server

```bash
npm run dev
```


The application will be available at `http://localhost:3000`

## 🛠 Tech Stack

- **Frontend Framework**: [Vue.js 3](https://v3.vuejs.org/)
- **State Management**: [Vuex 4](https://next.vuex.vuejs.org/)
- **Routing**: [Vue Router 4](https://next.router.vuejs.org/)
- **HTTP Client**: [Axios](https://axios-http.com/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **API**: [TheMealDB](https://www.themealdb.com/api.php)


### Key Features Implementation

#### 🔄 Caching System
- Implements a smart caching system for API responses
- Caches data for 5 minutes to reduce API calls
- Stores letter-based searches in Vuex store

#### 🔍 Smart Search
- Real-time search results with debouncing
- Caches search results for 5 minutes
- Displays loading state during API calls


#### ⚡ Performance Optimizations
- Lazy loading of route components
- Request/response interceptors
- Error boundary implementation
- Efficient state management

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

Contributions are welcome! Feel free to:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 👏 Acknowledgments

- [TheMealDB](https://www.themealdb.com/) for providing the API
- [Vue.js Team](https://vuejs.org/about/team.html) for the amazing framework
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework

---

<div align="center">
  Made with ❤️ by [Your Name]
</div>