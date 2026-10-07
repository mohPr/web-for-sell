TACOS LOCOS — Dossier des images
=================================

Placez ici les vraies photos du restaurant (format .jpg ou .webp, < 300 Ko chacune).

Structure conseillée :
  assets/images/hero.jpg            → image principale (1920x1280 conseillé)
  assets/images/about.jpg           → photo façade / comptoir / équipe (900x1125)
  assets/images/og-cover.jpg        → aperçu réseaux sociaux (1200x630)
  assets/images/gallery-1.jpg ... gallery-8.jpg   (1200 px de large max)
  assets/images/menu/tacos-poulet.jpg, burger-classique.jpg, ...  (800x600)

Où les brancher :
  - Hero, À propos, Galerie  → index.html (attributs src / srcset / data-full)
  - Produits du menu         → script.js, tableau MENU, champ img :
        img: "assets/images/menu/tacos-poulet.jpg"
