import {CARD_IMG_ARR, CARD_HEIGHT, ECard, CARD_WIDTH, EArea, TAROT_NAMES, TAROT_SHORT_DESC} from "@/app/utils";
import {useDraggable} from "@dnd-kit/core";
import {CSS} from "@dnd-kit/utilities";
import React from "react";

type Props = {
    card: ECard,
    parent: EArea
}

export const CardDraggable : React.FC<Props> = ( { card, parent } ) =>
{
    const { setNodeRef, attributes, listeners, transform} = useDraggable({
        id: card,
        data: {
            card: card,
            parent: parent
        }
    });

    const style = {
        transform: CSS.Transform.toString( transform ),
        border: "1px solid red",
        // width: `${CARD_WIDTH}px`,
        // height: `${CARD_HEIGHT}px`
    }

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
        >
            <img
                src={CARD_IMG_ARR[card]}
                title={`${TAROT_NAMES[card]} - ${TAROT_SHORT_DESC[card]}`}
                style={{width: `${CARD_WIDTH}px`, height: `${CARD_HEIGHT}px`}}
                alt=""
            />
        </div>
    );
}