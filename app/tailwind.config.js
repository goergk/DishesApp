module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{js,jsx,ts,tsx,svg}",
    "./public/**/*.html",
  ],
  theme: {
    fontFamily: {
      'sans': ['Noto Sans TC', 'sans-serif']
    },
    backgroundImage: {
      'burger': "url('./components/images/background.jpg')",
      'food': "url('./components/images/food.jpg')",
      'pizza': "url('./components/images/pizza.jpg')",
      'soup': "url('./components/images/soup.jpg')",
      'sandwich': "url('./components/images/sandwich.jpg')",
    },
    extend: {
      colors: {
        'level-1': '#313695',
        'level-2': '#4575b4',
        'level-3': '#74add1',
        'level-4': '#abd9e9',
        'level-5': '#e0f3f8',
        'level-6': '#ffffbf',
        'level-7': '#fee090',
        'level-8': '#fdae61',
        'level-9': '#f46d43',
        'level-10': '#d73027',
      },
    }
  },
  plugins: [],
}