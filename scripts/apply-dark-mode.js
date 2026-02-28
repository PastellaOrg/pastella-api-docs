const fs = require('fs');

const htmlFile = 'static/api.html';
let html = fs.readFileSync(htmlFile, 'utf8');

// Add comprehensive dark mode CSS
const darkModeCSS = `
  <style>
    /* Main content - light text for readability */
    [class*="hoYmkG"], [class*="eiTXyS"],
    [class*="eTiIZG"], [class*="iUTsUN"] {
      color: #d4d4d8 !important;
    }
    [class*="hoYmkG"] *, [class*="eiTXyS"] *,
    [class*="eTiIZG"] *, [class*="iUTsUN"] * {
      color: #d4d4d8 !important;
    }

    /* SIDEBAR - using role="menuitem" */
    [class*="menu-content"] {
      background-color: #1e1e1e !important;
      border-right: 1px solid #333 !important;
    }

    /* Sidebar menu items - clean semantic targeting */
    [role="menuitem"], [role="menuitem"] *,
    [role="menuitem"] span, [role="menuitem"] label {
      color: #d2d7df !important;
    }

    /* Sidebar hover */
    [role="menuitem"]:hover {
      background-color: #2d2d2d !important;
    }

    /* Restore specific colors that should be different */
    .property-name, [class*="property-name"] {
      color: #7dd3fc !important;
    }

    [class*="sc-kZGvTq"], [class*="sc-iMfspz"] {
      color: #4ade80 !important;
    }

    .operation-type.get {
      background-color: #0ea5e9 !important;
      color: #ffffff !important;
    }

    .operation-type.post {
      background-color: #22c55e !important;
      color: #ffffff !important;
    }

    /* Backgrounds */
    html, body {
      background-color: #1a1a1a !important;
      color: #d4d4d8 !important;
    }

    [class*="sc-caslwi"] {
      background-color: #2d2d2d !important;
    }

    /* Search input */
    [class*="search-input"] {
      background-color: #2d2d2d !important;
      border-color: #444 !important;
      color: #9ca3af !important;
    }
    [class*="search-input"]::placeholder {
      color: #6b7280 !important;
    }

    /* Code blocks */
    pre, code, .redoc-json {
      background-color: #2d2d2d !important;
    }

    /* Buttons */
    button {
      background-color: #2d2d2d !important;
      border-color: #444 !important;
    }

    /* Scrollbar */
    ::-webkit-scrollbar {
      width: 12px;
      height: 12px;
    }

    ::-webkit-scrollbar-track {
      background: #1e1e1e !important;
    }

    ::-webkit-scrollbar-thumb {
      background: #444 !important;
      border-radius: 6px;
    }

    ::-webkit-scrollbar-thumb:hover {
      background: #555 !important;
    }
  </style>
  <script>
    // Force dark theme on load
    (function() {
      document.documentElement.style.backgroundColor = '#1a1a1a';
      document.documentElement.style.colorScheme = 'dark';
      document.body.style.backgroundColor = '#1a1a1a';

      // Override any elements with dark text color
      setTimeout(function() {
        const all = document.querySelectorAll('*');
        for (let i = 0; i < all.length; i++) {
          const el = all[i];
          const styles = window.getComputedStyle(el);
          const color = styles.color;
          // Check if text is dark (rgb values below 100)
          if (color && (color.includes('51, 51, 51') || color.includes('rgb(51,') ||
              color.includes('rgb(33,') || color.includes('rgb(43,') ||
              color.includes('rgb(20,') || color.includes('#333') ||
              color.includes('#212'))) {
            // Check if element is in sidebar
            const sidebar = el.closest('[class*="menu-content"]');
            if (sidebar) {
              el.style.setProperty('color', '#d2d7df', 'important');
            } else {
              el.style.setProperty('color', '#d4d4d8', 'important');
            }
          }
        }
      }, 100);
    })();
  </script>
`;

// Insert the CSS before </head>
html = html.replace('</head>', darkModeCSS + '</head>');

fs.writeFileSync(htmlFile, html);
console.log('Applied dark mode to api.html');
