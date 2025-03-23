# NihongoClick

**NihongoClick** is a Chrome extension that allows you to instantly look up selected Japanese text across a variety of dictionaries, thesauri, and sentence banks — all from the right-click context menu.

## 📌 Features

- 🔍 Vocabulary lookup in:
  - **Kotobank** (JP–PT)
  - **英辞郎** (Eijirou - JP–EN)
  - **大辞泉** (Daijisen - Monolingual JP)
  - **Weblio Quasi-synonyms**
  - **Weblio Antonyms**

- 💬 Sentence examples from:
  - **Nadeshiko**
  - **ImmersionKit**
  - **YouGlish**
  - **Sentence Search**
  - **Massif**
  - **Yourei**

- 🈷️ Kanji search support:
  - **Jitenon (EN)**
  - **Jitenon (JP)** with ID-based subpath support

## ▶️ Demo

Watch a short [demo](https://www.youtube.com/watch?v=6xpSOsKj_XQ)

## ⚙️ How to Install (Manual)

1. Download or clone this repository:
   ```bash
   git clone https://github.com/FragozoLeonardo/NihongoClick.git
   ```

2. Open **Chrome** and navigate to:
   ```
   chrome://extensions/
   ```

3. Enable **Developer Mode** (top right toggle).

4. Click **"Load unpacked"** and select the folder where this project is.

5. Done! Now select Japanese text on any webpage, right-click, and access "NihongoClick" in the context menu.

## 📁 Project Structure

```
NihongoClick/
├── background.js
├── kanji_to_id.json
├── icon.png
└── manifest.json
```
## 🧩 Dependencies

No external dependencies. Just standard Chrome Extension APIs.

## 🧠 Author

**Leonardo Quadros Fragozo**  
Built as part of a personal journey to master Japanese — both language and tooling. 🇯🇵💻

---

「継続は力なり」 – Perseverance is power.

© 2025 – NihongoClick by Leonardo Quadros Fragozo. All rights reserved.
