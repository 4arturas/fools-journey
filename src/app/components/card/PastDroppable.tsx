import {CARD_BACK, CARD_HEIGHT, CARD_WIDTH, EArea, ECard} from "@/app/utils";
import {useDroppable} from "@dnd-kit/core";
import React from "react";

type Props = {
  cards: ECard[]
};

export const PastDroppable : React.FC<Props> = ({cards}) =>
{
    const { setNodeRef, isOver} = useDroppable({
        id: EArea.PAST
    });

    const style = {
        border: !isOver ? "2px solid blue" : "2px solid red",
        opacity: !isOver ? 1 : 0.5,
        width: `${CARD_WIDTH}px`
    }


    return (
        <div> {cards.length}
            <div className="container" ref={setNodeRef} style={style}>
                {cards.map((v, i) => {
                    return (
                        <div
                            key={`spanPast${i}`}
                            className="box stack-top"
                            style={{paddingLeft: `${i}px`, paddingTop: `${i}px`}}
                        >
                            <img key={`past${i}`}
                                 src={CARD_BACK}
                                 style={{width: `${CARD_WIDTH}px`, height: `${CARD_HEIGHT}px`}} alt=""
                            />
                        </div>)
                })}
            </div>
        </div>
    )
}