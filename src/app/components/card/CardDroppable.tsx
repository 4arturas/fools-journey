import {AreaNames, CARD_HEIGHT, CARD_WIDTH, TAROT_COST} from "@/app/utils";
import {useDroppable} from "@dnd-kit/core";
import {CardDraggable} from "@/app/components/card/CardDraggable";
import {EArea} from "@/app/EArea";
import {ECard} from "@/app/ECard";

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
        // border: !isOver ? "2px solid green" : "2px solid red",
        // opacity: !isOver ? 1 : 0.5,
        // zIndex: isOver ? 1000 : 0,
        // backgroundColor: isOver ? 'lightgray' : 'whitesmoke',
        width: `${CARD_WIDTH}px`,
        height: `${CARD_HEIGHT}px`
    };

    const paddingLeft = (idx:number): string =>
    {
        if ( idx == 0 ) return "0px";
        return `${idx*10}px`
    }

    const paddingTop = (idx:number) : string =>
    {
        if ( idx == 0 ) return "0px";
        return `${idx*20}px`
    }

    return (
        <>
            {/*{cards.length === 0 && AreaNames[area]}*/}

            <div
                ref={setNodeRef}
                className={`container ${!isOver ? "background-pattern" : "background-pattern-over"}`}
                style={style}
            >
            {cards.length > 0 &&
                cards.map( (card, idx) => {
                    return (
                        <span
                        key={`cardDroppableContainer${idx}`}
                            className="box stack-top"
                            style={{paddingLeft: paddingLeft(idx), paddingTop: paddingTop(idx)}}
                        >
                            <CardDraggable key={idx} card={card} parent={area}/>
                        </span>
                    )
                })
            }
            </div>
        </>
    )
}