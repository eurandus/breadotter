// Edit your copy here. The card components read everything from this file.

// Photos live in src/assets. To change one, drop the new file in that folder
// and point the import at it.
import card1Photo from './assets/card1.jpg';
// Card 2: add your photo as src/assets/card2.jpg, then replace the line below with:
//   import card2Photo from './assets/card2.jpg';
const card2Photo = null; // null = show the jelly otter instead

export const profile = {
  name: 'Germaine Chin',
  role: 'Fintech Product Manager',
  place: 'Singapore',
  company: 'Phillip Nova',
  creds: ['A-CSPO®', 'CSM®'],
  photo: card1Photo,
  photoAlt: 'Germaine walking past the hillside houses of Gamcheon Culture Village, Busan',
  photoTag: 'Gamcheon, Busan',
  links: [
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/germainecwc/' },
    { label: 'Resume', href: 'https://docs.google.com/document/d/1tUc41yCwKOdEyJEgecgtFhtWDzFBQyZo/edit?usp=sharing' },
    {
      label: 'Case study',
      href: 'https://sand-avatar-046.notion.site/Case-Study-Trading-On-boarding-Platform-22e56b9036bb8063bb2fda64f6297a62?pvs=73',
      hideOnPhone: true,
    },
  ],
};

export const powers = {
  name: 'Germaine, Otter of Controlled Chaos',
  type: 'Legendary Creature — Otter PM',
  photo: card2Photo,
  photoAlt: 'Germaine',
  artTag: 'holds favourite rock', // label shown on the art (used with the otter)
  abilities: [
    { keyword: 'Ward', text: 'MAS, AML/CFT, SGX.' },
    { keyword: 'Sense', text: 'Whenever chaos enters the backlog, it becomes controlled chaos.' },
    { keyword: 'Solve', text: 'Tap: turn a vague request into a user story with acceptance criteria.' },
    { keyword: 'Ship', text: 'Once each sprint, release a feature to Singapore and Malaysia. Cognitive load costs users 1 less.' },
  ],
  flavor: 'Upbeat, people-centered, driven by possibilities.',
  stats: '7/7',
  footer: ['GC · 002/003 · EN', 'Illus. a jelly otter'],
};

export const quests = {
  title: 'Off the clock',
  sub: 'Narrative games keep my scenario planning and storytelling sharp.',
  items: [
    { name: 'Dungeons & Dragons', line: 'Group storytelling, one roll at a time.' },
    { name: 'Warhammer 40k', line: 'Painting tiny armies, slowly.' },
    { name: 'Pen & paper RPGs', line: 'Scenario planning with dice.' },
    { name: 'Souls games', line: 'Try, die, learn, retry.' },
  ],
};
