import {
    CARD_IMG_ARR,
    CARD_BACK,
    CARD_HEIGHT,
    CARD_INDEX,
    CARD_WIDTH,
    DECK,
    EArea,
    AreaNames,
    TAROT_NAMES
} from "@/app/utils";
import {DndContext, DragEndEvent} from "@dnd-kit/core";
import React, {useId, useState} from "react";
import {useMachine} from '@xstate/react';

import './Board.css';
import {machine} from "@/app/components/board/Board.machine";
import {CardDroppable} from "@/app/components/card/CardDroppable";
import {BoardHeader1} from "@/app/components/board/BoardHeader1";
import {BoardHeader2} from "@/app/components/board/BoardHeader2";

export default function Board()
{
    const [current, send] = useMachine(machine);

    const [parent, setParent] = useState(null);
    const id = useId();

    const [deck, setDeck] = useState(DECK.map( c => c));
    const [fool, setFool] = useState<CARD_INDEX | undefined>();
    const [adventure0, setAdventure0] = useState<null | CARD_INDEX>(null);
    const [adventure1, setAdventure1] = useState<null | CARD_INDEX>(null);
    const [adventure2, setAdventure2] = useState<null | CARD_INDEX>(null);
    const [adventure3, setAdventure3] = useState<null | CARD_INDEX>(null);
    // const [shield, setShield] = useState<CARD_INDEX | undefined>();

    const [wisdom, setWisdom] = useState<null | CARD_INDEX>(null);
    const [shield, setShield] = useState<null | CARD_INDEX>(null);
    const [sword, setSword] = useState<null | CARD_INDEX>(null);
    const [satchel, setSatchel] = useState<null | CARD_INDEX>(null);

    function handleDragEnd( e: DragEndEvent )
    {
        const over = e.over?.id ?? -1;
        const active = e.active.data.current?.card ?? -1;
        const parent = e.active.data.current?.parent ?? -1;
        console.log('OVER', `"${AreaNames[Number(over)]} - ${over}"`, 'ACTIVE', `"${TAROT_NAMES[active]} - ${active}"`, 'PARENT', `"${AreaNames[parent]} - ${parent}"`);

        switch ( over )
        {
            case EArea.ADVENTURE0:
                setAdventure0(active);
                break;
            case EArea.ADVENTURE1:
                setAdventure1(active);
                break;
            case EArea.ADVENTURE2:
                setAdventure2(active);
                break;
            case EArea.ADVENTURE3:
                setAdventure3(active);
                break;
            case EArea.WISDOM:
                setWisdom(active);
                break;
            case EArea.SHIELD:
                setShield(active);
                break;
            case EArea.SWORD:
                setSword(active);
                break;
            case EArea.SATCHEL:
                setSatchel(active);
                break;
        }

        switch ( parent)
        {
            case EArea.ADVENTURE0:
                setAdventure0(null);
                break;
            case EArea.ADVENTURE1:
                setAdventure1(null);
                break;
            case EArea.ADVENTURE2:
                setAdventure2(null);
                break;
            case EArea.ADVENTURE3:
                setAdventure3(null);
                break;
            case EArea.WISDOM:
                setWisdom(null);
                break;
            case EArea.SHIELD:
                setShield(null);
                break;
            case EArea.SWORD:
                setSword(null);
                break;
            case EArea.SATCHEL:
                setSatchel(null);
                break;
        }
    }

    function getRandomAdventureCard() : CARD_INDEX
    {
        const adventureCard = deck[Math.floor(Math.random()*deck.length)];
        const tmpArr = deck.filter( f => f.valueOf() !== adventureCard.valueOf() );
        setDeck(tmpArr);
        return adventureCard;
    }

    React.useEffect(() => {

        if ( current.matches('START') )
        {
            console.log( 'START' );
            send( {type:'put_cards_into_start_position'});
        }

        if ( current.matches({ PUT_CARDS_INTO_PLACES: 'STACK_FUTURE' }) ) {
            send({type:'place_fool'})
        }

        if ( current.matches('PUT_CARDS_INTO_PLACES') ) {
            if ( current.matches({ PUT_CARDS_INTO_PLACES: 'FOOL' }) ) {
                const foolCard = deck[0];
                console.log( foolCard );
                const tmpArr = deck.filter( f => f.valueOf() !== foolCard.valueOf());
                setDeck(tmpArr);
                setFool( foolCard );
                send({type: 'place_adventure'})
            }
            if ( current.matches({ PUT_CARDS_INTO_PLACES: 'ADVENTURE' }) ) {
                setAdventure0(getRandomAdventureCard());
                setAdventure1(getRandomAdventureCard());
                setAdventure2(getRandomAdventureCard());
                setAdventure3(getRandomAdventureCard());
            }
        }

    }, [current]);

    return (
        <>
            <div>
                Deck size: {deck.length}
            </div>

            <DndContext
                id={id}
                onDragEnd={handleDragEnd}>
            <table style={{width:'1800px', height:'100%', margin: 'auto'}} border={1}>
                <tbody>
                <BoardHeader1/>
                <tr>
                    <td style={{width: '300px'}}>
                        <div>Past</div>
                    </td>
                    <td>Nothing</td>
                    <CardDroppable area={EArea.ADVENTURE0} card={adventure0} />
                    <CardDroppable area={EArea.ADVENTURE1} card={adventure1} />
                    <CardDroppable area={EArea.ADVENTURE2} card={adventure2} />
                    <CardDroppable area={EArea.ADVENTURE3} card={adventure3} />
                    <td>Nothing</td>
                    <td>
                        <div className="container">
                            {deck.map((v, i) => {
                                return (
                                    <div
                                        key={`span${i}`}
                                        className="box stack-top"
                                        style={{paddingLeft: `${i}px`, paddingTop: `${i}px`}}
                                    >
                                        <img key={`future${i}`} src={CARD_BACK} style={{width: `${CARD_WIDTH}px`, height: `${CARD_HEIGHT}px`}} alt=""/>
                                    </div>)
                            })}
                        </div>
                    </td>
                </tr>

                <tr><td colSpan={8} style={{height:'80px'}}></td></tr>

                <tr>
                    <td></td>
                    <td colSpan={6}>
                        <table border={2} style={{width:'100%'}}>
                            <tbody>
                            <BoardHeader2 CARD_WIDTH={CARD_WIDTH} />
                            <tr>
                                <CardDroppable area={EArea.WISDOM} card={wisdom} />
                                <CardDroppable area={EArea.SHIELD} card={shield} />
                                <td>
                                    {!fool &&
                                        <span style={{margin: 'auto'}}>
                                            <img
                                                key={`fullKey`}
                                                src={CARD_IMG_ARR[CARD_INDEX.FOOL]}
                                                style={{
                                                    width: `${CARD_WIDTH}px`,
                                                    height: `${CARD_HEIGHT}px`
                                                }}
                                                alt=""
                                            />
                                        </span>
                                    }
                                </td>
                                <CardDroppable area={EArea.SWORD} card={sword}/>
                                <CardDroppable area={EArea.SATCHEL} card={satchel}/>
                            </tr>
                            </tbody>
                        </table>
                    </td>
                    <td></td>
                </tr>


                </tbody>
            </table>
            </DndContext>
        </>
    );
}