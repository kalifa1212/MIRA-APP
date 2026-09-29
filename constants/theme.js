const COLORS = {
  // Palette autour de #f8b500
  primary: "#f8b500",       // Couleur principale (jaune/orangé)
  primaryDark: "#c28f00",   // Variante plus foncée
  primaryLight: "#ffcb33",  // Variante plus claire
  primaryLighter: "#ffe580", // Encore plus claire (pour les fonds)

  // Autres couleurs (peuvent être adaptées selon le besoin)
  secondary: "#444262",     // Peut être adapté en fonction du thème général
  tertiary: "#FF7754",      // Accent chaud

  // Nuances de gris pour le texte et les fonds
  gray: "#83829A",
  gray2: "#C1C0C8",

  // Blancs
  white: "#F3F4F8",
  lightWhite: "#FAFAFC",
};

const FONT = {
  regular: "DMRegular",
  medium: "DMMedium",
  bold: "DMBold",
};

const SIZES = {
  xSmall: 10,
  small: 12,
  medium: 16,
  large: 20,
  xLarge: 24,
  xxLarge: 32,
};

const SHADOWS = {
  small: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 2,
  },
  medium: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 5.84,
    elevation: 5,
  },
};

export { COLORS, FONT, SIZES, SHADOWS };
