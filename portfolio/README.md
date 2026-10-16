# Md. Sakib Al Hasan Probal — personal portfolio

A dark, animated one-page portfolio. Plain HTML, CSS and JavaScript. No framework, no build step, no dependencies.

Open `index.html` in a browser to view it, or upload this whole folder to any static host
(Cloudflare Pages, Netlify, GitHub Pages). On Cloudflare Pages: build command empty, output directory `portfolio`.

## Files

| File | What it is |
|---|---|
| `index.html` | Page structure, hero text, about text, contact details |
| `styles.css` | All styling. Colours and fonts are the variables at the top |
| `main.js` | Content for **services, projects and the showcase shelf** (top of the file), plus all animation |
| `assets/portrait.jpg` | Your photo (fallback image) |
| `assets/portrait-data.js` | Small embedded copy of the photo that the particle portrait reads |
| `assets/work-*.jpg` | Project screenshots |

## Things to fill in before going live

- **Contact** (`index.html`, contact section): email, phone, WhatsApp link (`https://wa.me/880…`), LinkedIn and Facebook URLs. They are placeholders now.
- **Role / location**: "Web Developer" and "Bogura, Bangladesh" are in `index.html`. Change them if they're wrong.
- **Projects 03 and 04** in `main.js` (`PROJECTS`) are placeholder slots. Replace the text, and set `media: { type: 'laptop', src: 'assets/your-shot.jpg' }` to use a real screenshot.
- If the `bds-website` GitHub repo is private, remove that GitHub button from project 01.

## Changing the portrait

Replace `assets/portrait.jpg`, then regenerate the embedded copy (a square image, about 260px, works best):

```bash
python3 -c "
from PIL import Image; import base64, io
im = Image.open('assets/portrait.jpg').convert('RGB').resize((260, 260))
b = io.BytesIO(); im.save(b, 'JPEG', quality=82)
open('assets/portrait-data.js', 'w').write('window.PORTRAIT_SRC = \"data:image/jpeg;base64,' + base64.b64encode(b.getvalue()).decode() + '\";\n')
"
```

Photos with a dark, plain background work best: dark pixels are dropped and bright ones become the particles.
