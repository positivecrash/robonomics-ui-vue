# Robonomics UI Vue

A set of Vue 3 UI components for the [Robonomics dApp](https://github.com/airalab/robonomics.app).  
This package provides shared interface elements and utilities used in the decentralized frontend of Robonomics app.

---

## 📦 Build

This project uses [Vite](https://vitejs.dev/) to build a Vue 3 component library.

---

### 🔧 Production Build

To build the library for production (for publishing or packaging):

```bash
yarn build
```

This will:

- Compile the library into the `dist/` folder
- Copy the following metadata files into `dist/`:
  - `package.json`
  - `README.md`
  - `LICENSE`
  - `NOTICE`
  - `AUTHORS`

---

### 🧪 Local Development Build

To build and test the package locally with a dependent dApp project:

```bash
yarn build-dev
```

This will:

- Build the library
- Copy the compiled output directly into the dApp’s `node_modules/robonomics-ui-vue/` folder

The path is configured via a local config file:

```js
// build.config.local.mjs
export const dappPackagePath = '/absolute/path/to/your-dapp/node_modules/robonomics-ui-vue/';
```

Use `build.config.example.mjs` as a reference.

> **Note:** This file is ignored via `.gitignore` and should not be committed.

---

## ⚖️ License

This project is licensed under the **Apache License 2.0**.

You are free to:

- Use, modify, and distribute the code
- Include this library in personal or commercial projects

However, if you modify and redistribute the code, you must:

- Clearly state what changes were made
- Preserve the original `LICENSE`, `NOTICE`, and `AUTHORS` files

📄 See full license terms in the [LICENSE](./LICENSE) file.

---

## 👥 Authors

See [AUTHORS](./AUTHORS) for a list of contributors.

---

## 📄 Metadata

The following files are included in builds for clarity and compliance:

- `LICENSE` – license terms (Apache 2.0)  
- `NOTICE` – copyright and attribution  
- `AUTHORS` – list of project authors  
- `README.md` – this file
