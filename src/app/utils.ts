import {SMITH_WAITE_IMG, TAROT_DECKS} from "@/app/tarotImages";
import {TAROT_NAMES_1} from "@/app/tarotNames";

export const CARD_WIDTH = 230;
export const CARD_HEIGHT = 350;


export const CARD_BACK = `img/back2.jpg`; // https://clipart-library.com/free/playing-card-back-png.html

export const enum ECard {
    FOOL,
    MAGICIAN,
    HIGHPRIESTESS,
    EMPRESS,
    EMPEROR,
    HIGHPRIEST,
    LOVERS,
    CHARIOT,
    JUSTICE,
    HERMIT,
    FORTUNE,
    STRENGTH,
    HANGMAN,
    DEATH,
    TEMPERANCE,
    DEVIL,
    TOWER,
    STAR,
    MOON,
    SUN,
    JUDGEMENT,
    WORLD,

    WANDS01,
    WANDS02,
    WANDS03,
    WANDS04,
    WANDS05,
    WANDS06,
    WANDS07,
    WANDS08,
    WANDS09,
    WANDS10,
    WANDS11,
    WANDS12,
    WANDS13,
    WANDS14,

    CUPS01,
    CUPS02,
    CUPS03,
    CUPS04,
    CUPS05,
    CUPS06,
    CUPS07,
    CUPS08,
    CUPS09,
    CUPS10,
    CUPS11,
    CUPS12,
    CUPS13,
    CUPS14,

    SWORDS01,
    SWORDS02,
    SWORDS03,
    SWORDS04,
    SWORDS05,
    SWORDS06,
    SWORDS07,
    SWORDS08,
    SWORDS09,
    SWORDS10,
    SWORDS11,
    SWORDS12,
    SWORDS13,
    SWORDS14,

    PENTACLES01,
    PENTACLES02,
    PENTACLES03,
    PENTACLES04,
    PENTACLES05,
    PENTACLES06,
    PENTACLES07,
    PENTACLES08,
    PENTACLES09,
    PENTACLES10,
    PENTACLES11,
    PENTACLES12,
    PENTACLES13,
    PENTACLES14

}

export const Challenges = [
    ECard.FOOL,
    ECard.MAGICIAN,
    ECard.HIGHPRIESTESS,
    ECard.EMPRESS,
    ECard.EMPEROR,
    ECard.HIGHPRIEST,
    ECard.LOVERS,
    ECard.CHARIOT,
    ECard.JUSTICE,
    ECard.HERMIT,
    ECard.FORTUNE,
    ECard.STRENGTH,
    ECard.HANGMAN,
    ECard.DEATH,
    ECard.TEMPERANCE,
    ECard.DEVIL,
    ECard.TOWER,
    ECard.STAR,
    ECard.MOON,
    ECard.SUN,
    ECard.JUDGEMENT,
    ECard.WORLD,
]

export const CourtHelpersCards : ECard[] = [
    ECard.CUPS11,
    ECard.CUPS12,
    ECard.CUPS13,
    ECard.CUPS14,
    ECard.PENTACLES11,
    ECard.PENTACLES12,
    ECard.PENTACLES13,
    ECard.PENTACLES14,
    ECard.WANDS11,
    ECard.WANDS12,
    ECard.WANDS13,
    ECard.WANDS14,
    ECard.SWORDS11,
    ECard.SWORDS12,
    ECard.SWORDS13,
    ECard.SWORDS14
];

export const WisdomAllowedCards = [
    ECard.PENTACLES01,
    ECard.PENTACLES02,
    ECard.PENTACLES03,
    ECard.PENTACLES04,
    ECard.PENTACLES05,
    ECard.PENTACLES06,
    ECard.PENTACLES07,
    ECard.PENTACLES08,
    ECard.PENTACLES09,
    ECard.PENTACLES10,
    ECard.PENTACLES11,
    ECard.PENTACLES12,
    ECard.PENTACLES13,
    ECard.PENTACLES14,
];

export const ShieldAllowedCards = [
    ECard.WANDS01,
    ECard.WANDS02,
    ECard.WANDS03,
    ECard.WANDS04,
    ECard.WANDS05,
    ECard.WANDS06,
    ECard.WANDS07,
    ECard.WANDS08,
    ECard.WANDS09,
    ECard.WANDS10,
    ECard.WANDS11,
    ECard.WANDS12,
    ECard.WANDS13,
    ECard.WANDS14,
];

export const SwordAllowedCards = [
    ECard.SWORDS01,
    ECard.SWORDS02,
    ECard.SWORDS03,
    ECard.SWORDS04,
    ECard.SWORDS05,
    ECard.SWORDS06,
    ECard.SWORDS07,
    ECard.SWORDS08,
    ECard.SWORDS09,
    ECard.SWORDS10,
    ECard.SWORDS11,
    ECard.SWORDS12,
    ECard.SWORDS13,
    ECard.SWORDS14
];

