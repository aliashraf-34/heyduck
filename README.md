# heyduck

A fast and minimal CLI tool to search DuckDuckGo directly from your terminal and get clean, actionable results with links.

---

## 🚀 Features

* Instant DuckDuckGo search from terminal
* Clean formatted output using ANSI + chalk styling
* Quick link-first results for fast navigation
* JSON output mode for scripting
* Raw text mode for minimal output
* Control number of results

---

## 📦 Installation

```bash
npm install -g heyduck
```

---

## ⚡ Usage

```bash
heyduck <keywords>
```

Example:

```bash
heyduck nodejs event loop
```

---

## 🎛️ Options

### Limit results

```bash
heyduck <keywords> -r <number>
```

Example:

```bash
heyduck javascript promises -r 5
```

---

### JSON output

```bash
heyduck <keywords> -j
```

Example:

```bash
heyduck react hooks -j
```

---

### Raw text output

```bash
heyduck <keywords> -t
```

Example:

```bash
heyduck docker basics -t
```

---

## 🧠 How it works

heyduck sends a request to DuckDuckGo, parses the results, and extracts titles, links, and snippets. It then formats them for terminal display or returns structured data depending on flags.

---

## 🧩 Flags

| Flag | Description                     |
| ---- | ------------------------------- |
| `-r` | Number of results to display    |
| `-j` | Output results as JSON          |
| `-t` | Output raw text without styling |

---

## 💡 Examples

### Basic search

```bash
heyduck linux file permissions
```

### Limited results

```bash
heyduck npm publish package -r 3
```

### JSON output

```bash
heyduck async await -j
```

### Raw output

```bash
heyduck git rebase -t
```

---

## 🛠️ Tech Stack

* Node.js
* Axios (HTTP requests)
* Cheerio (HTML parsing)
* Chalk (terminal styling)
* ANSI formatting

---

## 📌 Use Cases

* Quick developer searches without opening browser
* Copying links directly from terminal
* Scripting search workflows
* Lightweight research tool

---

## 📄 License

MIT

---

## 🤝 Contributing

Pull requests and suggestions are welcome.

---

## 🔥 Author

Built for fast terminal-based searching with focus on speed, simplicity, and usability.