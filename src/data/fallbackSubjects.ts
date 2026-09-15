import { EXAM224_SUBJECTS } from "./exam224Subjects";

export interface FallbackSubject {
  id: string;
  title: string;
  description: string;
  doc_type: string;
  category: 'REAL' | 'BLANC' | 'ETRANGER';
  subject: { id: number; name: string; icon: string };
  level: string;
  is_free: boolean;
  year: string;
  country?: string;
  institution?: string;
  content: string;
}

const BASE_FALLBACK_SUBJECTS: FallbackSubject[] = [
  {
    id: "cours-histoire-terminale-tss-mao",
    title: "Cours Complet & Sujets Traités d’Histoire — Terminale TSS (Mr. MAO / GS CAMESS)",
    description: "Le traité officiel et intégral d'Histoire pour les Terminales TSS rédigé par Mr. MAO (GS CAMESS). Couvre tout le programme officiel (Crises des années 30, Seconde Guerre mondiale, ONU, Décolonisation, Civilisations) ainsi que les 23 Sujets Traités du BAC (2003-2020).",
    doc_type: "COURS",
    category: "REAL",
    subject: { id: 8, name: "Histoire", icon: "Globe" },
    level: "Terminale TSS",
    is_free: true,
    year: "2021",
    country: "Guinée",
    institution: "GS CAMESS — Mr. MAO (Contacts: 622 38 66 40 / 69)",
    content: `# COURS ET TRAITÉS D'HISTOIRE — TERMINALE TSS
**Auteur : Mr. MAO | Établissement : GS CAMESS (Contacts : 622 38 66 40 / 69)**
**Producteur et distributeur : ouo-ouo Jacob Dopavogui (OJD) — 621 18 43 59**

---

## SOMMAIRE GÉNÉRAL DU PROGRAMME

### CHAPITRE I : DES CRISES DES ANNÉES « 30 » À LA SECONDE GUERRE MONDIALE (1939 - 1945)
1. Les crises des années « 30 » dans le monde.
2. La seconde guerre mondiale de 1939-1945.
3. La participation africaine et malgache à la seconde guerre mondiale de 1939-1945.
4. Les conséquences de la guerre de 1939-1945.
5. Les conférences préparatoires de la réorganisation du monde.
6. La création de l’ONU en 1945.
7. Les tensions idéologiques entre l’Est et l’Ouest de 1947 à 1991.

### CHAPITRE II : LA DÉCOLONISATION DE L'ASIE, DE L'AFRIQUE ET L'AFFIRMATION DU TIERS-MONDE
1. La décolonisation (Définition et facteurs).
2. Les luttes de libération nationale en Asie et en Afrique (Pacifique et Armée).
3. Processus de décolonisation de quelques pays (Indochine, Inde, Algérie, Gold Coast / Ghana, Guinée française).
4. L'Union Africaine (de l'OUA à l'UA).

### CHAPITRE III : CIVILISATIONS ET PROBLÈMES DU MONDE CONTEMPORAIN
1. La notion de civilisation (au singulier et au pluriel).
2. La crise « âge-retraité » d’une civilisation.
3. La Diaspora noire.
4. Le Sionisme au Proche-Orient.
5. L’Apartheid en Azanie (actuelle Afrique du Sud).
6. Le Nouvel Ordre Mondial de la Culture, de l’Information et de la Communication.

---

## BIBLIOGRAPHIE DE RÉFÉRENCE
1. « Histoire de l'Afrique Noire, d'Hier à Demain » de Joseph KI-ZERBO, Hatier 1968.
2. « Le portrait du colonisé » (Albert MEMMI).
3. « Le portrait du colonisateur » (Albert MEMMI).
4. « Histoire 1ère (de la fin du XIXe siècle au lendemain de la seconde guerre mondiale) », Collection Berstin MILIA 1988.
5. « Histoire Terminale (de 1945 à nos jours) », Collection GREH, Hachette-Lycée, 1989.
6. « Décolonisation et problèmes de l'Afrique indépendante », 3e édition, Hatier, 1989.
7. « Histoire Terminale » de Jacques MARSEILLE, Nathan, 1991.

---

# CHAPITRE I — DES CRISES DES ANNÉES « 30 » À LA SECONDE GUERRE MONDIALE (1939 - 1945)

### Introduction
La seconde guerre mondiale, à l'image de la première, résulta d'un jeu très complexe de rivalités constantes entre les puissances impérialistes européennes. Elle fut également la suite logique d'une longue série de crises de toute nature ayant secoué le monde au cours des années « 30 ».

### 1. Les crises des années « 30 » dans le monde
* **a) Définition :** Les crises des années « 30 » dans le monde désignent l'ensemble des évènements malheureux engendrant des déséquilibres d'ordre économique, politique, social, diplomatique et militaire survenus entre 1929 et 1939, débouchant sur la seconde guerre mondiale.
* **b) Les causes des crises :**
  - **Les conséquences de la première guerre mondiale (1914-1918) :** Difficultés économiques mondiales, Europe ruinée contrainte de solliciter les capitaux des U.S.A., et rigueur des dispositions du Traité de Versailles contre les vaincus.
  - **La crise économique de 1929 :** Survenue le jeudi 24 octobre 1929 à la bourse de Wall Street (New York, USA). Par son ampleur et ses effets sociaux et politiques, elle ébranla les régimes parlementaires européens et favorisa la montée des dictateurs (Benito Mussolini avec le Fascisme en Italie dès 1922, Adolf Hitler en Allemagne en 1933 grâce au Nazisme).
* **c) Les différentes types de crises :**
  - **Les petites crises (1931 - 1936) à caractère politico-diplomatique :**
    * L'invasion de la Mandchourie (Chine) par le Japon en 1931.
    * La fin des réparations allemandes en 1932.
    * L'échec de la conférence du désarmement et du projet de fédération européenne en 1932.
    * L'arrivée au pouvoir d'Adolf Hitler en Allemagne en 1933.
    * Le déclin de la SDN (1933-1936) face aux Puissances de l'Axe (Allemagne-Italie-Japon).
  - **Les grandes crises (1936 - 1939) à caractère militaire (coups de force) :**
    * L'annexion de l'Éthiopie par l'Italie fasciste en 1936.
    * La remilitarisation de la Rhénanie en 1936.
    * La guerre civile espagnole (1936-1939) avec le triomphe du Général Franco soutenu par Mussolini et Hitler.
    * Les crises autrichienne et tchécoslovaque en 1938.
    * L'attaque et l'annexion de la Pologne par l'Allemagne du 1er au 30 septembre 1939 (ultime phase avant la guerre).

### 2. La Seconde Guerre mondiale (1939 - 1945)
* **Introduction :** Vingt ans après la première, elle éclata le 1er septembre 1939 par l'invasion de la Pologne par l'Allemagne nazie et prit fin le 2 septembre 1945 par la capitulation officielle du Japon.
* **A. Les causes :** Effets de la 1ère GM, rivalités impérialistes (France/Angleterre vs Allemagne/Italie), attitude belliqueuse des deux blocs rivaux, et crises de 1929-1939.
* **B. Les principales étapes :**
  - **1) Offensive victorieuse de l'Axe (1939-1941) :** Annexion de la Pologne, occupation de l'Europe du Nord (1940), chute de Paris en juin 1940 (gouvernement de Vichy avec le Maréchal Pétain), résistance anglaise, violation du pacte germano-soviétique (21 juin 1941), et attaque de Pearl Harbor par le Japon (7 décembre 1941).
  - **2) Le tournant de la guerre (1941-1942) :** Entrée en guerre officielle de l'URSS et des USA aux côtés des Alliés.
  - **3) Les victoires des Alliés (1942-1945) :** Batailles du Pacifique (Midway, mer du Corail), débarquement en Méditerranée (Opération Torch), bataille de Stalingrad (1943), libération de la France (Normandie le 6 juin 1944, Provence le 15 août 1944), suicide d'Hitler (30 avril 1945), capitulation allemande (8 mai 1945), et bombardements atomiques d'Hiroshima (6 août) et Nagasaki (9 août 1945) par Harry Truman menant à la capitulation du Japon le 2 septembre 1945.

### 3. La participation africaine et malgache à la Seconde Guerre mondiale
* **a) Participation humaine :** Mobilisation massive en deux périodes :
  - *1939-1940 :* 130 000 soldats de l'AOF en 1939, 127 320 en 1940, 15 500 de l'AEF et 34 000 malgaches.
  - *1942-1945 :* Les soldats africains constituaient 9% des troupes françaises sur les fronts les plus meurtriers.
* **b) Participation économique :** Fourniture obligatoire de produits agricoles (céréales, bétail) et souscriptions financières sous le vocable « effort de guerre ».
* **c) Participation territoriale :** Combats en Afrique du Nord-Est (libération de l'Éthiopie) et bases arrière stratégiques (Kayes au Mali, Algérie, Sierra Leone).

### 4. Les conséquences de la guerre
* **a) Humaines :** La plus meurtrière de l'histoire (50 à 60 millions de morts, mutilés, disparus).
* **b) Économiques et matérielles :** Déséquilibre mondial, destruction des infrastructures routières, portuaires et urbaines.
* **c) Sociales :** Choc moral mondial suite à la découverte des camps de concentration et à l'extermination de 6 millions de Juifs.
* **d) Politiques et diplomatiques :** Émergence de deux supergrands (USA et URSS) et début de la guerre froide, création de l'ONU, et éveil de la conscience nationaliste en Asie et en Afrique.

### 5. Les conférences préparatoires de la réorganisation du monde
* **Conférence de l'Atlantique** (9 au 14 août 1941) : Churchill et Roosevelt, droit des peuples à disposer d'eux-mêmes.
* **Conférence de Washington** (1er janvier 1942) : Déclaration des Nations Unies.
* **Conférence de Moscou** (octobre 1943) : Organisation internationale pour la paix.
* **Conférence de Téhéran** (novembre-décembre 1943) : Staline, Roosevelt et Churchill décident de l'ouverture du deuxième front à l'Ouest.
* **Conférence de Dumbarton Oaks** (21-28 septembre 1944) : Structures de l'ONU.
* **Conférence de Yalta** (4-11 février 1945) : Capitulation allemande et droit de véto.
* **1ère Conférence de San Francisco** (24 avril - 26 juin 1945) : Signature de la charte de l'ONU.
* **Conférence de Potsdam** (juillet-août 1945) : Sort de l'Allemagne (divisée en 4 zones d'occupation).
* **2ème Conférence de San Francisco** (24 octobre 1945) : Naissance officielle de l'ONU avec 51 États.

### 6. La création de l'ONU en 1945
* **Les organes principaux :**
  1. *L'Assemblée Générale :* Organe suprême, vote le budget (51 États fondateurs, 194 aujourd'hui).
  2. *Le Conseil de Sécurité :* 15 membres dont 5 permanents (USA, Russie, Royaume-Uni, France, Chine) avec droit de véto.
  3. *Le Secrétariat Général :* Coordonne les activités.
* **Tableau des Secrétaires Généraux de l'ONU :**
  | N° | Prénoms et Nom | Pays d'origine | Durée de mandat |
  |---|---|---|---|
  | 1 | Trygve LIE | Norvège | 1946 - 1952 |
  | 2 | Dag HAMMARSKJÖLD | Suède | 1953 - 1961 |
  | 3 | U THANT | Birmanie | 1961 - 1971 |
  | 4 | Kurt WALDHEIM | Autriche | 1971 - 1981 |
  | 5 | Javier PÉREZ DE CUELLAR | Pérou | 1981 - 1991 |
  | 6 | Boutros BOUTROS-GHALI | Égypte | 1991 - 1996 |
  | 7 | Kofi Atta ANNAN | Ghana | 1996 - 2007 |
  | 8 | Ban KI-MOON | Corée du Sud | 2007 - 2017 |
  | 9 | António GUTERRES | Portugal | Janvier 2017 à nos jours |

  4. *Le Conseil Économique et Social :* Coordonne les institutions spécialisées (UNICEF, UNESCO, OMS, FMI, FAO, etc.).
  5. *La Cour Internationale de Justice :* Basée à La Haye (Pays-Bas), 15 magistrats élus pour 9 ans.
  6. *Le Conseil de Tutelle :* (a cessé d'exister après les années 90).

### 7. Les tensions idéologiques entre l'Est et l'Ouest (1947 - 1991)
* **Origines et causes :** Révolution bolchévique de 1917, opposition capitalisme (USA) vs socialisme (URSS). Doctrine Truman (1947), Kominform, Plan Marshall (1947).
* **Foyers de tension :** Blocus de Berlin (1948-1949), guerre de Corée (1950-1953), crise des missiles à Cuba (1962).
* **La détente et la coexistence pacifique :** Décès de Staline (1953), accords de Genève (1955), téléphone rouge (1963).
* **Fin de la guerre froide :** Rencontres Reagan - Gorbatchev, chute du mur de Berlin (11 novembre 1989), et éclatement de l'URSS le 8 décembre 1991.

---

# CHAPITRE II — LA DÉCOLONISATION DE L'ASIE, DE L'AFRIQUE ET L'AFFIRMATION DU TIERS-MONDE

### 1. La décolonisation et ses facteurs
* **Définition :** Ensemble des luttes pacifiques et violentes menées par les peuples colonisés pour recouvrer leur souveraineté.
* **Facteurs internes :** Abus de l'administration coloniale (travail forcé, impôts, ségrégation), et formation de l'élite locale.
* **Facteurs externes :** Impact de la Seconde Guerre mondiale (démystification de l'homme blanc), action anticolonialiste des USA et de l'URSS, rôle de l'ONU et des Églises.

### 2. Les luttes de libération nationale
* **Lutte pacifique :** Politique (partis comme le PDG-RDA en Guinée, le Parti du Congrès en Inde), syndicale (UGTAN), et culturelle (négritude).
* **Lutte armée :** Conflits violents (Algérie, Viêt-Nam, colonies portugaises).

### 3. Processus de décolonisation de quelques pays
* **Indochine :** Infiltration japonaise, création du Việt Minh par Ho Chi Minh et le Général Vo Nguyen Giap. Insurrection d'août 1945, défaite française à Diên Biên Phu (1954), accords de Genève.
* **Inde :** Colonie britannique, création du Parti du Congrès (1885). Mahatma Gandhi et la désobéissance civile non-violente (Swaraj). Indépendance et partition en 1947 (Inde et Pakistan, puis Bangladesh en 1971).
* **Algérie :** Colonie de peuplement depuis 1830. Création du FLN et insurrection armée du 1er novembre 1954. Accords d'Évian et indépendance le 5 juillet 1962 (Ahmed Ben Bella premier président).
* **Gold Coast (Ghana) :** Kwame Nkrumah et le CPP (Convention People Party). Indépendance le 6 mars 1957 (premier pays d'Afrique noire).
* **Guinée française :** Associations régionales (Amical Gilbert Vieillard, Union du Mandingue, etc.), création du PDG-RDA. Rôle décisif d'Ahmed Sékou Touré et du syndicalisme (UGTAN). Référendum du 28 septembre 1958 (« NON » massif à la communauté franco-africaine : 1 136 234 « NON », soit 95%) et proclamation de l'indépendance le 2 octobre 1958.

### 4. L'Union Africaine (De l'OUA à l'UA)
* **Création de l'OUA :** 28 mai 1963 à Addis-Abeba. Objectifs : renforcer l'unité, éliminer le colonialisme.
* **Transition vers l'UA :** Proclamée à Syrte en 1999 par le Colonel Kadhafi et officialisée à Durban en juillet 2002.
* **Organes principaux de l'UA :** La Conférence de l'UA, le Conseil exécutif et la Commission de l'UA.

---

# CHAPITRE III — CIVILISATIONS ET PROBLÈMES DU MONDE CONTEMPORAIN

### 1. La notion de civilisation
* **Civilisation au singulier :** Conception européenne ancienne et ethnocentriste (Grecs qualifiant les autres de "barbares"). L'Europe se posait en unique modèle.
* **Civilisation au pluriel :** Conception moderne et scientifique (depuis le XIXe siècle). Tout peuple est naturellement civilisé ; il existe des civilisations et non une seule civilisation (Paul Valéry : *"Nous autres civilisations, nous savons maintenant que nous sommes mortelles"*).

### 2. La Diaspora noire
* **Définition :** Ensemble de la communauté noire vivant hors d'Afrique de gré ou de force.
* **Causes :** Historiques (traite négrière, colonisation), économiques, politiques, culturelles et naturelles.
* **Rôle :** Contribution au développement socio-économique de l'Afrique et renforcement des liens de solidarité panafricaine.

### 3. Le Sionisme au Proche-Orient
* **Présentation :** Carrefour géostratégique (Europe-Asie-Afrique), riche en hydrocarbures et berceau des trois religions monothéistes.
* **Définition du Sionisme :** Doctrine politico-religieuse née à Bâle en 1896 (Théodore Herzl) préconisant le retour des Juifs en Terre promise (Palestine).
* **Évolution :** Déclaration Balfour (1917), plan de partage de l'ONU en 1947, proclamation de l'État d'Israël le 14 mai 1948, et guerres israélo-palestiniennes successives (1948, Suez 1956, guerre des Six Jours 1967, Kippour 1973).

### 4. L'Apartheid en Azanie (Afrique du Sud)
* **Présentation :** Ancien nom de l'Afrique du Sud, terre de peuplement et nation arc-en-ciel.
* **Le régime d'Apartheid :** Institutionnalisé en 1948 par la minorité blanche (séparation raciale stricte, confinement des Noirs, pass obligatoire).
* **Lutte et libération :** Action de l'ANC (Nelson Mandela, Oliver Tambo, Desmond Tutu). Soulèvement de Soweto (1976), libération de Mandela en 1990 par Frederik de Klerk, et premières élections multiraciales de 1994 couronnant Nelson Mandela premier président noir.

### 5. Le Nouvel Ordre Mondial de la Culture, de l'Information et de la Communication
* **Problématique :** Déséquilibre entre le Nord (suréquipé, surinformé) et le Sud (sous-équipé, souvent caricaturé ou sous-informé).
* **Objectifs :** Établir un partenariat équitable dans les flux d'information (création de la PANA), valoriser les cultures du Sud et démocratiser les technologies de la communication.

---

# SECTION SPÉCIALE : LES 23 SUJETS TRAITÉS DU BAC (2003 - 2020)

### Sujet N°1 (BAC 2003) : Le Proche-Orient
* **Question :** Carrefour de peuples et de religions, point de passage stratégique, le Proche-Orient est depuis 1945 une zone d'instabilité et d'affrontements : a) Présentez la zone. b) Rédigez un texte évoquant : d'abord sa décolonisation, ensuite le sionisme, et enfin l'antagonisme israélo-arabe et le problème palestinien.
* **Traité :** Le Proche-Orient regroupe l'ensemble des pays riverains de la Méditerranée orientale (Syrie, Liban, Israël, Égypte, Irak, etc.). Berceau des trois religions monothéistes et zone riche en pétrole, c'est un enjeu géostratégique majeur. Sa décolonisation s'est heurtée au mandat franco-britannique et aux traités de paix (Sèvres, San Remo). Le sionisme, né à Bâle en 1896 avec Théodore Herzl, a conduit à la création d'Israël en 1948, entraînant 4 guerres majeures (1948, 1956, 1967, 1973) et le douloureux problème palestinien.

### Sujet N°2 (BAC 2004) : La notion de Tiers-Monde
* **Question :** Après avoir fait l'historique de la notion du tiers-monde dégagez de façon explicite les causes et les caractères de la décolonisation.
* **Traité :** Expression forgée en 1955 par l'économiste et démographe français Alfred Sauvy par analogie au Tiers-État de la Révolution française. Le Tiers-Monde désigne l'ensemble des pays sous-développés n'appartenant ni au bloc capitaliste ni au bloc socialiste. La décolonisation fut un mouvement pacifique et violent favorisé par les facteurs internes (abus de la colonisation, élite locale) et externes (choc de la seconde guerre mondiale, ONU, USA/URSS).

### Sujet N°3 (BAC 2006) : Causes et conséquences de la Seconde Guerre mondiale
* **Question :** Après avoir expliqué les principales crises ayant conduit à la seconde guerre mondiale, dégagez les conséquences ainsi que la contribution africaine et malgache à ce conflit.
* **Traité :** La guerre fut précédée par l'invasion de la Mandchourie (1931), l'arrivée d'Hitler (1933), l'annexion de l'Éthiopie (1936) et la crise polonaise (1939). Ses conséquences furent dramatiques (50 à 60 millions de morts, ruines économiques, choc moral, création de l'ONU). L'Afrique a contribué sur le plan humain (milliers de soldats sur les fronts), économique (effort de guerre, matières premières) et territorial (bases militaires stratégiques en Afrique du Nord et de l'Ouest).

### Sujet N°4 (BAC 2007) : L'Apartheid en Afrique du Sud
* **Question :** Montrez que la naissance du régime d'Apartheid en Afrique du Sud au XXème siècle n'est pas un fait du hasard et que la lutte menée par le peuple azanien contre ce régime est une lutte légitime.
* **Traité :** L'Apartheid (séparation des races) institutionnalisé en 1948 par la minorité blanche en Azanie (Afrique du Sud) reposait sur le confinement des Noirs, les pass obligatoires et les lois ségrégatives. La lutte menée par l'ANC (Nelson Mandela, Oliver Tambo) sous forme pacifique (manifestations, grèves) puis armée (Umkhonto we Sizwe) a abouti à la libération de Mandela en 1990 et aux premières élections démocratiques et multiraciales de 1994.

### Sujet N°5 (BAC 2009) : La notion de civilisation
* **Question :** Dans l'analyse de la notion de civilisation, il y a deux conceptions qui s'affrontent : a) Quelles sont ces deux conceptions ? b) Après les avoir expliquées, justifiez votre choix de l'une ou de l'autre.
* **Traité :** Les deux conceptions sont : 1) La civilisation au singulier (conception européenne ancienne et ethnocentriste considérant l'Europe comme le sommet unique). 2) La civilisation au pluriel (conception moderne et scientifique selon laquelle chaque peuple possède sa culture et sa civilisation dignes de respect). Le choix se porte sur la civilisation au pluriel, seule garante du respect mutuel entre les peuples.

### Sujet N°6 (BAC 2010 et 2015) : Les bouleversements mondiaux (1945-1991) et l'Afrique
* **Question :** Après avoir fait une analyse des bouleversements survenus dans le monde de 1945 à 1991, montrez à l'aide d'exemples précis leur influence sur l'évolution politique de l'Afrique.
* **Traité :** De 1945 à 1991, le monde a connu la fin de la guerre, la création de l'ONU, la guerre froide, la décolonisation et l'éclatement de l'URSS. En Afrique, ces bouleversements ont favorisé la création du RDA (1946), l'instauration de la loi-cadre de 1956, les indépendances massives de 1960, la création de l'OUA en 1963 et la fin de l'Apartheid en 1994.

### Sujet N°7 (BAC 2013) : Inévitabilité de la Seconde Guerre mondiale
* **Question :** Les crises des années « 30 » montrent que la seconde guerre mondiale était inévitable. a) Etes-vous d'avis ? Si oui expliquez et si non démontrez. b) Retracez le déroulement de cette guerre. c) Qu'est-ce qui a été entrepris par la suite pour éviter au monde une nouvelle catastrophe ?
* **Traité :** Oui, la guerre était inévitable en raison de la fragilité du Traité de Versailles, de la crise de 1929 et de la multiplication des coups de force de l'Axe (Mandchourie, Éthiopie, Espagne, Tchécoslovaquie). Le déroulement comprend l'offensive de l'Axe (1939-1941), le tournant de Stalingrad et Midway (1942-1943) et la victoire des Alliés (1944-1945). Pour éviter une nouvelle catastrophe, les Alliés ont créé l'ONU en 1945.

### Sujet N°8 (BAC 2014) : Analyse de texte sur Winston Churchill
* **Question :** Analyse d'un extrait de lettre de Winston Churchill (14 mai 1945) concernant la menace soviétique et la division des vainqueurs. a) Biographie de l'auteur. b) Contexte historique. c) Causes des rapports conflictuels entre les vainqueurs.
* **Traité :** Churchill (1874-1965), Premier ministre britannique. Contexte : fin de la Seconde Guerre mondiale en Europe et prémices de la guerre froide. Causes : opposition idéologique (capitalisme vs communisme), refus de l'URSS d'appliquer l'autodétermination en Europe de l'Est, doctrine Truman, plan Marshall et division du monde en deux blocs.

### Sujet N°9 (BAC 2015) : Analyse de texte sur Ahmed Sékou Touré et la Guinée
* **Question :** Analyse d'un texte sur la dignité et l'assujettissement colonial. a) Présentation du document (Discours d'Ahmed Sékou Touré). b) Commentaire du passage sur l'assujettissement (travaux forcés, impôts, spoliation). c) Conséquences sur l'AOF et la Guinée (Accélération de la décolonisation, NON du 28 septembre 1958 et indépendance le 2 octobre 1958).
* **Traité :** Le texte est un discours d'Ahmed Sékou Touré (1922-1984), leader du PDG-RDA et premier président guinéen. Il dénonce l'exploitation coloniale (travail forcé, impôts de capitation). En Guinée, cela a abouti au triomphe du « NON » au référendum du 28 septembre 1958 (95% de votes négatifs) et à la proclamation de l'indépendance le 2 octobre 1958.

### Sujet N°10 (BAC 2016 - Sujet A) : Jérusalem et le Proche-Orient
* **Question :** Commentaire de texte sur Jérusalem et le Proche-Orient. Explication du texte et de l'historique du conflit israélo-palestinien.
* **Traité :** Jérusalem, ville trois fois sainte (Judaïsme, Christianisme, Islam), est au cœur du conflit israélo-palestinien. Le mouvement sioniste (Herz, 1896) et la déclaration Balfour (1917) ont mené au plan de partage de l'ONU en 1947 et à la création d'Israël en 1948. Les guerres successives (1948, 1956, 1967, 1973) ont enraciné l'instabilité dans la région.

### Sujet N°11 (BAC 2016 - Sujet B) : Rapport de Kofi Annan sur le millénaire
* **Question :** Commentaire d'un rapport de Kofi Annan (2001) sur les inégalités mondiales, la pauvreté et les conflits. Biographie de Kofi Annan (7e Secrétaire général de l'ONU, Ghana, 1938-2018). Rôle des institutions de l'ONU (PNUD, FAO, OMS, UNESCO) face aux fronts socio-économiques, politiques et militaires.
* **Traité :** Kofi Annan souligne le contraste entre la prospérité économique et l'extrême pauvreté de millions d'êtres humains. L'ONU intervient à travers ses institutions spécialisées pour éradiquer la faim, garantir l'éducation, promouvoir la santé et maintenir la paix.

### Sujet N°12 (BAC 2017) : L'OUA, l'UA et l'immigration clandestine
* **Question :** Les jeunes États africains se sont affirmés en créant une organisation continentale (OUA puis UA). Analyse de ses objectifs, bilans, et des défis actuels comme l'immigration clandestine (causes, impact et solutions).
* **Traité :** Créée le 25 mai 1963 à Addis-Abeba, l'OUA est devenue l'Union Africaine en 2002 à Durban. Face aux défis contemporains (pauvreté, instabilité politique, immigration clandestine vers l'Europe), l'Afrique mise sur la bonne gouvernance, l'unité, la création d'emplois et le développement socio-économique.

### Sujet N°13 (BAC 2018) : Discours de Charles De Gaulle sur l'Empire colonial
* **Question :** Analyse d'une citation de Charles De Gaulle (« Plutôt que de laisser verser son sang... ») sur la transition de l'empire colonial à la communauté. Explication de la politique algérienne et de la décolonisation de la Guinée française (Rôle de Sékou Touré, PDG-RDA, référendum de 1958).
* **Traité :** De Gaulle a compris après 1945 qu'il fallait transformer l'empire colonial en union ou communauté pour éviter des guerres ruineuses. En Guinée, le refus de la tutelle française au référendum du 28 septembre 1958 a conduit à l'indépendance totale le 2 octobre 1958.

### Sujet N°14 (BAC 2019 - Sujet 1) : Le Proche-Orient et la Seconde Guerre mondiale
* **Question :** Analyse géostratégique du Proche-Orient et démonstration de l'inévitabilité de la Seconde Guerre mondiale.
* **Traité :** (Voir développements précédents sur le Proche-Orient et les crises des années 30).

### Sujet N°15 (BAC 2020) : Citation de Paul Valéry sur la fragilité des civilisations
* **Question :** Explication de la citation de Paul Valéry (« Nous autres civilisations, nous savons maintenant que nous sommes mortelles ») et analyse du caractère évolutif de la notion de civilisation (du singulier au pluriel).
* **Traité :** Paul Valéry exprime l'angoisse de l'Europe au lendemain de la Seconde Guerre mondiale après les barbaries nazies. La notion de civilisation ne se limite pas à l'Europe (singulier) mais s'étend à tous les peuples de la Terre (pluriel), car chaque culture est perfectible et périssable si elle perd ses valeurs humaines.

### Sujet N°16 : L'Organisation de l'Unité Africaine (OUA)
* **Question :** Nommez l'organisation née de la Conférence de Berlin et de la volonté africaine, expliquez ses circonstances de naissance, ses objectifs, ses organes, ses mérites et ses faiblesses.
* **Traité :** Il s'agit de l'OUA créée le 25 mai 1963 à Addis-Abeba (Éthiopie). Ses objectifs étaient l'unité, la solidarité et l'éradication du colonialisme. Elle comprenait la Conférence des Chefs d'État, le Conseil des Ministres et le Secrétariat Général. Ses mérites incluent la libération de plusieurs pays africains ; ses faiblesses résident dans son incapacité à régler certains conflits armés internes.

### Sujet N°17 : La notion de civilisation et les civilisations africaines
* **Question :** En s'appuyant sur la citation de Paul Valéry, définissez la notion de civilisation et justifiez la nécessité de revaloriser les civilisations africaines.
* **Traité :** La civilisation est l'ensemble des acquis matériels et immatériels d'une société. Les civilisations africaines, riches d'un passé prestigieux (empires du Ghana, du Mali, du Songhaï), ont souffert de la traite et de la colonisation. Aujourd'hui, il est impératif de les revaloriser face à la mondialisation culturelle.

### Sujet N°18 (BAC 2020) : Rôle, organes et bilan de l'ONU
* **Question :** À sa naissance en 1945, l'ONU représentait un espoir pour la paix. Indiquez ses organes, ses objectifs, ses mérites et ses faiblesses.
* **Traité :** (Voir détails complets au chapitre I sur l'ONU : Assemblée Générale, Conseil de Sécurité, secrétaires généraux, CIJ, mérites en matière de droits de l'homme et faiblesses face au droit de véto).

### Sujet N°19 : La Diaspora Noire
* **Question :** Montrez que la Diaspora Noire n'est pas un fait du hasard, mais qu'elle est liée à des facteurs historiques, économiques et politiques.
* **Traité :** La diaspora noire (africains vivant hors d'Afrique) résulte de causes historiques (traite négrière arabe et européenne, colonisation), économiques (recherche d'emploi), politiques (guerres civiles, dictatures) et culturelles (fuite des cerveaux). Elle constitue un pont précieux de solidarité et de développement avec le continent d'origine.

### Sujet N°20 : Le Nouvel Ordre Mondial de l'Information et de la Communication (NOMIC)
* **Question :** Comment informer l'Afrique du monde et le monde de l'Afrique dans le cadre du NOMIC ?
* **Traité :** Le NOMIC vise à corriger le déséquilibre entre les pays du Nord (surinformés, monopolisant les agences de presse) et du Sud (sous-informés). Pour l'Afrique, il s'agit de développer ses propres médias (PANA, radios et télés nationales), de promouvoir le partenariat Sud-Sud et de garantir la liberté d'expression.

### Sujet N°21 : De l'OUA à l'Union Africaine (UA)
* **Question :** Expliquez le processus de passage de l'OUA à l'UA, indiquez ses objectifs, ses principes et ses organes.
* **Traité :** Face aux limites de l'OUA après 40 ans, le sommet extraordinaire de Syrte en Libye (1999) sous l'impulsion du Col. Kadhafi a jeté les bases de l'Union Africaine, officialisée à Durban en 2002. L'UA vise l'intégration politique et socio-économique, le respect des droits de l'homme et la bonne gouvernance à travers sa Conférence, son Conseil Exécutif et sa Commission.

### Sujet N°22 : Les Indépendances Africaines de 1960
* **Question :** Les indépendances africaines de 1960, loin d'être un fait du hasard, s'expliquent par une succession logique d'événements. Démontrez.
* **Traité :** L'année 1960 (l'Année des Indépendances) a vu l'émancipation de 17 pays africains. C'est l'aboutissement logique d'un long processus comprenant la prise de conscience post-1945, l'action des partis politiques (PDG-RDA, etc.), la loi-cadre de 1956, le référendum de 1958 en Guinée et la pression conjuguée de l'ONU et des superpuissances.

### Sujet N°23 : La Diaspora comme trait d'union
* **Question :** Démontrez que la diaspora constitue un trait d'union entre les nations et les peuples.
* **Traité :** La diaspora noire et internationale participe activement aux transferts de fonds (remittances), aux investissements économiques, aux transferts de compétences et au rayonnement culturel, devenant ainsi un pont humain et fraternel irremplaçable entre l'Afrique et le reste du monde.`
  }
];

