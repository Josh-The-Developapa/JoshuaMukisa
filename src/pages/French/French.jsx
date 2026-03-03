import { useState, useEffect, useRef } from 'react';

const FONTS = `@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400;1,600&family=Crimson+Pro:ital,wght@0,300;0,400;0,500;1,300;1,400&family=DM+Sans:wght@300;400;500&display=swap');`;

// ── DATA ─────────────────────────────────────────────────────────────────────

const VOCAB_TOPICS = {
  'La Famille': [
    ['la famille', 'the family'],
    ['les parents', 'the parents'],
    ['le père', 'the father'],
    ['la mère', 'the mother'],
    ['le frère', 'the brother'],
    ['la sœur', 'the sister'],
    ['le mari', 'the husband'],
    ['la femme', 'the wife'],
    ['les grands-parents', 'the grandparents'],
    ['le grand-père', 'the grandfather'],
    ['la grand-mère', 'the grandmother'],
    ["l'oncle", 'the uncle'],
    ['la tante', 'the aunt'],
    ['le cousin / la cousine', 'the cousin'],
    ['le fils', 'the son'],
    ['la fille', 'the daughter'],
    ['le bébé', 'the baby'],
    ['le demi-frère', 'the step-brother'],
    ['la demi-sœur', 'the step-sister'],
    ['célibataire', 'single'],
    ['marié(e)', 'married'],
    ['divorcé(e)', 'divorced'],
    ['se marier', 'to get married'],
    ['le mariage', 'the wedding / marriage'],
    ["s'entendre avec", 'to get along with'],
    ['gronder', 'to scold'],
    ['gâté(e)', 'spoilt'],
    ['tolérant(e)', 'tolerant'],
    ['la dispute', 'the disagreement / argument'],
    ['le sans-abri', 'the homeless person'],
    ['le foyer', 'the home / shelter'],
    ['la famille monoparentale', 'the single-parent family'],
    ['les règles', 'the rules'],
    ['respecter', 'to respect'],
    ['la génération', 'the generation'],
    ['le conflit', 'the conflict'],
    ["s'énerver", 'to get annoyed'],
    ['faire des histoires', 'to make a fuss'],
  ],
  "Les Amis & L'Amitié": [
    ["l'ami(e)", 'the friend'],
    ['le/la meilleur(e) ami(e)', 'the best friend'],
    ["l'amitié", 'the friendship'],
    ['la pression des pairs', 'peer pressure'],
    ['faire confiance à', 'to trust'],
    ['influencer', 'to influence'],
    ['soutenir', 'to support'],
    ['la loyauté', 'loyalty'],
    ['honnête', 'honest'],
    ['fidèle', 'faithful / loyal'],
    ['trahir', 'to betray'],
    ['la trahison', 'betrayal'],
    ["l'usurpation d'identité", 'identity theft'],
    ['le jeûne', 'the fast'],
    ['la charité', 'charity'],
    ['boire', 'to drink'],
    ['fumer', 'to smoke'],
    ['les richesses', 'the riches / wealth'],
    ['défendre ses convictions', "to stand up for one's beliefs"],
    ['la pression', 'the pressure'],
    ['la solidarité', 'solidarity'],
    ['sortir en ville', 'to go out to town'],
    ['la fête', 'the party'],
    ["s'amuser", 'to have fun'],
    ['les loisirs', 'leisure activities'],
  ],
  'La Maison & Le Quartier': [
    ['la maison', 'the house'],
    ["l'appartement", 'the flat / apartment'],
    ['le quartier', 'the neighbourhood'],
    ['le salon', 'the living room'],
    ['la cuisine', 'the kitchen'],
    ['la chambre', 'the bedroom'],
    ['la salle de bains', 'the bathroom'],
    ['le jardin', 'the garden'],
    ['le sous-sol', 'the basement'],
    ['le grenier', 'the attic'],
    ['ranger', 'to tidy up'],
    ['recycler', 'to recycle'],
    ['les voisins', 'the neighbours'],
    ['le lotissement', 'the housing estate'],
    ['la campagne', 'the countryside'],
    ['la ville', 'the town / city'],
    ['le sans-abri', 'the homeless person'],
    ['le taudis', 'the hovel'],
    ['la crise du logement', 'the housing crisis'],
    ['le propriétaire', 'the landlord'],
    ['louer', 'to rent'],
    ['construire', 'to build'],
    ['emménager', 'to move in'],
    ['déménager', 'to move house'],
    ['les tâches ménagères', 'the household chores'],
    ["l'aspirateur", 'the vacuum cleaner'],
    ['faire le ménage', 'to do the housework'],
  ],
  'Le Sport': [
    ['le sport', 'sport'],
    ['le joueur / la joueuse', 'the player'],
    ["l'équipe", 'the team'],
    ['le match', 'the match / game'],
    ['gagner', 'to win'],
    ['perdre', 'to lose'],
    ['marquer un but', 'to score a goal'],
    ["l'entraîneur", 'the coach / trainer'],
    ["s'entraîner", 'to train'],
    ['les Jeux Olympiques', 'the Olympic Games'],
    ['la médaille', 'the medal'],
    ['le dopage', 'doping'],
    ['le carton jaune', 'the yellow card'],
    ['les règles', 'the rules'],
    ['la finale', 'the final'],
    ['le championnat', 'the championship'],
    ['nager', 'to swim'],
    ['courir', 'to run'],
    ['faire du vélo', 'to cycle'],
    ['le stade', 'the stadium'],
    ['la piscine', 'the swimming pool'],
    ['les sports sanglants', 'blood sports'],
    ['interdire', 'to ban / forbid'],
    ['la performance', 'the performance'],
    ['le succès', 'the success'],
    ['les effets secondaires', 'the side effects'],
    ['promouvoir', 'to promote'],
    ["l'arbitre", 'the referee'],
    ['siffler', 'to whistle'],
  ],
  "L'Économie": [
    ["l'économie", 'the economy'],
    ['le commerce', 'trade / commerce'],
    ['acheter', 'to buy'],
    ['vendre', 'to sell'],
    ['le remboursement', 'the refund'],
    ['la garantie', 'the guarantee'],
    ['le consommateur', 'the consumer'],
    ['le compte bancaire', 'the bank account'],
    ['les économies', 'the savings'],
    ['arnaquer', 'to swindle / cheat'],
    ['la société', 'the company'],
    ['le comptable', 'the accountant'],
    ['la promotion', 'the promotion'],
    ['les actions', 'the shares'],
    ['le commerce en ligne', 'online trading'],
    ['le chômage', 'unemployment'],
    ['le travail à temps partiel', 'part-time work'],
    ['le salaire', 'the salary / wage'],
    ['le budget', 'the budget'],
    ['la dette', 'the debt'],
    ['les impôts', 'the taxes'],
    ['le point de vue', 'the point of view'],
    ['convaincre', 'to convince'],
    ['mériter', 'to deserve'],
    ['le patron', 'the boss'],
  ],
  "L'École": [
    ["l'école", 'the school'],
    ['le lycée', 'the secondary school (senior)'],
    ['le collège', 'the secondary school (junior)'],
    ['le professeur', 'the teacher'],
    ["l'élève", 'the pupil'],
    ['la salle de classe', 'the classroom'],
    ["l'emploi du temps", 'the timetable'],
    ['les devoirs', 'the homework'],
    ['réviser', 'to revise'],
    ['passer un examen', 'to sit an exam'],
    ['réussir', 'to pass / succeed'],
    ['échouer', 'to fail'],
    ["l'uniforme scolaire", 'the school uniform'],
    ['le proviseur', 'the headteacher'],
    ['la note', 'the mark / grade'],
    ['le bulletin scolaire', 'the school report'],
    ['le tableau blanc interactif', 'the interactive whiteboard'],
    ['le système de points', 'the points system'],
    ['redoubler', 'to repeat a year'],
    ['les matières', 'the subjects'],
    ['les sciences', 'science'],
    ["l'histoire", 'history'],
    ['la géographie', 'geography'],
    ['les maths', 'maths'],
    ['la récréation', 'the break / recess'],
    ['la cantine', 'the canteen'],
    ['être à jour', 'to be up to date'],
    ['strict(e)', 'strict'],
    ['objectif / objective', 'fair / objective'],
  ],
  "L'Environnement": [
    ["l'environnement", 'the environment'],
    ['la pollution', 'pollution'],
    ['le réchauffement climatique', 'global warming'],
    ['les énergies renouvelables', 'renewable energy'],
    ["l'énergie solaire", 'solar energy'],
    ['les panneaux solaires', 'solar panels'],
    ['recycler', 'to recycle'],
    ['gaspiller', 'to waste'],
    ['économiser', 'to save'],
    ['protéger', 'to protect'],
    ['les déchets', 'waste / rubbish'],
    ['la catastrophe naturelle', 'the natural disaster'],
    ['le tremblement de terre', 'the earthquake'],
    ["l'inondation", 'the flood'],
    ['la sécheresse', 'the drought'],
    ['la tempête', 'the storm'],
    ['le pays en voie de développement', 'the developing country'],
    ['responsable', 'responsible'],
    ['la responsabilité', 'responsibility / accountability'],
    ['la crise du logement', 'the accommodation / housing crisis'],
    ['les gaz à effet de serre', 'greenhouse gases'],
    ['la déforestation', 'deforestation'],
    ['la biodiversité', 'biodiversity'],
    ["l'effet de serre", 'the greenhouse effect'],
    ['le risque', 'the risk'],
    ['les dommages', 'the damage'],
  ],
  'La Santé': [
    ['la santé', 'health'],
    ['la maladie', 'illness / disease'],
    ['le médecin', 'the doctor'],
    ["l'hôpital", 'the hospital'],
    ['le médicament', 'the medicine'],
    ["l'ordonnance", 'the prescription'],
    ['fumer', 'to smoke'],
    ['boire', 'to drink'],
    ["l'alcool", 'alcohol'],
    ['binge drinking', 'binge drinking'],
    ['la drogue', 'drugs'],
    ['en bonne santé', 'in good health'],
    ['malade', 'ill / sick'],
    ['guérir', 'to recover / heal'],
    ['un remède', 'a cure / remedy'],
    ['la recherche', 'research'],
    ['le cancer', 'cancer'],
    ['le stress', 'stress'],
    ["l'obésité", 'obesity'],
    ['en surpoids', 'overweight'],
    ["l'anorexie", 'anorexia'],
    ['la pression', 'pressure'],
    ['se reposer', 'to rest'],
    ['le cerveau', 'the brain'],
    ['le corps humain', 'the human body'],
    ["l'OMS", 'the WHO (World Health Organisation)'],
    ['le SIDA', 'AIDS'],
    ['éradiquer', 'to eradicate'],
    ['les sucreries', 'sweets / sugary things'],
    ['la dépendance', 'addiction'],
  ],
  'La Technologie': [
    ['la technologie', 'technology'],
    ["l'ordinateur", 'the computer'],
    ['le portable', 'the mobile phone / laptop'],
    ['Internet', 'the internet'],
    ['télécharger', 'to download'],
    ['brancher', 'to plug in'],
    ['les réseaux sociaux', 'social media'],
    ['le site web', 'the website'],
    ["l'application", 'the app'],
    ['le mot de passe', 'the password'],
    ['pirater', 'to hack'],
    ['illégalement', 'illegally'],
    ['la programmation', 'programming'],
    ['la technologie de pointe', 'state-of-the-art technology'],
    ['le kit mains-libres', 'hands-free kit'],
    ['tracer', 'to trace / track'],
    ["l'industrie musicale", 'the music industry'],
    ['la communication', 'communication'],
    ['rester en contact', 'to keep in touch'],
    ['faire partie du mouvement', 'to jump on the bandwagon'],
    ['le siècle dernier', 'the last century'],
    ['le chercheur', 'the researcher'],
    ['généré par ordinateur', 'computer-generated'],
    ["l'usage personnel", 'personal use'],
    ['le streaming', 'streaming'],
    ["l'intelligence artificielle", 'artificial intelligence'],
  ],
  'Les Problèmes Sociaux': [
    ['les problèmes sociaux', 'social problems'],
    ['le chômage', 'unemployment'],
    ["l'alcoolisme", 'alcoholism'],
    ['la toxicomanie', 'drug addiction'],
    ['la traite des êtres humains', 'human trafficking'],
    ["les droits de l'homme", 'human rights'],
    ['la pauvreté', 'poverty'],
    ['la richesse', 'wealth'],
    ['le jeu (compulsif)', 'gambling (compulsive)'],
    ['la haine raciale', 'racial hatred'],
    ['la violence', 'violence'],
    ['le sans-abri', 'the homeless person'],
    ['la discrimination', 'discrimination'],
    ["l'humiliation", 'humiliation'],
    ['les mauvais traitements', 'ill-treatment'],
    ['la responsabilité', 'responsibility'],
    ['la campagne de sensibilisation', 'awareness campaign'],
    ['le gouvernement', 'the government'],
    ['lancer', 'to launch'],
    ['sinon', 'otherwise'],
    ['la loi', 'the law'],
    ["l'âge légal", 'the legal age'],
    ['le comportement', 'behaviour'],
    ["la consommation d'alcool", 'alcohol consumption'],
    ['les sans-abri', 'the homeless'],
  ],
};

