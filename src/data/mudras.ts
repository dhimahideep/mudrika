import { Mudra } from '../types';

export const MUDRAS_DATA: Mudra[] = [
  // ==========================================
  // ASAMYUKTA HASTAS (Single Hand Gestures)
  // Calibrated strictly to the classical chart
  // ==========================================
  {
    id: 'pataka',
    name: 'Pataka',
    devanagari: 'पताक',
    englishMeaning: 'Flag',
    category: 'Asamyukta',
    chapterIndex: 1,
    anatomy: 'All 4 fingers straight up and pressed together; thumb bent touching index base.',
    viniyogas: [
      'Beginning of Natya (Dance)',
      'Clouds & Thunderclouds',
      'Dense Forest (Vana)',
      'Denial / Refusal',
      'River Flow',
      'Night Sky & Heavens',
      'Blessing & Shield'
    ],
    verse: 'नाट्यारम्भे वारिवाहे वने वस्तुनिषेधने । कुचस्थले निशायां च नद्याममर्मण्डले ॥',
    historicalContext: 'Described as the primary and foundational Hasta in Abhinaya Darpana, symbolizing royal banners, divine reassurance, and infinite space.',
    modelPath: '/models/pataka.glb',
    posture: {
      thumb: { mcp: 25, ip: 15, spread: -8, opposition: 20 },
      index: { mcp: 0, pip: 0, dip: 0, spread: 0 },
      middle: { mcp: 0, pip: 0, dip: 0, spread: 0 },
      ring: { mcp: 0, pip: 0, dip: 0, spread: 0 },
      pinky: { mcp: 0, pip: 0, dip: 0, spread: 0 },
      wristPitch: 0,
      wristRoll: 0,
      wristYaw: 0,
      isTwoHanded: false
    }
  },
  {
    id: 'tripataka',
    name: 'Tripataka',
    devanagari: 'त्रिपताक',
    englishMeaning: 'Three Parts of a Flag',
    category: 'Asamyukta',
    chapterIndex: 2,
    anatomy: 'Ring finger half bent forward at knuckle; index, middle, and little finger strictly upright; thumb bent inward touching index base.',
    viniyogas: [
      'Crown / Tiara (Makuta)',
      'Tree Branch (Vriksha)',
      'Vajra (Indra\'s Thunderbolt)',
      'Bearer of the Light',
      'Ketu / Celestial Comet',
      'Arrow in Flight'
    ],
    verse: 'मकुटे वृक्षभावे च वज्रे तद्धरवासवे । केतकीकुसुमे दीपे वह्निज्वालविजृम्भणे ॥',
    historicalContext: 'Signifies divine insignia and regalia, frequently held at the crown level to indicate monarchs and celestial deities.',
    modelPath: '/models/tripataka.glb',
    posture: {
      thumb: { mcp: 25, ip: 15, spread: -8, opposition: 20 },
      index: { mcp: 0, pip: 0, dip: 0, spread: 0 },
      middle: { mcp: 0, pip: 0, dip: 0, spread: 0 },
      ring: { mcp: 88, pip: 88, dip: 45, spread: 0 },
      pinky: { mcp: 0, pip: 0, dip: 0, spread: 0 },
      wristPitch: 0,
      wristRoll: 0,
      wristYaw: 0,
      isTwoHanded: false
    }
  },
  {
    id: 'ardhapataka',
    name: 'Ardhapataka',
    devanagari: 'अर्धपताक',
    englishMeaning: 'Half Flag',
    category: 'Asamyukta',
    chapterIndex: 3,
    anatomy: 'Ring finger and little finger bent down; index and middle finger straight up; thumb bent inward.',
    viniyogas: [
      'Sprout / Tender Leaf (Pallava)',
      'Board or Slate (Phalaka)',
      'Riverbank / Shore',
      'Two (Dvi / Pair)',
      'Knife / Dagger Blade',
      'Temple Tower / Flagstaff'
    ],
    verse: 'पल्लवे फलके तीरे उभयोर्वचनेऽपि च । छुरिकायां ध्वजे शृङ्गे युज्यतेऽर्धपताककः ॥',
    historicalContext: 'Expresses duality and natural landscape features such as tender shoots and coastal cliffs.',
    modelPath: '/models/ardhapataka.glb',
    posture: {
      thumb: { mcp: 25, ip: 15, spread: -8, opposition: 20 },
      index: { mcp: 0, pip: 0, dip: 0, spread: 0 },
      middle: { mcp: 0, pip: 0, dip: 0, spread: 0 },
      ring: { mcp: 88, pip: 88, dip: 45, spread: 0 },
      pinky: { mcp: 88, pip: 88, dip: 45, spread: 0 },
      wristPitch: 0,
      wristRoll: 0,
      wristYaw: 0,
      isTwoHanded: false
    }
  },
  {
    id: 'kartarimukha',
    name: 'Kartarimukha',
    devanagari: 'कर्तरीमुख',
    englishMeaning: 'Scissors Face',
    category: 'Asamyukta',
    chapterIndex: 4,
    anatomy: 'Index and middle fingers extended straight upright splayed wide apart facing opposite sides like scissor blades; ring finger and little finger held close together side-by-side, bent inward touching the thumb tip.',
    viniyogas: [
      'Separation of Lovers (Viyoga)',
      'Opposition / Discord',
      'Looting / Plunder',
      'Corner of the Eye (Kataksha)',
      'Lightning Flash',
      'Falling Down'
    ],
    verse: 'स्त्रीपुंसयोस्तु विश्लेषे विप्रलम्भे पदेऽथवा । पतने लुतने चैव मरणे नयनान्तरे ॥',
    historicalContext: 'Denotes emotional schisms, sharp edges, lightning, and dramatic tragic points in classical Indian dance narratives.',
    modelPath: '/models/kartarimukha.glb',
    posture: {
      thumb: { mcp: 55, ip: 36, spread: 12, opposition: 45 },
      index: { mcp: 0, pip: 0, dip: 0, spread: -22 },
      middle: { mcp: 0, pip: 0, dip: 0, spread: 22 },
      ring: { mcp: 62, pip: 68, dip: 35, spread: 0 },
      pinky: { mcp: 88, pip: 95, dip: 75, spread: 0 },
      wristPitch: -4,
      wristRoll: 0,
      wristYaw: 0,
      isTwoHanded: false
    }
  },
  {
    id: 'mayura',
    name: 'Mayura',
    devanagari: 'मयूर',
    englishMeaning: 'Peacock',
    category: 'Asamyukta',
    chapterIndex: 5,
    anatomy: 'Ring finger tip touches thumb tip; index, middle, and little fingers straight up and joined.',
    viniyogas: [
      'Peacock\'s Neck & Plumage',
      'Creeping Vine (Lata)',
      'Applying Tilak / Kumkum',
      'Wiping Tears',
      'Dispersing Hair Tresses',
      'Famous / Renowned Person'
    ],
    verse: 'मयूरग्रीवायां लतातन्त्वामथापि च । शकुने बिन्दुदाने च तिलकस्य च धारणे ॥',
    historicalContext: 'Evokes beauty, vanity, graceful avian postures, and the adornment of cosmetic vermilion upon the forehead.',
    modelPath: '/models/mayura.glb',
    posture: {
      thumb: { mcp: 42, ip: 32, spread: 12, opposition: 42 },
      index: { mcp: 0, pip: 0, dip: 0, spread: 0 },
      middle: { mcp: 0, pip: 0, dip: 0, spread: 0 },
      ring: { mcp: 52, pip: 55, dip: 30, spread: 0 },
      pinky: { mcp: 0, pip: 0, dip: 0, spread: 0 },
      wristPitch: 6,
      wristRoll: 4,
      wristYaw: 16,
      isTwoHanded: false
    }
  },
  {
    id: 'ardhachandra',
    name: 'Ardhachandra',
    devanagari: 'अर्धचन्द्र',
    englishMeaning: 'Half Moon',
    category: 'Asamyukta',
    chapterIndex: 6,
    anatomy: 'All 4 fingers upright and joined; thumb stretched wide outward forming a deep \'C\' crescent shape.',
    viniyogas: [
      'Phase of the Moon (Half Moon)',
      'Hand seized by the Throat',
      'Consecration of Idols (Abhisheka)',
      'Plate / Salver (Patra)',
      'Waistline & Slender Torso',
      'Origin of Sacred Rivers'
    ],
    verse: 'चन्द्रे चाष्टमीभाजि च कण्ठग्रहे तथा । सुराणामभिषेके च पात्रे च कटिसीम्नि च ॥',
    historicalContext: 'Widely used in temple iconography to denote the lunar halo of Shiva (Chandrashekhara) and sacred vessels.',
    modelPath: '/models/ardhachandra.glb',
    posture: {
      thumb: { mcp: 0, ip: 0, spread: -65, opposition: -5 },
      index: { mcp: 0, pip: 0, dip: 0, spread: 0 },
      middle: { mcp: 0, pip: 0, dip: 0, spread: 0 },
      ring: { mcp: 0, pip: 0, dip: 0, spread: 0 },
      pinky: { mcp: 0, pip: 0, dip: 0, spread: 0 },
      wristPitch: 0,
      wristRoll: 0,
      wristYaw: 0,
      isTwoHanded: false
    }
  },
  {
    id: 'arala',
    name: 'Aralam (Arala)',
    devanagari: 'अराल',
    englishMeaning: 'Bent / Curved',
    category: 'Asamyukta',
    chapterIndex: 7,
    anatomy: 'Index finger curved downward gracefully like a bow; middle, ring, and little fingers held straight upright and pressed together; thumb extended outward and held separated, not touching the index finger.',
    viniyogas: [
      'Drinking Poison / Nectar (Amrita)',
      'Violent Storm Wind',
      'Gathering of Clouds',
      'Blessing with Scented Water',
      'Subtle Pride'
    ],
    verse: 'विषामृतादिपानेषु प्रचण्डपवनेऽपि च । अरालहस्तः कथितो भरतागमकोविदैः ॥',
    historicalContext: 'Famous gesture representing Shiva consuming the Halahala cosmic poison to save creation during the churning of the ocean.',
    modelPath: '/models/arala.glb',
    posture: {
      thumb: { mcp: 25, ip: 15, spread: -8, opposition: 20 },
      index: { mcp: 70, pip: 72, dip: 35, spread: 0 },
      middle: { mcp: 0, pip: 0, dip: 0, spread: 0 },
      ring: { mcp: 0, pip: 0, dip: 0, spread: 0 },
      pinky: { mcp: 0, pip: 0, dip: 0, spread: 0 },
      wristPitch: 6,
      wristRoll: 0,
      wristYaw: 8,
      isTwoHanded: false
    }
  },
  {
    id: 'shukatunda',
    name: 'Shukatunda',
    devanagari: 'शुकतुण्ड',
    englishMeaning: 'Parrot\'s Beak',
    category: 'Asamyukta',
    chapterIndex: 8,
    anatomy: 'Index and ring fingers curved inward toward palm; middle and little fingers upright; thumb tucked.',
    viniyogas: [
      'Shooting an Arrow (Bana)',
      'Parrot\'s Beak (Shuka)',
      'Remembering One\'s Beloved',
      'Ferocious Secret Wrath',
      'Throwing a Spear'
    ],
    verse: 'बाणप्रयोगे शुकतुण्डे गुप्तभावेऽथवापि च । क्रोधे शुकतुण्डहस्तः कथितो भरतादिभिः ॥',
    historicalContext: 'Employed in dramatic abhinaya to indicate sudden weapon discharge and the sacred green parrot perched on Goddess Meenakshi\'s shoulder.',
    modelPath: '/models/shukatunda.glb',
    posture: {
      thumb: { mcp: 25, ip: 15, spread: -8, opposition: 20 },
      index: { mcp: 70, pip: 72, dip: 35, spread: 0 },
      middle: { mcp: 0, pip: 0, dip: 0, spread: 0 },
      ring: { mcp: 70, pip: 72, dip: 35, spread: 0 },
      pinky: { mcp: 0, pip: 0, dip: 0, spread: 0 },
      wristPitch: 6,
      wristRoll: 0,
      wristYaw: 8,
      isTwoHanded: false
    }
  },
  {
    id: 'mushti',
    name: 'Mushti',
    devanagari: 'मुष्टि',
    englishMeaning: 'Fist',
    category: 'Asamyukta',
    chapterIndex: 9,
    anatomy: 'All 4 fingers curled into a tight closed fist; thumb pressed horizontally across index, middle, and ring fingers.',
    viniyogas: [
      'Steadfastness / Firm Grip',
      'Holding Weapons (Mace, Spear)',
      'Wrestling Combat (Mallayuddha)',
      'Holding Hair / Plucking Fruit',
      'Tenacity & Determination'
    ],
    verse: 'स्थिरे कचादिग्रहणे दाढर्यर्थे वस्तुधारणे । मल्लानां युद्धभावे च मुष्टिहस्तोऽयमीरितः ॥',
    historicalContext: 'The fundamental combat gesture symbolizing raw power, martial tenacity, and physical unshakeability.',
    modelPath: '/models/mushti.glb',
    posture: {
      thumb: { mcp: 65, ip: 45, spread: 10, opposition: 55 },
      index: { mcp: 88, pip: 95, dip: 75, spread: 0 },
      middle: { mcp: 88, pip: 95, dip: 75, spread: 0 },
      ring: { mcp: 88, pip: 95, dip: 75, spread: 0 },
      pinky: { mcp: 88, pip: 95, dip: 75, spread: 0 },
      wristPitch: 16,
      wristRoll: 0,
      wristYaw: 12,
      isTwoHanded: false
    }
  },
  {
    id: 'shikhara',
    name: 'Shikhara',
    devanagari: 'शिखर',
    englishMeaning: 'Peak / Spire',
    category: 'Asamyukta',
    chapterIndex: 10,
    anatomy: 'Tight fist with 4 fingers curled into palm; thumb extended straight up vertically (thumbs up posture).',
    viniyogas: [
      'Kamadeva (God of Love)',
      'Bow (Dhanus)',
      'Spire of a Temple (Gopuram)',
      'Firmness / Resolution',
      'Heroic Charioteer Reins',
      'Applying Sindoor'
    ],
    verse: 'मदने कार्मुके स्तम्भे निश्चये पितृकर्मणि । ओष्ठे प्रविष्टरूपे च रदने शिखरो युतः ॥',
    historicalContext: 'Emblem of heroic strength (Veera rasa) and temple architecture; represents the supreme bow Gandiva or Shiva\'s Pinaka.',
    modelPath: '/models/shikhara.glb',
    posture: {
      thumb: { mcp: 0, ip: 0, spread: 18, opposition: -10 },
      index: { mcp: 88, pip: 95, dip: 75, spread: 0 },
      middle: { mcp: 88, pip: 95, dip: 75, spread: 0 },
      ring: { mcp: 88, pip: 95, dip: 75, spread: 0 },
      pinky: { mcp: 88, pip: 95, dip: 75, spread: 0 },
      wristPitch: 10,
      wristRoll: -4,
      wristYaw: 15,
      isTwoHanded: false
    }
  },
  {
    id: 'kapittha',
    name: 'Kapittha',
    devanagari: 'कपित्थ',
    englishMeaning: 'Elephant Apple',
    category: 'Asamyukta',
    chapterIndex: 11,
    anatomy: 'Shikhara fist with thumb tip bent down; index finger curled tightly over top of thumb.',
    viniyogas: [
      'Goddess Lakshmi / Saraswati',
      'Holding Cymbals (Talam)',
      'Milking Cows (Gokula)',
      'Holding Flowers',
      'Pulling Reins of a Chariot'
    ],
    verse: 'लक्ष्म्यां च धरणीभावे गोदोहे तालधारणे । वस्त्रकर्षे च योज्योऽयं कपित्थः कर इष्यते ॥',
    historicalContext: 'Evokes pastoral Krishna leelas in Gokula and the divine instruments played in temple ceremonies.',
    modelPath: '/models/kapittha.glb',
    posture: {
      thumb: { mcp: 30, ip: 25, spread: 8, opposition: 25 },
      index: { mcp: 78, pip: 88, dip: 55, spread: 0 },
      middle: { mcp: 88, pip: 95, dip: 75, spread: 0 },
      ring: { mcp: 88, pip: 95, dip: 75, spread: 0 },
      pinky: { mcp: 88, pip: 95, dip: 75, spread: 0 },
      wristPitch: 10,
      wristRoll: 4,
      wristYaw: 18,
      isTwoHanded: false
    }
  },
  {
    id: 'katakamukha',
    name: 'Katakamukha',
    devanagari: 'कटकामुख',
    englishMeaning: 'Opening in a Bracelet',
    category: 'Asamyukta',
    chapterIndex: 12,
    anatomy: 'Index and middle fingertips touching thumb tip; ring and little fingers extended upward and slightly curved.',
    viniyogas: [
      'Plucking Flowers (Pushpa-chayana)',
      'Holding a Pearl Necklace',
      'Drawing the Bowstring to the Ear',
      'Offering Betel Nut / Tambulam',
      'Applying Fragrant Perfume'
    ],
    verse: 'कुसुमावचये मुक्तादाम्नां धारणे च । शरकर्षे च ताम्बूले कटकामुख ईरितः ॥',
    historicalContext: 'Ubiquitous in classical dance to depict romantic adornment, drawing Cupid\'s floral arrows, and picking jasmine blooms.',
    modelPath: '/models/katakamukha.glb',
    posture: {
      thumb: { mcp: 40, ip: 32, spread: 8, opposition: 40 },
      index: { mcp: 55, pip: 58, dip: 32, spread: 0 },
      middle: { mcp: 55, pip: 58, dip: 32, spread: 0 },
      ring: { mcp: -8, pip: -4, dip: 0, spread: 16 },
      pinky: { mcp: -10, pip: -4, dip: 0, spread: 26 },
      wristPitch: 10,
      wristRoll: 8,
      wristYaw: 24,
      isTwoHanded: false
    }
  },
  {
    id: 'suchi',
    name: 'Suchi',
    devanagari: 'सूची',
    englishMeaning: 'Needle',
    category: 'Asamyukta',
    chapterIndex: 13,
    anatomy: 'Index finger pointing straight up; middle, ring, little fingers, and thumb curled into a tight fist.',
    viniyogas: [
      'The Number One (Ekam)',
      'Parabrahma (Absolute Consciousness)',
      'Pointing / Directing',
      'World Universe (Loka)',
      'Dusk & Solar Ray',
      'Warning / Threat'
    ],
    verse: 'एकत्वे परब्रह्माख्यां शते रवौ च मण्डले । जगति च भवेदर्थे वचनेऽपि च सूचिका ॥',
    historicalContext: 'Philosophical signature denoting non-dual supreme consciousness, universal oneness, and decisive command.',
    modelPath: '/models/suchi.glb',
    posture: {
      thumb: { mcp: 65, ip: 40, spread: 10, opposition: 45 },
      index: { mcp: 0, pip: 0, dip: 0, spread: 0 },
      middle: { mcp: 88, pip: 95, dip: 75, spread: 0 },
      ring: { mcp: 88, pip: 95, dip: 75, spread: 0 },
      pinky: { mcp: 88, pip: 95, dip: 75, spread: 0 },
      wristPitch: 8,
      wristRoll: 0,
      wristYaw: 12,
      isTwoHanded: false
    }
  },
  {
    id: 'chandrakala',
    name: 'Chandrakala',
    devanagari: 'चन्द्रकला',
    englishMeaning: 'Crescent Moon',
    category: 'Asamyukta',
    chapterIndex: 14,
    anatomy: 'Index finger pointing straight up; thumb stretched wide outward at a 90-degree \'L\' angle; remaining fingers curled in.',
    viniyogas: [
      'Crescent Moon (Chandra)',
      'Shiva\'s Adornment (Chandrashekhara)',
      'Measurement of Span (Pradesha)',
      'Tusk of Ganesha',
      'Descent of the River Ganges'
    ],
    verse: 'चन्द्रे कलारूपे च शिवस्य मस्तके स्थिते । प्रादेशे च भवेदर्थे चन्द्रकला समीरिता ॥',
    historicalContext: 'Distinctive sign of Lord Shiva’s adornment, capturing both celestial radiance and measured geometric spans.',
    modelPath: '/models/chandrakala.glb',
    posture: {
      thumb: { mcp: 0, ip: 0, spread: -65, opposition: -5 },
      index: { mcp: 0, pip: 0, dip: 0, spread: 0 },
      middle: { mcp: 88, pip: 95, dip: 75, spread: 0 },
      ring: { mcp: 88, pip: 95, dip: 75, spread: 0 },
      pinky: { mcp: 88, pip: 95, dip: 75, spread: 0 },
      wristPitch: 4,
      wristRoll: 0,
      wristYaw: 0,
      isTwoHanded: false
    }
  },
  {
    id: 'padmakosha',
    name: 'Padmakosha',
    devanagari: 'पद्मकोश',
    englishMeaning: 'Lotus Bud',
    category: 'Asamyukta',
    chapterIndex: 15,
    anatomy: 'All 5 fingers curved inward toward the center, tips pulled close forming a hollow cup/bud.',
    viniyogas: [
      'Lotus Bud / Water Lily',
      'Fruit (Mango, Bilva, Apple)',
      'Circular Ball / Globe',
      'Scattering Flowers in Worship (Pushpanjali)',
      'Anthill (Valmika)'
    ],
    verse: 'फले बिल्वादिजम्बूनां कलिकारूपके तथा । वर्तुलत्वे च संकोचे पद्मकोशो विधीयते ॥',
    historicalContext: 'Represents potentiality, botanical budding, and offering vessels carried to the inner sanctum.',
    modelPath: '/models/padmakosha.glb',
    posture: {
      thumb: { mcp: 32, ip: 24, spread: 15, opposition: 30 },
      index: { mcp: 36, pip: 34, dip: 22, spread: -12 },
      middle: { mcp: 36, pip: 34, dip: 22, spread: 0 },
      ring: { mcp: 36, pip: 34, dip: 22, spread: 12 },
      pinky: { mcp: 36, pip: 34, dip: 22, spread: 22 },
      wristPitch: 14,
      wristRoll: 4,
      wristYaw: 16,
      isTwoHanded: false
    }
  },
  {
    id: 'sarpashirsha',
    name: 'Sarpashirsha',
    devanagari: 'सर्पशीर्ष',
    englishMeaning: 'Snake Hood',
    category: 'Asamyukta',
    chapterIndex: 16,
    anatomy: 'All 4 fingers straight, joined, and bent slightly forward at knuckles over palm hollow; thumb tucked along side.',
    viniyogas: [
      'Hood of the Serpent (Naga)',
      'Sprinkling Holy Water or Sandal Paste',
      'Ablutions & Consecration',
      'Flapping of Elephant Ears',
      'Slithering Snake'
    ],
    verse: 'चन्दने भुजगे मन्द्रे प्रोक्षणे पोषणादिके । देवादीनामुदकदाने भुजगे सर्पशीर्षकः ॥',
    historicalContext: 'Invokes serpent deities (Nagas) and ritual purification through fragrant sandal paste and sanctified stream water.',
    modelPath: '/models/sarpashirsha.glb',
    posture: {
      thumb: { mcp: 25, ip: 15, spread: -8, opposition: 20 },
      index: { mcp: 30, pip: 18, dip: 8, spread: 0 },
      middle: { mcp: 30, pip: 18, dip: 8, spread: 0 },
      ring: { mcp: 30, pip: 18, dip: 8, spread: 0 },
      pinky: { mcp: 30, pip: 18, dip: 8, spread: 0 },
      wristPitch: 14,
      wristRoll: 0,
      wristYaw: 16,
      isTwoHanded: false
    }
  },
  {
    id: 'mrigashirsha',
    name: 'Mrigashirsha',
    devanagari: 'मृगशीर्ष',
    englishMeaning: 'Deer Head',
    category: 'Asamyukta',
    chapterIndex: 17,
    anatomy: 'Middle and ring fingers bent touching thumb tip; index and little fingers pointing straight up like deer ears.',
    viniyogas: [
      'Deer (Mriga)',
      'Women / Maiden (Stree)',
      'Cheek / Facial Contours',
      'Costume & Attire',
      'Greeting / Welcoming Guests',
      'Roaming in Forest'
    ],
    verse: 'स्त्रीणां कपोले चक्रे च मर्यादायां भयेऽपि च । विवादे सम्भाषे च मृगशीर्षः प्रकीर्तितः ॥',
    historicalContext: 'Denotes the enchanting golden deer of the Ramayana (Maricha) and gentle, tender qualities of feminine charm (Lasyanga).',
    modelPath: '/models/mrigashirsha.glb',
    posture: {
      thumb: { mcp: 42, ip: 32, spread: 10, opposition: 42 },
      index: { mcp: 0, pip: 0, dip: 0, spread: -14 },
      middle: { mcp: 58, pip: 62, dip: 32, spread: 0 },
      ring: { mcp: 58, pip: 62, dip: 32, spread: 0 },
      pinky: { mcp: 0, pip: 0, dip: 0, spread: 18 },
      wristPitch: 8,
      wristRoll: 0,
      wristYaw: 20,
      isTwoHanded: false
    }
  },
  {
    id: 'simhamukha',
    name: 'Simhamukha',
    devanagari: 'सिंहमुख',
    englishMeaning: 'Lion Face',
    category: 'Asamyukta',
    chapterIndex: 18,
    anatomy: 'Middle and ring fingers touching thumb tip; index and little fingers spread straight outward.',
    viniyogas: [
      'Lion (Narasimha / Simha)',
      'Preparation of Ayurvedic Medicine',
      'Sacrifice (Homa / Yajna)',
      'Salvation / Moksha',
      'Fearless Ferocity'
    ],
    verse: 'होमे भये सिंहमुखे वैद्यके शोधने तथा । चन्दने च प्रयोक्तव्यः सिंहवक्त्रः करोत्तमः ॥',
    historicalContext: 'Embodies Lord Narasimha\'s majestic ferocity and spiritual valor, dispelling fear across the three worlds.',
    modelPath: '/models/simhamukha.glb',
    posture: {
      thumb: { mcp: 42, ip: 32, spread: 10, opposition: 42 },
      index: { mcp: 0, pip: 0, dip: 0, spread: -24 },
      middle: { mcp: 58, pip: 62, dip: 32, spread: 0 },
      ring: { mcp: 58, pip: 62, dip: 32, spread: 0 },
      pinky: { mcp: 0, pip: 0, dip: 0, spread: 28 },
      wristPitch: 6,
      wristRoll: 0,
      wristYaw: 16,
      isTwoHanded: false
    }
  },
  {
    id: 'kangula',
    name: 'Kangula',
    devanagari: 'काङ्गुल',
    englishMeaning: 'Bell / Tail',
    category: 'Asamyukta',
    chapterIndex: 19,
    anatomy: 'Ring finger curled into palm; index, middle, little finger, and thumb extended outward.',
    viniyogas: [
      'White Lotus / Lily',
      'Small Temple Bell (Ghanta)',
      'Betel Tree Fruit (Kramuka)',
      'Partridge Bird',
      'Chataka Bird'
    ],
    verse: 'लकुचे चटकादीनां फले घण्ठारवे तथा । काङ्गुलो नाम हस्तोऽयं कथितो भरतादिभिः ॥',
    historicalContext: 'Symbolizes the chime of ringing temple bells during evening Aarti and delicate botanical fruits.',
    modelPath: '/models/kangula.glb',
    posture: {
      thumb: { mcp: 15, ip: 10, spread: -20, opposition: 10 },
      index: { mcp: 14, pip: 12, dip: 8, spread: -14 },
      middle: { mcp: 12, pip: 10, dip: 6, spread: 0 },
      ring: { mcp: 88, pip: 95, dip: 75, spread: 0 },
      pinky: { mcp: 12, pip: 10, dip: 6, spread: 22 },
      wristPitch: 10,
      wristRoll: 2,
      wristYaw: 16,
      isTwoHanded: false
    }
  },
  {
    id: 'alapadma',
    name: 'Alapadma',
    devanagari: 'अलपद्म',
    englishMeaning: 'Full Bloomed Lotus',
    category: 'Asamyukta',
    chapterIndex: 20,
    anatomy: 'All 5 fingers spread wide, separated, and curved outward like an open blooming lotus.',
    viniyogas: [
      'Full Bloomed Lotus Flower',
      'Solar Orb (Surya Mandala)',
      'Beauty & Allure (Saundarya)',
      'Yearning / Separation',
      'Full Moon (Poornima)',
      'Blossoming Youth'
    ],
    verse: 'विकचाम्भोरुहे पूर्णे फले च रविमण्डले । सौन्दर्ये विप्रलम्भे च योज्योऽलपद्मसंज्ञकः ॥',
    historicalContext: 'Celebrated as the most visually poetic and lyrical hand gesture in Bharatanatyam, depicting floral blossoming with circular wrist flourishes.',
    modelPath: '/models/alapadma.glb',
    posture: {
      thumb: { mcp: -10, ip: 0, spread: -45, opposition: -10 },
      index: { mcp: -20, pip: -15, dip: -5, spread: -24 },
      middle: { mcp: -18, pip: -12, dip: 0, spread: -8 },
      ring: { mcp: -16, pip: -10, dip: 0, spread: 12 },
      pinky: { mcp: -14, pip: -8, dip: 0, spread: 28 },
      wristPitch: 15,
      wristRoll: 6,
      wristYaw: 20,
      isTwoHanded: false
    }
  },
  {
    id: 'chatura',
    name: 'Chatura',
    devanagari: 'चतुर',
    englishMeaning: 'Clever / Square',
    category: 'Asamyukta',
    chapterIndex: 21,
    anatomy: '4 fingers straight and touching; thumb rested flat at the root of the ring finger.',
    viniyogas: [
      'Kasturi (Musk)',
      'Little / Small Quantity (Alpa)',
      'Gold / Copper / Metal',
      'Wit & Clever Intelligence',
      'Eyes / Glances',
      'Sweet Conversation'
    ],
    verse: 'कस्तूरिकायां किञ्चिच्च स्वर्णे ताम्रे च लोहके । आर्द्रभावे च सम्भाषे चतुरः संप्रकीर्तितः ॥',
    historicalContext: 'Used by scholars and poets to denote refined wit, precious metals, and intimate intellectual discourse.',
    modelPath: '/models/chatura.glb',
    posture: {
      thumb: { mcp: 62, ip: 35, spread: 10, opposition: 55 },
      index: { mcp: 0, pip: 0, dip: 0, spread: 0 },
      middle: { mcp: 0, pip: 0, dip: 0, spread: 0 },
      ring: { mcp: 0, pip: 0, dip: 0, spread: 0 },
      pinky: { mcp: 0, pip: 0, dip: 0, spread: 0 },
      wristPitch: 12,
      wristRoll: 0,
      wristYaw: 22,
      isTwoHanded: false
    }
  },
  {
    id: 'bhramara',
    name: 'Bhramara',
    devanagari: 'भ्रमर',
    englishMeaning: 'Black Bee',
    category: 'Asamyukta',
    chapterIndex: 22,
    anatomy: 'Index finger curled to root of thumb; thumb tip touches side of middle finger tip; ring and little fingers straight up.',
    viniyogas: [
      'Black Bee Hovering over Flower',
      'Parrot',
      'Winged Crane',
      'Cuckoo Bird (Kokila)',
      'Union with Beloved'
    ],
    verse: 'भ्रमरे च शुके चैव सारसे कोकिलादिषु । भ्रमराख्यो भवेद्धस्तः कीर्तितो नाट्यवेदिभिः ॥',
    historicalContext: 'Portrays the humming black bee (Bhramara) drinking honey from lotus petals in classical romantic poetry (Shringara).',
    modelPath: '/models/bhramara.glb',
    posture: {
      thumb: { mcp: 42, ip: 32, spread: 10, opposition: 42 },
      index: { mcp: 78, pip: 80, dip: 40, spread: 0 },
      middle: { mcp: 48, pip: 45, dip: 22, spread: 0 },
      ring: { mcp: 0, pip: 0, dip: 0, spread: 8 },
      pinky: { mcp: 0, pip: 0, dip: 0, spread: 18 },
      wristPitch: 8,
      wristRoll: 4,
      wristYaw: 18,
      isTwoHanded: false
    }
  },
  {
    id: 'hamsasya',
    name: 'Hamsasya',
    devanagari: 'हंसास्य',
    englishMeaning: 'Swan Beak',
    category: 'Asamyukta',
    chapterIndex: 23,
    anatomy: 'Index finger tip and thumb tip touching in a delicate pinch; middle, ring, and little fingers straight up and separated.',
    viniyogas: [
      'Blessing & Grace (Mangala)',
      'Pearls & Precious Stones',
      'Painting or Fine Calligraphy',
      'Drizzle / Fine Mist',
      'Soft Jasmine Fragrance',
      'Swan in Sacred Waters'
    ],
    verse: 'मङ्गलोत्सवनिर्णये मुक्तामणौ दीपे च । रेखायां कर्षे च हंसास्यः कीर्तितो बुधैः ॥',
    historicalContext: 'Associated with Saraswati, goddess of arts, wisdom, and fine script, representing precision and sacred discernment.',
    modelPath: '/models/hamsasya.glb',
    posture: {
      thumb: { mcp: 40, ip: 32, spread: 8, opposition: 40 },
      index: { mcp: 52, pip: 56, dip: 30, spread: 0 },
      middle: { mcp: 0, pip: 0, dip: 0, spread: -6 },
      ring: { mcp: 0, pip: 0, dip: 0, spread: 10 },
      pinky: { mcp: 0, pip: 0, dip: 0, spread: 24 },
      wristPitch: 10,
      wristRoll: 6,
      wristYaw: 22,
      isTwoHanded: false
    }
  },
  {
    id: 'hamsapaksha',
    name: 'Hamsapaksha',
    devanagari: 'हंसपक्ष',
    englishMeaning: 'Swan Wing',
    category: 'Asamyukta',
    chapterIndex: 24,
    anatomy: 'Little finger straight up; thumb tucked inward; index, middle, and ring fingers held straight and slightly slanted.',
    viniyogas: [
      'Number Six (Shat)',
      'Constructing a Bridge',
      'Nail Mark of Passion',
      'Covering or Concealing',
      'Swan Wing Gliding over Lake'
    ],
    verse: 'षट्संख्यायां सेतुबन्धे नखरेखाङ्कने तथा । आच्छादने च योज्योऽयं हंसपक्षकरः स्मृतः ॥',
    historicalContext: 'Portrays avian flight and the mythical construction of Rama\'s Setu bridge to Lanka across the roaring ocean.',
    modelPath: '/models/hamsapaksha.glb',
    posture: {
      thumb: { mcp: 45, ip: 30, spread: 10, opposition: 40 },
      index: { mcp: 10, pip: 8, dip: 4, spread: -4 },
      middle: { mcp: 14, pip: 10, dip: 5, spread: 2 },
      ring: { mcp: 18, pip: 12, dip: 6, spread: 8 },
      pinky: { mcp: 0, pip: 0, dip: 0, spread: 24 },
      wristPitch: 14,
      wristRoll: -10,
      wristYaw: 22,
      isTwoHanded: false
    }
  }
];
