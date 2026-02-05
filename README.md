# Personal-Website---2026
Ria's Updated Personal Website

A modern, responsive personal website showcasing education, experience, leadership, projects, and technical skills.

## Features

- **Modern Design**: Clean, professional aesthetic with smooth animations
- **Responsive Layout**: Works seamlessly on desktop, tablet, and mobile devices
- **Smooth Navigation**: Fixed navbar with smooth scrolling to sections
- **Interactive Elements**: Hover effects, animations, and transitions
- **Contact Form**: Easy-to-use contact form with email integration
- **Mobile-Friendly**: Hamburger menu for mobile navigation

## Getting Started

1. Open `index.html` in your web browser (or run a local server, e.g. `python3 -m http.server 8000`, then open http://localhost:8000)
2. No build process or dependencies required - it's a pure HTML/CSS/JavaScript website

## Publishing to GitHub Pages

1. **Push your latest code**: `git push origin main`
2. **Check deployment**: Repo → **Settings** → **Pages** → Source should be **Deploy from a branch**, Branch **main**, Folder **/(root)**. Save if you change it.
3. **Wait 1–2 minutes** after pushing for GitHub to rebuild the site.
4. **Hard refresh** the site (Ctrl+Shift+R or Cmd+Shift+R) or open it in an incognito/private window to avoid cache.
5. Live URL: `https://ria-ben.github.io/Personal-Website---2026/`

## Customization

### Update Contact Information
Edit the contact section in `index.html`:
- Update email address in the contact form action
- Add your social media links (GitHub, LinkedIn, etc.)

### Change Colors
Modify the CSS variables in `styles.css`:
```css
:root {
    --primary-color: #6366f1;
    --secondary-color: #8b5cf6;
    /* ... other variables */
}
```

### Add New Sections
Simply add new sections following the existing pattern in `index.html` and style them in `styles.css`.

## File Structure

```
Personal-Website---2026/
├── index.html      # Main HTML structure
├── styles.css      # All styling and responsive design
├── script.js       # Interactive features and animations
└── README.md       # This file
```

## Browser Support

Works on all modern browsers:
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers

## License

Personal use - All rights reserved.
