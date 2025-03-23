// Create the context menu
chrome.runtime.onInstalled.addListener(() => {
  // Main menu
  chrome.contextMenus.create({
    id: "nihongoClick",
    title: "NihongoClick",
    contexts: ["selection"]
  });

  // Submenu: Vocabulary
  chrome.contextMenus.create({
    id: "vocabulary",
    parentId: "nihongoClick",
    title: "Vocabulary",
    contexts: ["selection"]
  });

  chrome.contextMenus.create({ id: "kotobank", parentId: "vocabulary", title: "Kotobank (JP-PT)", contexts: ["selection"] });
  chrome.contextMenus.create({ id: "alc", parentId: "vocabulary", title: "Eijirou (JP-EN)", contexts: ["selection"] });
  chrome.contextMenus.create({ id: "daijisen", parentId: "vocabulary", title: "Daijisen (Monolingual)", contexts: ["selection"] });
  chrome.contextMenus.create({ id: "weblioSynonyms", parentId: "vocabulary", title: "Weblio - Synonyms", contexts: ["selection"] });
  chrome.contextMenus.create({ id: "weblioAntonyms", parentId: "vocabulary", title: "Weblio - Antonyms", contexts: ["selection"] });

  // Submenu: Kanji (Jitenon)
  chrome.contextMenus.create({ id: "kanji", parentId: "nihongoClick", title: "Kanji", contexts: ["selection"] });
  chrome.contextMenus.create({ id: "jitenonEn", parentId: "kanji", title: "Jitenon (EN)", contexts: ["selection"] });
  chrome.contextMenus.create({ id: "jitenonJp", parentId: "kanji", title: "Jitenon (JP)", contexts: ["selection"] });

  // Submenu: Sentence Examples
  chrome.contextMenus.create({
    id: "sentences",
    parentId: "nihongoClick",
    title: "Sentence Examples",
    contexts: ["selection"]
  });

  chrome.contextMenus.create({ id: "nadeshiko", parentId: "sentences", title: "Nadeshiko", contexts: ["selection"] });
  chrome.contextMenus.create({ id: "immersionkit", parentId: "sentences", title: "ImmersionKit", contexts: ["selection"] });
  chrome.contextMenus.create({ id: "youglish", parentId: "sentences", title: "YouGlish", contexts: ["selection"] });
  chrome.contextMenus.create({ id: "sentencesearch", parentId: "sentences", title: "Sentence Search", contexts: ["selection"] });
  chrome.contextMenus.create({ id: "massif", parentId: "sentences", title: "Massif", contexts: ["selection"] });
  chrome.contextMenus.create({ id: "yourei", parentId: "sentences", title: "Yourei", contexts: ["selection"] });
});

// Handle click events
chrome.contextMenus.onClicked.addListener((info) => {
  const query = info.selectionText.trim();
  const encoded = encodeURIComponent(query);
  const quoted = `"${query}"`;
  const encodedQuoted = encodeURIComponent(quoted);
  let url = "";

  switch (info.menuItemId) {
    // Vocabulary
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

    // Sentence examples
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
            alert(`Kanji "${query}" not found in kanji_to_id.json.`);
            return;
          }

          let subpath = "";
          const numId = parseInt(id);
          if (numId <= 500) subpath = "kanji";
          else if (numId <= 12000) {
            const index = Math.floor((numId - 1) / 500);
            const letter = String.fromCharCode(97 + index);
            subpath = `kanji${letter}`;
          } else {
            subpath = "kanjiy";
          }

          const finalUrl = `https://kanji.jitenon.jp/${subpath}/${numId}`;
          chrome.tabs.create({ url: finalUrl });
        });
      return;
  }

  if (url) chrome.tabs.create({ url });
});
