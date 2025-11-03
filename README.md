# A2Z DSA Sheet  
**Master Data Structures & Algorithms – Step by Step**  
*Inspired by Striver’s A2Z DSA Sheet*

---

<img width="1918" height="1198" alt="image" src="https://github.com/user-attachments/assets/280f2f37-e2ea-4d75-9304-04ac99ada2cf" />


A clean, interactive, **black & white** DSA learning tracker with:
- Table-based topic view
- Progress tracking (`Done / Total`)
- LocalStorage persistence
- Dark / Light mode toggle
- Real **icon images** (not emojis)
- Responsive & minimal design

---

## Features

| Feature | Description |
|-------|-----------|
| **Collapsible Steps** | Step 1, Step 2, etc. – expand only what you need |
| **Sub-Steps (Easy/Medium/Hard)** | Organized difficulty levels |
| **Interactive Table** | Checkboxes, links, clean layout |
| **Missing Links = Blank** | No clutter – only valid links show icons |
| **Progress Saved Forever** | `localStorage` – refresh and continue |
| **Dark / Light Mode** | Toggle with one click |
| **Custom Icons** | Real SVGs in `public/icons/` |
| **No Blue, No Colors** | Pure black & white theme |

---

## Project Structure

```
src/
├── App.js           → Main logic + components
├── App.css          → Black & white styling
├── data.json        → All topics, links, structure
└── index.js

public/
├── index.html
├── icons/           ← Your 7 platform icons (SVG/PNG)
│   ├── blog.svg
│   ├── alt.svg
│   ├── yt.svg
│   ├── lc.svg
│   ├── gfg.svg
│   ├── cn.svg
│   └── tuf.svg
└── logo.png         ← Favicon
```

---

## Setup & Run

```bash
# Clone or download
git clone https://github.com/LikhithReddy-S/striver-a-2-z-dsa-sheet
cd dsa-sheet

# Install
npm install

# Start dev server
npm start
```

Open [http://localhost:3000](http://localhost:3000)

---

## Customize Icons

1. Place your icons in `public/icons/`
2. Name them **exactly**:
   - `blog.svg`, `alt.svg`, `yt.svg`, `lc.svg`, `gfg.svg`, `cn.svg`, `tuf.svg`
3. They auto-appear in the table

> Tip: Use [Feather Icons](https://feathericons.com) or [Heroicons](https://heroicons.com)

---

## data.json Format

```json
[
  {
    "title": "Step 1: Learn the basics",
    "number": "1",
    "subSteps": [
      {
        "title": "1. Easy",
        "number": "1",
        "topics": [
          {
            "title": "Largest Element in an Array",
            "id": "largest-element",
            "links": {
              "BLOG": "https://takeuforward.org/...",
              "YT": "https://youtube.com/..."
            }
          }
        ]
      }
    ]
  }
]
```

> Missing platform? → Cell stays **blank**

---

## Dark / Light Mode

Click the **"Light Mode" / "Dark Mode"** button in the header.

Persisted via `localStorage`.

---

## Favicon

- Place `logo.png` in `public/`
- `index.html` uses:  
  ```html
  <link rel="icon" href="%PUBLIC_URL%/logo.png" />
  ```

---

## Tech Stack

- **React** (Create React App)
- **Vanilla CSS** (No frameworks)
- **localStorage**
- **Mobile-friendly**

---

## Contributing

1. Fork it
2. Create your feature branch
3. Commit changes
4. Push and open a Pull Request

---

## Author

**Likhith Reddy**  
*Built with passion for clean code and DSA mastery*

---


> **Keep grinding. One topic at a time.**  
> *You got this!*
