import {ECard} from "@/app/ECard";
import {
    ShieldAllowedCards,
    SwordAllowedCards,
    VitalityBackCards,
    WisdomAllowedCards
} from "@/app/utils";

 const satchelCards = [
    ...ShieldAllowedCards,
    ...SwordAllowedCards,
    ...VitalityBackCards,

    ECard.PENTACLES01,
    ECard.PENTACLES11,
    ECard.PENTACLES12,
    ECard.PENTACLES13,
    ECard.PENTACLES14,

    ECard.SWORDS01,
    ECard.SWORDS11,
    ECard.SWORDS12,
    ECard.SWORDS13,
    ECard.SWORDS14,

    ECard.WANDS01,
    ECard.WANDS11,
    ECard.WANDS12,
    ECard.WANDS13,
    ECard.WANDS14,

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
    ...WisdomAllowedCards
];
export const satchelRules = ( cards: ECard[], card: ECard ) : string | null =>
{
    if ( cards.length === 3 )
    {
        return "Only 3 cards allowed in satchel";
    }

    if ( !satchelCards.find( f => f === card ) )
        return "This card is not in the list of the allowed cards for the 'Satchel'";

    return null;
}