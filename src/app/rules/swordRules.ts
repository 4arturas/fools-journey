import {ECard} from "@/app/ECard";

const swordCards = [
    ECard.SWORDS02,
    ECard.SWORDS03,
    ECard.SWORDS04,
    ECard.SWORDS05,
    ECard.SWORDS06,
    ECard.SWORDS07,
    ECard.SWORDS08,
    ECard.SWORDS09,
    ECard.SWORDS10,
];
export const swordRules = ( cards: ECard[], card: ECard ) : string | null =>
{
    if ( cards.length === 0 && !swordCards.find(f => f === card ) )
        return "Only Swords 2 to 10 allowed here";

    if ( cards.length === 1 )
        return "Only one Sword card is allowed here";

    return null;
}