export const VitalityBackCards : ECard[] = [
    ECard.CUPS01,
    ECard.CUPS02,
    ECard.CUPS03,
    ECard.CUPS04,
    ECard.CUPS05,
    ECard.CUPS06,
    ECard.CUPS07,
    ECard.CUPS08,
    ECard.CUPS09,
    ECard.CUPS10,
];
export const SatchelAllowedCards = [
];
export const PastAllowedCards = [
    ...WisdomAllowedCards,
    ...ShieldAllowedCards,
    ...SwordAllowedCards,
    ECard.CUPS01,
    ECard.CUPS02,
    ECard.CUPS03,
    ECard.CUPS04,
    ECard.CUPS05,
    ECard.CUPS06,
    ECard.CUPS07,
    ECard.CUPS08,
    ECard.CUPS09,
    ECard.CUPS10,
    ECard.CUPS11,
    ECard.CUPS12,
    ECard.CUPS13,
    ECard.CUPS14
];





export const DECK = [
    ECard.FOOL,
    ECard.MAGICIAN,
    ECard.HIGHPRIESTESS,
    ECard.EMPRESS,
    ECard.EMPEROR,
    ECard.HIGHPRIEST,
    ECard.LOVERS,
    ECard.CHARIOT,
    ECard.JUSTICE,
    ECard.HERMIT,
    ECard.FORTUNE,
    ECard.STRENGTH,
    ECard.HANGMAN,
    ECard.DEATH,
    ECard.TEMPERANCE,
    ECard.DEVIL,
    ECard.TOWER,
    ECard.STAR,
    ECard.MOON,
    ECard.SUN,
    ECard.JUDGEMENT,
    ECard.WORLD,
    ECard.CUPS01,
    ECard.CUPS02,
    ECard.CUPS03,
    ECard.CUPS04,
    ECard.CUPS05,
    ECard.CUPS06,
    ECard.CUPS07,
    ECard.CUPS08,
    ECard.CUPS09,
    ECard.CUPS10,
    ECard.CUPS11,
    ECard.CUPS12,
    ECard.CUPS13,
    ECard.CUPS14,
    ECard.PENTACLES01,
    ECard.PENTACLES02,
    ECard.PENTACLES03,
    ECard.PENTACLES04,
    ECard.PENTACLES05,
    ECard.PENTACLES06,
    ECard.PENTACLES07,
    ECard.PENTACLES08,
    ECard.PENTACLES09,
    ECard.PENTACLES10,
    ECard.PENTACLES11,
    ECard.PENTACLES12,
    ECard.PENTACLES13,
    ECard.PENTACLES14,
    ECard.WANDS01,
    ECard.WANDS02,
    ECard.WANDS03,
    ECard.WANDS04,
    ECard.WANDS05,
    ECard.WANDS06,
    ECard.WANDS07,
    ECard.WANDS08,
    ECard.WANDS09,
    ECard.WANDS10,
    ECard.WANDS11,
    ECard.WANDS12,
    ECard.WANDS13,
    ECard.WANDS14,
    ECard.SWORDS01,
    ECard.SWORDS02,
    ECard.SWORDS03,
    ECard.SWORDS04,
    ECard.SWORDS05,
    ECard.SWORDS06,
    ECard.SWORDS07,
    ECard.SWORDS08,
    ECard.SWORDS09,
    ECard.SWORDS10,
    ECard.SWORDS11,
    ECard.SWORDS12,
    ECard.SWORDS13,
    ECard.SWORDS14
];

export type TTarot = {
    [key: number]: string;
};

export let TAROT_IMAGES : TTarot = {};
TAROT_IMAGES = SMITH_WAITE_IMG.reduce(function(map:TTarot, obj, acc) {
    map[acc] = obj;
    return map;
}, {});

const _8_BIT_TAROT_DECK = 0
const APPRENTICE_TAROT_DECK = 3
const ART_NOUVEAU_TAROT_DECK = 6
TAROT_IMAGES = SMITH_WAITE_IMG.reduce(function(map:TTarot, obj, acc) {
    map[acc] = TAROT_DECKS[APPRENTICE_TAROT_DECK][0].replace('0.jpg', `${acc}.jpg`);
    return map;
}, {});


export let TAROT_NAMES : TTarot = {};

TAROT_NAMES = TAROT_NAMES_1.reduce(function(map:TTarot, obj, acc) {
    map[acc] = obj ;
    return map;
}, {});

export enum EArea {
    ADVENTURE0,
    ADVENTURE1,
    ADVENTURE2,
    ADVENTURE3,
    WISDOM,
    SHIELD,
    SWORD,
    SATCHEL,
    PAST
}

export const AreaNames = [
    "Adventure0",
    "Adventure1",
    "Adventure2",
    "Adventure3",
    "Wisdom",
    "Shield",
    "Sword",
    "Satchel",
    "Past"
]

export type TTarotCost = {
    [key: number]: number;
};
export const TAROT_COST : TTarotCost = {};

for ( let i = 0; i <= 21; i++ )
    TAROT_COST[i] = i;
let TAROT_CTX = 0;
for ( let i = 22; i <= 35; i++ )
    TAROT_COST[i] = ++TAROT_CTX;
TAROT_CTX = 0;
for ( let i = 36; i <= 49; i++ )
    TAROT_COST[i] = ++TAROT_CTX;
TAROT_CTX = 0;
for ( let i = 50; i <= 63; i++ )
    TAROT_COST[i] = ++TAROT_CTX;
TAROT_CTX = 0;
for ( let i = 64; i <= 77; i++ )
    TAROT_COST[i] = ++TAROT_CTX;