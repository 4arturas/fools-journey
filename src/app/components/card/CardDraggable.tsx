import {CARD_IMG_ARR, CARD_HEIGHT, CARD_INDEX, CARD_WIDTH, EArea} from "@/app/utils";
import {useDraggable} from "@dnd-kit/core";
import {CSS} from "@dnd-kit/utilities";
import React from "react";

type Props = {
    card: CARD_INDEX,
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
                title={'Card'}
                style={{width: `${CARD_WIDTH}px`, height: `${CARD_HEIGHT}px`}}
                alt=""
            />
        </div>
    );
}