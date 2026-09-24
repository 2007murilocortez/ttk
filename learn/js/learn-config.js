window.LEARN_CONFIG = {
  ds24: {
    // Front — produto 736912 (€27)
    front: "https://www.checkout-ds24.com/product/736912/",
    // Upsells: colar checkout URL de cada produto DS24 (ver comentários abaixo)
    up1: "https://www.checkout-ds24.com/product/737299/",
    up2: "",
    up3: "",
  },
  prices: {
    front: 27,
    up1: 19.9,
    up2: 25.58,
    up3: 33.77,
  },
  pages: {
    up1: "/learn/up1.2/",
    up2: "/learn/up2.2/",
    up3: "/learn/up3.2/",
    final: "/learn/final/",
  },
  // Thank you único DS24 → roteador /obrigado/ (Append order data = Yes)
  thankYouUrl: "https://www.plancreateur.online/obrigado/",
  /*
   * Painel DS24 — por produto:
   *
   * FRONT 736912
   *   Thank you URL: https://www.plancreateur.online/obrigado/
   *   (sem step → /learn/merci/ + Purchase TikTok)
   *
   * UP1 (criar produto ~€19,90)
   *   Thank you URL: https://www.plancreateur.online/obrigado/?step=up1
   *   → redireciona para /learn/up2.2/
   *
   * UP2 (~€25,58)
   *   Thank you URL: https://www.plancreateur.online/obrigado/?step=up2
   *   → /learn/up3.2/
   *
   * UP3 (~€33,77)
   *   Thank you URL: https://www.plancreateur.online/obrigado/?step=up3
   *   → /learn/final/
   */
};
