/* =========================================================
   TACOS LOCOS — script.js
   ---------------------------------------------------------
   👉 TOUT CE QUI EST À MODIFIER SE TROUVE EN HAUT DE CE FICHIER :
      1. CONFIG  → téléphone, WhatsApp, Instagram, adresse, horaires
      2. MENU    → produits, descriptions, prix, photos
      3. I18N    → textes du site en FR / AR / EN
   ========================================================= */

/* ---------------------------------------------------------
   1. CONFIGURATION — à remplir avec les infos du restaurant
   Laisser "" (vide) tant que l'info n'est pas confirmée :
   le site affichera automatiquement "[À confirmer]".
   --------------------------------------------------------- */
const CONFIG = {
  phone: "",            // ex : "+213555123456"  (format international, sans espaces)
  phoneDisplay: "",     // ex : "0555 12 34 56"  (format affiché)
  whatsapp: "",         // ex : "213555123456"   (sans + ni espaces)
  instagram: "",        // ex : "https://www.instagram.com/tacoslocos.oran"
  facebook: "",         // ex : "https://www.facebook.com/tacoslocos.oran"
  address: "",          // ex : "Rue ..., Oran"   (adresse exacte)
  mapsQuery: "Oran, Algeria", // ex : "Tacos Locos, Rue ..., Oran" ou coordonnées "35.6971,-0.6308"
  hours: { fr: "", ar: "", en: "" }, // ex : { fr: "Tous les jours · 11h – 00h", ar: "...", en: "..." }
  whatsappMessage: {
    fr: "Bonjour Tacos Locos, je souhaite passer une commande.",
    ar: "مرحباً تاكوس لوكوس، أريد تقديم طلب.",
    en: "Hello Tacos Locos, I would like to place an order."
  },
  showDemoNotes: true,  // false = masquer les mentions "Menu de démonstration"
  defaultLang: "fr"
};

/* ---------------------------------------------------------
   2. MENU — données de DÉMONSTRATION (à remplacer)
   price: null  → affiche "Prix à confirmer"
   price: 650   → affiche "650 DA"
   img : identifiant Pexels OU chemin local, ex : "assets/images/menu/tacos-poulet.jpg"
   badge (optionnel) : { fr, ar, en }
   --------------------------------------------------------- */