const TENSES = {
  'Le Présent': {
    color: '#3B82F6',
    description:
      'Used to express habitual actions or what is happening right now.',
    icon: '⚡',
    rules: [
      {
        title: 'ER Verbs (e.g. donner – to give)',
        stem: 'Remove -ER → donn-',
        endings: [
          ['Je', 'donn+e'],
          ['Tu', 'donn+es'],
          ['Il/Elle', 'donn+e'],
          ['Nous', 'donn+ons'],
          ['Vous', 'donn+ez'],
          ['Ils/Elles', 'donn+ent'],
        ],
      },
      {
        title: 'IR Verbs (e.g. finir – to finish)',
        stem: 'Remove -IR → fin-',
        endings: [
          ['Je', 'fin+is'],
          ['Tu', 'fin+is'],
          ['Il/Elle', 'fin+it'],
          ['Nous', 'fin+issons'],
          ['Vous', 'fin+issez'],
          ['Ils/Elles', 'fin+issent'],
        ],
      },
      {
        title: 'RE Verbs (e.g. vendre – to sell)',
        stem: 'Remove -RE → vend-',
        endings: [
          ['Je', 'vend+s'],
          ['Tu', 'vend+s'],
          ['Il/Elle', 'vend'],
          ['Nous', 'vend+ons'],
          ['Vous', 'vend+ez'],
          ['Ils/Elles', 'vend+ent'],
        ],
      },
    ],
    irregular: [
      ['être (to be)', 'suis, es, est, sommes, êtes, sont'],
      ['avoir (to have)', 'ai, as, a, avons, avez, ont'],
      ['aller (to go)', 'vais, vas, va, allons, allez, vont'],
      ['faire (to do/make)', 'fais, fais, fait, faisons, faites, font'],
      ['pouvoir (to be able to)', 'peux, peux, peut, pouvons, pouvez, peuvent'],
      ['vouloir (to want)', 'veux, veux, veut, voulons, voulez, veulent'],
      ['devoir (to have to)', 'dois, dois, doit, devons, devez, doivent'],
      ['venir (to come)', 'viens, viens, vient, venons, venez, viennent'],
      ['prendre (to take)', 'prends, prends, prend, prenons, prenez, prennent'],
      ['savoir (to know)', 'sais, sais, sait, savons, savez, savent'],
    ],
    tip: '🇫🇷 Unlike English, French has only ONE present tense. "Je mange" means both "I eat" AND "I am eating".',
    examples: [
      ['Je parle français.', 'I speak French / I am speaking French.'],
      ['Elle mange une pomme.', 'She eats / is eating an apple.'],
    ],
  },
  'Passé Composé (Avoir)': {
    color: '#8B5CF6',
    description:
      'A past tense for completed, specific actions. Uses AVOIR + past participle.',
    icon: '📜',
    rules: [
      {
        title: 'Rule',
        stem: 'Present of AVOIR + Past Participle',
        endings: [
          ['ER verbs', 'remove -ER, add -é (donner → donné)'],
          ['IR verbs', 'remove -IR, add -i (finir → fini)'],
          ['RE verbs', 'remove -RE, add -u (vendre → vendu)'],
        ],
      },
    ],
    irregular: [
      ['avoir (to have)', 'eu'],
      ['boire (to drink)', 'bu'],
      ['conduire (to drive)', 'conduit'],
      ['croire (to believe)', 'cru'],
      ['devoir (to have to)', 'dû'],
      ['dire (to say)', 'dit'],
      ['écrire (to write)', 'écrit'],
      ['être (to be)', 'été'],
      ['faire (to do/make)', 'fait'],
      ['lire (to read)', 'lu'],
      ['mettre (to put)', 'mis'],
      ['ouvrir (to open)', 'ouvert'],
      ['pouvoir (to be able)', 'pu'],
      ['prendre (to take)', 'pris'],
      ['voir (to see)', 'vu'],
      ['vouloir (to want)', 'voulu'],
      ['vivre (to live)', 'vécu'],
    ],
    tip: '⚠️ Use Passé Composé for a SPECIFIC completed action: "Je suis allé au cinéma hier" (I went to the cinema yesterday). The time marker "hier" makes it specific.',
    examples: [
      ["J'ai mangé une pizza hier.", 'I ate a pizza yesterday.'],
      ['Il a fini ses devoirs.', 'He finished his homework.'],
    ],
  },
  'Passé Composé (Être)': {
    color: '#EC4899',
    description:
      'Certain verbs (mostly movement/state) use ÊTRE instead of avoir. The past participle must AGREE with the subject.',
    icon: '🚀',
    rules: [
      {
        title: 'Rule: ÊTRE + Past Participle + Agreement',
        stem: 'Add: -e (fem.), -s (masc. pl.), -es (fem. pl.)',
        endings: [
          ['aller → allé(e)', 'to go'],
          ['arriver → arrivé(e)', 'to arrive'],
          ['partir → parti(e)', 'to leave'],
          ['venir → venu(e)', 'to come'],
          ['entrer → entré(e)', 'to enter'],
          ['sortir → sorti(e)', 'to go out'],
          ['naître → né(e)', 'to be born'],
          ['mourir → mort(e)', 'to die'],
          ['tomber → tombé(e)', 'to fall'],
          ['rester → resté(e)', 'to stay'],
          ['monter → monté(e)', 'to go up'],
          ['descendre → descendu(e)', 'to go down'],
          ['devenir → devenu(e)', 'to become'],
          ['retourner → retourné(e)', 'to return'],
        ],
      },
    ],
    irregular: [],
    tip: "💡 Remember the 'DR MRS VANDERTRAMP' verbs! They all take être. Also ALL reflexive verbs use être.",
    examples: [
      [
        'Elle est allée au marché.',
        'She went to the market. (-e added for feminine)',
      ],
      [
        'Ils sont partis tôt.',
        'They left early. (-s added for masculine plural)',
      ],
    ],
  },
  "L'Imparfait": {
    color: '#F59E0B',
    description:
      'Used for repeated/habitual past actions, descriptions, weather, emotions, and interrupted actions.',
    icon: '🌅',
    rules: [
      {
        title: 'Formation: Take nous form → remove -ons → add endings',
        stem: 'e.g. parler → nous parlons → parl-',
        endings: [
          ['Je', '-ais'],
          ['Tu', '-ais'],
          ['Il/Elle', '-ait'],
          ['Nous', '-ions'],
          ['Vous', '-iez'],
          ['Ils/Elles', '-aient'],
        ],
      },
    ],
    irregular: [
      [
        'être (ONLY irregular)',
        "j'étais, tu étais, il était, nous étions, vous étiez, ils étaient",
      ],
    ],
    tip: '🎯 Imparfait = duration/repetition in the past. Passé Composé = sudden/completed event.\n"Je regardais la télé" (ongoing) vs "tu as téléphoné" (sudden).',
    examples: [
      [
        "L'été dernier, je sortais tous les soirs.",
        'Last summer, I used to go out every evening.',
      ],
      ['Il pleuvait ce matin-là.', 'It was raining that morning.'],
    ],
  },
  'Le Futur': {
    color: '#10B981',
    description:
      'Expresses what WILL happen. Two types: immediate future (aller + infinitive) and future simple.',
    icon: '🔮',
    rules: [
      {
        title: 'Immediate Future: aller + infinitive',
        stem: 'Je vais + infinitive',
        endings: [
          ['Je vais regarder', 'I am going to watch'],
          ['Tu vas manger', 'You are going to eat'],
          ['Il va partir', 'He is going to leave'],
        ],
      },
      {
        title: 'Future Simple: Keep infinitive (drop -e for RE) + endings',
        stem: 'donner → donner + ai',
        endings: [
          ['Je', '-ai'],
          ['Tu', '-as'],
          ['Il/Elle', '-a'],
          ['Nous', '-ons'],
          ['Vous', '-ez'],
          ['Ils/Elles', '-ont'],
        ],
      },
    ],
    irregular: [
      ['aller', "j'irai"],
      ['avoir', "j'aurai"],
      ['être', 'je serai'],
      ['faire', 'je ferai'],
      ['pouvoir', 'je pourrai'],
      ['vouloir', 'je voudrai'],
      ['venir', 'je viendrai'],
      ['voir', 'je verrai'],
      ['savoir', 'je saurai'],
      ['devoir', 'je devrai'],
      ['envoyer', "j'enverrai"],
      ['tenir', 'je tiendrai'],
    ],
    tip: '🌟 Future Simple scores better marks in exams than the immediate future. Learn those irregular stems!',
    examples: [
      ['Je partirai demain matin.', 'I will leave tomorrow morning.'],
      ['Il pleuvra dans le nord.', 'It will rain in the north.'],
    ],
  },
  'Le Conditionnel': {
    color: '#6366F1',
    description: "Expresses what WOULD happen. Used with 'si' (if) clauses.",
    icon: '💭',
    rules: [
      {
        title: 'Same stems as future + imperfect endings',
        stem: 'donner + imperfect endings',
        endings: [
          ['Je', '-ais'],
          ['Tu', '-ais'],
          ['Il/Elle', '-ait'],
          ['Nous', '-ions'],
          ['Vous', '-iez'],
          ['Ils/Elles', '-aient'],
        ],
      },
      {
        title: '1st Conditional: possible/likely',
        stem: 'Si + présent + futur',
        endings: [
          [
            'Si tu viens, je te montrerai...',
            'If you come, I will show you...',
          ],
        ],
      },
      {
        title: '2nd Conditional: hypothetical',
        stem: 'Si + imparfait + conditionnel',
        endings: [
          ['Si tu venais, tu verrais...', 'If you came, you would see...'],
        ],
      },
    ],
    irregular: [
      ['aller', "j'irais"],
      ['avoir', "j'aurais"],
      ['être', 'je serais'],
      ['faire', 'je ferais'],
      ['pouvoir', 'je pourrais'],
      ['vouloir', 'je voudrais'],
      ['venir', 'je viendrais'],
      ['voir', 'je verrais'],
      ['savoir', 'je saurais'],
    ],
    tip: '🎓 The conditional has the SAME irregular stems as the future — just swap the endings from -ai/-as/-a to -ais/-ais/-ait!',
    examples: [
      ['Je mangerais bien une crêpe.', 'I would really like to eat a crêpe.'],
      [
        "Si j'avais le temps, je voyagerais.",
        'If I had the time, I would travel.',
      ],
    ],
  },
  'Le Subjonctif': {
    color: '#EF4444',
    description:
      'A mood (not a tense) expressing emotion, doubt, will, or uncertainty after certain phrases.',
    icon: '🎭',
    rules: [
      {
        title: 'Formation: ils/elles present → remove -ent → add endings',
        stem: 'parler → ils parlent → parl-',
        endings: [
          ['Que je', '-e'],
          ['Que tu', '-es'],
          ["Qu'il/elle", '-e'],
          ['Que nous', '-ions'],
          ['Que vous', '-iez'],
          ["Qu'ils/elles", '-ent'],
        ],
      },
    ],
    irregular: [
      ['être', 'que je sois'],
      ['avoir', "que j'aie"],
      ['aller', "que j'aille"],
      ['faire', 'que je fasse'],
      ['pouvoir', 'que je puisse'],
      ['vouloir', 'que je veuille'],
      ['venir', 'que je vienne'],
      ['savoir', 'que je sache'],
      ['prendre', 'que je prenne'],
    ],
    tip: "🔑 KEY TRIGGERS: C'est dommage que... • Il faut que... • Il est nécessaire que... • Je regrette que... • Il est possible que... • Il vaut mieux que...",
    examples: [
      ['Il faut que tu travailles.', 'It is necessary that you work.'],
      ["C'est dommage qu'il soit malade.", "It's a pity that he is ill."],
    ],
  },
};

