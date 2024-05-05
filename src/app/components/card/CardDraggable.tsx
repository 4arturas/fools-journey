import {
    CARD_HEIGHT,
    CARD_WIDTH,
    TAROT_COST, TAROT_NAMES, TAROT_IMAGES
} from "@/app/utils";
import {useDraggable} from "@dnd-kit/core";
import {CSS} from "@dnd-kit/utilities";
import React from "react";
import {TAROT_SHORT_DESC} from "@/app/tarotNames";
import {ECard} from "@/app/ECard";
import {EArea} from "@/app/EArea";

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
        border: "1px solid black",
        opacity: 1,
        width: `${CARD_WIDTH}px`,
        height: `${CARD_HEIGHT}px`,
        textShadow: "2px 2px"
    }

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
        >
            <img
                src={TAROT_IMAGES[card]}
                title={`${TAROT_NAMES[card]} - ${TAROT_SHORT_DESC[card]}`}
                style={{width: `${CARD_WIDTH}px`, height: `${CARD_HEIGHT}px`}}
                className="card-shadow"
                alt=""
            />
        </div>
    );
}