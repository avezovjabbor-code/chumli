// 20 ta zamonaviy test savollari (HTML, CSS, JavaScript va IT asoslari)
const questionsData = [
  {
    id: 1,
    question: "HTML qisqartmasining to'liq ma'nosi nima?",
    options: [
      "Hyper Text Markup Language",
      "High Tech Modern Language",
      "Hyperlink and Text Model Language",
      "Home Tool Management Language"
    ],
    correctAnswer: 0,
    explanation: "HTML - 'Hyper Text Markup Language' bo'lib, veb-sahifalarning tuzilishi va mazmunini yaratish uchun ishlatiladigan belgilash tilidir."
  },
  {
    id: 2,
    question: "HTML5 da qaysi teg sahifaning asosiy navigatsiya havolalari qismini ifodalaydi?",
    options: [
      "<navigation>",
      "<nav>",
      "<menu>",
      "<navigate>"
    ],
    correctAnswer: 1,
    explanation: "HTML5 semantikasida asosiy sahifalararo yoki bo'limlararo menyular uchun <nav> tegi ishlatiladi."
  },
  {
    id: 3,
    question: "Veb-sahifada sarlavha uchun eng yuqori darajadagi (eng muhim) teg qaysi?",
    options: [
      "<h6>",
      "<head>",
      "<h1>",
      "<header>"
    ],
    correctAnswer: 2,
    explanation: "<h1> tegi sahifaning eng asosiy sarlavhasini belgilaydi va SEO hamda sahifa iyerarxiyasida 1-o'rinda turadi."
  },
  {
    id: 4,
    question: "Rasm qo'yishda rasm yuklanmay qolsa uning o'rniga chiqadigan matn qaysi atribut orqali beriladi?",
    options: [
      "title",
      "alt",
      "src",
      "description"
    ],
    correctAnswer: 1,
    explanation: "<img> tegining 'alt' (alternative text) atributi rasm yuklanmaganda va ko'zi ojizlar uchun ekran o'qigichlarda matnni ko'rsatishga xizmat qiladi."
  },
  {
    id: 5,
    question: "CSS qisqartmasining to'liq ma'nosi nima?",
    options: [
      "Creative Style Sheets",
      "Cascading Style Sheets",
      "Computer Style Structure",
      "Colorful Styling System"
    ],
    correctAnswer: 1,
    explanation: "CSS - 'Cascading Style Sheets' (Kaskadli uslublar jadvallari) bo'lib, HTML elementlarining tashqi ko'rinishini bezatish uchun xizmat qiladi."
  },
  {
    id: 6,
    question: "CSS da elementning ichki bo'shlig'i (content va border orasidagi masofa) qaysi xususiyat bilan beriladi?",
    options: [
      "margin",
      "padding",
      "border-spacing",
      "gap"
    ],
    correctAnswer: 1,
    explanation: "'padding' - bu element tarkibi (content) va uning chegarasi (border) orasidagi ichki bo'shliqdir. 'margin' esa tashqi bo'shliq hisoblanadi."
  },
  {
    id: 7,
    question: "Flexbox tizimida elementlarni asosiy o'q (main-axis) bo'yicha markazlashtirish uchun qaysi CSS xususiyati ishlatiladi?",
    options: [
      "align-items: center;",
      "justify-content: center;",
      "text-align: center;",
      "align-content: center;"
    ],
    correctAnswer: 1,
    explanation: "Flexbox da asosiy o'q (main-axis) bo'ylab elementlarni tekislash uchun 'justify-content' xususiyati ishlatiladi."
  },
  {
    id: 8,
    question: "JavaScript da o'zgarmas (qiymatini qayta o'zgartirib bo'lmaydigan) o'zgaruvchi e'lon qilish uchun qaysi kalit so'z ishlatiladi?",
    options: [
      "let",
      "var",
      "const",
      "static"
    ],
    correctAnswer: 2,
    explanation: "'const' kalit so'zi o'zgarmas o'zgaruvchi e'lon qilish uchun mo'ljallangan va unga yangi ibtidoiy qiymat qayta yuklanishi mumkin emas."
  },
  {
    id: 9,
    question: "JavaScript da `typeof [1, 2, 3]` amali qanday natija qaytaradi?",
    options: [
      "\"array\"",
      "\"object\"",
      "\"list\"",
      "\"undefined\""
    ],
    correctAnswer: 1,
    explanation: "JavaScript da massivlar (array) aslida obyekt (object) turining bir shaklidir, shuning uchun `typeof []` har doim 'object' qaytaradi."
  },
  {
    id: 10,
    question: "JavaScript da DOM elementini ID si orqali tanlab olishning eng keng tarqalgan usuli qaysi?",
    options: [
      "document.getElementByName()",
      "document.getElementById()",
      "document.querySelectorId()",
      "document.findElement()"
    ],
    correctAnswer: 1,
    explanation: "`document.getElementById('id_nomi')` usuli HTML sahifadagi ma'lum ID ga ega elementni tanlab olishning eng tezkor va standart usulidir."
  },
  {
    id: 11,
    question: "HTML formasida kiritish maydoniga foydalanuvchidan parol so'rash uchun <input> tegiga qaysi type beriladi?",
    options: [
      "type=\"text\"",
      "type=\"hidden\"",
      "type=\"password\"",
      "type=\"secret\""
    ],
    correctAnswer: 2,
    explanation: "<input type=\"password\"> yozilgan kiritish maydonidagi belgilar nuqta yoki yulduzcha ko'rinishida yashiriladi."
  },
  {
    id: 12,
    question: "CSS da elementni sahifadagi boshqa elementlarning ustiga chiqarish (qatlam tartibini belgilash) uchun nima ishlatiladi?",
    options: [
      "float",
      "z-index",
      "layer-order",
      "display"
    ],
    correctAnswer: 1,
    explanation: "'z-index' xususiyati joylashuvi (position) relative, absolute, fixed yoki sticky bo'lgan elementlarning vertikal qatlamini belgilaydi."
  },
  {
    id: 13,
    question: "JavaScript da `===` (qattiq tenglik) operatorining `==` (erkin tenglik) dan asosiy farqi nimada?",
    options: [
      "Faqat matnlarni taqqoslaydi",
      "Taqqoslashda turlarni avtomatik o'zgartiradi",
      "Qiymat bilan bir qatorda ma'lumot turini ham tekshiradi",
      "Hech qanday farqi yo'q"
    ],
    correctAnswer: 2,
    explanation: "`===` operatori nafaqat qiymatni, balki ma'lumot turini (data type) ham solishtiradi va avtomatik tur o'zgartirish (type coercion) qilmaydi."
  },
  {
    id: 14,
    question: "HTML da yangi oynada/tabda ochiladigan havola (link) yaratish uchun qaysi atribut ishlatiladi?",
    options: [
      "target=\"_blank\"",
      "target=\"_new\"",
      "open=\"new\"",
      "window=\"blank\""
    ],
    correctAnswer: 0,
    explanation: "<a href=\"...\" target=\"_blank\"> havolani brauzerning yangi oynasida yoki yangi sahifasida (tab) ochadi."
  },
  {
    id: 15,
    question: "JavaScript da massivning barcha elementlari bo'ylab aylanib chiqish uchun qaysi zamonaviy massiv metodi ishlatiladi?",
    options: [
      "array.forEach()",
      "array.iterate()",
      "array.loop()",
      "array.each()"
    ],
    correctAnswer: 0,
    explanation: "`array.forEach((item) => { ... })` massivdagi har bir element uchun berilgan funksiyani bajaradi."
  },
  {
    id: 16,
    question: "CSS da ekran o'lchamlari o'zgarganda (masalan, telefon va kompyuter) moslashuvchan dizayn qilish uchun nima ishlatiladi?",
    options: [
      "@keyframes",
      "@media queries",
      "@import",
      "@supports"
    ],
    correctAnswer: 1,
    explanation: "@media qoidalari (media queries) ekran kengligi, balandligi yoki ekran turiga qarab turli xil CSS uslublarini qo'llash imkonini beradi."
  },
  {
    id: 17,
    question: "JavaScript da `null` bilan `undefined` ning asosiy farqi nima?",
    options: [
      "`null` bu mavjud bo'lmagan o'zgaruvchi, `undefined` esa raqam",
      "`null` qasddan bo'sh qilib belgilangan qiymat, `undefined` esa hali qiymat berilmaganlikni bildiradi",
      "Ikkalasi mutlaqo bir xil",
      "`undefined` bu obyekt, `null` esa funksiya"
    ],
    correctAnswer: 1,
    explanation: "'undefined' - o'zgaruvchi e'lon qilingan lekin qiymat berilmagan holat. 'null' esa dasturchi tomonidan ataylab 'qiymat yo'q' deb berilgan qiymatdir."
  },
  {
    id: 18,
    question: "HTML jadvalida (table) qatorni yaratish uchun qaysi teg ishlatiladi?",
    options: [
      "<td>",
      "<th>",
      "<tr>",
      "<row>"
    ],
    correctAnswer: 2,
    explanation: "<tr> - 'table row' so'zidan olingan bo'lib, jadvaldagi gorizontal qatorni hosil qiladi."
  },
  {
    id: 19,
    question: "JavaScript brauzer xotirasida ma'lumotlarni sessiya tugagandan keyin ham saqlab qolish uchun nima ishlatiladi?",
    options: [
      "sessionStorage",
      "localStorage",
      "memoryCache",
      "tempStorage"
    ],
    correctAnswer: 1,
    explanation: "`localStorage` brauzer yopilib ochilganda ham ma'lumotlarni saqlab qoladi (muddatsiz xotira). `sessionStorage` esa oyna yopilishi bilan o'chadi."
  },
  {
    id: 20,
    question: "CSS Grid da qator va ustunlar orasidagi masofani qisqa va qulay belgilash uchun qaysi xususiyat ishlatiladi?",
    options: [
      "gap",
      "spacing",
      "grid-margin",
      "cell-padding"
    ],
    correctAnswer: 0,
    explanation: "'gap' (yoki 'row-gap' va 'column-gap') Grid hamda Flexbox konteynerlarida elementlar orasidagi masofani belgilaydi."
  }
];