// ── STYLES ────────────────────────────────────────────────────────────────────

const css = `
  ${FONTS}
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  :root {
    --cream: #FDF8F0;
    --parchment: #F5ECD7;
    --ink: #1A1209;
    --ink-light: #4A3728;
    --bordeaux: #7C1D2E;
    --bordeaux-light: #A83248;
    --gold: #C9A84C;
    --gold-light: #E8C76A;
    --sage: #5A7A5C;
    --shadow: rgba(26, 18, 9, 0.12);
    --shadow-lg: rgba(26, 18, 9, 0.22);
  }
  html, body { height: 100%; }
  body { background: var(--cream); font-family: 'DM Sans', sans-serif; color: var(--ink); }
  
  /* Animated grain overlay */
  body::before {
    content: '';
    position: fixed; inset: 0; z-index: 0; pointer-events: none;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E");
    opacity: 0.5;
  }

  .app { position: relative; z-index: 1; min-height: 100vh; }

  /* Header */
  .header {
    background: var(--ink);
    padding: 24px 32px;
    display: flex; align-items: center; justify-content: space-between;
    border-bottom: 3px solid var(--gold);
    position: sticky; top: 0; z-index: 100;
    box-shadow: 0 4px 20px var(--shadow-lg);
  }
  .header-brand { display: flex; align-items: baseline; gap: 12px; }
  .header-brand h1 {
    font-family: 'Playfair Display', serif;
    font-style: italic; font-size: 26px;
    color: var(--gold-light); letter-spacing: -0.5px;
  }
  .header-brand span { color: var(--cream); opacity: 0.5; font-size: 13px; letter-spacing: 2px; text-transform: uppercase; }
  .header-nav { display: flex; gap: 8px; }
  .nav-btn {
    background: transparent; border: 1px solid rgba(255,255,255,0.15);
    color: var(--cream); opacity: 0.6;
    padding: 8px 18px; border-radius: 100px;
    font-family: 'DM Sans', sans-serif; font-size: 13px; font-weight: 500;
    cursor: pointer; transition: all 0.2s;
    letter-spacing: 0.5px;
  }
  .nav-btn:hover { opacity: 1; border-color: var(--gold); color: var(--gold-light); }
  .nav-btn.active { background: var(--gold); color: var(--ink); opacity: 1; border-color: var(--gold); font-weight: 600; }

  /* Main */
  .main { padding: 32px; max-width: 1100px; margin: 0 auto; }

  /* Section heading */
  .section-heading {
    font-family: 'Playfair Display', serif;
    font-size: 13px; font-weight: 400; letter-spacing: 4px;
    text-transform: uppercase; color: var(--bordeaux);
    margin-bottom: 8px;
  }
  .section-title {
    font-family: 'Playfair Display', serif;
    font-size: 36px; font-weight: 700;
    color: var(--ink); line-height: 1.1;
    margin-bottom: 28px;
  }

  /* Topic selector */
  .topic-grid {
    display: flex; flex-wrap: wrap; gap: 8px;
    margin-bottom: 32px;
  }
  .topic-pill {
    background: var(--parchment); border: 1px solid rgba(0,0,0,0.1);
    color: var(--ink-light); padding: 7px 16px;
    border-radius: 100px; font-size: 13px; font-weight: 500;
    cursor: pointer; transition: all 0.2s;
    white-space: nowrap;
  }
  .topic-pill:hover { border-color: var(--bordeaux); color: var(--bordeaux); }
  .topic-pill.active { background: var(--bordeaux); color: white; border-color: var(--bordeaux); }

  /* Mode switcher */
  .mode-row { display: flex; gap: 10px; margin-bottom: 28px; align-items: center; }
  .mode-btn {
    background: transparent; border: 1.5px solid rgba(0,0,0,0.15);
    color: var(--ink-light); padding: 8px 20px;
    border-radius: 8px; font-size: 13px; font-weight: 500;
    cursor: pointer; transition: all 0.2s;
  }
  .mode-btn.active { background: var(--ink); color: var(--cream); border-color: var(--ink); }
  .mode-label { font-size: 13px; color: var(--ink-light); margin-left: 4px; }
  .progress-badge {
    margin-left: auto; background: var(--parchment); border: 1px solid rgba(0,0,0,0.1);
    padding: 6px 14px; border-radius: 100px; font-size: 12px; color: var(--ink-light);
  }
  .progress-badge b { color: var(--bordeaux); }

  /* FLASHCARD */
  .flashcard-container { perspective: 1200px; width: 100%; max-width: 580px; margin: 0 auto; }
  .flashcard-inner {
    position: relative; width: 100%; padding-top: 56%;
    transform-style: preserve-3d;
    transition: transform 0.55s cubic-bezier(0.4, 0, 0.2, 1);
    cursor: pointer;
  }
  .flashcard-inner.flipped { transform: rotateY(180deg); }
  .flashcard-face {
    position: absolute; inset: 0;
    backface-visibility: hidden;
    border-radius: 20px;
    display: flex; flex-direction: column;
    align-items: center; justify-content: center;
    padding: 36px;
    box-shadow: 0 8px 40px var(--shadow-lg);
  }
  .flashcard-front {
    background: linear-gradient(145deg, var(--ink) 0%, #2D1B10 100%);
    border: 1px solid rgba(201,168,76,0.3);
  }
  .flashcard-back {
    background: linear-gradient(145deg, var(--bordeaux) 0%, #5C1221 100%);
    transform: rotateY(180deg);
    border: 1px solid rgba(201,168,76,0.2);
  }
  .card-label {
    font-size: 11px; letter-spacing: 3px; text-transform: uppercase;
    color: var(--gold); opacity: 0.7; margin-bottom: 16px;
    font-family: 'DM Sans', sans-serif;
  }
  .card-word {
    font-family: 'Playfair Display', serif;
    font-size: clamp(24px, 4vw, 38px);
    color: var(--cream); text-align: center;
    line-height: 1.2; font-style: italic;
  }
  .card-hint { margin-top: 16px; font-size: 12px; color: var(--gold); opacity: 0.6; }
  .card-controls {
    display: flex; gap: 16px; justify-content: center;
    margin-top: 28px; align-items: center;
  }
  .ctrl-btn {
    background: var(--parchment); border: 1.5px solid rgba(0,0,0,0.1);
    color: var(--ink); padding: 10px 24px;
    border-radius: 100px; font-size: 14px; font-weight: 600;
    cursor: pointer; transition: all 0.2s;
    display: flex; align-items: center; gap: 8px;
  }
  .ctrl-btn:hover { background: var(--ink); color: var(--cream); border-color: var(--ink); }
  .ctrl-btn.knew { background: var(--sage); color: white; border-color: var(--sage); }
  .ctrl-btn.forgot { background: var(--bordeaux); color: white; border-color: var(--bordeaux); }
  .card-counter { font-size: 13px; color: var(--ink-light); opacity: 0.6; min-width: 60px; text-align: center; }

  /* LIST MODE */
  .vocab-list { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 10px; }
  .vocab-item {
    background: white; border: 1px solid rgba(0,0,0,0.07);
    border-radius: 12px; padding: 14px 18px;
    display: flex; justify-content: space-between; align-items: center;
    transition: all 0.18s; box-shadow: 0 1px 4px var(--shadow);
  }
  .vocab-item:hover { border-color: var(--bordeaux); transform: translateY(-1px); box-shadow: 0 4px 12px var(--shadow); }
  .vocab-fr { font-family: 'Crimson Pro', serif; font-size: 17px; font-style: italic; color: var(--ink); }
  .vocab-sep { color: var(--gold); opacity: 0.5; }
  .vocab-en { font-size: 14px; color: var(--ink-light); }

  /* QUIZ MODE */
  .quiz-card {
    max-width: 600px; margin: 0 auto;
    background: white; border-radius: 24px;
    padding: 40px; box-shadow: 0 8px 40px var(--shadow-lg);
    border: 1px solid rgba(0,0,0,0.07);
  }
  .quiz-question {
    font-family: 'Playfair Display', serif;
    font-size: 28px; font-style: italic;
    text-align: center; margin-bottom: 32px;
    color: var(--ink);
  }
  .quiz-options { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
  .quiz-option {
    background: var(--parchment); border: 2px solid rgba(0,0,0,0.08);
    border-radius: 12px; padding: 16px;
    font-size: 14px; color: var(--ink-light);
    cursor: pointer; transition: all 0.18s;
    text-align: center;
  }
  .quiz-option:hover:not(.disabled) { border-color: var(--bordeaux); color: var(--bordeaux); background: white; }
  .quiz-option.correct { background: #DCFCE7; border-color: #16A34A; color: #15803D; }
  .quiz-option.wrong { background: #FEE2E2; border-color: #DC2626; color: #DC2626; }
  .quiz-option.disabled { cursor: default; }
  .quiz-feedback {
    text-align: center; margin-top: 24px; padding: 16px;
    border-radius: 12px; font-weight: 500;
  }
  .quiz-feedback.correct { background: #DCFCE7; color: #15803D; }
  .quiz-feedback.wrong { background: #FEE2E2; color: #DC2626; }
  .quiz-score {
    display: flex; gap: 24px; justify-content: center; margin-bottom: 28px;
  }
  .score-item { text-align: center; }
  .score-num { font-family: 'Playfair Display', serif; font-size: 36px; font-weight: 700; }
  .score-label { font-size: 12px; color: var(--ink-light); text-transform: uppercase; letter-spacing: 1px; }

  /* GRAMMAR SECTION */
  .tense-grid { display: flex; flex-wrap: wrap; gap: 10px; margin-bottom: 28px; }
  .tense-pill {
    display: flex; align-items: center; gap: 8px;
    background: white; border: 1.5px solid rgba(0,0,0,0.1);
    padding: 10px 18px; border-radius: 12px;
    font-size: 13px; font-weight: 500; color: var(--ink-light);
    cursor: pointer; transition: all 0.2s;
    box-shadow: 0 1px 4px var(--shadow);
  }
  .tense-pill:hover { transform: translateY(-1px); box-shadow: 0 4px 12px var(--shadow); }
  .tense-pill.active { color: white; border-color: transparent; }

  .tense-card {
    background: white; border-radius: 24px;
    padding: 36px; box-shadow: 0 4px 24px var(--shadow);
    border: 1px solid rgba(0,0,0,0.07);
    animation: fadeUp 0.3s ease;
  }
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(12px); }
    to { opacity: 1; transform: translateY(0); }
  }
  .tense-header { display: flex; align-items: flex-start; gap: 16px; margin-bottom: 28px; }
  .tense-icon { font-size: 36px; }
  .tense-title {
    font-family: 'Playfair Display', serif;
    font-size: 28px; font-weight: 700; color: var(--ink);
    margin-bottom: 6px;
  }
  .tense-desc { font-size: 15px; color: var(--ink-light); line-height: 1.5; font-family: 'Crimson Pro', serif; }

  .tense-body { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; }
  @media (max-width: 700px) { .tense-body { grid-template-columns: 1fr; } .quiz-options { grid-template-columns: 1fr; } }

  .rule-block { margin-bottom: 24px; }
  .rule-title {
    font-size: 12px; letter-spacing: 2px; text-transform: uppercase;
    color: var(--bordeaux); font-weight: 600; margin-bottom: 12px;
  }
  .rule-stem { font-size: 13px; color: var(--ink-light); margin-bottom: 10px; font-style: italic; }
  .conjugation-table { width: 100%; border-collapse: collapse; }
  .conjugation-table td {
    padding: 6px 10px; font-size: 14px;
    border-bottom: 1px solid rgba(0,0,0,0.06);
  }
  .conjugation-table td:first-child { color: var(--ink-light); width: 40%; }
  .conjugation-table td:last-child { font-family: 'Crimson Pro', serif; font-style: italic; font-size: 16px; color: var(--ink); }

  .irregular-grid { display: grid; grid-template-columns: 1fr; gap: 6px; margin-top: 8px; }
  .irreg-item {
    display: flex; gap: 12px; align-items: baseline;
    padding: 6px 10px; background: var(--parchment); border-radius: 8px;
    font-size: 13px;
  }
  .irreg-verb { font-family: 'Crimson Pro', serif; font-style: italic; font-size: 15px; color: var(--ink); min-width: 120px; }
  .irreg-forms { color: var(--bordeaux); font-weight: 500; }

  .tip-box {
    margin-top: 24px; padding: 16px 20px;
    background: linear-gradient(135deg, #FFF8E7, #FEF3C7);
    border-left: 4px solid var(--gold);
    border-radius: 0 12px 12px 0;
    font-size: 14px; color: var(--ink-light);
    line-height: 1.6; white-space: pre-line;
  }

  .examples-block { margin-top: 20px; }
  .example-item {
    padding: 12px 16px; background: var(--parchment); border-radius: 10px; margin-bottom: 8px;
  }
  .example-fr { font-family: 'Crimson Pro', serif; font-style: italic; font-size: 16px; color: var(--ink); }
  .example-en { font-size: 13px; color: var(--ink-light); margin-top: 2px; }

  /* Completion animation */
  .completion {
    text-align: center; padding: 60px 20px;
    animation: fadeUp 0.4s ease;
  }
  .completion-emoji { font-size: 72px; margin-bottom: 16px; }
  .completion-title { font-family: 'Playfair Display', serif; font-size: 32px; margin-bottom: 8px; color: var(--ink); }
  .completion-sub { color: var(--ink-light); margin-bottom: 28px; }

  /* Divider */
  .divider { height: 1px; background: linear-gradient(to right, transparent, rgba(0,0,0,0.1), transparent); margin: 28px 0; }
`;

