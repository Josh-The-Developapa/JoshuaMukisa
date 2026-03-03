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

  /* ── STATS PANEL ── */
  .stats-panel {
    background: var(--ink); border-bottom: 2px solid var(--gold);
    box-shadow: 0 8px 32px var(--shadow-lg);
    animation: slideDown 0.25s ease;
  }
  @keyframes slideDown {
    from { opacity: 0; transform: translateY(-10px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  .stats-inner { max-width: 1100px; margin: 0 auto; padding: 28px 32px; }
  .stats-row { display: grid; grid-template-columns: repeat(auto-fit, minmax(160px, 1fr)); gap: 20px; margin-bottom: 28px; }
  .stat-block {
    background: rgba(255,255,255,0.06); border-radius: 14px; padding: 18px 20px;
    border: 1px solid rgba(255,255,255,0.08);
  }
  .stat-num { font-family: 'Playfair Display', serif; font-size: 40px; font-weight: 700; color: var(--gold-light); line-height: 1; }
  .stat-label { font-size: 13px; color: var(--cream); opacity: 0.8; margin: 6px 0 4px; font-weight: 500; }
  .stat-sub { font-size: 11px; color: var(--cream); opacity: 0.4; }
  .stat-bar { height: 4px; background: rgba(255,255,255,0.1); border-radius: 2px; margin-top: 10px; }
  .stat-fill { height: 100%; border-radius: 2px; transition: width 0.6s ease; }

  .stats-topics-title {
    font-family: 'Playfair Display', serif; font-size: 13px; letter-spacing: 3px;
    text-transform: uppercase; color: var(--gold); margin-bottom: 14px; opacity: 0.8;
  }
  .stats-topics-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 8px; }
  .stats-topic-row {
    background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.07);
    border-radius: 10px; padding: 12px 14px; cursor: pointer; transition: all 0.18s;
    display: grid; grid-template-columns: 1fr auto; grid-template-rows: auto auto; gap: 4px 8px;
    align-items: center;
  }
  .stats-topic-row:hover { background: rgba(255,255,255,0.1); border-color: var(--gold); }
  .stp-name { font-size: 13px; color: var(--cream); font-weight: 500; }
  .stp-bar-wrap { display: flex; align-items: center; gap: 8px; grid-column: 1; }
  .stp-bar { flex: 1; height: 4px; background: rgba(255,255,255,0.1); border-radius: 2px; }
  .stp-fill { height: 100%; background: var(--sage); border-radius: 2px; transition: width 0.5s ease; }
  .stp-pct { font-size: 11px; color: var(--gold); white-space: nowrap; min-width: 36px; text-align: right; }
  .stp-quiz { font-size: 11px; color: rgba(255,255,255,0.4); grid-column: 1; }
  .stp-date { font-size: 11px; color: var(--sage); grid-column: 2; grid-row: 1 / 3; align-self: center; white-space: nowrap; }

  /* Topic pill progress % */
  .pill-pct {
    display: inline-block; background: rgba(255,255,255,0.25);
    font-size: 10px; font-weight: 700; padding: 1px 5px;
    border-radius: 4px; margin-right: 5px; letter-spacing: 0;
  }
  .topic-pill.active .pill-pct { background: rgba(255,255,255,0.3); }

  /* Reset button */
  .reset-btn {
    background: none; border: 1.5px solid rgba(0,0,0,0.12); color: var(--ink-light);
    border-radius: 8px; padding: 6px 10px; cursor: pointer; font-size: 14px;
    transition: all 0.2s; margin-left: 4px;
  }
  .reset-btn:hover { border-color: var(--bordeaux); color: var(--bordeaux); }

  /* Flashcard progress bar */
  .fc-progress-wrap { display: flex; align-items: center; gap: 12px; max-width: 580px; margin: 0 auto 16px; }
  .fc-progress-bar { flex: 1; height: 5px; background: rgba(0,0,0,0.08); border-radius: 3px; }
  .fc-progress-fill { height: 100%; background: var(--gold); border-radius: 3px; transition: width 0.3s ease; }
  .fc-progress-label { font-size: 12px; color: var(--ink-light); white-space: nowrap; }

  /* Known badge on card */
  .known-badge {
    position: absolute; top: 14px; right: 14px;
    background: var(--sage); color: white; font-size: 10px; font-weight: 600;
    padding: 3px 8px; border-radius: 100px; letter-spacing: 0.5px;
  }

  /* Session mini counter */
  .session-mini { font-size: 13px; min-width: 70px; text-align: center; }

  /* Completion all-time */
  .completion-alltime {
    font-size: 14px; color: var(--ink-light); margin-bottom: 20px;
    background: var(--parchment); padding: 10px 20px; border-radius: 10px;
    display: inline-block;
  }

  /* Known vocab item highlight */
  .vocab-known { border-left: 3px solid var(--sage) !important; }
  .vocab-check { color: var(--sage); font-weight: 700; font-size: 13px; margin-right: 4px; }

  /* Grammar tense progress */
  .tense-progress-bar {
    display: flex; align-items: center; gap: 14px;
    background: var(--parchment); border-radius: 10px; padding: 10px 16px;
    margin-bottom: 20px; font-size: 13px; color: var(--ink-light);
  }
  .tpb-track { flex: 1; height: 6px; background: rgba(0,0,0,0.08); border-radius: 3px; }
  .tpb-fill { height: 100%; background: var(--bordeaux); border-radius: 3px; transition: width 0.5s ease; }
  .studied-check {
    font-size: 10px; background: var(--sage); color: white;
    border-radius: 100px; padding: 1px 5px; margin-left: 4px;
  }
  .tense-studied-badge {
    background: rgba(90,122,92,0.12); color: var(--sage);
    border: 1px solid var(--sage); border-radius: 100px;
    padding: 4px 12px; font-size: 12px; font-weight: 600;
    white-space: nowrap; align-self: flex-start; margin-top: 4px;
  }
`;

// ── LOCAL STORAGE HOOK ───────────────────────────────────────────────────────

function useLS(key, initial) {
  const [val, setVal] = useState(() => {
    try {
      const stored = localStorage.getItem(key);
      return stored !== null ? JSON.parse(stored) : initial;
    } catch {
      return initial;
    }
  });
  const set = (v) => {
    const next = typeof v === 'function' ? v(val) : v;
    setVal(next);
    try {
      localStorage.setItem(key, JSON.stringify(next));
    } catch {}
  };
  return [val, set];
}

// ── HELPERS ───────────────────────────────────────────────────────────────────

function todayStr() {
  return new Date().toISOString().slice(0, 10);
}

function totalKnownAcrossTopics(progress) {
  return Object.values(progress).reduce(
    (s, t) => s + (t.known?.length ?? 0),
    0,
  );
}

function totalWordsAcrossTopics() {
  return Object.values(VOCAB_TOPICS).reduce((s, arr) => s + arr.length, 0);
}

// ── COMPONENT ────────────────────────────────────────────────────────────────

export default function FrenchLearner() {
  // ── Persisted UI state ──
  const [tab, setTab] = useLS('bc_tab', 'vocab');
  const [topic, _setTopic] = useLS('bc_topic', Object.keys(VOCAB_TOPICS)[0]);
  const [mode, setMode] = useLS('bc_mode', 'flashcard');
  const [tense, _setTense] = useLS('bc_tense', Object.keys(TENSES)[0]);

  // ── Persisted learning data ──
  // { [topic]: { known: number[], unknown: number[], completedAt: string|null } }
  const [progress, setProgress] = useLS('bc_progress', {});
  // { [topic]: { correct: number, wrong: number } }
  const [quizScores, setQuizScores] = useLS('bc_quiz_scores', {});
  // Set of tense names the user has opened
  const [tensesStudied, setTensesStudied] = useLS('bc_tenses_studied', []);
  // Daily streak: { lastDate: string, count: number }
  const [streak, setStreak] = useLS('bc_streak', { lastDate: '', count: 0 });
  // Total flashcard rounds ever completed
  const [roundsDone, setRoundsDone] = useLS('bc_rounds_done', 0);

  // ── Ephemeral session state ──
  const [cardIndex, setCardIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [sessionKnown, setSessionKnown] = useState(new Set());
  const [sessionUnknown, setSessionUnknown] = useState(new Set());
  const [quizQ, setQuizQ] = useState(null);
  const [quizOptions, setQuizOptions] = useState([]);
  const [quizAnswer, setQuizAnswer] = useState(null);
  const [sessionQuiz, setSessionQuiz] = useState({ correct: 0, wrong: 0 });
  const [showStats, setShowStats] = useState(false);

  const words = VOCAB_TOPICS[topic];
  const topicProgress = progress[topic] ?? {
    known: [],
    unknown: [],
    completedAt: null,
  };
  const quizScore = quizScores[topic] ?? { correct: 0, wrong: 0 };

  // ── Streak tracking ── bump on first action each day
  const bumpStreak = () => {
    const today = todayStr();
    setStreak((s) => {
      if (s.lastDate === today) return s;
      const yesterday = new Date(Date.now() - 86400000)
        .toISOString()
        .slice(0, 10);
      return {
        lastDate: today,
        count: s.lastDate === yesterday ? s.count + 1 : 1,
      };
    });
  };

  // ── Topic change: reset session but keep saved progress ──
  const setTopic = (t) => {
    _setTopic(t);
    setCardIndex(0);
    setFlipped(false);
    setSessionKnown(new Set());
    setSessionUnknown(new Set());
    setQuizAnswer(null);
    setSessionQuiz({ correct: 0, wrong: 0 });
    if (mode === 'quiz') setTimeout(() => generateQuiz(VOCAB_TOPICS[t]), 0);
  };

  const setTense = (t) => {
    _setTense(t);
    if (!tensesStudied.includes(t)) setTensesStudied((prev) => [...prev, t]);
    bumpStreak();
  };

  useEffect(() => {
    setQuizAnswer(null);
    setSessionQuiz({ correct: 0, wrong: 0 });
    if (mode === 'quiz') generateQuiz(words);
  }, [mode]);

  // ── Quiz ──
  function generateQuiz(wordList) {
    const idx = Math.floor(Math.random() * wordList.length);
    const correct = wordList[idx];
    const distractors = wordList
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
    bumpStreak();
    setQuizAnswer(opt);
    const correct = opt[0] === quizQ[0];
    setSessionQuiz((s) => ({
      ...s,
      correct: s.correct + (correct ? 1 : 0),
      wrong: s.wrong + (correct ? 0 : 1),
    }));
    setQuizScores((prev) => {
      const cur = prev[topic] ?? { correct: 0, wrong: 0 };
      return {
        ...prev,
        [topic]: {
          correct: cur.correct + (correct ? 1 : 0),
          wrong: cur.wrong + (correct ? 0 : 1),
        },
      };
    });
  }

  // ── Flashcard ──
  function nextCard(result) {
    bumpStreak();
    if (result === 'knew') setSessionKnown((s) => new Set([...s, cardIndex]));
    else setSessionUnknown((s) => new Set([...s, cardIndex]));
    setFlipped(false);
    setTimeout(() => setCardIndex((i) => i + 1), 120);
  }

  function finishRound() {
    // Merge session results into persisted progress
    const newKnown = [...new Set([...topicProgress.known, ...sessionKnown])];
    const newUnknown = [...sessionUnknown].filter((i) => !sessionKnown.has(i));
    setProgress((prev) => ({
      ...prev,
      [topic]: {
        known: newKnown,
        unknown: newUnknown,
        completedAt: todayStr(),
      },
    }));
    setRoundsDone((r) => r + 1);
  }

  function resetTopicProgress() {
    setProgress((prev) => ({
      ...prev,
      [topic]: { known: [], unknown: [], completedAt: null },
    }));
    setQuizScores((prev) => ({ ...prev, [topic]: { correct: 0, wrong: 0 } }));
    setCardIndex(0);
    setFlipped(false);
    setSessionKnown(new Set());
    setSessionUnknown(new Set());
    setSessionQuiz({ correct: 0, wrong: 0 });
  }

  function resetAll() {
    if (!window.confirm('Reset ALL progress? This cannot be undone.')) return;
    [
      'bc_tab',
      'bc_topic',
      'bc_mode',
      'bc_tense',
      'bc_progress',
      'bc_quiz_scores',
      'bc_tenses_studied',
      'bc_streak',
      'bc_rounds_done',
    ].forEach((k) => localStorage.removeItem(k));
    window.location.reload();
  }

  // Derived
  const sessionTotal = sessionQuiz.correct + sessionQuiz.wrong;
  const sessionAcc =
    sessionTotal > 0
      ? Math.round((sessionQuiz.correct / sessionTotal) * 100)
      : 0;
  const allTimeTotal = quizScore.correct + quizScore.wrong;
  const allTimeAcc =
    allTimeTotal > 0 ? Math.round((quizScore.correct / allTimeTotal) * 100) : 0;
  const currentTense = TENSES[tense];
  const globalKnown = totalKnownAcrossTopics(progress);
  const globalTotal = totalWordsAcrossTopics();
  const globalPct = Math.round((globalKnown / globalTotal) * 100);

  // List mode: highlight known words
  const savedKnownSet = new Set(topicProgress.known);

  return (
    <>
      <style>{css}</style>
      <div className="app">
        {/* ── HEADER ── */}
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
            <button
              className={`nav-btn ${showStats ? 'active' : ''}`}
              onClick={() => setShowStats((s) => !s)}
            >
              📊 Progrès
            </button>
          </nav>
        </header>

        {/* ── STATS PANEL ── */}
        {showStats && (
          <div className="stats-panel">
            <div className="stats-inner">
              <div className="stats-row">
                <div className="stat-block">
                  <div className="stat-num">{globalKnown}</div>
                  <div className="stat-label">Mots connus</div>
                  <div className="stat-sub">sur {globalTotal} au total</div>
                  <div className="stat-bar">
                    <div
                      className="stat-fill"
                      style={{
                        width: `${globalPct}%`,
                        background: 'var(--sage)',
                      }}
                    />
                  </div>
                </div>
                <div className="stat-block">
                  <div className="stat-num">{streak.count}</div>
                  <div className="stat-label">🔥 Jours d'affilée</div>
                  <div className="stat-sub">
                    {streak.lastDate === todayStr()
                      ? "Étudié aujourd'hui ✓"
                      : "Pas encore étudié aujourd'hui"}
                  </div>
                </div>
                <div className="stat-block">
                  <div className="stat-num">
                    {tensesStudied.length}
                    <span style={{ fontSize: 16 }}>/7</span>
                  </div>
                  <div className="stat-label">Temps étudiés</div>
                  <div className="stat-sub">
                    {tensesStudied.length === 7
                      ? 'Tous révisés ! 🎓'
                      : `${7 - tensesStudied.length} restant(s)`}
                  </div>
                </div>
                <div className="stat-block">
                  <div className="stat-num">{roundsDone}</div>
                  <div className="stat-label">Sessions complètes</div>
                  <div className="stat-sub">flashcards terminées</div>
                </div>
              </div>

              <div className="stats-topics-title">Progression par thème</div>
              <div className="stats-topics-grid">
                {Object.entries(VOCAB_TOPICS).map(([t, arr]) => {
                  const p = progress[t] ?? { known: [], unknown: [] };
                  const pct =
                    arr.length > 0
                      ? Math.round((p.known.length / arr.length) * 100)
                      : 0;
                  const qs = quizScores[t] ?? { correct: 0, wrong: 0 };
                  const qTotal = qs.correct + qs.wrong;
                  const qAcc =
                    qTotal > 0 ? Math.round((qs.correct / qTotal) * 100) : null;
                  return (
                    <div
                      key={t}
                      className="stats-topic-row"
                      onClick={() => {
                        setTopic(t);
                        setShowStats(false);
                      }}
                    >
                      <div className="stp-name">{t}</div>
                      <div className="stp-bar-wrap">
                        <div className="stp-bar">
                          <div
                            className="stp-fill"
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                        <span className="stp-pct">
                          {p.known.length}/{arr.length}
                        </span>
                      </div>
                      {qAcc !== null && (
                        <div className="stp-quiz">
                          Quiz: {qAcc}% ({qTotal})
                        </div>
                      )}
                      {p.completedAt && (
                        <div className="stp-date">✓ {p.completedAt}</div>
                      )}
                    </div>
                  );
                })}
              </div>

              <div style={{ display: 'flex', gap: 12, marginTop: 20 }}>
                <button
                  className="ctrl-btn"
                  style={{ fontSize: 12 }}
                  onClick={() => setShowStats(false)}
                >
                  Fermer
                </button>
                <button
                  className="ctrl-btn"
                  style={{
                    fontSize: 12,
                    background: '#FEE2E2',
                    color: '#DC2626',
                    border: '1px solid #FCA5A5',
                  }}
                  onClick={resetAll}
                >
                  🗑 Réinitialiser tout
                </button>
              </div>
            </div>
          </div>
        )}

        <main className="main">
          {/* ── VOCAB TAB ── */}
          {tab === 'vocab' && (
            <>
              <p className="section-heading">Vocabulaire thématique</p>
              <h2 className="section-title">Apprenez les mots</h2>

              {/* Topic pills with progress */}
              <div className="topic-grid">
                {Object.entries(VOCAB_TOPICS).map(([t, arr]) => {
                  const p = progress[t] ?? { known: [] };
                  const pct = Math.round((p.known.length / arr.length) * 100);
                  return (
                    <button
                      key={t}
                      className={`topic-pill ${topic === t ? 'active' : ''}`}
                      onClick={() => setTopic(t)}
                    >
                      {p.known.length > 0 && (
                        <span className="pill-pct">{pct}%</span>
                      )}
                      {t}
                    </button>
                  );
                })}
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
                  <b style={{ color: 'var(--sage)' }}>
                    {topicProgress.known.length}
                  </b>
                  /{words.length} connus
                  {mode === 'quiz' && allTimeTotal > 0 && (
                    <>
                      {' '}
                      · <b>{allTimeAcc}%</b> all-time
                    </>
                  )}
                </span>
                {topicProgress.completedAt && (
                  <button
                    className="reset-btn"
                    onClick={resetTopicProgress}
                    title="Reset this topic"
                  >
                    ↺
                  </button>
                )}
              </div>

              {/* FLASHCARD MODE */}
              {mode === 'flashcard' && (
                <>
                  {cardIndex < words.length ? (
                    <div className="flashcard-container">
                      {/* Mini progress bar */}
                      <div className="fc-progress-wrap">
                        <div className="fc-progress-bar">
                          <div
                            className="fc-progress-fill"
                            style={{
                              width: `${(cardIndex / words.length) * 100}%`,
                            }}
                          />
                        </div>
                        <span className="fc-progress-label">
                          {cardIndex} / {words.length}
                        </span>
                      </div>

                      <div
                        className={`flashcard-inner ${flipped ? 'flipped' : ''}`}
                        onClick={() => setFlipped((f) => !f)}
                      >
                        <div className="flashcard-face flashcard-front">
                          {savedKnownSet.has(cardIndex) && (
                            <div className="known-badge">✓ Connu</div>
                          )}
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
                        <div className="session-mini">
                          <span style={{ color: 'var(--sage)' }}>
                            ✓ {sessionKnown.size}
                          </span>
                          {' · '}
                          <span style={{ color: 'var(--bordeaux)' }}>
                            ✗ {sessionUnknown.size}
                          </span>
                        </div>
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
                      <div className="completion-emoji">
                        {sessionKnown.size === words.length ? '🏆' : '🎉'}
                      </div>
                      <div className="completion-title">Terminé !</div>
                      <div className="completion-sub">
                        ✅ Connu : {sessionKnown.size} · 🔄 À revoir :{' '}
                        {sessionUnknown.size}
                      </div>
                      {topicProgress.known.length > 0 && (
                        <div className="completion-alltime">
                          Cumulatif :{' '}
                          <b>
                            {
                              [
                                ...new Set([
                                  ...topicProgress.known,
                                  ...sessionKnown,
                                ]),
                              ].length
                            }
                          </b>{' '}
                          / {words.length} mots maîtrisés
                        </div>
                      )}
                      <div
                        style={{
                          display: 'flex',
                          gap: 12,
                          justifyContent: 'center',
                          flexWrap: 'wrap',
                        }}
                      >
                        <button
                          className="ctrl-btn"
                          onClick={() => {
                            finishRound();
                            setCardIndex(0);
                            setFlipped(false);
                            setSessionKnown(new Set());
                            setSessionUnknown(new Set());
                          }}
                        >
                          💾 Sauvegarder & Recommencer
                        </button>
                        {sessionUnknown.size > 0 && (
                          <button
                            className="ctrl-btn"
                            style={{
                              background: 'var(--bordeaux)',
                              color: 'white',
                            }}
                            onClick={() => {
                              finishRound();
                              // Restart with only the unknown cards
                              setCardIndex(0);
                              setFlipped(false);
                              setSessionKnown(new Set());
                              setSessionUnknown(new Set());
                            }}
                          >
                            🔄 Retravailler les {sessionUnknown.size} non sus
                          </button>
                        )}
                      </div>
                    </div>
                  )}
                </>
              )}

              {/* LIST MODE */}
              {mode === 'list' && (
                <div className="vocab-list">
                  {words.map(([fr, en], i) => (
                    <div
                      key={i}
                      className={`vocab-item ${savedKnownSet.has(i) ? 'vocab-known' : ''}`}
                    >
                      {savedKnownSet.has(i) && (
                        <span className="vocab-check">✓</span>
                      )}
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
                        {sessionQuiz.correct}
                      </div>
                      <div className="score-label">Session</div>
                    </div>
                    <div className="score-item">
                      <div
                        className="score-num"
                        style={{ color: 'var(--gold)' }}
                      >
                        {sessionAcc}%
                      </div>
                      <div className="score-label">Précision</div>
                    </div>
                    <div className="score-item">
                      <div
                        className="score-num"
                        style={{ color: 'var(--ink-light)', fontSize: 22 }}
                      >
                        {allTimeAcc}%
                      </div>
                      <div className="score-label">
                        All-time ({allTimeTotal})
                      </div>
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

          {/* ── GRAMMAR TAB ── */}
          {tab === 'grammar' && (
            <>
              <p className="section-heading">Les temps et les modes</p>
              <h2 className="section-title">Maîtrisez la grammaire</h2>

              {tensesStudied.length > 0 && (
                <div className="tense-progress-bar">
                  <span>📖 {tensesStudied.length}/7 temps étudiés</span>
                  <div className="tpb-track">
                    <div
                      className="tpb-fill"
                      style={{ width: `${(tensesStudied.length / 7) * 100}%` }}
                    />
                  </div>
                </div>
              )}

              {/* Tense selector */}
              <div className="tense-grid">
                {Object.entries(TENSES).map(([name, data]) => {
                  const studied = tensesStudied.includes(name);
                  return (
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
                      <span>{data.icon}</span>
                      {name}
                      {studied && tense !== name && (
                        <span className="studied-check">✓</span>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Tense detail card */}
              <div className="tense-card" key={tense}>
                <div className="tense-header">
                  <div className="tense-icon">{currentTense.icon}</div>
                  <div style={{ flex: 1 }}>
                    <div
                      className="tense-title"
                      style={{ color: currentTense.color }}
                    >
                      {tense}
                    </div>
                    <div className="tense-desc">{currentTense.description}</div>
                  </div>
                  {tensesStudied.includes(tense) && (
                    <div className="tense-studied-badge">✓ Étudié</div>
                  )}
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
