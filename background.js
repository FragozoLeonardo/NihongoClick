// Cria o menu de contexto
chrome.runtime.onInstalled.addListener(() => {
  // Menu principal
  chrome.contextMenus.create({
    id: "nihongoClick",
    title: "NihongoClick",
    contexts: ["selection"]
  });

  // Submenu: Vocabulário
  chrome.contextMenus.create({
    id: "vocabulario",
    parentId: "nihongoClick",
    title: "Vocabulário",
    contexts: ["selection"]
  });

  chrome.contextMenus.create({ id: "kotobank", parentId: "vocabulario", title: "Kotobank (JP-PT)", contexts: ["selection"] });
  chrome.contextMenus.create({ id: "alc", parentId: "vocabulario", title: "英辞郎 (JP-EN)", contexts: ["selection"] });
  chrome.contextMenus.create({ id: "daijisen", parentId: "vocabulario", title: "大辞泉 (Monolingual)", contexts: ["selection"] });
  chrome.contextMenus.create({ id: "weblioSynonyms", parentId: "vocabulario", title: "Weblio - Quase-sinônimos", contexts: ["selection"] });
  chrome.contextMenus.create({ id: "weblioAntonyms", parentId: "vocabulario", title: "Weblio - Antônimos", contexts: ["selection"] });

  // Submenu: Kanji (Jitenon)
  chrome.contextMenus.create({ id: "kanji", parentId: "nihongoClick", title: "Kanji", contexts: ["selection"] });
  chrome.contextMenus.create({ id: "jitenonEn", parentId: "kanji", title: "Jitenon (EN)", contexts: ["selection"] });
  chrome.contextMenus.create({ id: "jitenonJp", parentId: "kanji", title: "Jitenon (JP)", contexts: ["selection"] });

  // Submenu: Exemplos de Frases
  chrome.contextMenus.create({
    id: "sentencas",
    parentId: "nihongoClick",
    title: "Exemplos de Frases",
    contexts: ["selection"]
  });

  chrome.contextMenus.create({ id: "nadeshiko", parentId: "sentencas", title: "Nadeshiko", contexts: ["selection"] });
  chrome.contextMenus.create({ id: "immersionkit", parentId: "sentencas", title: "ImmersionKit", contexts: ["selection"] });
  chrome.contextMenus.create({ id: "youglish", parentId: "sentencas", title: "YouGlish", contexts: ["selection"] });
  chrome.contextMenus.create({ id: "sentencesearch", parentId: "sentencas", title: "Sentence Search", contexts: ["selection"] });
  chrome.contextMenus.create({ id: "massif", parentId: "sentencas", title: "Massif", contexts: ["selection"] });
  chrome.contextMenus.create({ id: "yourei", parentId: "sentencas", title: "Yourei", contexts: ["selection"] });
});

// Ação ao clicar
chrome.contextMenus.onClicked.addListener((info) => {
  const query = info.selectionText.trim();
  const encoded = encodeURIComponent(query);
  const quoted = `"${query}"`;
  const encodedQuoted = encodeURIComponent(quoted);
  let url = "";

  switch (info.menuItemId) {
    // Vocabulário
    case "kotobank":
      url = `https://kotobank.jp/japtword/${encoded}`;
      break;
    case "alc":
      url = `https://eow.alc.co.jp/search?q=${encoded}`;
      break;
    case "daijisen":
      url = `https://dictionary.goo.ne.jp/word/${encoded}/`;
      break;
    case "weblioSynonyms":
      url = `https://thesaurus.weblio.jp/content/${encoded}`;
      break;
    case "weblioAntonyms":
      url = `https://thesaurus.weblio.jp/antonym/content/${encoded}`;
      break;

    // Frases
    case "nadeshiko":
      url = `https://nadeshiko.co/search/sentence?query=${encodedQuoted}`;
      break;
    case "immersionkit":
      url = `https://v2.immersionkit.com/search?keyword=${encoded}`;
      break;
    case "youglish":
      url = `https://youglish.com/pronounce/${encodedQuoted}/japanese`;
      break;
    case "sentencesearch":
      url = `https://sentencesearch.neocities.org/#${encoded}`;
      break;
    case "massif":
      url = `https://massif.la/ja/search?q=${encodedQuoted}`;
      break;
    case "yourei":
      url = `https://yourei.jp/${encoded}`;
      break;

    // Kanji - Jitenon
    case "jitenonEn":
      url = `https://www.jitenon.com/kanji/${encoded}.html`;
      break;

    case "jitenonJp":
      fetch(chrome.runtime.getURL("kanji_to_id.json"))
        .then((res) => res.json())
        .then((kanjiMap) => {
          const id = kanjiMap[query];
          if (!id) {
            alert(`Kanji 「${query}」 não encontrado no arquivo kanji_to_id.json.`);
            return;
          }

          let subpath = "";
          const numId = parseInt(id);
          if (numId <= 500) subpath = "kanji";
          else if (numId <= 12000) {
            const index = Math.floor((numId - 1) / 500);
            const letter = String.fromCharCode(97 + index);
            subpath = `kanji${letter}`;
          } else subpath = "kanjiy";

          const finalUrl = `https://kanji.jitenon.jp/${subpath}/${numId}`;
          chrome.tabs.create({ url: finalUrl });
        });
      return;
  }

  if (url) chrome.tabs.create({ url });
});
