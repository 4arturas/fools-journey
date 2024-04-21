import {AreaNames, CARD_HEIGHT, ECard, CARD_WIDTH, EArea} from "@/app/utils";
import {useDroppable} from "@dnd-kit/core";
import {CardDraggable} from "@/app/components/card/CardDraggable";

type Props = {
    area: EArea,
    cards: ECard[]
}

export const CardDroppable : React.FC<Props> = ({area, cards}) => {
    const { setNodeRef, isOver } = useDroppable({
        id: area
    });

    /*const style = {
        border: "2px solid green",
        width: "100%",
        height: "100%",
    }*/

    const style = {
        border: !isOver ? "2px solid green" : "2px solid red",
        opacity: !isOver ? 1 : 0.5,
        width: `${CARD_WIDTH}px`
    };

    return (
        <td
            ref={setNodeRef}
            style={style}
            >
            {!cards && AreaNames[area]}
            {cards &&
                cards.map( (card, idx) => {
                    return <CardDraggable key={idx} card={card} parent={area}/>
                })
            }
        </td>
    )
}