// ── COMPONENT ────────────────────────────────────────────────────────────────

export default function FrenchLearner() {
  const [tab, setTab] = useState('vocab');
  const [topic, setTopic] = useState(Object.keys(VOCAB_TOPICS)[0]);
  const [mode, setMode] = useState('flashcard'); // flashcard | list | quiz
  const [cardIndex, setCardIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [known, setKnown] = useState(new Set());
  const [unknown, setUnknown] = useState(new Set());
  const [tense, setTense] = useState(Object.keys(TENSES)[0]);
  // quiz
  const [quizQ, setQuizQ] = useState(null);
  const [quizOptions, setQuizOptions] = useState([]);
  const [quizAnswer, setQuizAnswer] = useState(null);
  const [quizScore, setQuizScore] = useState({ correct: 0, wrong: 0 });

  const words = VOCAB_TOPICS[topic];

  // Reset on topic change
  useEffect(() => {
    setCardIndex(0);
    setFlipped(false);
    setKnown(new Set());
    setUnknown(new Set());
    if (mode === 'quiz') generateQuiz(VOCAB_TOPICS[topic]);
  }, [topic]);

  useEffect(() => {
    setQuizAnswer(null);
    if (mode === 'quiz') generateQuiz(words);
    if (mode !== 'quiz') {
      setQuizScore({ correct: 0, wrong: 0 });
    }
  }, [mode]);

  function generateQuiz(wordList) {
    const pool = wordList;
    const idx = Math.floor(Math.random() * pool.length);
    const correct = pool[idx];
    const distractors = pool
      .filter((_, i) => i !== idx)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3);
    const opts = [...distractors, correct].sort(() => Math.random() - 0.5);
    setQuizQ(correct);
    setQuizOptions(opts);
    setQuizAnswer(null);
  }

  function handleQuizAnswer(opt) {
    if (quizAnswer) return;
    setQuizAnswer(opt);
    if (opt[0] === quizQ[0]) {
      setQuizScore((s) => ({ ...s, correct: s.correct + 1 }));
    } else {
      setQuizScore((s) => ({ ...s, wrong: s.wrong + 1 }));
    }
  }

  function nextCard(result) {
    if (result === 'knew') setKnown((s) => new Set([...s, cardIndex]));
    else setUnknown((s) => new Set([...s, cardIndex]));
    setFlipped(false);
    setTimeout(() => setCardIndex((i) => i + 1), 120);
  }

  const total = quizScore.correct + quizScore.wrong;
  const accuracy =
    total > 0 ? Math.round((quizScore.correct / total) * 100) : 0;
  const currentTense = TENSES[tense];

  return (
    <>
      <style>{css}</style>
      <div className="app">
        <header className="header">
          <div className="header-brand">
            <h1>Bonne Chance!</h1>
            <span>French Study App</span>
          </div>
          <nav className="header-nav">
            <button
              className={`nav-btn ${tab === 'vocab' ? 'active' : ''}`}
              onClick={() => setTab('vocab')}
            >
              📚 Vocabulaire
            </button>
            <button
              className={`nav-btn ${tab === 'grammar' ? 'active' : ''}`}
              onClick={() => setTab('grammar')}
            >
              ✏️ Grammaire
            </button>
          </nav>
        </header>

        <main className="main">
          {tab === 'vocab' && (
            <>
              <p className="section-heading">Vocabulaire thématique</p>
              <h2 className="section-title">Apprenez les mots</h2>

              {/* Topic pills */}
              <div className="topic-grid">
                {Object.keys(VOCAB_TOPICS).map((t) => (
                  <button
                    key={t}
                    className={`topic-pill ${topic === t ? 'active' : ''}`}
                    onClick={() => setTopic(t)}
                  >
                    {t}
                  </button>
                ))}
              </div>

              {/* Mode + progress */}
              <div className="mode-row">
                {['flashcard', 'list', 'quiz'].map((m) => (
                  <button
                    key={m}
                    className={`mode-btn ${mode === m ? 'active' : ''}`}
                    onClick={() => setMode(m)}
                  >
                    {m === 'flashcard'
                      ? '🃏 Flashcards'
                      : m === 'list'
                        ? '📋 Liste'
                        : '🎯 Quiz'}
                  </button>
                ))}
                <span className="progress-badge">
                  {topic} · <b>{words.length}</b> mots
                  {mode === 'quiz' && total > 0 && (
                    <>
                      {' '}
                      · <b>{accuracy}%</b> correct
                    </>
                  )}
                </span>
              </div>

              {/* FLASHCARD MODE */}
              {mode === 'flashcard' && (
                <>
                  {cardIndex < words.length ? (
                    <div className="flashcard-container">
                      <div
                        className={`flashcard-inner ${flipped ? 'flipped' : ''}`}
                        onClick={() => setFlipped((f) => !f)}
                      >
                        <div className="flashcard-face flashcard-front">
                          <div className="card-label">Français</div>
                          <div className="card-word">{words[cardIndex][0]}</div>
                          <div className="card-hint">
                            Cliquez pour retourner ↺
                          </div>
                        </div>
                        <div className="flashcard-face flashcard-back">
                          <div className="card-label">English</div>
                          <div className="card-word">{words[cardIndex][1]}</div>
                          <div className="card-hint">Retourner ↺</div>
                        </div>
                      </div>
                      <div className="card-controls">
                        <button
                          className="ctrl-btn forgot"
                          onClick={() => nextCard('forgot')}
                        >
                          ✗ À revoir
                        </button>
                        <span className="card-counter">
                          {cardIndex + 1} / {words.length}
                        </span>
                        <button
                          className="ctrl-btn knew"
                          onClick={() => nextCard('knew')}
                        >
                          ✓ Je sais !
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="completion">
                      <div className="completion-emoji">🎉</div>
                      <div className="completion-title">Terminé !</div>
                      <div className="completion-sub">
                        ✅ Connu : {known.size} · 🔄 À revoir : {unknown.size}
                      </div>
                      <button
                        className="ctrl-btn"
                        onClick={() => {
                          setCardIndex(0);
                          setFlipped(false);
                          setKnown(new Set());
                          setUnknown(new Set());
                        }}
                      >
                        Recommencer
                      </button>
                    </div>
                  )}
                </>
              )}

              {/* LIST MODE */}
              {mode === 'list' && (
                <div className="vocab-list">
                  {words.map(([fr, en], i) => (
                    <div key={i} className="vocab-item">
                      <span className="vocab-fr">{fr}</span>
                      <span className="vocab-sep">→</span>
                      <span className="vocab-en">{en}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* QUIZ MODE */}
              {mode === 'quiz' && quizQ && (
                <>
                  <div className="quiz-score">
                    <div className="score-item">
                      <div className="score-num" style={{ color: '#16A34A' }}>
                        {quizScore.correct}
                      </div>
                      <div className="score-label">Correct</div>
                    </div>
                    <div className="score-item">
                      <div
                        className="score-num"
                        style={{ color: 'var(--bordeaux)' }}
                      >
                        {quizScore.wrong}
                      </div>
                      <div className="score-label">Wrong</div>
                    </div>
                    <div className="score-item">
                      <div
                        className="score-num"
                        style={{ color: 'var(--gold)' }}
                      >
                        {accuracy}%
                      </div>
                      <div className="score-label">Accuracy</div>
                    </div>
                  </div>
                  <div className="quiz-card">
                    <div className="quiz-question">{quizQ[0]}</div>
                    <div className="quiz-options">
                      {quizOptions.map((opt, i) => {
                        let cls = 'quiz-option';
                        if (quizAnswer) {
                          cls += ' disabled';
                          if (opt[0] === quizQ[0]) cls += ' correct';
                          else if (quizAnswer[0] === opt[0]) cls += ' wrong';
                        }
                        return (
                          <button
                            key={i}
                            className={cls}
                            onClick={() => handleQuizAnswer(opt)}
                          >
                            {opt[1]}
                          </button>
                        );
                      })}
                    </div>
                    {quizAnswer && (
                      <>
                        <div
                          className={`quiz-feedback ${quizAnswer[0] === quizQ[0] ? 'correct' : 'wrong'}`}
                        >
                          {quizAnswer[0] === quizQ[0]
                            ? '✓ Correct ! Bien joué !'
                            : `✗ La bonne réponse est : "${quizQ[1]}"`}
                        </div>
                        <div style={{ textAlign: 'center', marginTop: 20 }}>
                          <button
                            className="ctrl-btn"
                            onClick={() => generateQuiz(words)}
                          >
                            Question suivante →
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                </>
              )}
            </>
          )}

          {tab === 'grammar' && (
            <>
              <p className="section-heading">Les temps et les modes</p>
              <h2 className="section-title">Maîtrisez la grammaire</h2>

              {/* Tense selector */}
              <div className="tense-grid">
                {Object.entries(TENSES).map(([name, data]) => (
                  <button
                    key={name}
                    className={`tense-pill ${tense === name ? 'active' : ''}`}
                    style={
                      tense === name
                        ? {
                            background: data.color,
                            boxShadow: `0 4px 16px ${data.color}55`,
                          }
                        : {}
                    }
                    onClick={() => setTense(name)}
                  >
                    <span>{data.icon}</span> {name}
                  </button>
                ))}
              </div>

              {/* Tense detail card */}
              <div className="tense-card" key={tense}>
                <div className="tense-header">
                  <div className="tense-icon">{currentTense.icon}</div>
                  <div>
                    <div
                      className="tense-title"
                      style={{ color: currentTense.color }}
                    >
                      {tense}
                    </div>
                    <div className="tense-desc">{currentTense.description}</div>
                  </div>
                </div>

                <div className="tense-body">
                  <div>
                    {currentTense.rules.map((rule, ri) => (
                      <div className="rule-block" key={ri}>
                        <div className="rule-title">{rule.title}</div>
                        {rule.stem && (
                          <div className="rule-stem">{rule.stem}</div>
                        )}
                        <table className="conjugation-table">
                          <tbody>
                            {rule.endings.map(([pron, end], i) => (
                              <tr key={i}>
                                <td>{pron}</td>
                                <td>{end}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    ))}

                    <div className="tip-box">{currentTense.tip}</div>

                    <div className="examples-block">
                      <div className="rule-title" style={{ marginTop: 20 }}>
                        Exemples
                      </div>
                      {currentTense.examples.map(([fr, en], i) => (
                        <div className="example-item" key={i}>
                          <div className="example-fr">{fr}</div>
                          <div className="example-en">{en}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {currentTense.irregular.length > 0 && (
                    <div>
                      <div className="rule-title">
                        {tense === 'Passé Composé (Avoir)'
                          ? 'Participes passés irréguliers'
                          : 'Verbes irréguliers'}
                      </div>
                      <div className="irregular-grid">
                        {currentTense.irregular.map(([verb, forms], i) => (
                          <div className="irreg-item" key={i}>
                            <span className="irreg-verb">{verb}</span>
                            <span className="irreg-forms">{forms}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </>
          )}
        </main>
      </div>
    </>
  );
}
