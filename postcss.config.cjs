module.exports = {
  plugins: {
    "postcss-preset-mantine": {},
    "postcss-simple-vars": {
      variables: {
        "mantine-breakpoint-xss": "400px",
        "mantine-breakpoint-xs": "600px",
        "mantine-breakpoint-sm": "768px",
        "mantine-breakpoint-md": "992px",
        "mantine-breakpoint-lg": "1024px",
        "mantine-breakpoint-xl": "1200px",
      },
    },
  },
};