const MENU = [
  {
    cat: "tacos", img: 23996340, price: null,
    name: { fr: "Tacos Poulet", ar: "تاكوس دجاج", en: "Chicken Tacos" },
    desc: { fr: "Galette grillée, poulet mariné, frites et sauce fromagère.", ar: "خبز مشوي، دجاج متبّل، بطاطا مقلية وصلصة الجبن.", en: "Grilled wrap, marinated chicken, fries and cheese sauce." }
  },
  {
    cat: "tacos", img: 36498704, price: null,
    name: { fr: "Tacos Viande hachée", ar: "تاكوس لحم مفروم", en: "Minced Beef Tacos" },
    desc: { fr: "Viande hachée assaisonnée, frites, fromage fondu.", ar: "لحم مفروم متبّل، بطاطا مقلية وجبن ذائب.", en: "Seasoned minced beef, fries and melted cheese." }
  },
  {
    cat: "tacos", img: 14253529, price: null,
    badge: { fr: "Signature", ar: "مميّز", en: "Signature" },
    name: { fr: "Tacos Mixte", ar: "تاكوس ميكس", en: "Mixed Tacos" },
    desc: { fr: "Poulet et viande hachée, frites et sauce maison.", ar: "دجاج ولحم مفروم، بطاطا مقلية وصلصة البيت.", en: "Chicken and minced beef, fries and house sauce." }
  },
  {
    cat: "burgers", img: 19119497, price: null,
    name: { fr: "Burger Classique", ar: "برغر كلاسيك", en: "Classic Burger" },
    desc: { fr: "Steak, cheddar, salade, tomate et sauce burger.", ar: "شريحة لحم، جبن شيدر، خس، طماطم وصلصة البرغر.", en: "Beef patty, cheddar, lettuce, tomato and burger sauce." }
  },
  {
    cat: "burgers", img: 37881956, price: null,
    name: { fr: "Chicken Burger", ar: "برغر دجاج", en: "Chicken Burger" },
    desc: { fr: "Poulet croustillant, crudités et sauce crémeuse.", ar: "دجاج مقرمش، خضار طازجة وصلصة كريمية.", en: "Crispy chicken, fresh veggies and creamy sauce." }
  },
  {
    cat: "burgers", img: 18987002, price: null,
    name: { fr: "Double Cheese", ar: "دبل تشيز", en: "Double Cheese" },
    desc: { fr: "Deux steaks, double cheddar, oignons et cornichons.", ar: "شريحتا لحم، جبن شيدر مضاعف، بصل ومخلل.", en: "Two patties, double cheddar, onions and pickles." }
  },
  {
    cat: "poulet", img: 14661492, price: null,
    name: { fr: "Wings", ar: "أجنحة دجاج", en: "Wings" },
    desc: { fr: "Ailes de poulet dorées, servies avec frites.", ar: "أجنحة دجاج ذهبية تُقدَّم مع البطاطا.", en: "Golden chicken wings served with fries." }
  },
  {
    cat: "poulet", img: 9650084, price: null,
    name: { fr: "Tenders", ar: "تندرز دجاج", en: "Chicken Tenders" },
    desc: { fr: "Filets de poulet panés et croustillants, sauce au choix.", ar: "قطع صدر دجاج مقرمشة مع صلصة حسب الاختيار.", en: "Crispy breaded chicken strips, choice of sauce." }
  },
  {
    cat: "sides", img: 39851023, price: null,
    name: { fr: "Frites", ar: "بطاطا مقلية", en: "Fries" },
    desc: { fr: "Frites dorées et croustillantes.", ar: "بطاطا مقلية ذهبية ومقرمشة.", en: "Golden, crispy fries." }
  },
  {
    cat: "sides", img: 5779487, price: null,
    name: { fr: "Frites sauce fromagère", ar: "بطاطا بصلصة الجبن", en: "Cheese Fries" },
    desc: { fr: "Frites nappées de sauce fromagère.", ar: "بطاطا مقلية مغطاة بصلصة الجبن.", en: "Fries topped with cheese sauce." }
  },
  {
    cat: "boissons", img: 37925075, price: null,
    name: { fr: "Sodas", ar: "مشروبات غازية", en: "Sodas" },
    desc: { fr: "Boissons gazeuses bien fraîches.", ar: "مشروبات غازية باردة.", en: "Ice-cold soft drinks." }
  },
  {
    cat: "boissons", img: 34959142, price: null,
    name: { fr: "Boisson fraîche", ar: "مشروب منعش", en: "Fresh Drink" },
    desc: { fr: "Une boisson fraîche pour accompagner votre repas.", ar: "مشروب منعش يرافق وجبتك.", en: "A refreshing drink to go with your meal." }
  }
];

/* ---------------------------------------------------------
   3. TRADUCTIONS (FR / AR / EN)
   --------------------------------------------------------- */
