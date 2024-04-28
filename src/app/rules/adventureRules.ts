import {ECard} from "@/app/ECard";
import {Challenges} from "@/app/utils";

export const swordCards = [
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
export const adventureRules = ( cards: ECard[], card: ECard ) : string | null =>
{
    if ( cards.length === 0 )
    {
        return null;
    }

    if (
        cards.length === 1 &&
        Challenges.find(f => f === cards[0] ) &&
        !swordCards.find(f => f === card )
    )
    {
        return "Only 'Sword' card can be added on 'Adventure' card";
    }

    return null;
}