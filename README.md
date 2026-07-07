# D2C Need-Gap Intelligence Platform

An interactive, data-driven R&D dashboard built for D2C product development teams to map and analyze unmet consumer needs across competitor brands. It parses 6,000 reviews across 14 major Indian D2C competitor brands to pinpoint specific product development opportunities.

---

## 🚀 Key Features

1.  **Dynamic Opportunity Ranking**: 
    Ranks 15 key unmet needs (such as *Ingredient Transparency*, *Vegan Certification*, *Subscription Flexibility*, etc.) using a custom **Opportunity Score**.
2.  **Global Weights Tuning**: 
    Interactive sliders in the header allow you to adjust the relative importance of **Frequency** (count of complaints), **Frustration** (severity based on low ratings), and **Validation** (helpful votes). All tabs recalculate and re-sort instantly.
3.  **Voice of Customer (VoC) Feed**: 
    Read raw customer reviews highlighting specific unmet needs, with real-time text search, rating filters, and competitor brand selectors.
4.  **Category Deep-Dive Pivot**: 
    Pivot data to focus on a specific category (e.g. *Skin Care*, *Men's Grooming*). Includes a **Competitor Product Leaderboard** that calculates a normalized **Vulnerability Score** (0-100) to identify weak products to target.
5.  **R&D Blueprint Generator**: 
    Generates dynamic executive proposals for launching products targeting competitor weak spots, complete with objective, target competitors, formulation specifications, and a 6-month launch schedule.
6.  **Print-Ready PDFs**: 
    Fully optimized print layout (`@media print` CSS overrides) that converts any generated R&D brief into a clean, two-column black-and-white briefing document.

---

## 🧮 Mathematical Modeling

### 1. Opportunity Score (Market Overview)
The raw score is calculated using an exponential scaling formula:

$$\text{Raw Score} = (\text{Frequency})^{W_{\text{freq}}} \times (\text{Frustration})^{W_{\text{severity}}} \times (1 + \text{Avg Helpful Votes})^{W_{\text{validation}}}$$

*   **Frequency**: Occurrence count of the unmet need.
*   **Frustration**: $(6 - \text{Average Rating})$, ranging from 1 to 5.
*   **Validation**: $(1 + \text{Average Helpful Votes})$.
*   **Weights ($W$ sliders)**: Exponents range from `0.0` (ignores factor, $Factor^0 = 1$) to `3.0` (exponential scaling).
*   **Opportunity Index**: Raw scores are normalized relative to the highest scoring need, scaling them between **0 and 100**.

### 2. Product Vulnerability Score (Category Deep-Dive)
Measures the weakness of specific competitor products:

$$\text{Vulnerability Score} = \text{Product Reviews Count}^{W_{\text{freq}}} \times \text{Frustration}^{W_{\text{severity}}} \times (1 + \text{Product Avg Helpful Votes})^{W_{\text{validation}}}$$

*   **Frustration**: $\text{Math.max}(0.1, 5.5 - \text{Product Avg Rating})$.
*   Scores are normalized from **0 to 100**, where **100** represents the competitor product representing the most vulnerable market target.

---

## 📂 Directory Structure

```
├── download.js         # Node.js data fetcher and cleaning script
├── data.js             # ES6 local database module (holds the 6,000 reviews)
├── package.json        # Project metadata and scripts
├── index.html          # Semantic HTML5 layout
├── style.css           # Glassmorphic Dark-Mode styles & print overrides
└── app.js              # Core controller logic and chart renders
```

---

## 🛠 Setup & Launch

### 1. Sourcing Competitor Reviews
The reviews are fetched and cached locally to ensure instant loads. The script clean-merges case inconsistencies in brand names (e.g. *MCaffeine* and *mCaffeine*):
```bash
node download.js
```

### 2. Installing Dependencies
Install Vite to run the dev server:
```bash
npm install
```

### 3. Launching Locally
Start the local server at `http://localhost:5173/` with hot-module reloading:
```bash
npm run dev
```

### 4. Building for Production
Bundle the minified HTML, CSS, and JS:
```bash
npm run build
```