const FULL_FALLBACK_SUBJECTS: FallbackSubject[] = [
  ...BASE_FALLBACK_SUBJECTS,
  // ─── 1. EXAMENS RÉELS OFFICIELS (GUINÉE) ──────────────────────────────────
  {
    id: "bac-math-sm-2021",
    title: "Sujet Officiel BAC SM 2021 - Mathématiques",
    description: "Épreuve officielle de Mathématiques - Option Sciences Mathématiques. Analyse complète des suites numériques, nombres complexes et géométrie.",
    doc_type: "EXERCICE",
    category: "REAL",
    subject: { id: 1, name: "Mathématiques", icon: "Calculator" },
    level: "BAC SM",
    is_free: true,
    year: "2021",
    country: "Guinée",
    institution: "MEPUA - Ministère de l'Éducation Nationale",
    content: `# ÉPREUVE OFFICIELLE DE MATHÉMATIQUES — BAC SM (Sciences Mathématiques)
**Session Officielle : 2021 | Ministère de l'Éducation Nationale (Guinée)**
**Durée : 4 heures | Coefficient : 5**

---

### 🎙️ CONSEIL STRATÉGIQUE DU PROFESSEUR KARAMÖ
*« Chers candidats au BAC, la clé sur cette épreuve officielle est d'articuler la récurrence sans faille à l'exercice 1, d'identifier le discriminant complexe à l'exercice 2 et de ne pas négliger la dérivée logarithmique sur le problème. Lisez attentivement les 4 étapes ci-dessous. »*

---

### EXERCICE 1 : Suites Numériques & Convergence (5 points)

Soit la suite numérique $(u_n)_{n \in \mathbb{N}}$ définie par :
$$u_0 = 1 \quad \text{et} \quad u_{n+1} = \sqrt{2 + u_n} \quad \text{pour tout } n \in \mathbb{N}$$

1. **Démonstration par récurrence :** Montrer que pour tout entier naturel $n$, on a $0 \leq u_n \leq 2$.
2. **Sens de variation :** Montrer que la suite $(u_n)$ est strictement croissante. En déduire qu'elle est convergente.
3. **Calcul de la limite :** Déterminer la limite $\ell$ de la suite $(u_n)$.

#### ✦ CORRIGÉ DÉTAILLÉ & RAPPELS DE COURS
* **Rappel Théorique :** Une suite majorée et croissante est toujours convergente vers un réel $\ell$.
* **Étape 1 (Initialisation) :** Pour $n=0$, $u_0 = 1 \in [0; 2]$. Vrai.
* **Étape 2 (Hérédité) :** Supposons $0 \leq u_n \leq 2$. Alors $2 \leq 2 + u_n \leq 4 \implies \sqrt{2} \leq \sqrt{2+u_n} \leq 2$. Comme $\sqrt{2} \geq 0$, on a $0 \leq u_{n+1} \leq 2$.
* **Étape 3 (Limite) :** Par continuité de $f(x) = \sqrt{2+x}$, $\ell = \sqrt{2+\ell} \implies \ell^2 - \ell - 2 = 0 \implies \ell = 2$ (car $\ell \geq 0$). La limite cherchée est **$\ell = 2$**.

---

### EXERCICE 2 : Nombres Complexes (5 points)

On considère dans l'ensemble $\mathbb{C}$ l'équation :
$$(E) : z^2 - (2 + 2i)z + 3 - 2i = 0$$

1. Résoudre l'équation $(E)$ dans $\mathbb{C}$. Exprimez les solutions sous forme algébrique.
2. Établir la forme trigonométrique de chaque racine.

#### ✦ CORRIGÉ PAS À PAS
* Discriminant $\Delta = (2+2i)^2 - 4(3-2i) = 8i - 12 + 8i = -12 + 16i$.
* Posons $\delta = x + iy$. On obtient le système classique : $x^2 - y^2 = -12$, $x^2 + y^2 = 20$, $2xy = 16$.
* On en déduit $x = \pm 2$ et $y = \pm 4$. Puisque $xy > 0$, $\delta = 2 + 4i$.
* Solutions algébriques : $z_1 = -i$ et $z_2 = 2 + 3i$.`
  },
  {
    id: "bac-phys-sm-2021",
    title: "Sujet Officiel BAC SM 2021 - Physique",
    description: "Épreuve théorique officielle de Physique pour les Sciences Mathématiques. Mouvement de projectiles, lois de Newton et satellites.",
    doc_type: "EXERCICE",
    category: "REAL",
    subject: { id: 2, name: "Physique", icon: "Atom" },
    level: "BAC SM",
    is_free: true,
    year: "2021",
    country: "Guinée",
    institution: "MEPUA",
    content: `# ÉPREUVE OFFICIELLE DE PHYSIQUE — BAC SM
**Session : 2021 | Ministère de l'Éducation Nationale (Guinée)**

---

### EXERCICE 1 : Mouvement d'un Projectile (6 points)

Un projectile de masse $m = 100\text{ g}$ est lancé depuis l'origine $O$ à $t=0$ avec $v_0 = 15\text{ m/s}$ sous un angle $\alpha = 45^\circ$. $g = 9,8\text{ m/s}^2$.

1. Établir les équations horaires cartésiennes du mouvement.
2. En déduire l'équation de la trajectoire.
3. Déterminer la portée maximale.

#### ✦ CORRIGÉ PAS À PAS DE KARAMÖ
* **1. Équations horaires :**
  $x(t) = (v_0 \cos \alpha)t$
  $y(t) = -\frac{1}{2}gt^2 + (v_0 \sin \alpha)t$
* **2. Équation de la trajectoire :**
  $y(x) = -\frac{g}{2v_0^2 \cos^2\alpha} x^2 + (\tan \alpha)x$
* **3. Portée maximale :**
  $x_{\text{max}} = \frac{v_0^2 \sin(2\alpha)}{g} = \frac{15^2 \times 1}{9,8} \approx 22,95\text{ mètres}$.`
  },
  {
    id: "bepc-maths-2023",
    title: "Sujet Officiel BEPC 2023 - Mathématiques",
    description: "Épreuve officielle du BEPC République de Guinée. Développement, factorisation, fractions rationnelles et géométrie analytique.",
    doc_type: "EXERCICE",
    category: "REAL",
    subject: { id: 1, name: "Mathématiques", icon: "Calculator" },
    level: "BEPC",
    is_free: true,
    year: "2023",
    country: "Guinée",
    institution: "MEPUA - Direction Nationale des Examens",
    content: `# ÉPREUVE OFFICIELLE DE MATHÉMATIQUES — BEPC GUINÉE
**Session : 2023 | MEPUA**

---

### PARTIE ALGÉBRIQUE (10 points)

On donne $A(x) = (2x - 3)^2 - (x+1)^2$ et $B(x) = (x-4)(3x-2) + (x-4)(x+5)$.

1. Développer, réduire et ordonner $A(x)$.
2. Factoriser $A(x)$ et $B(x)$.
3. Résoudre $A(x) = 0$.

#### ✦ CORRIGÉ DÉTAILLÉ DE KARAMÖ
* **Développement :** $A(x) = 4x^2 - 12x + 9 - (x^2 + 2x + 1) = 3x^2 - 14x + 8$.
* **Factorisation :** $A(x) = [(2x-3)-(x+1)][(2x-3)+(x+1)] = (x-4)(3x-2)$.
* **Résolution :** $A(x)=0 \iff x = 4 \quad \text{ou} \quad x = 2/3$.`
  },
  {
    id: "cee-cee7-calcul-2023",
    title: "Sujet Officiel CEE 7ème 2023 - Calcul Écrit",
    description: "Épreuve officielle du Certificat d'Études Élémentaires (CEE). Opérations sur nombres décimaux, conversion d'unités et problème de géométrie.",
    doc_type: "EXERCICE",
    category: "REAL",
    subject: { id: 1, name: "Mathématiques", icon: "Calculator" },
    level: "7ème Année (CEE)",
    is_free: true,
    year: "2023",
    country: "Guinée",
    institution: "MEPUA",
    content: `# ÉPREUVE OFFICIELLE DE CALCUL ÉCRIT — EXAMEN ENTRÉE EN 7ème
**Session Officielle 2023 | CEE Guinée**

---

### I. OPÉRATIONS (6 points)
1. $4\ 587,25 + 965,80 = 5\ 553,05$
2. $1\ 258,4 \times 3,5 = 4\ 404,40$
3. $7\ 845 \div 12 = 653,75$

### II. PROBLÈME PRATIQUE (14 points)
Un champ rectangulaire mesure $120\text{ m}$ sur $80\text{ m}$.
* Surface = $120 \times 80 = 9\ 600\text{ m}^2 = 96\text{ ares}$.
* Récolte = $9\ 600 \times 15\text{ kg} = 144\ 000\text{ kg} = 144\text{ tonnes}$.
* Prix total = $144\ 000 \times 5\ 000 = 720\ 000\ 000\text{ GNF}$.`
  },

  // ─── 2. EXAMENS BLANCS (LYCÉES & REGIONS) ─────────────────────────────────
  {
    id: "bac-blanc-conakry-math-2025",
    title: "Sujet BAC Blanc Conakry 2025 - Mathématiques SM",
    description: "Examen Blanc Général du Gouvernorat de Conakry & IRE. Préparation intensive au BAC Unique : Intégrales, Probabilités et Geométrie spatiale.",
    doc_type: "EXERCICE",
    category: "BLANC",
    subject: { id: 1, name: "Mathématiques", icon: "Calculator" },
    level: "BAC SM",
    is_free: true,
    year: "2025",
    country: "Guinée",
    institution: "Inspection Régionale de l'Éducation de Conakry (IRE)",
    content: `# EXAMEN BLANC RÉGIONAL — BAC SM 2025
**Gouvernorat de Conakry | IRE & DPE Dixinn, Matam, Kaloum, Ratoma, Matoto**
**Durée : 4 heures**

---

### 🎙️ VOIX-OFF & RECOMMANDATION DU PROF. KARAMÖ
*« Cet examen blanc reproduit exactement le niveau de complexité de l'épreuve officielle du BAC. Il met l'accent sur les calculs d'intégrales par parties et la loi binomiale. Entraînez-vous dans les conditions réelles de chrono ! »*

---

### EXERCICE 1 : Calcul Intégral & Décomposition (6 points)

On considère l'intégrale $I = \int_{0}^{1} \frac{x^3}{x^2 + 1} \, dx$.

1. Déterminer les réels $a$ et $b$ tels que pour tout $x$, $\frac{x^3}{x^2+1} = ax + \frac{bx}{x^2+1}$.
2. En déduire la valeur exacte de l'intégrale $I$.
3. À l'aide d'une intégration par parties, calculer $J = \int_{0}^{1} x^2 \ln(x^2+1) \, dx$.

#### ✦ CORRIGÉ PAS À PAS DÉTAILLÉ
* **Étape 1 (Décomposition) :**
  $x^3 = x(x^2+1) - x \implies \frac{x^3}{x^2+1} = x - \frac{x}{x^2+1}$. Donc $a = 1$ et $b = -1$.
* **Étape 2 (Calcul de I) :**
  $I = \left[ \frac{x^2}{2} - \frac{1}{2}\ln(x^2+1) \right]_{0}^{1} = \left( \frac{1}{2} - \frac{1}{2}\ln 2 \right) - 0 = \frac{1 - \ln 2}{2}$.
* **Étape 3 (Intégration par parties) :**
  Posons $u(x) = \ln(x^2+1) \implies u'(x) = \frac{2x}{x^2+1}$.
  $v'(x) = x^2 \implies v(x) = \frac{x^3}{3}$.
  $J = \left[ \frac{x^3}{3}\ln(x^2+1) \right]_{0}^{1} - \frac{2}{3}\int_{0}^{1}\frac{x^4}{x^2+1}\,dx = \frac{\ln 2}{3} - \frac{2}{3}\left(\frac{1}{3} - I\right)$.
  En remplaçant $I$, on obtient **$J = \frac{2\ln 2 - 1}{9}$**.`
  },
  {
    id: "bac-blanc-sainte-marie-physique-2025",
    title: "Sujet BAC Blanc Lycée Sainte-Marie 2025 - Physique",
    description: "Épreuve du BAC Blanc d'Excellence du Lycée Sainte-Marie de Dixinn. Oscillateur mécanique amorti, induction électromagnétique et physique nucléaire.",
    doc_type: "EXERCICE",
    category: "BLANC",
    subject: { id: 2, name: "Physique", icon: "Atom" },
    level: "BAC SM",
    is_free: true,
    year: "2025",
    country: "Guinée",
    institution: "Lycée Sainte-Marie de Conakry",
    content: `# EXAMEN BLANC D'EXCELLENCE — LYCÉE SAINTE-MARIE DIXINN
**Section : Sciences Mathématiques & Expérimentales**
**Session Blanc : Mai 2025**

---

### EXERCICE 1 : Décroissance Radioactive & Médecine Nucléaire (6 points)

L'iode 131 ($\text{}^{131}_{53}\text{I}$) est un isotope radioactif émetteur $\beta^-$ utilisé en radiothérapie de la thyroïde. Sa demi-vie ou période radioactive est $T = 8,0\text{ jours}$.

1. Écrire l'équation de désintégration de l'iode 131 en précisant les lois de conservation de Soddy. Nommer le noyau fils obtenu ($\text{Xe}$, $\text{Te}$, $\text{Ba}$).
2. Déterminer la constante radioactive $\lambda$ en $\text{s}^{-1}$.
3. Un patient reçoit une injection contenant une activité $A_0 = 3,7 \times 10^8\text{ Bq}$ à $t=0$. Quelle sera l'activité $A(t)$ restante au bout de $24\text{ jours}$ ?

#### ✦ CORRIGÉ DU PROFESSEUR KARAMÖ
* **Équation de désintégration $\beta^-$ :**
  $$\text{}^{131}_{53}\text{I} \longrightarrow \text{}^{131}_{54}\text{Xe} + \text{}^0_{-1}\text{e} + \bar{\nu}_e$$
* **Constante radioactive :**
  $\lambda = \frac{\ln 2}{T} = \frac{0,693}{8,0 \times 86400\text{ s}} \approx 1,0 \times 10^{-6}\text{ s}^{-1}$.
* **Activité après 24 jours :**
  Puisque $t = 24\text{ jours} = 3T$, l'activité est divisée par $2^3 = 8$ :
  $A(24\text{ jours}) = \frac{A_0}{8} = \frac{3,7 \times 10^8}{8} \approx 4,625 \times 10^7\text{ Bq}$.`
  },
  {
    id: "bepc-blanc-ratoma-francais-2025",
    title: "Sujet BEPC Blanc Ratoma 2025 - Français & Rédaction",
    description: "Examen Blanc de la Commune de Ratoma. Texte suivi de questions de grammaire, vocabulaire et sujet de rédaction narrative.",
    doc_type: "EXERCICE",
    category: "BLANC",
    subject: { id: 6, name: "Français", icon: "BookMarked" },
    level: "BEPC",
    is_free: true,
    year: "2025",
    country: "Guinée",
    institution: "DCE Ratoma - Conakry",
    content: `# EXAMEN BLANC COMMUNAL — BEPC 2025
**Direction Communale de l'Éducation de Ratoma**

---

### TEXTE : L'Éducation des Filles, Moteur du Progrès
*« Éduquer une fille, c'est éduquer toute une nation. Lorsqu'une jeune fille accède à l'école, elle acquiert l'autonomie, préserve sa santé et participe activement au développement économique de sa communauté... »*

### QUESTIONS :
1. **Compréhension :** Dégager l'idée générale du texte et expliquer l'expression « éduquer toute une nation ».
2. **Grammaire :** Relever une proposition subordonnée conjonctive de condition dans le texte.
3. **Rédaction :** Écrire une lettre de sensibilisation à un parent qui hésite à envoyer sa fille au collège.`
  },

  // ─── 3. EXAMENS DE L'ÉTRANGER (INTERNATIONAL / AUTRES PAYS) ───────────────
  {
    id: "bac-france-metropole-math-2024",
    title: "Sujet BAC France Métropole 2024 - Mathématiques Spécialité",
    description: "Épreuve officielle du BAC Général Français (Métropole). Équations différentielles, géométrie dans l'espace et fonctions exponentielles.",
    doc_type: "EXERCICE",
    category: "ETRANGER",
    subject: { id: 1, name: "Mathématiques", icon: "Calculator" },
    level: "BAC SM",
    is_free: true,
    year: "2024",
    country: "France",
    institution: "Ministère de l'Éducation Nationale (France)",
    content: `# ÉPREUVE DE MATHÉMATIQUES — BAC FRANCE MÉTROPOLE 2024
**Série : Baccalauréat Général Spécialité Mathématiques**
**Épreuve Internationale / Étranger**

---

### 🎙️ ANNALES INTERNATIONALES - CONSEIL KARAMÖ
*« Étudier les sujets du BAC de France permet d'enrichir considérablement son raisonnement mathématique. Ces exercices privilégient la rigueur de démonstration géométrique et les probabilités conditionnelles. »*

---

### EXERCICE 1 : Équations Différentielles & Exponentielle (5 points)

On considère l'équation différentielle $(E) : y' + 2y = 4x$.

1. Démontrer que la fonction affine $g(x) = 2x - 1$ est solution particulière de $(E)$.
2. Résoudre l'équation différentielle homogène $(E_0) : y' + 2y = 0$.
3. En déduire l'ensemble des solutions de l'équation $(E)$.
4. Déterminer la solution particulière $f$ vérifiant la condition initiale $f(0) = 3$.

#### ✦ CORRIGÉ PAS À PAS DE KARAMÖ
* **1. Verification de g(x) :**
  $g'(x) = 2$. Donc $g'(x) + 2g(x) = 2 + 2(2x - 1) = 2 + 4x - 2 = 4x$. $g$ est bien solution.
* **2. Equation homogène :**
  Les solutions de $y' + 2y = 0$ sont de la forme $y_0(x) = C e^{-2x}$ avec $C \in \mathbb{R}$.
* **3. Solutions générales :**
  $y(x) = y_0(x) + g(x) = C e^{-2x} + 2x - 1$.
* **4. Condition initiale f(0) = 3 :**
  $f(0) = C e^0 + 0 - 1 = 3 \implies C - 1 = 3 \implies C = 4$.
  La solution unique est **$f(x) = 4e^{-2x} + 2x - 1$**.`
  },
  {
    id: "bac-senegal-physique-2024",
    title: "Sujet BAC Sénégal 2024 - Physique & Chimie (S2)",
    description: "Sujet officiel du Baccalauréat Sénégalais - Série S2. Ondes mécaniques progressives, oscillateurs électriques RLC et estérification.",
    doc_type: "EXERCICE",
    category: "ETRANGER",
    subject: { id: 2, name: "Physique", icon: "Atom" },
    level: "BAC SM",
    is_free: true,
    year: "2024",
    country: "Sénégal",
    institution: "Office du Baccalauréat du Sénégal",
    content: `# ÉPREUVE DE PHYSIQUE-CHIMIE — BAC SÉNÉGAL 2024
**Série S2 (Sciences Expérimentales & Physiques) | Dakar**

---

### EXERCICE 1 : Chimie Organique & Cinétique (6 points)

On étudie la cinétique d'hydrolyse du propanoate d'éthyle à $25\text{ }^\circ\text{C}$.

1. Écrire l'équation bilancielle de cette réaction en formule développée.
2. Définir le temps de demi-réaction $t_{1/2}$. Comment varie-t-il lorsque la température augmente ?

#### ✦ CORRIGÉ DÉTAILLÉ DE KARAMÖ
* **Équation de l'hydrolyse de l'ester :**
  $$\text{CH}_3-\text{CH}_2-\text{COO}-\text{CH}_2-\text{CH}_3 + \text{H}_2\text{O} \rightleftharpoons \text{CH}_3-\text{CH}_2-\text{COOH} + \text{CH}_3-\text{CH}_2\text{OH}$$
  On obtient de l'acide propanoïque et de l'éthanol.
* **Temps de demi-réaction :**
  $t_{1/2}$ est la durée au bout de laquelle la moitié de l'avancement maximal est atteint ($x(t_{1/2}) = x_{\text{max}}/2$). Une augmentation de la température accélère la réaction et diminue $t_{1/2}$.`
  },
  {
    id: "bac-cote-ivoire-svt-2024",
    title: "Sujet BAC Côte d'Ivoire 2024 - SVT Série D",
    description: "Épreuve officielle du Baccalauréat Ivoirien. Immunologie humaine, réaction inflammatoire et fonctionnement du système nerveux.",
    doc_type: "EXERCICE",
    category: "ETRANGER",
    subject: { id: 3, name: "SVT", icon: "Leaf" },
    level: "BAC SS",
    is_free: true,
    year: "2024",
    country: "Côte d'Ivoire",
    institution: "DECO - Abidjan",
    content: `# ÉPREUVE DE SVT — BAC CÔTE D'IVOIRE 2024
**Série D (Sciences de la Vie et de la Terre) | Abidjan**

---

### EXERCICE : Immunologie & Réponse Spécifique (10 points)

Expliquer le rôle des lymphocytes T4 ($\text{LT}_4$) dans l'activation de la réponse immunitaire à médiation humorale et cellulaire.

#### ✦ DÉMONSTRATION DE KARAMÖ
Les $\text{LT}_4$ sont les chefs d'orchestre du système immunitaire :
1. Ils reconnaissent l'antigène présenté par la cellule présentatrice d'antigène (CPA) via le complexe majeur d'histocompatibilité (CMH II).
2. Ils se différencient en $\text{LT}$ récepteurs sécrétant l'interleukine-2 ($\text{IL}-2$).
3. L'interleukine stimule la multiplication des lymphocytes B (sécrétant les anticorps) et des lymphocytes $\text{LT}_8$ cytotoxiques.`
  },
  {
    id: "bac-maroc-philo-2024",
    title: "Sujet BAC Maroc 2024 - Philosophie & Culture",
    description: "Examen National du Baccalauréat Marocain. Les concepts de la Personne, la Vérité scientifique et la Théorie du Pouvoir Politique.",
    doc_type: "EXERCICE",
    category: "ETRANGER",
    subject: { id: 7, name: "Philosophie", icon: "Lightbulb" },
    level: "BAC",
    is_free: true,
    year: "2024",
    country: "Maroc",
    institution: "Ministère de l'Éducation Nationale (Rabat)",
    content: `# ÉPREUVE DE PHILOSOPHIE — BAC MAROC 2024
**Session Nationale Internationale | Rabat**

---

### SUJET DE DISSERTATION :
*« La vérité scientifique est-elle une simple construction de l'esprit humain ou le reflet exact de la réalité extérieure ? »*

#### ✦ PLAN COMPARATIF DE KARAMO
* **I. Le Réalisme naïf :** La science comme miroir fidèle des lois de la nature (Descartes, Newton).
* **II. Le Constructivisme & Rationalisme appliqué :** La vérité scientifique est une construction théorique vérifiée par l'expérience (Bachelard, Popper).
* **III. Synthèse :** La science progresse par rectifications successives de ses erreurs.`
  },
  // ─── SUJETS RAJOUTÉS DE LA BANQUE COMPLÈTE GUINÉENNE (2015 - 2024) ────────
  {
    id: "bac-math-sm-2024",
    title: "Sujet Officiel BAC SM 2024 - Mathématiques",
    description: "Épreuve officielle du BAC SM 2024. Équations différentielles, géométrie de l'espace et probabilités conditionnelles.",
    doc_type: "EXERCICE",
    category: "REAL",
    subject: { id: 1, name: "Mathématiques", icon: "Calculator" },
    level: "BAC SM",
    is_free: true,
    year: "2024",
    country: "Guinée",
    institution: "MEPUA - Guinée",
    content: `# ÉPREUVE OFFICIELLE DE MATHÉMATIQUES — BAC SM 2024 (GUINÉE)
**Session Officielle 2024 | MEPUA**

---

### EXERCICE 1 : Probabilités & Loi Binomiale (5 points)
Une urne contient 4 boules rouges et 6 boules noires. On tire au hasard et simultanément 3 boules de l'urne.
1. Calculer la probabilité d'obtenir exactement 2 boules rouges.
2. On répète l'épreuve 5 fois de suite avec remise. Quelle est la probabilité d'obtenir au moins une fois 2 boules rouges ?

#### ✦ CORRIGÉ PAS À PAS DE PROF. KARAMO
* **1. Tirage simultané :** Nombre total de tirages possibles $C_{10}^3 = 120$.
  Nombre de tirages favorables (2 rouges parmi 4 et 1 noire parmi 6) : $C_4^2 \times C_6^1 = 6 \times 6 = 36$.
  $P(A) = \frac{36}{120} = \frac{3}{10} = 0,3$.
* **2. Répétition (Loi Binomiale $B(5; 0,3)$) :**
  $P(X \geq 1) = 1 - P(X = 0) = 1 - (1 - 0,3)^5 = 1 - (0,7)^5 = 1 - 0,16807 = 0,83193$.`
  },
  {
    id: "bac-phys-sm-2024",
    title: "Sujet Officiel BAC SM 2024 - Physique",
    description: "Épreuve officielle de Physique du BAC SM 2024. Mouvement dans un champ E uniforme, oscillateur RLC et optique ondulatoire.",
    doc_type: "EXERCICE",
    category: "REAL",
    subject: { id: 2, name: "Physique", icon: "Atom" },
    level: "BAC SM",
    is_free: true,
    year: "2024",
    country: "Guinée",
    institution: "MEPUA - Guinée",
    content: `# ÉPREUVE OFFICIELLE DE PHYSIQUE — BAC SM 2024 (GUINÉE)
**Session Officielle 2024 | MEPUA**

---

### EXERCICE 1 : Électron dans un Champ Électrique Uniforme (6 points)
Un électron pénètre entre deux plaques parallèles sous tension $U$ avec une vitesse initiale $v_0$ perpendiculaire au champ $\vec{E}$.
1. Établir l'équation de la trajectoire de l'électron dans le condensateur.
2. Exprimer la déviation électrostatique $Y$ à la sortie des plaques de longueur $L$.

#### ✦ CORRIGÉ PAS À PAS DE PROF. KARAMO
* **1. Accélération :** $\vec{a} = \frac{q\vec{E}}{m} = -\frac{eE}{m}\vec{j}$.
  $x(t) = v_0 t \implies t = \frac{x}{v_0}$.
  $y(t) = \frac{eE}{2m} t^2 \implies y(x) = \frac{eE}{2m v_0^2} x^2$.
* **2. Déviation $Y$ :** Pour $x = L$, $Y = \frac{e U L^2}{2 m d v_0^2}$.`
  },
  {
    id: "bac-math-sm-2023",
    title: "Sujet Officiel BAC SM 2023 - Mathématiques",
    description: "Épreuve officielle du BAC SM 2023. Nombres complexes, transformation du plan et étude de fonction logarithme népérien.",
    doc_type: "EXERCICE",
    category: "REAL",
    subject: { id: 1, name: "Mathématiques", icon: "Calculator" },
    level: "BAC SM",
    is_free: true,
    year: "2023",
    country: "Guinée",
    institution: "MEPUA - Guinée",
    content: `# ÉPREUVE OFFICIELLE DE MATHÉMATIQUES — BAC SM 2023 (GUINÉE)
**Session Officielle 2023 | MEPUA**

---

### EXERCICE : Étude de la fonction $f(x) = x - \ln(x^2 + 1)$
1. Déterminer l'ensemble de définition $D_f$.
2. Calculer les limites aux bornes de $D_f$.
3. Étudier le sens de variation de $f$ et dresser son tableau de variation.

#### ✦ CORRIGÉ PAS À PAS DE PROF. KARAMO
* **1. Ensemble de définition :** Pour tout $x \in \mathbb{R}$, $x^2 + 1 > 0$, donc $D_f = \mathbb{R}$.
* **2. Limites :** En $+\infty$, $f(x) = x(1 - \frac{\ln(x^2+1)}{x}) \to +\infty$. En $-\infty$, $f(x) \to -\infty$.
* **3. Dérivée :** $f'(x) = 1 - \frac{2x}{x^2+1} = \frac{x^2 - 2x + 1}{x^2+1} = \frac{(x-1)^2}{x^2+1} \geq 0$.
  $f$ est strictement croissante sur $\mathbb{R}$.`
  },
  {
    id: "bac-philo-ss-2024",
    title: "Sujet Officiel BAC SS 2024 - Philosophie",
    description: "Épreuve officielle de Philosophie des Sciences Sociales 2024. La conscience, la liberté politique et le progrès technique.",
    doc_type: "EXERCICE",
    category: "REAL",
    subject: { id: 7, name: "Philosophie", icon: "Lightbulb" },
    level: "BAC SS",
    is_free: true,
    year: "2024",
    country: "Guinée",
    institution: "MEPUA - Guinée",
    content: `# ÉPREUVE OFFICIELLE DE PHILOSOPHIE — BAC SS 2024 (GUINÉE)
**Session Officielle 2024 | MEPUA**

---

### SUJET : *« Le progrès technique garantit-il le bonheur de l'humanité ? »*

#### ✦ PLAN DE DISSERTATION DE PROF. KARAMO
* **I. Le progrès technique comme source de libération :** Allègement du travail humain, avancées de la médecine, communication mondiale (Descartes, Bacon).
* **II. Les dérives et risques de la technique :** Aliénation, destruction environnementale, perte de sens (Rousseau, Jonas).
* **III. Synthèse éthique :** La technique n'est qu'un moyen ; seul un usage guidé par l'éthique assure le bien-être humain.`
  },
  {
    id: "bac-geo-ss-2024",
    title: "Sujet Officiel BAC SS 2024 - Géographie de la Guinée",
    description: "Épreuve de Géographie du BAC SS 2024. L'économie guinéenne, le bauxite, le réseau hydrographique (château d'eau) et l'urbanisation.",
    doc_type: "EXERCICE",
    category: "REAL",
    subject: { id: 8, name: "Géographie", icon: "Globe" },
    level: "BAC SS",
    is_free: true,
    year: "2024",
    country: "Guinée",
    institution: "MEPUA - Guinée",
    content: `# ÉPREUVE OFFICIELLE DE GÉOGRAPHIE — BAC SS 2024 (GUINÉE)
**Session Officielle 2024 | MEPUA**

---

### SUJET : La Guinée, Château d'Eau de l'Afrique de l'Ouest
1. Justifiez l'appellation « Château d'eau de l'Afrique de l'Ouest » attribuée à la Guinée.
2. Citez trois grands fleuves internationaux qui prennent leur source en Guinée et les pays traversés.
3. Quels sont les défis liés à la gestion et à la préservation de ce potentiel hydrologique ?

#### ✦ CORRIGÉ STRUCTURÉ DE PROF. KARAMO
* **1. Raison de l'appellation :** En raison du relief élevé (Massif du Fouta Djallon) et d'une pluviométrie abondante, la Guinée donne naissance aux principaux cours d'eau de la sous-région.
* **2. Fleuves majeurs :**
  - **Le Fleuve Niger :** Source à Faranah $\rightarrow$ Mali, Niger, Bénin, Nigeria.
  - **Le Fleuve Sénégal :** (Bafing) Source au Fouta Djallon $\rightarrow$ Mali, Mauritanie, Sénégal.
  - **Le Fleuve Gambie :** Source à Labé $\rightarrow$ Sénégal, Gambie.
* **3. Défis :** La déforestation, le changement climatique et l'exploitation minière non contrôlée.`
  },
  {
    id: "bac-histoire-ss-2023",
    title: "Sujet Officiel BAC SS 2023 - Histoire Moderne",
    description: "Épreuve officielle d'Histoire BAC SS 2023. La décolonisation en Afrique, le rôle d'Ahmed Sékou Touré et le Référendum du 28 Septembre 1958.",
    doc_type: "EXERCICE",
    category: "REAL",
    subject: { id: 9, name: "Histoire", icon: "History" },
    level: "BAC SS",
    is_free: true,
    year: "2023",
    country: "Guinée",
    institution: "MEPUA - Guinée",
    content: `# ÉPREUVE OFFICIELLE D'HISTOIRE — BAC SS 2023 (GUINÉE)
**Session Officielle 2023 | MEPUA**

---

### SUJET : Le Référendum du 28 Septembre 1958 et l'Indépendance de la Guinée
1. Expliquez les circonstances politiques qui ont conduit au vote du « NON » le 28 septembre 1958.
2. Analysez les conséquences immédiates de cette prise de position sur les relations franco-guinéennes.

#### ✦ RÉSUMÉ HISTORIQUE DE PROF. KARAMO
* **1. Le contexte :** Le projet de Communauté Franco-Africaine proposé par le Général de Gaulle. Sous la direction d'Ahmed Sékou Touré et du PDG-RDA, la Guinée rejette la Communauté (« Nous préférons la liberté dans la pauvreté à la richesse dans la servitude ») et vote **NON** à plus de 94%.
* **2. Les conséquences :** Proclamation de l'Indépendance le **2 Octobre 1958**, rupture brutale de l'assistance technique française, et accession de la Guinée à la souveraineté nationale.`
  },
  {
    id: "bepc-maths-2024",
    title: "Sujet Officiel BEPC 2024 - Mathématiques",
    description: "Épreuve officielle du BEPC 2024. Systèmes d'équations à deux inconnues, théorème de Pythagore et trigonométrie.",
    doc_type: "EXERCICE",
    category: "REAL",
    subject: { id: 1, name: "Mathématiques", icon: "Calculator" },
    level: "BEPC",
    is_free: true,
    year: "2024",
    country: "Guinée",
    institution: "MEPUA - Guinée",
    content: `# ÉPREUVE OFFICIELLE DE MATHÉMATIQUES — BEPC 2024 (GUINÉE)
**Session Officielle 2024 | MEPUA**

---

### EXERCICE 1 : Résolution de Système (6 points)
Résoudre par la méthode de substitution ou de combinaison le système suivant :
$$\begin{cases} 2x + 3y = 13 \\ 5x - y = 7 \end{cases}$$

#### ✦ CORRIGÉ DÉTAILLÉ DE PROF. KARAMO
* De la 2ème équation : $y = 5x - 7$.
* On remplace $y$ dans la 1ère équation : $2x + 3(5x - 7) = 13 \iff 2x + 15x - 21 = 13 \iff 17x = 34 \iff x = 2$.
* On en déduit $y = 5(2) - 7 = 10 - 7 = 3$.
* Le couple solution est **$(x; y) = (2; 3)$**.`
  },
  {
    id: "bepc-physique-2023",
    title: "Sujet Officiel BEPC 2023 - Physique & Chimie",
    description: "Épreuve de Physique-Chimie BEPC 2023. Électricité (Loi d'Ohm, puissance), masse volumique et réactions chimiques.",
    doc_type: "EXERCICE",
    category: "REAL",
    subject: { id: 2, name: "Physique", icon: "Atom" },
    level: "BEPC",
    is_free: true,
    year: "2023",
    country: "Guinée",
    institution: "MEPUA - Guinée",
    content: `# ÉPREUVE DE PHYSIQUE-CHIMIE — BEPC 2023 (GUINÉE)
**Session Officielle 2023 | MEPUA**

---

### EXERCICE : Loi d'Ohm & Puissance Électrique (8 points)
Un conducteur ohmique de résistance $R = 50\ \Omega$ est traversé par un courant d'intensité $I = 0,4\text{ A}$ pendant $10\text{ minutes}$.
1. Calculer la tension $U$ aux bornes du conducteur.
2. Calculer la puissance électrique $P$ consommée.
3. Calculer l'énergie thermique $E$ dissipée par effet Joule en Joules puis en Wattheures.

#### ✦ CORRIGÉ PAS À PAS DE PROF. KARAMO
* **1. Tension $U$ :** $U = R \times I = 50 \times 0,4 = 20\text{ Volts}$.
* **2. Puissance $P$ :** $P = U \times I = 20 \times 0,4 = 8\text{ Watts}$.
* **3. Énergie $E$ :** $t = 10\text{ min} = 600\text{ secondes}$.
  $E = P \times t = 8 \times 600 = 4\ 800\text{ Joules}$.
  En Wattheures : $E = \frac{4800}{3600} = 1,33\text{ Wh}$.`
  },
  {
    id: "bepc-histoire-geo-2023",
    title: "Sujet Officiel BEPC 2023 - Histoire & Géographie",
    description: "Épreuve officielle d'Histoire-Géographie BEPC 2023. La résistance guinéenne (Samory Touré), le relief et la végétation de la Guinée.",
    doc_type: "EXERCICE",
    category: "REAL",
    subject: { id: 9, name: "Histoire", icon: "History" },
    level: "BEPC",
    is_free: true,
    year: "2023",
    country: "Guinée",
    institution: "MEPUA - Guinée",
    content: `# ÉPREUVE D'HISTOIRE-GÉOGRAPHIE — BEPC 2023 (GUINÉE)
**Session Officielle 2023 | MEPUA**

---

### PARTIE I : HISTOIRE (10 points)
Présentez la figure de l'Almamy Samory Touré : son empire (Wassoulou), sa stratégie militaire et les étapes de sa résistance contre la pénétration coloniale française.

#### ✦ SYNTHÈSE DE PROF. KARAMO
* **L'Empire du Wassoulou :** Fondé par Samory Touré au XIXe siècle avec Bissandougou comme capitale.
* **Stratégie militaire :** L'armée organisée (les sofas), la fabrication locale d'armes, la tactique de la terre brûlée et le déplacement stratégique de l'empire vers l'est.
* **Fin de la résistance :** Capture à Guélémou en 1898 et exil au Gabon.`
  },
  {
    id: "bepc-anglais-2023",
    title: "Sujet Officiel BEPC 2023 - Anglais",
    description: "Épreuve officielle d'Anglais au BEPC. Comprehension text about youth and technology, grammar questions, and guided writing.",
    doc_type: "EXERCICE",
    category: "REAL",
    subject: { id: 10, name: "Anglais", icon: "Languages" },
    level: "BEPC",
    is_free: true,
    year: "2023",
    country: "Guinée",
    institution: "MEPUA - Guinée",
    content: `# OFFICIAL ENGLISH EXAMINATION — BEPC 2023 (GUINEA)
**Session 2023 | Ministry of Pre-University Education**

---

### SECTION 1: READING COMPREHENSION (10 marks)
*Text: The Importance of Mobile Phones for Guinean Students.*
1. Answer True or False according to the text.
2. Find in the text synonyms for: *useful*, *learn*, *fast*.

### SECTION 2: GRAMMAR & USAGE (10 marks)
1. Turn into the passive voice: *"Students use computers in the library."*
   $\rightarrow$ *"Computers are used by students in the library."*
2. Complete with the correct tense: *"If I (have) _____ time, I will visit Conakry."*
   $\rightarrow$ *"have"* (Conditional Type 1).`
  },
  {
    id: "cee-math-2024",
    title: "Sujet Officiel CEE 7ème 2024 - Calcul Écrit",
    description: "Épreuve officielle du Calcul Écrit - Examen de CEE 7ème 2024. Problèmes de pourcentages, périmètre et aire du cercle, partage proportionnel.",
    doc_type: "EXERCICE",
    category: "REAL",
    subject: { id: 1, name: "Mathématiques", icon: "Calculator" },
    level: "7ème Année (CEE)",
    is_free: true,
    year: "2024",
    country: "Guinée",
    institution: "MEPUA - Guinée",
    content: `# ÉPREUVE DE CALCUL ÉCRIT — CEE 7ème 2024 (GUINÉE)
**Session Officielle 2024 | Entrée en 7ème Année**

---

### PROBLÈME DE PARTAGE PROPORTIONNEL (14 points)
Trois commerçants de Madina se partagent un bénéfice de $15\ 000\ 000\text{ GNF}$ proportionnellement à leurs investissements : $2\ 000\ 000\text{ GNF}$, $3\ 000\ 000\text{ GNF}$ et $5\ 000\ 000\text{ GNF}$.
Calculer la part de chacun.

#### ✦ CORRIGÉ PAS À PAS DE PROF. KARAMO
* Capital total investi = $2 + 3 + 5 = 10\text{ millions GNF}$.
* Part du 1er = $\frac{15\ 000\ 000 \times 2}{10} = 3\ 000\ 000\text{ GNF}$.
* Part du 2ème = $\frac{15\ 000\ 000 \times 3}{10} = 4\ 500\ 000\text{ GNF}$.
* Part du 3ème = $\frac{15\ 000\ 000 \times 5}{10} = 7\ 500\ 000\text{ GNF}$.
* Verification : $3 + 4,5 + 7,5 = 15\text{ millions GNF}$.`
  },
  {
    id: "cee-dictee-2024",
    title: "Sujet Officiel CEE 7ème 2024 - Dictée & Questions",
    description: "Épreuve officielle de Dictée et Questions CEE 2024. Accord du participe passé, analyse grammaticale et vocabulaire.",
    doc_type: "EXERCICE",
    category: "REAL",
    subject: { id: 5, name: "Français", icon: "FileText" },
    level: "7ème Année (CEE)",
    is_free: true,
    year: "2024",
    country: "Guinée",
    institution: "MEPUA - Guinée",
    content: `# ÉPREUVE DE DICTÉE & QUESTIONS — CEE 2024 (GUINÉE)
**Session Officielle 2024 | CEE 7ème**

---

### DICTÉE : Le Marché de Madina
*« Au petit matin, les marchandes s'installent au grand marché. Les étals se remplissent de fruits frais, de légumes colorés et d'étoffes magnifiques. Les acheteurs affluent de tous les quartiers de Conakry. »*

---

### QUESTIONS :
1. Justifiez l'orthographe du mot *"colorés"*.
2. Donnez la nature et la fonction du mot *"magnifiques"*.
3. Mettez au pluriel la phrase : *"La marchande installe son étal."*

#### ✦ CORRIGÉ DE PROF. KARAMO
* **1. Orthographe :** *"colorés"* s'accorde en genre et en nombre avec le nom masculin pluriel *"légumes"*.
* **2. Nature & Fonction :** *"magnifiques"* est un adjectif qualificatif, épithète du nom *"étoffes"*.
* **3. Pluriel :** *"Les marchandes installent leurs étals."*`
  },
  {
    id: "cee-sciences-2023",
    title: "Sujet Officiel CEE 7ème 2023 - Sciences d'Observation",
    description: "Épreuve de Sciences d'Observation CEE 2023. Le corps humain, la digestion, la germination de la graine et l'hygiène de vie.",
    doc_type: "EXERCICE",
    category: "REAL",
    subject: { id: 4, name: "SVT", icon: "Leaf" },
    level: "7ème Année (CEE)",
    is_free: true,
    year: "2023",
    country: "Guinée",
    institution: "MEPUA - Guinée",
    content: `# ÉPREUVE DE SCIENCES D'OBSERVATION — CEE 2023
**Session Officielle 2023 | CEE 7ème Année**

---

### QUESTIONS :
1. Citez dans l'ordre les différents organes de l'appareil digestif de l'homme.
2. Quelles sont les conditions indispensables pour qu'une graine de maïs germe ?
3. Expliquez le rôle du sang dans l'organisme.

#### ✦ CORRIGÉ PAS À PAS DE PROF. KARAMO
* **1. Appareil digestif :** La bouche $\rightarrow$ l'œsophage $\rightarrow$ l'estomac $\rightarrow$ l'intestin grêle $\rightarrow$ le gros intestin $\rightarrow$ l'anus.
* **2. Conditions de germination :** L'eau (humidité), l'air (oxygène) et une température favorable (chaleur).
* **3. Rôle du sang :** Transporter l'oxygène et les nutriments vers les cellules, et éliminer le dioxyde de carbone et les déchets.`
  },
  // ─── SUJETS CEE SESSION 2000 (SOURCE EXAM224.COM) ─────────────────────────
  {
    id: "cee-2000-redaction",
    title: "Sujet Officiel CEE 7ème 2000 - Rédaction",
    description: "Épreuve officielle de Rédaction CEE 2000 (Option Français). Portrait physique et moral d'un membre de la famille.",
    doc_type: "EXERCICE",
    category: "REAL",
    subject: { id: 5, name: "Français", icon: "FileText" },
    level: "7ème Année (CEE)",
    is_free: true,
    year: "2000",
    country: "Guinée",
    institution: "MEPUA / SNESCO - Guinée",
    content: `# ÉPREUVE OFFICIELLE DE RÉDACTION — CEE 2000 (GUINÉE)
**Session Officielle 2000 | Ministère de l'Éducation Nationale (MEPU-A / SNESCO)**
*Profils : Option Français | Coefficient : 1 | Durée : 1 heure*

---

### SUJET DE RÉDACTION
> **Faites le portrait physique et moral de votre grand-père ou de votre grand-mère.**

---

#### ✦ CONSEILS & PLAN DE RÉDACTION DE PROF. KARAMO
1. **Introduction :** Présentez brièvement la personne choisie (nom, âge approximatif, lieu de résidence).
2. **Portrait physique :** Décrivez le visage (rides, regard bienveillant), la démarche, la tenue vestimentaire traditionnelle et la voix.
3. **Portrait moral & Qualités :** Décrivez sa gentillesse, sa sagesse, les histoires ou contes qu'il/elle vous raconte au foyer, sa générosité et ses conseils de vie.
4. **Conclusion :** Exprimez vos sentiments d'affection et le respect que vous lui portez.`
  },
  {
    id: "cee-2000-geographie",
    title: "Sujet Officiel CEE 7ème 2000 - Géographie",
    description: "Épreuve officielle de Géographie CEE 2000. Les climats de la Guinée, pays limitrophes et cultures industrielles.",
    doc_type: "EXERCICE",
    category: "REAL",
    subject: { id: 8, name: "Géographie", icon: "Globe" },
    level: "7ème Année (CEE)",
    is_free: true,
    year: "2000",
    country: "Guinée",
    institution: "MEPUA / SNESCO - Guinée",
    content: `# ÉPREUVE OFFICIELLE DE GÉOGRAPHIE — CEE 2000 (GUINÉE)
**Session Officielle 2000 | Ministère de l'Éducation Nationale (MEPU-A / SNESCO)**
*Coefficient : 1 | Durée : 1 heure*

---

### QUESTIONS :
1. **Citez les types de climat de la République de Guinée.** (3 points)
2. **Citez les pays limitrophes de la République de Guinée.** (3 points)
3. **Quelles sont les principales cultures industrielles de la Guinée ?** (4 points)

---

#### ✦ CORRIGÉ DÉTAILLÉ DE PROF. KARAMO
* **1. Types de climats en Guinée :**
  - **Le Climat Guinéen (Subéquatorial) :** Pluviométrie très forte, caractérisé par deux saisons bien marquées (Basse Guinée).
  - **Le Climat Foutanien (Soudano-Guinéen d'altitude) :** Températures fraîches et pluies abondantes (Moyenne Guinée).
  - **Le Climat Soudano-Guinéen :** Saison sèche prolongée (Haute Guinée).
  - **Le Climat Subéquatorial Forestier :** Pluie presque toute l'année (Guinée Forestière).
* **2. Pays limitrophes (6 pays) :**
  La Guinée est bordée par la Guinée-Bissau, le Sénégal, le Mali, la Côte d'Ivoire, le Libéria et la Sierra Leone.
* **3. Principales cultures industrielles :**
  Le café, le cacao, le coton, l'hévéa, le palme à huile et l'ananas.`
  },
  {
    id: "cee-2000-sciences",
    title: "Sujet Officiel CEE 7ème 2000 - Sciences d'Observation",
    description: "Épreuve officielle de Sciences d'Observation CEE 2000. États de la matière, composition du lait et hygiène.",
    doc_type: "EXERCICE",
    category: "REAL",
    subject: { id: 4, name: "SVT", icon: "Leaf" },
    level: "7ème Année (CEE)",
    is_free: true,
    year: "2000",
    country: "Guinée",
    institution: "MEPUA / SNESCO - Guinée",
    content: `# ÉPREUVE DE SCIENCES D'OBSERVATION — CEE 2000 (GUINÉE)
**Session Officielle 2000 | MEPU-A / SNESCO**
*Coefficient : 1 | Durée : 1 heure*

---

### QUESTIONS :
1. **Citez les états de la matière en donnant un exemple pour chaque état.** (2 points)
2. **Dites pourquoi le lait peut suffire à l'alimentation d'un bébé et citez ses composants.** (4 points)
3. **Quelles sont les règles élémentaires de protection de la vision ?** (4 points)

---

#### ✦ CORRIGÉ GUIDÉ DE PROF. KARAMO
* **1. États de la matière :**
  - **Solide :** La glace, le fer, le bois.
  - **Liquide :** L'eau, le lait, l'huile.
  - **Gazeux :** La vapeur d'eau, l'air, l'oxygène.
* **2. Le lait et l'alimentation du bébé :**
  Le lait est un **aliment complet** car il contient tous les nutriments indispensables à la croissance : l'eau, les lipides (matières grasses), les protides (caséine), les glucides (lactose), les sels minéraux (calcium) et les vitamines.
* **3. Hygiène de la vision :**
  Ne pas lire dans l'obscurité, éviter de se frotter les yeux avec des mains sales, maintenir une distance d'au moins 30 cm par rapport aux livres/écrans.`
  },
  {
    id: "cee-2000-histoire",
    title: "Sujet Officiel CEE 7ème 2000 - Histoire",
    description: "Épreuve officielle d'Histoire CEE 2000. La résistance coloniale, l'Hégire et l'Empire du Ghana.",
    doc_type: "EXERCICE",
    category: "REAL",
    subject: { id: 9, name: "Histoire", icon: "History" },
    level: "7ème Année (CEE)",
    is_free: true,
    year: "2000",
    country: "Guinée",
    institution: "MEPUA / SNESCO - Guinée",
    content: `# ÉPREUVE OFFICIELLE D'HISTOIRE — CEE 2000 (GUINÉE)
**Session Officielle 2000 | MEPU-A / SNESCO**
*Coefficient : 1 | Durée : 1 heure*

---

### QUESTIONS :
1. **Citez deux grands résistants africains à l'invasion coloniale morts hors de leur pays. Où chacun est-il mort et quand ?** (3 points)
2. **Qu'est-ce que l'Hégire ?** (1 point)
3. **Par qui fut détruit l'empire du Ghana et quand ?** (2 points)

---

#### ✦ CORRIGÉ HISTORIQUE DE PROF. KARAMO
* **1. Deux grands résistants morts en exil :**
  - **L'Almamy Samory Touré :** Mort en exil à Ndjolé (Gabon) le **2 juin 1900**.
  - **Béhanzin (Roi du Dahomey) :** Mort en exil à Alger (Algérie) en **1906**.
* **2. L'Hégire :**
  L'Hégire désigne l'émigration du Prophète Mahomet (PSL) et de ses compagnons de La Mecque vers Médine en l'an **622**, marquant le début du calendrier musulman.
* **3. Destruction de l'Empire du Ghana :**
  L'Empire du Ghana (Koumbi Saleh) a été affaibli par les **Almoravides** au XIe siècle, puis définitivement soumis par **Sumaoro Kanté** au début du XIIIe siècle (1203).`
  },
  {
    id: "cee-2000-dictee",
    title: "Sujet Officiel CEE 7ème 2000 - Dictée & Questions",
    description: "Épreuve officielle de Dictée & Questions CEE 2000. Texte sur la déforestation, questions de vocabulaire et de grammaire.",
    doc_type: "EXERCICE",
    category: "REAL",
    subject: { id: 5, name: "Français", icon: "FileText" },
    level: "7ème Année (CEE)",
    is_free: true,
    year: "2000",
    country: "Guinée",
    institution: "MEPUA / SNESCO - Guinée",
    content: `# ÉPREUVE DE DICTÉE & QUESTIONS — CEE 2000 (GUINÉE)
**Session Officielle 2000 | MEPU-A / SNESCO**
*Coefficient : 2 | Durée : 2 heures*

---

### DICTÉE (10 points)
*Autrefois, la Guinée était entièrement recouverte de forêt. Il pleuvait beaucoup; les agriculteurs faisaient de bonnes récoltes. La population mangeait à sa faim et ne manquait point d’air pur.*

*Aujourd’hui, ces forêts se dégradent petit à petit sous l’effet des feux de brousse et de la coupe abusive du bois. Pendant la saison sèche, il n’y a pas assez d’eau dans les marigots qui ne coulent presque plus. C’est dans cette eau stagnante qu’on lave les habits et qu’on puise de l’eau de boisson. Or, pour la bonne santé, tu dois respirer de l’air pur, être propre, boire de l’eau potable et avoir une habitation aérée.*

---

### QUESTIONS DE COMPRÉHENSION & DE GRAMMAIRE (10 points)

**I- Compréhension :**
a- Quel titre peut-on donner à ce texte ?
b- Expliquez : *Manger à sa faim*, *La coupe abusive du bois*, *Une eau stagnante*, *Une eau potable*.

**II- Vocabulaire :**
- Donnez deux mots de la même famille que « bois » (ex: boisement, reboisement).
- Donnez deux mots de la même famille que « sèche » (ex: sécheresse, séchage).

**III- Conjugaison :**
- Le verbe « faire » aux 4 temps simples de l'indicatif (1ère et 3ème personne du pluriel).
- Le verbe « faire » au plus-que-parfait et passé antérieur.`
  },
  {
    id: "cee-2000-ecm",
    title: "Sujet Officiel CEE 7ème 2000 - ECM (Éducation Civique)",
    description: "Épreuve officielle d'ECM CEE 2000. Devise nationale, droits et devoirs, actualité politique guinéenne.",
    doc_type: "EXERCICE",
    category: "REAL",
    subject: { id: 6, name: "ECM", icon: "Award" },
    level: "7ème Année (CEE)",
    is_free: true,
    year: "2000",
    country: "Guinée",
    institution: "MEPUA / SNESCO - Guinée",
    content: `# ÉPREUVE D'ÉDUCATION CIVIQUE ET MORALE — CEE 2000
**Session Officielle 2000 | MEPU-A / SNESCO**
*Coefficient : 1 | Durée : 1 heure*

---

### QUESTIONS :
1. **Quelle est la devise de la nation guinéenne ?** (2 points)
2. **Qu’est-ce que le droit ? Qu’est-ce que le devoir ?** (2 points)
3. **Quel événement politique s’est déroulé en Guinée le dimanche 25 juin 2000 ?** (4 points)
4. **Quel est le nombre des préfectures de la République de Guinée ? Citez une préfecture de chaque région administrative.** (2 points)

---

#### ✦ CORRIGÉ DE PROF. KARAMO
* **1. Devise Nationale :** *"Travail - Justice - Solidarité"*.
* **2. Droit et Devoir :**
  - **Le Droit :** Ce qu'une personne est autorisée à exiger de la société ou des autres (ex: le droit à l'éducation, à la santé).
  - **Le Devoir :** Les obligations morales ou légales qu'un citoyen doit accomplir envers la collectivité (ex: payer ses impôts, respecter la loi).
* **3. Événement du 25 juin 2000 :**
  Les élections municipales et communales en République de Guinée.
* **4. Préfectures & Régions Administratives :**
  La Guinée compte **33 préfectures**.
  - *Basse Guinée (Kindia) :* Kindia, Boké.
  - *Moyenne Guinée (Labé) :* Labé, Mamou.
  - *Haute Guinée (Kankan) :* Kankan, Faranah.
  - *Guinée Forestière (Nzérékoré) :* Nzérékoré, Macenta.`
  },
  {
    id: "cee-2000-calcul",
    title: "Sujet Officiel CEE 7ème 2000 - Calcul Écrit",
    description: "Épreuve officielle de Calcul Écrit CEE 2000. Opérations décimales, unités de temps et problème de surface d'un champ.",
    doc_type: "EXERCICE",
    category: "REAL",
    subject: { id: 1, name: "Mathématiques", icon: "Calculator" },
    level: "7ème Année (CEE)",
    is_free: true,
    year: "2000",
    country: "Guinée",
    institution: "MEPUA / SNESCO - Guinée",
    content: `# ÉPREUVE DE CALCUL ÉCRIT — CEE 2000 (GUINÉE)
**Session Officielle 2000 | MEPU-A / SNESCO**
*Coefficient : 2 | Durée : 1 Heure 30 minutes*

---

### I- OPÉRATIONS (4 points)
1. $406,752 + 2008 + 34,08 + 119,2 = ?$
2. $43,752 \div 0,82 = ?$
3. $88,6 \times 48,4 = ?$
4. $3\text{h } 15\text{min} - 2\text{h } 45\text{min} = ?$

---

### II- PROBLÈME (6 points)
1. Un champ rectangulaire mesure $840\text{ m}$ de longueur et $300\text{ m}$ de largeur.
2. On l’a ensemencé avec du riz qui coûte $325\text{ FG}$ le kilo et la dépense totale en semence a été de $84\ 420\text{ FG}$. Quel poids de riz a-t-on acheté ?
3. Calculez la surface du champ en hectares, puis trouvez le poids de riz semé à l'hectare.

---

#### ✦ CORRIGÉ PAS À PAS DE PROF. KARAMO
* **Opérations :**
  1. $406,752 + 2008 + 34,08 + 119,2 = 2568,032$.
  2. $43,752 \div 0,82 = 53,356$.
  3. $88,6 \times 48,4 = 4288,24$.
  4. $3\text{h } 15\text{min} - 2\text{h } 45\text{min} = 2\text{h } 75\text{min} - 2\text{h } 45\text{min} = 30\text{ minutes}$.

* **Problème :**
  1. **Poids total de riz acheté :**
     $\text{Poids} = \frac{84\ 420}{325} = 259,75\text{ kg}$.
  2. **Surface du champ en hectares :**
     $\text{Surface en m}^2 = 840 \times 300 = 252\ 000\text{ m}^2$.
     Comme $1\text{ ha} = 10\ 000\text{ m}^2$, $\text{Surface} = \frac{252\ 000}{10\ 000} = 25,2\text{ hectares}$.
  3. **Poids de riz semé par hectare :**
     $\text{Densité} = \frac{259,75}{25,2} \approx 10,3\text{ kg/ha}$.`
  }
];

export const FALLBACK_BAC_SUBJECTS: FallbackSubject[] = [
  ...BASE_FALLBACK_SUBJECTS,
  ...(EXAM224_SUBJECTS as FallbackSubject[]).filter((sub: any) => {
    const isBac = sub.level && sub.level.toUpperCase().includes('BAC');
    if (!isBac) return true;
    const content = sub.content || '';
    if (content.includes('erreurs de frappe') || content.includes('version transcrite') || content.includes('&hellip;&hellip;') || content.length < 100) {
      return false;
    }
    return true;
  })
];




