# 🍝 La Bella Vita - Restaurant Italien

Site vitrine professionnel et moderne pour un restaurant italien authentique.

![La Bella Vita](https://img.shields.io/badge/Restaurant-Italien-8B1538?style=for-the-badge)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

## ✨ Fonctionnalités

### 🎯 Interactivité Avancée
- **Modales détaillées** pour chaque plat avec photos HD, descriptions complètes, ingrédients et allergènes
- **Lightbox interactive** pour la galerie photo avec navigation au clavier
- **Animations fluides** au scroll avec Intersection Observer
- **Preloader élégant** au chargement de la page
- **Notifications toast** stylées pour les interactions

### 🎨 Design Moderne
- Palette de couleurs sophistiquée : Rouge bordeaux, crème et or
- Glassmorphism et dégradés élégants
- Effets parallax sur les sections hero et galerie
- Particules dorées sur les plats signature
- Transitions et animations subtiles partout

### 📱 100% Responsive
- Design mobile-first
- Navigation hamburger pour mobile
- Grilles adaptatives (CSS Grid & Flexbox)
- Optimisations tactiles pour tablettes et smartphones

### 🚀 Performance
- Lazy loading des images
- Code optimisé et commenté
- Intersection Observer pour les animations
- Preloader pour masquer le chargement initial

## 📋 Structure du Site

1. **Hero Section** - Image de fond immersive avec call-to-action
2. **À Propos** - Histoire du restaurant avec badges de qualité
3. **Menu Interactif** - Entrées, plats, desserts et boissons (tous cliquables !)
4. **Galerie Photo** - 8 photos professionnelles avec lightbox
5. **Témoignages** - Avis clients avec système d'étoiles
6. **Réservation** - Méthodes de contact multiples
7. **Contact** - Formulaire, informations et carte Google Maps
8. **Footer** - Liens, réseaux sociaux et informations pratiques

## 🎯 Highlights Techniques

- **Modales personnalisées** : Cliquez sur n'importe quel plat pour voir tous les détails
- **Lightbox avancée** : Navigation avec flèches, fermeture avec Échap
- **Animations au scroll** : Tous les éléments apparaissent progressivement
- **Effet parallax** : Profondeur visuelle sur les sections hero et galerie
- **Message de bienvenue** : Personnalisé selon l'heure de la journée
- **Easter egg** : Triple-clic sur le logo pour une surprise ! 🎉

## 🛠️ Technologies

- **HTML5 sémantique** - Structure claire et accessible
- **CSS3 moderne** - Variables CSS, Grid, Flexbox, animations
- **JavaScript Vanilla** - ES6+, Intersection Observer, API moderne
- **Google Fonts** - Playfair Display (titres) et Lato (texte)
- **Font Awesome 6** - Icônes professionnelles
- **Unsplash** - Images haute qualité

## 📦 Installation

1. Clonez le repository :
```bash
git clone https://github.com/votre-username/la-bella-vita.git
```

2. Ouvrez `index.html` dans votre navigateur

C'est tout ! Aucune dépendance à installer. 🎉

## 🎨 Personnalisation

### Couleurs
Modifiez les variables CSS dans `style.css` :
```css
:root {
    --color-burgundy: #8B1538;
    --color-cream: #F5F1E8;
    --color-gold: #D4AF37;
}
```

### Contenu
- **Plats** : Ajoutez des `data-*` attributes sur les `.menu-item`
- **Images** : Remplacez les URLs Unsplash par vos propres images
- **Textes** : Modifiez directement dans `index.html`

## 📱 Responsive Breakpoints

- **Mobile** : < 768px
- **Tablette** : 768px - 1024px
- **Desktop** : > 1024px

## 🌟 Fonctionnalités Avancées

### Modale de Plat
Chaque plat du menu est cliquable et affiche :
- Photo haute qualité
- Description détaillée
- Liste des ingrédients
- Allergènes
- Prix
- Badge spécial (Chef's Special, Premium, etc.)

### Lightbox Galerie
- Clic sur une image pour l'agrandir
- Navigation avec flèches (← →) ou boutons
- Fermeture avec Échap ou clic sur le fond
- Légendes pour chaque image

### Système de Notifications
Messages toast élégants pour :
- Commandes de plats
- Soumission de formulaire
- Message de bienvenue personnalisé

## 🎯 Compatibilité

- ✅ Chrome, Firefox, Safari, Edge (dernières versions)
- ✅ iOS Safari, Chrome Mobile
- ✅ Tous les appareils (desktop, tablette, mobile)

## 📄 Licence

Ce projet est sous licence MIT. Vous êtes libre de l'utiliser pour vos projets personnels ou commerciaux.

## 👨‍💻 Auteur

Créé avec ❤️ et [Claude Code](https://claude.com/claude-code)

---

**Note** : Ce site est un exemple de démonstration. Pour un usage en production, pensez à :
- Ajouter un backend pour le formulaire de contact
- Implémenter un vrai système de réservation
- Optimiser les images pour le web
- Ajouter Google Analytics ou similaire
- Mettre en place un certificat SSL
