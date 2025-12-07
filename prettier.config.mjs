const config = {
  importOrder: [
    "<BUILTIN_MODULES>",
    "<TYPES>^(node:)",
    "",
    "<THIRD_PARTY_MODULES>",
    "<TYPES>",
    "",
    "^@/(?!.*.css$).+",
    "<TYPES>^@/(?!.*.css$).+",
    "",
    ".css$",
  ],
  plugins: [
    "@ianvs/prettier-plugin-sort-imports",
    "prettier-plugin-tailwindcss",
  ],
};

export default config;