const I18N = {
  fr: {
    "meta.title": "Tacos Locos Oran | Tacos, Burgers & Fast-food à Oran",
    "skip": "Aller au menu",
    "nav.home": "Accueil", "nav.menu": "Menu", "nav.about": "À propos", "nav.gallery": "Galerie", "nav.contact": "Contact",
    "nav.cta": "Commander",
    "common.city": "Oran, Algérie",
    "hero.eyebrow": "Tacos · Burgers · Poulet — Oran",
    "hero.title": "Le goût qui vous rend accro.",
    "hero.text": "Tacos bien garnis, burgers et poulet croustillant. Une adresse fast-food à Oran, pour les vraies faims.",
    "cta.menu": "Voir le menu", "cta.find": "Nous trouver", "cta.order": "Commander / Contacter",
    "menu.kicker": "La carte", "menu.title": "Notre Menu",
    "menu.sub": "Tacos, burgers, poulet et accompagnements. Choisissez votre envie.",
    "filter.all": "Tous", "filter.tacos": "Tacos", "filter.burgers": "Burgers", "filter.poulet": "Poulet", "filter.sides": "Sides", "filter.boissons": "Boissons",
    "menu.price": "Prix à confirmer", "menu.order": "Commander",
    "menu.note": "Menu de démonstration — produits, descriptions et prix à confirmer avec le restaurant.",
    "about.kicker": "À propos", "about.title": "Le fast-food, version Locos.",
    "about.text1": "Une adresse à Oran pour les amateurs de tacos, burgers et fast-food.",
    "about.text2": "Une carte simple et gourmande, pensée pour ceux qui aiment les saveurs franches et les portions qui font plaisir.",
    "about.p1": "Des préparations simples, avec des produits frais.",
    "about.p2": "Des sauces et des recettes qui ont du caractère.",
    "about.p3": "Un service pensé pour aller à l'essentiel.",
    "why.kicker": "Pourquoi nous", "why.title": "Pourquoi Tacos Locos",
    "why.1t": "Des recettes gourmandes", "why.1d": "Tacos bien garnis, burgers et poulet croustillant : une carte faite pour les vraies faims.",
    "why.2t": "Service rapide", "why.2d": "Commandez, récupérez, dégustez. Simple et efficace.",
    "why.3t": "Une adresse facile à trouver", "why.3d": "À Oran, l'itinéraire est à un clic grâce à Google Maps.",
    "why.4t": "Pensé pour les fans de fast-food", "why.4d": "Une carte et une expérience imaginées pour les amateurs de street-food.",
    "gallery.kicker": "Galerie", "gallery.title": "Ça donne faim ?", "gallery.sub": "Un aperçu de l'univers Tacos Locos.",
    "gallery.note": "Photos d'illustration — à remplacer par les photos du restaurant.",
    "ctaBand.title": "Une petite faim ?", "ctaBand.text": "Passez nous voir à Oran ou contactez-nous pour passer commande.",
    "find.kicker": "Localisation", "find.title": "Nous trouver",
    "find.text": "Tacos Locos vous accueille à Oran. Lancez l'itinéraire directement depuis votre téléphone.",
    "find.btn": "Itinéraire", "find.open": "Ouvrir Google Maps", "find.hint": "Adresse exacte",
    "contact.kicker": "Contact", "contact.title": "Contact & horaires",
    "contact.sub": "Une question, une commande ? Appelez-nous ou écrivez-nous sur WhatsApp.",
    "contact.phone": "Téléphone", "contact.address": "Adresse", "contact.hours": "Horaires", "contact.call": "Appeler",
    "footer.tag": "Tacos, burgers & poulet à Oran.", "footer.nav": "Navigation", "footer.follow": "Suivez-nous", "footer.rights": "Tous droits réservés.",
    "bar.menu": "Menu",
    "tbc": "[À confirmer]",
    "toast.missing": "Ce lien sera actif dès l'ajout des coordonnées officielles.",
    "aria.open": "Ouvrir le menu", "aria.close": "Fermer le menu"
  },
  ar: {
    "meta.title": "تاكوس لوكوس وهران | تاكوس، برغر ووجبات سريعة في وهران",
    "skip": "الانتقال إلى القائمة",
    "nav.home": "الرئيسية", "nav.menu": "القائمة", "nav.about": "من نحن", "nav.gallery": "الصور", "nav.contact": "اتصل بنا",
    "nav.cta": "اطلب الآن",
    "common.city": "وهران، الجزائر",
    "hero.eyebrow": "تاكوس · برغر · دجاج — وهران",
    "hero.title": "طعمٌ يجعلك تعود دائماً.",
    "hero.text": "تاكوس محشو بسخاء، برغر ودجاج مقرمش. عنوانك للوجبات السريعة في وهران.",
    "cta.menu": "شاهد القائمة", "cta.find": "موقعنا", "cta.order": "اطلب / تواصل معنا",
    "menu.kicker": "قائمة الطعام", "menu.title": "قائمتنا",
    "menu.sub": "تاكوس، برغر، دجاج ومقبلات. اختر ما تشتهيه.",
    "filter.all": "الكل", "filter.tacos": "تاكوس", "filter.burgers": "برغر", "filter.poulet": "دجاج", "filter.sides": "مقبلات", "filter.boissons": "مشروبات",
    "menu.price": "السعر يُحدَّد لاحقاً", "menu.order": "اطلب",
    "menu.note": "قائمة تجريبية — المنتجات والأوصاف والأسعار تُؤكَّد مع المطعم.",
    "about.kicker": "من نحن", "about.title": "الوجبات السريعة على طريقة لوكوس.",
    "about.text1": "عنوان في وهران لعشّاق التاكوس والبرغر والوجبات السريعة.",
    "about.text2": "قائمة بسيطة وشهية، لمن يحب النكهات الواضحة والحصص التي تُشبع.",
    "about.p1": "تحضيرات بسيطة بمكوّنات طازجة.",
    "about.p2": "صلصات ووصفات ذات طابع مميّز.",
    "about.p3": "خدمة مصمَّمة لتكون سريعة وعملية.",
    "why.kicker": "لماذا نحن", "why.title": "لماذا تاكوس لوكوس",
    "why.1t": "وصفات شهية", "why.1d": "تاكوس محشو جيداً، برغر ودجاج مقرمش: قائمة لمن يشعر بالجوع الحقيقي.",
    "why.2t": "خدمة سريعة", "why.2d": "اطلب، استلم، واستمتع. بسيط وفعّال.",
    "why.3t": "عنوان سهل الوصول", "why.3d": "في وهران، الطريق إلينا بنقرة واحدة عبر خرائط Google.",
    "why.4t": "مصمَّم لعشّاق الوجبات السريعة", "why.4d": "قائمة وتجربة مخصّصة لمحبّي أكل الشارع.",
    "gallery.kicker": "الصور", "gallery.title": "هل جعت؟", "gallery.sub": "لمحة عن عالم تاكوس لوكوس.",
    "gallery.note": "صور توضيحية — تُستبدل بصور المطعم الحقيقية.",
    "ctaBand.title": "جائع قليلاً؟", "ctaBand.text": "زورونا في وهران أو تواصلوا معنا لتقديم طلبكم.",
    "find.kicker": "الموقع", "find.title": "موقعنا",
    "find.text": "تاكوس لوكوس في انتظاركم بوهران. افتح الاتجاهات مباشرة من هاتفك.",
    "find.btn": "الاتجاهات", "find.open": "فتح خرائط Google", "find.hint": "العنوان الدقيق",
    "contact.kicker": "اتصل بنا", "contact.title": "التواصل وأوقات العمل",
    "contact.sub": "سؤال أو طلب؟ اتصل بنا أو راسلنا عبر واتساب.",
    "contact.phone": "الهاتف", "contact.address": "العنوان", "contact.hours": "أوقات العمل", "contact.call": "اتصل",
    "footer.tag": "تاكوس، برغر ودجاج في وهران.", "footer.nav": "روابط", "footer.follow": "تابعونا", "footer.rights": "جميع الحقوق محفوظة.",
    "bar.menu": "القائمة",
    "tbc": "[يُؤكَّد لاحقاً]",
    "toast.missing": "سيُفعَّل هذا الرابط بعد إضافة معلومات الاتصال الرسمية.",
    "aria.open": "فتح القائمة", "aria.close": "إغلاق القائمة"
  },
  en: {
    "meta.title": "Tacos Locos Oran | Tacos, Burgers & Fast Food in Oran",
    "skip": "Skip to menu",
    "nav.home": "Home", "nav.menu": "Menu", "nav.about": "About", "nav.gallery": "Gallery", "nav.contact": "Contact",
    "nav.cta": "Order",
    "common.city": "Oran, Algeria",
    "hero.eyebrow": "Tacos · Burgers · Chicken — Oran",
    "hero.title": "The taste you'll keep coming back for.",
    "hero.text": "Loaded tacos, burgers and crispy chicken. A fast-food spot in Oran for serious appetites.",
    "cta.menu": "See the menu", "cta.find": "Find us", "cta.order": "Order / Contact",
    "menu.kicker": "The menu", "menu.title": "Our Menu",
    "menu.sub": "Tacos, burgers, chicken and sides. Pick your craving.",
    "filter.all": "All", "filter.tacos": "Tacos", "filter.burgers": "Burgers", "filter.poulet": "Chicken", "filter.sides": "Sides", "filter.boissons": "Drinks",
    "menu.price": "Price TBC", "menu.order": "Order",
    "menu.note": "Demo menu — items, descriptions and prices to be confirmed with the restaurant.",
    "about.kicker": "About", "about.title": "Fast food, the Locos way.",
    "about.text1": "A spot in Oran for tacos, burgers and fast-food lovers.",
    "about.text2": "A simple, generous menu for people who love bold flavors and satisfying portions.",
    "about.p1": "Simple recipes made with fresh ingredients.",
    "about.p2": "Sauces and recipes with real character.",
    "about.p3": "Service designed to get straight to the point.",
    "why.kicker": "Why us", "why.title": "Why Tacos Locos",
    "why.1t": "Indulgent recipes", "why.1d": "Loaded tacos, burgers and crispy chicken: a menu made for real hunger.",
    "why.2t": "Fast service", "why.2d": "Order, pick up, enjoy. Simple and efficient.",
    "why.3t": "Easy to find", "why.3d": "In Oran — directions are one tap away with Google Maps.",
    "why.4t": "Made for fast-food fans", "why.4d": "A menu and experience designed for street-food lovers.",
    "gallery.kicker": "Gallery", "gallery.title": "Hungry yet?", "gallery.sub": "A glimpse into the Tacos Locos world.",
    "gallery.note": "Illustration photos — to be replaced with the restaurant's own photos.",
    "ctaBand.title": "Feeling hungry?", "ctaBand.text": "Come see us in Oran or get in touch to place your order.",
    "find.kicker": "Location", "find.title": "Find us",
    "find.text": "Tacos Locos welcomes you in Oran. Start directions straight from your phone.",
    "find.btn": "Directions", "find.open": "Open Google Maps", "find.hint": "Exact address",
    "contact.kicker": "Contact", "contact.title": "Contact & hours",
    "contact.sub": "A question or an order? Call us or message us on WhatsApp.",
    "contact.phone": "Phone", "contact.address": "Address", "contact.hours": "Opening hours", "contact.call": "Call",
    "footer.tag": "Tacos, burgers & chicken in Oran.", "footer.nav": "Navigation", "footer.follow": "Follow us", "footer.rights": "All rights reserved.",
    "bar.menu": "Menu",
    "tbc": "[To be confirmed]",
    "toast.missing": "This link will be active once the official contact details are added.",
    "aria.open": "Open menu", "aria.close": "Close menu"
  }
};

