# DeepRest — Landing Page

> Spegni la mente. Riprenditi il sonno.

Landing page e-commerce per **DeepRest**, dispositivo audio a conduzione ossea pensato come rituale serale per favorire il sonno.

Sito statico mobile-first costruito senza framework, con focus su performance e conversione.

---

## 🛠 Stack

- **HTML5** semantico
- **Tailwind CSS** via CDN (Play CDN — nessun build step)
- **JavaScript vanilla** (no librerie esterne)
- **Google Fonts**: Fraunces (display serif) + Inter (UI sans)

Niente Node, niente bundler, niente toolchain. Apri `index.html` e funziona.

---

## 📁 Struttura del progetto

```
deeprest/
├── index.html      # Markup completo (12 sezioni)
├── styles.css      # Stili custom (oltre Tailwind)
├── main.js         # Countdown, accordion, reveal, carosello, stock counter
├── README.md
├── .gitignore
└── LICENSE
```

---

## 🚀 Come eseguire in locale

### Opzione 1 — Aprire direttamente
Doppio click su `index.html`. Funziona, ma alcuni browser bloccano `localStorage` su file:// — il countdown e lo stock counter potrebbero non persistere.

### Opzione 2 — Server locale (consigliata)

```bash
# Con Python (preinstallato su macOS/Linux)
python3 -m http.server 8000

# Con Node
npx serve .

# Con PHP
php -S localhost:8000
```

Poi apri `http://localhost:8000`.

---

## 🌐 Deploy

Essendo un sito puramente statico, va su qualsiasi hosting:

- **GitHub Pages**: Settings → Pages → Source: `main` branch, root → save
- **Vercel / Netlify**: drag & drop della cartella, zero config
- **Cloudflare Pages**: connetti il repo, build command vuoto, output `/`

---

## 📐 Sezioni della landing

1. **Navbar** — sticky con blur on scroll
2. **Hero** — claim + visual + 9 feature strip + trust badges
3. **Pain** — 6 momenti dolorosi che il target riconosce
4. **Soluzione** — il prodotto presentato come gesto, non come gadget
5. **Come funziona** — 3 step
6. **Benefici** — 6 cambiamenti concreti
7. **Differenziazione** — tabella confronto vs alternative
8. **Testimonianze** — 3 recensioni verificate
9. **Urgenza** — countdown 24h + stock + sconto −30%
10. **FAQ** — accordion a 5 domande
11. **CTA finale** — gradient notte→alba
12. **Footer** — link e info

---

## ⚙️ Funzionalità JS

| Feature | Persistenza | Note |
|---|---|---|
| Countdown 24h | `localStorage` | Si rinnova automaticamente alla scadenza |
| Stock counter | `localStorage` | Decremento −1 ogni 4–7 min, recupero al ritorno |
| FAQ accordion | — | Apre una alla volta con transizione height |
| Reveal on scroll | — | Intersection Observer, soft fade-in |
| Smooth scroll | — | Con offset per navbar sticky |
| Carosello recensioni | — | Drag-to-scroll su mobile |
| Navbar blur | — | Si attiva oltre 40px di scroll |

Tutte rispettano `prefers-reduced-motion`.

---

## 🎨 Design tokens

```
Background ivory:  #F8F6F1
Background scuro:  #0E1117
Testo:             #1A1A1A
Accent (blu):      #4A6FA5
Accent (lavanda):  #6B7FD7
Salvia:            #5C7C5A
Border soft:       #E8E4DC
```

---

## 📝 To-do future

- Sostituire le illustrazioni CSS/SVG del prodotto con foto reali (hero + soluzione)
- Collegare il bottone CTA al checkout (Shopify / Stripe)
- Aggiungere pagine legali (Termini, Privacy, Spedizioni, Resi)
- Setup analytics (Plausible / GA4)
- Schema.org Product + AggregateRating per SEO

---

## 📄 Licenza

[MIT](LICENSE) — vedi file `LICENSE`.
