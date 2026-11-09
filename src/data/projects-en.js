// English version of the texts in projects.js (botão PT · EN, pedido da Emilly em 05/11). Same keys as the Portuguese:
// a project, chapter or field missing here stays in Portuguese. When a project or a text changes in projects.js,
// update it here too. capitulos[i].alts follows the order of the chapter's midias.
export const areasEn = {
  identidade: 'Brand <em>identity</em>',
  web: 'Web &amp; <em>UX/UI</em>',
  social: 'Social &amp; <em>print</em>',
  fotografia: 'Photo<em>graphy</em>',
  produtos: 'Custom <em>products</em>',
};

export const projectsEn = {
  'formatura-babi': {
    category: 'Brand identity',
    detail: 'Crest, monogram and graduation kit in burgundy and gold',
    resumo: 'Brand identity for Babi’s Biochemistry graduation. The concept is “science that blooms”: an Art Nouveau crest in an engraving line, where DNA becomes a branch, molecules become little berries and a butterfly closes a cycle. BS monogram, a burgundy and gold palette, five illustrations, a pattern and the party kit. I presented the proposal as a website instead of a PDF, so Babi could live the brand before approving it.',
    entregas: ['Monogram', 'Crest', 'Palette', 'Typography', '5 illustrations', 'Pattern', 'Party kit', 'Proposal website'],
    colaboracao: {
      cargo: 'Designer, filmmaker and creative director',
      fotoAlt: 'Cauã Dorn sitting in a leather armchair',
      texto: 'There’s no split of tasks to tell here: Cauã and I did everything together, from the first sketch of the crest to the template that went to the supplier. Concept, illustration, kit and presentation went through both our hands, and the case is published in both portfolios.',
      botao: 'See the case on Cauã’s website',
      link: 'Cauã’s website',
    },
    capitulos: [
      { rotulo: 'The concept', titulo: 'Science <em>that blooms</em>', texto: 'Every detail of the crest holds a piece of her story: science, the lab, graduation and the path. DNA becomes a branch, molecules become little berries and the butterfly closes the cycle.', alts: ['the crest coming together piece by piece'] },
      { rotulo: 'The monogram', titulo: 'How the <em>signature</em> was born', texto: 'Two parts that, together, tell who she is: the monogram drawn with a nib pen and the Art Nouveau medallion. The S grows out of the curve of the B and ends in a little branch with molecules, and the stem of the B is the module that measures the whole drawing.', alts: ['the monogram and the medallion coming together', 'construction of the BS on the grid', 'the versions: burgundy on cream, cream on wine and one color', 'card with the crest in hand', 'wax seal with the monogram'] },
      { rotulo: 'Colors and typography', titulo: 'Burgundy <em>and gold</em>', texto: 'Burgundy leads. Silver shows up on the pieces, cream gives breathing room and gold, her favorite color, comes in only as highlights. For type, a classic serif for the name and titles and a simple modern face for everything else.', alts: ['palette: dark wine, burgundy, rosé, gold, silver and cream', 'typography: Cormorant Garamond and Instrument Sans'] },
      { rotulo: 'Pattern and illustrations', titulo: 'The drawing <em>that repeats</em>', texto: 'Art Nouveau branches in a fine engraving line, with her symbols in the middle: the orchid from her tattoo, the lab’s Erlenmeyer flask, DNA, the party’s disco ball and the books from her years of study. The pattern repeats seamlessly and goes on the flip-flops, the cup and the bookmark.', alts: ['the seamless pattern', 'the five illustrations: orchid, Erlenmeyer flask, DNA, disco ball and books', 'the illustrations as stickers'] },
      { rotulo: 'The party kit', titulo: 'The brand <em>at the party</em>', texto: 'A box with a gold seal, coasters, ribbon, tote bag, flip-flops, hangover kit, cups, bookmark and pouch: always the same drawing, in burgundy, cream, silver and gold.', alts: ['velvet box with the embossed crest and a gold seal', 'coasters with the illustrations', 'satin ribbon with the name', 'tote bag, flip-flops, cup and bookmark', 'hangover kit and flip-flops', 'party cups and bookmark', 'light and dark pouches', 'envelope with a wax seal'] },
      { rotulo: 'The presentation', titulo: 'The proposal <em>as a website</em>', texto: 'Instead of a PDF, Babi got a website: the whole brand presented on a single page, with a crest made of particles that turn into gold dust when the mouse goes by.', alts: ['the proposal website on a computer', 'the proposal website on a phone'], botao: 'Open the proposal website' },
    ],
  },
  'maria-valentina': {
    category: 'Branding',
    detail: 'Brand identity for a psychologist',
    resumo: 'A brand for a psychologist who needed to convey clinical authority without losing warmth. I stayed away from the cold look of a doctor’s office: an MV monogram, the name in a script font and an earthy palette of blue, brown and sand. I took the identity to a sign, business cards, stationery and a logo animation.',
  },
  idex: {
    category: 'Branding',
    detail: 'Brand identity for a credit platform',
    resumo: 'Identity for a credit platform built on technology and data. The symbol joins two angular shapes inside a diamond that recall a chip, and the way they fit together suggests movement. I put together the brand guide with a construction grid, purple as the main color, Futura and Inter, and the usage rules.',
  },
  i3cred: {
    category: 'Branding',
    detail: 'Brand identity for a credit company',
    resumo: 'I put together I3Cred’s basic brand guide: the symbol that joins the “i” and the “3”, the logo versions, the brand’s yellow and black and Gotham as the typeface. Then I took the brand to business cards, a notebook, a tablet, a mug, a tote bag, a book and a billboard.',
  },
  'x3-promotora-site': {
    category: 'Web design',
    detail: 'Corporate website for a credit broker',
    resumo: 'I designed the website for X3 Promotora, which connects banking agents to the biggest banks in Brazil. A dark background, electric blue and 3D icons present the credit solutions, the Full Consig 2.0 platform, the map of the states where it operates, its strengths, payroll credit (CLT) and support, always leading to “Become a partner”.',
  },
  'cf-promotora-site': {
    category: 'Web design',
    detail: 'Corporate website for a payroll credit broker',
    resumo: 'I designed the website for CF Promotora, part of Grupo CREDFRANCO, which bridges banking agents and banks in payroll agreements. The page speaks to people who want to become partners: agreements by category, payroll credit (CLT) in the spotlight, the products, why to partner up and the sign-up form at the end, in the brand’s navy blue and yellow.',
  },
  'idex-site': {
    category: 'Web design',
    detail: 'Corporate website for a credit fintech',
    resumo: 'I designed the corporate website for IDex Brasil, a fintech specialized in payroll credit (CLT). The identity goes to the web with a dark background, the brand’s purple and short sections: what the company does, its four pillars and payroll credit.',
  },
  'i3cred-site': {
    category: 'Web design',
    detail: 'Corporate website for a credit company',
    resumo: 'I designed the website for I3Cred, which helps people choose the right credit with human support. I organized the page so people understand their options before talking to anyone: solutions by type of credit, how it works in 4 steps, partner banks, testimonials and FAQ, with the brand’s yellow and black and WhatsApp always at hand.',
  },
  'ems-social': {
    category: 'Social media',
    detail: 'My designer Instagram · @itsemsdesign',
    resumo: 'My Instagram is where I talk about design my way: with humor, opinions and a bit of who I am off-screen. It’s where I talk to people who want a brand with personality.',
    anelTitulo: 'Busy being creative',
    carrosseis: ['CPF x CNPJ', 'Minimalism became an excuse'],
  },
  'idex-social': {
    category: 'Social media',
    detail: 'Instagram posts and carousels · payroll credit',
    resumo: 'Posts, carousels and Reels for IDex Brasil’s Instagram. The idea was to explain payroll credit (CLT) in a simple way (who can apply, how the journey works, why the operation is different) in the brand’s own language: dark background, purple, the 3D symbol and short headlines.',
    reels: ['Do you know how your race to Punta Cana is going?'],
  },
  'i3cred-social': {
    category: 'Social media',
    detail: 'Instagram posts and carousels · payroll credit',
    resumo: 'I3Cred is a payroll-deductible credit company, and the challenge was to talk to formally employed workers, a lower-middle-class audience, in a close way and without legal jargon. I put people who work every day at the center (gas station attendant, security guard, cook, factory worker), talked about end-of-month bills and the plans that are waiting, and used the brand’s yellow and black to make payroll credit easy to understand and to request on WhatsApp.',
  },
  'dr-pedro-caetano': {
    category: 'Social media',
    detail: 'Posts, carousels and stories for a cardiologist',
    resumo: 'Content for Dr. Pedro Caetano’s Instagram, a cardiologist: posts, carousels and stories about prevention, training and heart health, plus dates of the year like Mother’s Day, Father’s Day and Pink October. All in the brand’s wine and red, with strong photos and a clear invitation to book a check-up.',
  },
  credfranco: {
    category: 'Social media',
    detail: 'Posts, carousels and stories for a credit broker',
    resumo: 'Content for the Instagram of Credfranco, a credit broker that talks to partners all over Brazil. The posts, carousels and stories present the products (Home Equity, Car Equity, VEX, Full Consig, payroll credit, agreements) and talk about portfolio, service and after-sales, plus dates like Yellow September and Pink October. All in the brand’s red and blue, with a light background and 3D elements.',
  },
  'topo-do-mundo': {
    category: 'Social media',
    detail: 'Winter and Black Friday campaigns for a restaurant',
    resumo: 'Reels, stories and posts for Topo do Mundo. For Black Friday, Reels with fondue for two, the view and a countdown of the last hours. For World Wine Tourism Day, a Reel with the Brazilian wines from the cellar. In winter, the fondue sequence with 40% off, the house Merlot in a special edition and an invitation to book. I used the sunset and the city view to sell the experience, with serif headlines and short calls to action.',
    reels: ['Black Friday warm-up: fondue for two', 'Black Friday at Topo', 'Last hours of Black Friday', 'World Wine Tourism Day: Brazilian wines from the cellar'],
  },
  '4d-social': {
    category: 'Social media',
    detail: 'Brand Reels for 4D’s Instagram',
    resumo: 'Reels for 4D’s Instagram about the value of a brand: what would happen if it disappeared tomorrow and how it communicates at every touchpoint, from the website to customer service, from packaging to after-sales. I used 4D’s blue, 3D glass icons and interface screens to show each touchpoint, with short lines that end in “Talk to 4D”.',
    reels: ['If your brand disappeared tomorrow, would anyone notice?', 'Every company has an invisible marketing'],
  },
  'vitoria-regia': {
    category: 'Social media',
    detail: 'Motion carousel · design challenge for Badauê',
    resumo: 'A carousel I created for a hiring process at Badauê. The challenge was to make a new layout for the post about the giant water lily (vitória-régia), with the same copy and theme, in 7 slides and with motion on the cover. I took the story to the night, on the lake, with the moon and the plant in cut paper, to bring legend, history and science together in a single piece.',
    entregas: ['7-slide carousel', 'Cover motion', 'Art direction'],
    carrosseis: ['The whole carousel'],
    capitulos: [
      { rotulo: 'The challenge', titulo: 'Motion <em>on the cover</em>', texto: 'The cover opens on the lake at night, with the moon, and the title appears over the leaves. On the next slide, the bird standing on the leaf shows the size of the plant.', alts: ['animated cover, the lake at night and the title', 'slide 2, the bird on the water lily leaf'] },
      { rotulo: 'Legend and history', titulo: 'From the moon <em>to the queen</em>', texto: 'The legend of Naiá and Jaci got the flower in the middle of the lake’s ripples. In the 19th century, Queen Victoria appears sitting on the leaf itself.', alts: ['slide 3, the white flower in the middle of the ripples', 'slide 4, Queen Victoria sitting on the leaf'] },
      { rotulo: 'Science and symbol', titulo: 'Nature’s <em>engineering</em>', texto: 'The flipped leaf shows the veins that hold so much weight. Then the pink flower brings nature, science, memory and ancestry together in a single symbol.', alts: ['slide 5, the leaf’s veins seen from below', 'slide 6, the open pink flower'] },
      { rotulo: 'Sign-off', titulo: 'From start <em>to finish</em>', texto: 'The last slide goes back to the lake from the cover, now with Badauê’s signature. The carousel starts and ends in the same place.', alts: ['slide 1, the cover', 'slide 7, Badauê’s signature'] },
    ],
  },
  'banco-inter': {
    category: 'UI/UX',
    detail: 'Conceptual app redesign',
    resumo: 'A conceptual UX/UI study of the Banco Inter app’s home screen. The home had a confusing hierarchy, small buttons and content competing with the balance. I reorganized it around what people open the app to do: balance, Pix and payments at the top, the card in the spotlight, and shopping and investments grouped in the Explore tab.',
  },
  'setembro-amarelo': {
    category: 'Campaign',
    detail: 'Internal marketing · Branding & UI',
    resumo: 'An internal Yellow September (suicide prevention month) campaign for a cybersecurity company. The challenge was to talk about mental health with warmth without leaving the company’s dark, tech identity. I created the concept “Care that is shared”, From/To cards, gift tags, an email header and intranet banners.',
  },
  'cardapio-rinus': {
    category: 'Menu',
    detail: 'Menu for a bar and restaurant · 9 pages',
    resumo: 'A 9-page menu for Rinu’s, a bar and restaurant in Belo Horizonte. I split it by moment (daily dishes, sharing plates and griddle, drinks, desserts and promotions), with strong headlines, photos of the dishes and the house’s red and cream, so people find what they want fast.',
  },
  'resultado-engenharia': {
    category: 'Print',
    detail: 'Tri-fold brochure and A5 flyer for fire safety engineering',
    resumo: 'Resultado Engenharia does fire and panic safety projects and compliance, a technical subject many people put off. In the brochure and the flyer I organized everything for a quick read: the direct question on the cover, the services with photos of real equipment, the step by step from assessment to compliance, the FAQ and WhatsApp with a QR code. The red and black come from the world of fire extinguishers itself. I made two background options: a grid one and another that imitates a technical drawing sheet, with rulers on the edges.',
    grupos: ['Option 1 · grid background', 'Option 2 · drawing sheet'],
  },
  'suddenly-30': {
    category: 'Surface design',
    detail: 'Personal project · prints and cups',
    resumo: 'A personal print project for cups about turning 30. I mixed 2000s pop references, like Betty Boop, flip phones and “I’m just a girl”, with gingham, hearts and lots of pink.',
  },
  almah: {
    category: 'Brand identity',
    detail: 'My handmade candle brand · Gênesis collection',
    resumo: 'Almah is my brand of handmade scented candles. The name carries the word alma (soul), and the symbol brings together a crescent moon and a flame: a light born inside the moon. I made the identity with Cauã Dorn, who drew the logo by hand. The first collection, Gênesis, has five candles, each with its own scent and color, and arrives in a deep purple box with a thank-you card and a care card.',
    entregas: ['Logo', 'Symbol construction', 'Gênesis collection', '5 labels', 'Box and die line', 'Order cards', 'Palette and typography', 'Product photos'],
    colaboracao: {
      cargo: 'Designer, filmmaker and creative director',
      fotoAlt: 'Cauã Dorn sitting in a leather armchair',
      texto: 'Almah’s symbol was born from Cauã’s line: he drew the moon and the flame by hand, on paper, and then we redrew it as a vector. We made the identity, the Gênesis labels, the box and the cards together.',
      link: 'Cauã’s website',
    },
    capitulos: [
      { rotulo: 'The brand', titulo: 'A light born <em>inside the moon</em>', texto: 'Almah is a brand of handmade scented candles. The name carries the word alma (soul), and the symbol brings together a crescent moon and a flame.', alts: ['the lit candle in a hand, in front of a crescent moon', 'brand book opening: the Almah logo and the line “a light born inside the moon”'] },
      { rotulo: 'The line', titulo: 'Drawn <em>by hand</em>', texto: 'The logo started on paper, drawn by hand by Cauã, and was then redrawn as a vector: two circles draw the moon and an axis guides the flame.', alts: ['pencil sketch of the moon and the flame', 'symbol construction: two circles and an axis'] },
      { rotulo: 'Gênesis collection', titulo: 'Five candles, <em>five skies</em>', texto: 'The first collection has five candles: Aura, Terra, Selene, Serena and Vênus. Each one has its own scent and color, and the labels are printed in a single ink on cream paper.', alts: ['the five Gênesis candles under a moon', 'the five labels: Aura, Terra, Selene, Serena and Vênus', 'the five candles, each in its own color', 'the Selene and Serena candles lit'] },
      { rotulo: 'The packaging', titulo: 'Your order <em>is here!</em>', texto: 'Each candle arrives in a deep purple box, closed with the “Your order is here!” sticker. The box was designed flat, with the die line ready for the printer.', alts: ['the closed box with a bow, in hands', 'the open box with the Selene candle and the thank-you card', 'the flat box, with folds and cuts'] },
      { rotulo: 'The cards', titulo: 'Open <em>and care</em>', texto: 'Two cards go inside the box: a thank-you card, closed with a wax seal, and a candle care card.', alts: ['thank-you card with envelope and wax seal', 'the Selene candle lit next to the care card', 'the full kit: box, candle, cards and envelope'] },
      { rotulo: 'Colors and typography', titulo: 'Deep purple, <em>always</em>', texto: 'Deep purple is the brand’s main color, and each candle in the collection gets its own color. The tagline wraps up the idea: light that soothes, a scent that hugs.', alts: ['palette, collection colors, logo, tagline and typography', 'brand book closing: thank you'] },
    ],
  },
  'encontro-liderancas-comerciais': {
    category: 'Brand identity',
    detail: 'Event identity for CREDFRANCO',
    resumo: 'A brand identity proposal for CREDFRANCO’s Sales Leadership Meeting, a one-day event. The concept is ascent: three pieces of the squircle, the brand’s graphic element, rise like a chart and reach the strongest red at the top. I made the badge, the versions, the pattern, the palette and the applications (stage screen, photo wall, notepad, cups and T-shirt), and the proposal was presented as a website.',
    entregas: ['Badge', 'Versions', 'Pattern', 'Palette', 'Stage screen', 'Photo wall', 'Notepad and cups', 'T-shirt', 'Proposal website'],
    capitulos: [
      { rotulo: 'The concept', titulo: 'Leadership that <em>moves results</em>', texto: 'The concept is ascent: leadership is what makes results go up. The badge shows it with three pieces that grow like a chart and reach the strongest red at the top.', alts: ['proposal opening: the Sales Leadership Meeting badge over the pattern', 'the three pieces of the badge rising like a chart', 'the event line: leadership that moves results'] },
      { rotulo: 'The badge', titulo: 'Born from <em>the brand’s graphic</em>', texto: 'Each piece is the squircle, CREDFRANCO’s graphic element, in three sizes. The pieces sit on the “Encontro de” line and span the width of “Lideranças”: the badge becomes a single block and works on any piece.', alts: ['badge construction: the pieces aligned to the name', 'the versions: main, negative, horizontal and one color'] },
      { rotulo: 'Pattern and colors', titulo: 'The event’s <em>pattern</em>', texto: 'The shapes of the graphic element, each in a tone of the convention, from wine to pink. The pattern opens the photo wall, the stage screen, the notepad and the cup.', alts: ['the pattern made with the squircle shapes, moving', 'the palette, from wine to pink, with two grays', 'the pattern, vertical', 'photo wall with the pattern and the badge'] },
      { rotulo: 'In practice', titulo: 'The whole <em>event</em>', texto: 'Auditorium screen, notepad and pen, cups and T-shirt: the same badge and the same pattern on every piece.', alts: ['auditorium screen with the badge and the pattern', 'notepad and pen', 'white cup with the pattern', 'red cup in hand', 'red T-shirt, front and back'] },
      { rotulo: 'The presentation', titulo: 'The proposal <em>as a website</em>', texto: 'The proposal was presented as a website: the whole identity on a single page, with badge pieces that react to touch.', alts: ['proposal closing with the badge and the CREDFRANCO and CF Promotora brands'], botao: 'Open the proposal website' },
    ],
  },
  ems: {
    category: 'Personal brand',
    detail: 'My own identity',
    resumo: 'My personal brand. The logo is a hand-drawn illustration, so the brand has line, imperfection and personality. The palette goes from strong purple to wine and ivory, with Howell for headlines and Inter for text.',
  },
  'foto-copa-bufalo': {
    category: 'Sports photography',
    detail: 'Jiu-jitsu coverage',
    resumo: 'Photo coverage of the Copa Búfalo jiu-jitsu tournament. I look for what happens up close: the grip, the effort on the face, the focus before the fight. On some photos I added typography to turn them into posts.',
    instagramTexto: 'See more photos',
  },
  'foto-circuito-gmt': {
    category: 'Sports photography',
    detail: '2nd stage · jiu-jitsu coverage',
    resumo: 'Coverage of the 2nd stage of the GMT jiu-jitsu circuit, with athletes of different ages and belts. Besides the photos, I made posts with typography on top, like “The mat doesn’t lie”.',
    instagramTexto: 'See more photos',
  },
  'almah-fotos': {
    category: 'Product photo and video',
    detail: 'Handmade candles · Gênesis collection',
    resumo: 'Product photos and video of the candles from Almah, my brand. The candle in the moon’s shadow, the labels up close and simple scenes that show the wax and the glass.',
  },
  'copo-24-da-bruninha': {
    category: 'Custom cup',
    detail: 'EcoLabel cup for a birthday',
    resumo: 'An EcoLabel cup for Bruninha’s birthday, with a Brazilian vibe: Christ the Redeemer, coffee, caipirinha, the flag and bar sayings in blocks of green, blue and yellow.',
  },
  'copo-carnaval-2026': {
    category: 'Custom cup',
    detail: 'EcoLabel cup for Carnival',
    resumo: 'An EcoLabel cup for Carnival 2026: colorful rays coming out of a star, masks, little stars and street-band instruments around the name in loose letters.',
  },
};