/* =========================================================
   LOGIQUE — normalement, rien à modifier en dessous
   ========================================================= */
(() => {
  "use strict";

  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];

  let lang = CONFIG.defaultLang;
  let currentFilter = "all";
  const t = (key) => (I18N[lang] && I18N[lang][key]) || I18N.fr[key] || key;

  /* ---- Images : identifiant Pexels ou chemin local ---- */
  const imgUrl = (src, w) =>
    typeof src === "number"
      ? `https://images.pexels.com/photos/${src}/pexels-photo-${src}.jpeg?auto=compress&cs=tinysrgb&w=${w}`
      : src;

  /* ---- Rendu du menu ---- */
  const grid = $("#menuGrid");
  function renderMenu() {
    const items = MENU.filter((m) => currentFilter === "all" || m.cat === currentFilter);
    grid.innerHTML = items.map((m, i) => {
      const name = m.name[lang] || m.name.fr;
      const desc = m.desc[lang] || m.desc.fr;
      const price = m.price != null
        ? `<span class="dish-price">${m.price} DA</span>`
        : `<span class="dish-price tbc">${t("menu.price")}</span>`;
      const badge = m.badge ? `<span class="dish-badge">${m.badge[lang] || m.badge.fr}</span>` : "";
      const src = imgUrl(m.img, 640);
      const srcset = typeof m.img === "number" ? `srcset="${imgUrl(m.img, 400)} 400w, ${imgUrl(m.img, 640)} 640w"` : "";
      return `
        <article class="dish" style="animation-delay:${Math.min(i, 8) * 50}ms">
          <div class="dish-media">
            <img src="${src}" ${srcset} sizes="(min-width:960px) 33vw, (min-width:600px) 50vw, 124px"
                 alt="${name} — Tacos Locos Oran" loading="lazy" decoding="async" width="640" height="480">
            <span class="dish-tag">${t("filter." + m.cat)}</span>
            ${badge}
          </div>
          <div class="dish-body">
            <h3 class="dish-name">${name}</h3>
            <p class="dish-desc">${desc}</p>
            <div class="dish-foot">
              ${price}
              <a href="#contact" class="dish-add" aria-label="${t("menu.order")} : ${name}">
                <svg class="ico"><use href="#i-plus"/></svg>
              </a>
            </div>
          </div>
        </article>`;
    }).join("");
  }

  /* ---- Filtres ---- */
  $$(".filter").forEach((btn) => {
    btn.addEventListener("click", () => {
      currentFilter = btn.dataset.filter;
      $$(".filter").forEach((b) => {
        const on = b === btn;
        b.classList.toggle("is-active", on);
        b.setAttribute("aria-selected", on);
      });
      renderMenu();
      btn.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
    });
  });

  /* ---- Coordonnées / liens (depuis CONFIG) ---- */
  const toast = $("#toast");
  let toastTimer;
  function showToast(msg) {
    toast.textContent = msg;
    toast.classList.add("is-visible");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove("is-visible"), 3200);
  }

  function getLink(type) {
    const q = encodeURIComponent(CONFIG.mapsQuery);
    switch (type) {
      case "call": return CONFIG.phone ? `tel:${CONFIG.phone}` : "";
      case "whatsapp": return CONFIG.whatsapp
        ? `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(CONFIG.whatsappMessage[lang] || "")}` : "";
      case "instagram": return CONFIG.instagram;
      case "facebook": return CONFIG.facebook;
      case "directions": return `https://www.google.com/maps/dir/?api=1&destination=${q}`;
      case "maps": return `https://www.google.com/maps/search/?api=1&query=${q}`;
      default: return "";
    }
  }

  function applyConfig() {
    const tbc = t("tbc");
    const city = t("common.city");
    const set = (key, val) => $$(`[data-config="${key}"]`).forEach((el) => (el.textContent = val));

    set("phone", CONFIG.phoneDisplay || CONFIG.phone || tbc);
    set("address", CONFIG.address || city);
    set("addressHint", CONFIG.address ? city : `${t("find.hint")} ${tbc}`);
    set("addressFull", CONFIG.address ? `${CONFIG.address}` : `${city} — ${tbc}`);
    set("hours", (CONFIG.hours && CONFIG.hours[lang]) || CONFIG.hours.fr || tbc);

    $$("[data-link]").forEach((a) => {
      const url = getLink(a.dataset.link);
      if (url) { a.href = url; a.dataset.missing = ""; }
      else { a.href = "#contact"; a.dataset.missing = "1"; }
    });

    const map = $("#mapFrame");
    const newSrc = `https://maps.google.com/maps?q=${encodeURIComponent(CONFIG.mapsQuery)}&z=14&output=embed&hl=${lang}`;
    if (map && map.dataset.src !== newSrc) { map.src = newSrc; map.dataset.src = newSrc; }
  }

  document.addEventListener("click", (e) => {
    const a = e.target.closest('[data-link][data-missing="1"]');
    if (a) { e.preventDefault(); showToast(t("toast.missing")); }
  });

  /* ---- Langue ---- */
  function setLang(l) {
    if (!I18N[l]) l = "fr";
    lang = l;
    const html = document.documentElement;
    html.lang = l;
    html.dir = l === "ar" ? "rtl" : "ltr";
    document.title = t("meta.title");

    $$("[data-i18n]").forEach((el) => {
      const val = I18N[l][el.dataset.i18n];
      if (val != null) el.textContent = val;
    });
    $$(".lang-switch button").forEach((b) => b.setAttribute("aria-pressed", b.dataset.lang === l));
    burger.setAttribute("aria-label", nav.classList.contains("is-open") ? t("aria.close") : t("aria.open"));

    renderMenu();
    applyConfig();
    try { localStorage.setItem("tl-lang", l); } catch (_) {}
  }

  $$(".lang-switch button").forEach((b) => b.addEventListener("click", () => setLang(b.dataset.lang)));

  /* ---- Navigation mobile ---- */
  const header = $("#header");
  const nav = $("#nav");
  const burger = $("#burger");

  function toggleNav(open) {
    const isOpen = open ?? !nav.classList.contains("is-open");
    nav.classList.toggle("is-open", isOpen);
    header.classList.toggle("is-open", isOpen);
    burger.setAttribute("aria-expanded", isOpen);
    burger.setAttribute("aria-label", isOpen ? t("aria.close") : t("aria.open"));
    document.body.classList.toggle("no-scroll", isOpen);
  }
  burger.addEventListener("click", () => toggleNav());
  $$("#nav a").forEach((a) => a.addEventListener("click", () => toggleNav(false)));
  window.addEventListener("keydown", (e) => { if (e.key === "Escape") { toggleNav(false); closeLightbox(); } });
  window.matchMedia("(min-width: 960px)").addEventListener("change", (e) => { if (e.matches) toggleNav(false); });

  /* ---- Header au scroll + barre mobile ---- */
  const mobileBar = $("#mobileBar");
  const hero = $("#accueil");
  let ticking = false;
  function onScroll() {
    const y = window.scrollY;
    header.classList.toggle("is-scrolled", y > 20);
    const heroEnd = hero.offsetHeight * 0.75;
    const nearBottom = window.innerHeight + y >= document.body.scrollHeight - 40;
    mobileBar.classList.toggle("is-visible", y > heroEnd && !nearBottom);
    ticking = false;
  }
  window.addEventListener("scroll", () => {
    if (!ticking) { requestAnimationFrame(onScroll); ticking = true; }
  }, { passive: true });

  /* ---- Lien actif dans la nav ---- */
  const sectionMap = { accueil: "accueil", menu: "menu", apropos: "apropos", pourquoi: "apropos", galerie: "galerie", trouver: "contact", contact: "contact" };
  const navLinks = $$(".nav-link");
  const spy = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (en.isIntersecting) {
        const id = sectionMap[en.target.id];
        navLinks.forEach((l) => l.classList.toggle("is-active", l.getAttribute("href") === `#${id}`));
      }
    });
  }, { rootMargin: "-45% 0px -50% 0px" });
  Object.keys(sectionMap).forEach((id) => { const s = document.getElementById(id); if (s) spy.observe(s); });

  /* ---- Animations d'apparition ---- */
  const reveals = $$(".reveal");
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting) { en.target.classList.add("is-in"); io.unobserve(en.target); }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    reveals.forEach((el, i) => {
      el.style.transitionDelay = `${(i % 4) * 70}ms`;
      io.observe(el);
    });
  } else {
    reveals.forEach((el) => el.classList.add("is-in"));
  }

  /* ---- Lightbox galerie ---- */
  const lb = $("#lightbox");
  const lbImg = $(".lb-img", lb);
  const gItems = $$(".g-item");
  let lbIndex = 0;
  let lastFocus = null;

  function openLightbox(i) {
    lbIndex = (i + gItems.length) % gItems.length;
    const item = gItems[lbIndex];
    const img = $("img", item);
    lbImg.src = item.dataset.full || img.src;
    lbImg.alt = img.alt;
    if (lb.hidden) { lastFocus = document.activeElement; }
    lb.hidden = false;
    document.body.classList.add("no-scroll");
    $(".lb-close", lb).focus();
  }
  function closeLightbox() {
    if (lb.hidden) return;
    lb.hidden = true;
    lbImg.src = "";
    document.body.classList.remove("no-scroll");
    if (lastFocus) lastFocus.focus();
  }
  gItems.forEach((item, i) => item.addEventListener("click", () => openLightbox(i)));
  $(".lb-close", lb).addEventListener("click", closeLightbox);
  $(".lb-prev", lb).addEventListener("click", () => openLightbox(lbIndex - 1));
  $(".lb-next", lb).addEventListener("click", () => openLightbox(lbIndex + 1));
  lb.addEventListener("click", (e) => { if (e.target === lb) closeLightbox(); });
  window.addEventListener("keydown", (e) => {
    if (lb.hidden) return;
    if (e.key === "ArrowRight") openLightbox(lbIndex + 1);
    if (e.key === "ArrowLeft") openLightbox(lbIndex - 1);
  });
  // Swipe mobile
  let touchX = 0;
  lb.addEventListener("touchstart", (e) => { touchX = e.touches[0].clientX; }, { passive: true });
  lb.addEventListener("touchend", (e) => {
    const dx = e.changedTouches[0].clientX - touchX;
    if (Math.abs(dx) > 50) openLightbox(lbIndex + (dx < 0 ? 1 : -1));
  });

  /* ---- Divers ---- */
  if (!CONFIG.showDemoNotes) document.body.classList.add("demo-hidden");
  $("#year").textContent = new Date().getFullYear();

  /* ---- Init ---- */
  let saved = null;
  try { saved = localStorage.getItem("tl-lang"); } catch (_) {}
  const urlLang = new URLSearchParams(location.search).get("lang"); // ex : index.html?lang=ar
  setLang(urlLang || saved || CONFIG.defaultLang);
  onScroll();
})();
