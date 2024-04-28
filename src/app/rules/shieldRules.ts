import {ECard} from "@/app/ECard";

const shieldAllowedCards = [
    ECard.WANDS02,
    ECard.WANDS03,
    ECard.WANDS04,
    ECard.WANDS05,
    ECard.WANDS06,
    ECard.WANDS07,
    ECard.WANDS08,
    ECard.WANDS09,
    ECard.WANDS10,
];

export const wisdomAllowedCards = [
    ECard.PENTACLES02,
    ECard.PENTACLES03,
    ECard.PENTACLES04,
    ECard.PENTACLES05,
    ECard.PENTACLES06,
    ECard.PENTACLES07,
    ECard.PENTACLES08,
    ECard.PENTACLES09,
    ECard.PENTACLES10,
];

export const cupCards : ECard[] = [
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
];
export const shieldRules = ( cards: ECard[], card: ECard ) : string | null =>
{
    if ( cards.length === 0 && !shieldAllowedCards.find(f => f === card ) )
        return "Only Wands 2 to 10 allowed here";

    if ( cards.length === 1 && !wisdomAllowedCards.find(f => f === card ) )
        return "When you have 'Shield' card here you can add one 'Wisdom' card followed by 'Cup' card to double Shield's strength";

    if ( cards.length === 2 &&  !cupCards.find(f => f === card ) )
        return "When you have 'Shield' followed by 'Wisdom' card the 'Cup' card is allowed to double Shield's strength";

    if ( cards.length > 2 )
        return "The 'Shield' area is full";

    return null;
}