import { CardInsert, TagInsert } from '@/db/schema';

export const TAGS_TO_SEED: TagInsert[] = [
  { name: 'Greetings' },
  { name: 'Animals' },
  { name: 'Common Verbs' },
  { name: 'Numbers' },
  { name: 'Colors' },
  { name: 'Food & Drink' },
  { name: 'Family' },
  { name: 'Body Parts' },
  { name: 'Travel' },
  { name: 'Weather' },
  { name: 'Days & Months' },
  { name: 'Clothing' },
  { name: 'Home & Furniture' },
  { name: 'Emotions' },
  { name: 'School & Work' },
  { name: 'Nature' },
  { name: 'Sports' },
  { name: 'Time & Dates' },
  { name: 'Questions' },
  { name: 'Common Phrases' },
] as const;

export const CARDS_TO_SEED: CardInsert[] = [
  // Greetings (tag index 0)
  { sideA: 'Hello', sideB: 'Bonjour', comment: 'Formal greeting', knowledgeLevel: 'Learning' },
  {
    sideA: 'Goodbye',
    sideB: 'Au revoir',
    comment: 'Standard farewell',
    knowledgeLevel: 'Learning',
  },
  {
    sideA: 'Good evening',
    sideB: 'Bonsoir',
    comment: 'Used after ~6pm',
    knowledgeLevel: 'Learning',
  },
  {
    sideA: 'See you soon',
    sideB: 'À bientôt',
    comment: 'Casual farewell',
    knowledgeLevel: 'Learning',
  },

  // Animals (tag index 1)
  { sideA: 'Cat', sideB: 'Le chat', comment: 'Masculine noun', knowledgeLevel: 'Learning' },
  { sideA: 'Dog', sideB: 'Le chien', comment: 'Masculine noun', knowledgeLevel: 'Learning' },
  {
    sideA: 'Bird',
    sideB: "L'oiseau",
    comment: "Masculine noun; L' before vowel",
    knowledgeLevel: 'Learning',
  },
  { sideA: 'Fish', sideB: 'Le poisson', comment: 'Masculine noun', knowledgeLevel: 'Learning' },

  // Common Verbs (tag index 2)
  { sideA: 'To eat', sideB: 'Manger', comment: 'Regular -er verb', knowledgeLevel: 'Learning' },
  { sideA: 'To drink', sideB: 'Boire', comment: 'Irregular verb', knowledgeLevel: 'Learning' },
  { sideA: 'To speak', sideB: 'Parler', comment: 'Regular -er verb', knowledgeLevel: 'Learning' },
  { sideA: 'To go', sideB: 'Aller', comment: 'Highly irregular verb', knowledgeLevel: 'Learning' },
  {
    sideA: 'To have',
    sideB: 'Avoir',
    comment: 'Irregular; used in many tenses',
    knowledgeLevel: 'Learning',
  },
  {
    sideA: 'To be',
    sideB: 'Être',
    comment: 'Irregular; most important verb',
    knowledgeLevel: 'Learning',
  },

  // Numbers (tag index 3)
  { sideA: 'One', sideB: 'Un / Une', comment: 'Masculine / Feminine', knowledgeLevel: 'Learning' },
  { sideA: 'Ten', sideB: 'Dix', comment: 'Silent x', knowledgeLevel: 'Learning' },
  { sideA: 'One hundred', sideB: 'Cent', comment: 'Silent t', knowledgeLevel: 'Learning' },

  // Colors (tag index 4)
  { sideA: 'Red', sideB: 'Rouge', comment: 'Same for m/f', knowledgeLevel: 'Learning' },
  {
    sideA: 'Blue',
    sideB: 'Bleu / Bleue',
    comment: 'Adds -e for feminine',
    knowledgeLevel: 'Learning',
  },
  {
    sideA: 'Green',
    sideB: 'Vert / Verte',
    comment: 'Adds -e for feminine',
    knowledgeLevel: 'Learning',
  },
  { sideA: 'Yellow', sideB: 'Jaune', comment: 'Same for m/f', knowledgeLevel: 'Learning' },

  // Food & Drink (tag index 5)
  { sideA: 'Bread', sideB: 'Le pain', comment: 'A French staple', knowledgeLevel: 'Learning' },
  { sideA: 'Water', sideB: "L'eau", comment: 'Feminine noun', knowledgeLevel: 'Learning' },
  { sideA: 'Wine', sideB: 'Le vin', comment: 'Masculine noun', knowledgeLevel: 'Learning' },
  {
    sideA: 'Cheese',
    sideB: 'Le fromage',
    comment: 'France has 300+ varieties',
    knowledgeLevel: 'Learning',
  },
  {
    sideA: 'Coffee',
    sideB: 'Le café',
    comment: 'Also means "café" the place',
    knowledgeLevel: 'Learning',
  },

  // Family (tag index 6)
  { sideA: 'Mother', sideB: 'La mère', comment: 'Feminine noun', knowledgeLevel: 'Learning' },
  { sideA: 'Father', sideB: 'Le père', comment: 'Masculine noun', knowledgeLevel: 'Learning' },
  { sideA: 'Brother', sideB: 'Le frère', comment: 'Masculine noun', knowledgeLevel: 'Learning' },
  { sideA: 'Sister', sideB: 'La sœur', comment: 'Feminine noun', knowledgeLevel: 'Learning' },

  // Body Parts (tag index 7)
  { sideA: 'Head', sideB: 'La tête', comment: 'Feminine noun', knowledgeLevel: 'Learning' },
  { sideA: 'Hand', sideB: 'La main', comment: 'Feminine noun', knowledgeLevel: 'Learning' },
  {
    sideA: 'Eye',
    sideB: "L'œil",
    comment: 'Plural: les yeux (irregular)',
    knowledgeLevel: 'Learning',
  },

  // Travel (tag index 8)
  { sideA: 'Airport', sideB: "L'aéroport", comment: 'Masculine noun', knowledgeLevel: 'Learning' },
  {
    sideA: 'Train station',
    sideB: 'La gare',
    comment: 'Feminine noun',
    knowledgeLevel: 'Learning',
  },
  { sideA: 'Hotel', sideB: "L'hôtel", comment: 'H is silent', knowledgeLevel: 'Learning' },

  // Weather (tag index 9)
  {
    sideA: 'It is raining',
    sideB: 'Il pleut',
    comment: 'From verb "pleuvoir"',
    knowledgeLevel: 'Learning',
  },
  {
    sideA: 'It is sunny',
    sideB: 'Il fait soleil',
    comment: 'Literally "it makes sun"',
    knowledgeLevel: 'Learning',
  },
  { sideA: 'Snow', sideB: 'La neige', comment: 'Feminine noun', knowledgeLevel: 'Learning' },

  // Days & Months (tag index 10)
  {
    sideA: 'Monday',
    sideB: 'Lundi',
    comment: 'Not capitalised in French',
    knowledgeLevel: 'Learning',
  },
  {
    sideA: 'Sunday',
    sideB: 'Dimanche',
    comment: 'Last day of the week in French calendars',
    knowledgeLevel: 'Learning',
  },
  {
    sideA: 'January',
    sideB: 'Janvier',
    comment: 'Not capitalised in French',
    knowledgeLevel: 'Learning',
  },

  // Emotions (tag index 13)
  {
    sideA: 'Happy',
    sideB: 'Heureux / Heureuse',
    comment: 'Masculine / Feminine',
    knowledgeLevel: 'Learning',
  },
  { sideA: 'Sad', sideB: 'Triste', comment: 'Same for m/f', knowledgeLevel: 'Learning' },
  {
    sideA: 'Tired',
    sideB: 'Fatigué / Fatiguée',
    comment: 'Adds -e for feminine',
    knowledgeLevel: 'Learning',
  },

  // Common Phrases (tag index 19)
  { sideA: 'Thank you', sideB: 'Merci', comment: 'Universal thanks', knowledgeLevel: 'Learning' },
  {
    sideA: 'Please',
    sideB: "S'il vous plaît",
    comment: 'Formal; use "s\'il te plaît" informally',
    knowledgeLevel: 'Learning',
  },
  {
    sideA: "I don't understand",
    sideB: 'Je ne comprends pas',
    comment: 'Very useful phrase for beginners',
    knowledgeLevel: 'Learning',
  },
  {
    sideA: 'Where is the bathroom?',
    sideB: 'Où sont les toilettes ?',
    comment: 'Note the space before ? in French',
    knowledgeLevel: 'Learning',
  },
  {
    sideA: 'How much does it cost?',
    sideB: 'Combien ça coûte ?',
    comment: 'Essential shopping phrase',
    knowledgeLevel: 'Learning',
  },
] as const;
