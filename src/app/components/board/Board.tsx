import {Card} from "@/app/components/card/Card";
import {DECK, ECard} from "@/app/utils";
import {Droppable} from "@/app/example/Droppable";
import {DndContext} from "@dnd-kit/core";
import {useEffect, useId, useState} from "react";
import {Draggable} from "@/app/example/Draggable";
import {useMachine} from '@xstate/react';

import './Board.css';
import {machine} from "@/app/components/board/Board.machine";
import {Example3} from "@/app/example3/Example3";
import {Todo} from "@/app/example4/Todo";

const CARD_WIDTH = 230;
const CARD_HEIGHT = 350;

export default function Board()
{
    const [current, send] = useMachine(machine);

    const [parent, setParent] = useState(null);
    const id = useId();

    const draggableFool = (
        <Draggable id="draggableFool">
            <Card key='fool' card={ECard.FOOL}/>
        </Draggable>
    )


    // console.log( current );
    const [deck, setDeck] = useState(DECK.map( c => c));
    const [fool, setFool] = useState<ECard | undefined>();
    const [adventure0, setAdventure0] = useState<JSX.Element | undefined>();
    const [adventure1, setAdventure1] = useState<JSX.Element | undefined>();
    const [adventure2, setAdventure2] = useState<JSX.Element | undefined>();
    const [adventure3, setAdventure3] = useState<JSX.Element | undefined>();
    // const [shield, setShield] = useState<ECard | undefined>();
    const adventureDroppableID0 = 'adventureDroppableID0';
    const [adventureDroppable0, setAdventureDroppable0] = useState<string | null>(adventureDroppableID0);

    const adventureDroppableID1 = 'adventureDroppableID1';
    const [adventureDroppable1, setAdventureDroppable1] = useState<string | null>(adventureDroppableID1);

    const adventureDroppableID2 = 'adventureDroppableID2';
    const [adventureDroppable2, setAdventureDroppable2] = useState<string | null>(adventureDroppableID2);

    const adventureDroppableID3 = 'adventureDroppableID3';
    const [adventureDroppable3, setAdventureDroppable3] = useState<string | null>(adventureDroppableID3);

    const wisdomDroppableID = 'wisdomDroppableID';
    const [wisdomDroppable, setWisdomDroppable] = useState<string | null>(null);

   const shieldDroppableID = 'shieldDroppableID';
    const [shieldDroppable, setShieldDroppable] = useState<string | null>(null);

    const swordDroppableID = 'swordDroppableID';
    const [swordDroppable, setSwordDroppable] = useState<string | null>();

    const satchelDroppableID = 'satchelDroppableID';
    const [satchelDroppable, setSatchelDroppable] = useState<string | null>();

    function handleDragEnd( { over } )
    {
        console.log('over', over);
        if ( !over ) return;

        setAdventureDroppable0(null);
        setShieldDroppable(null);
        setSwordDroppable(null);
        setWisdomDroppable(null);

        switch (over.id)
        {
            case adventureDroppableID0:
                setAdventureDroppable0(over.id);
                return;
            case wisdomDroppableID:
                setWisdomDroppable(over.id);
                return;
            case shieldDroppableID:
                setShieldDroppable(over.id);
                return;
            case swordDroppableID:
                setSwordDroppable(over.id);
                return;
            case satchelDroppableID:
                setSatchelDroppable(over.id);
                return;
        }
    }

    function getRandomAdventureCard() : ECard
    {
        const adventureCard = deck[Math.floor(Math.random()*deck.length)];
        console.log(adventureCard);
        const tmpArr = deck.filter( f => f.valueOf() !== adventureCard.valueOf() );
        setDeck(tmpArr);
        return adventureCard;
    }
    function convert_ToDraggable(card:ECard, id:string) : JSX.Element
    {
        const adventureDraggable0 = (
            <Draggable id={id}>
                <Card card={card}/>
            </Draggable>
        );
        return adventureDraggable0;
    }
    useEffect(() => {
        // console.log('current', current.value);

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
                const tmpArr = deck.filter( f => f.valueOf() !== foolCard.valueOf());
                setDeck(tmpArr);
                setFool( foolCard );
                send({type: 'place_adventure'})
            }
            if ( current.matches({ PUT_CARDS_INTO_PLACES: 'ADVENTURE' }) ) {
                const a0 = getRandomAdventureCard();
                setAdventure0(convert_ToDraggable(a0, 'adventureDraggable0'));
                const a1 = getRandomAdventureCard();
                setAdventure1(convert_ToDraggable(a1, 'adventureDraggable1'));
                const a2 = getRandomAdventureCard();
                setAdventure2(convert_ToDraggable(a2, 'adventureDraggable2'));
                const a3 = getRandomAdventureCard();
                setAdventure3(convert_ToDraggable(a3, 'adventureDraggable3'));
            }
        }

    }, [current]);

    return (
        <>
            <div>
                <Todo/>
            </div>
            <div>
                Deck size: {deck.length}
            </div>

            <DndContext
                id={id}
                onDragEnd={handleDragEnd}>
            <table style={{width:'1800px', height:'100%', margin: 'auto'}} border={1}>
                <tbody>
                <tr>
                    <td style={{width: '300px'}}>
                        <div>Past</div>
                    </td>
                    <td colSpan={6}>
                        <div>Adventure</div>
                    </td>
                    <td style={{width: '300px'}}>
                        <div>Future</div>
                    </td>
                </tr>
                <tr>
                    <td style={{width: '300px'}}>
                        <div>Past</div>
                    </td>
                    <td>Nothing</td>
                    <td style={{width: `${CARD_WIDTH}px`}}>
                        <Droppable id={adventureDroppableID0}>
                            {adventureDroppable0 ? adventure0 : 'Drop here A0'}
                        </Droppable>
                    </td>
                    <td style={{width: `${CARD_WIDTH}px`}}>
                        <Droppable id={adventureDroppableID1}>
                            {adventureDroppable1 ? adventure1 : 'Drop here A1'}
                        </Droppable>
                    </td>
                    <td style={{width: `${CARD_WIDTH}px`}}>
                        <Droppable id={adventureDroppableID2}>
                            {adventureDroppable2 ? adventure2 : 'Drop here A2'}
                        </Droppable>
                    </td>
                    <td style={{width: `${CARD_WIDTH}px`}}>
                        <Droppable id={adventureDroppableID3}>
                            {adventureDroppable3 ? adventure3 : 'Drop here A3'}
                        </Droppable>
                    </td>
                    <td>Nothing</td>
                    <td style={{width: '300px'}}>
                        <div className="container">
                            <div className="box" style={{background: "red"}}></div>
                            {/*{Array.from({length: cards}, (v, i) => {*/}
                            {deck.map((v, i) => {
                                return (
                                    <div
                                        key={`span${i}`}
                                        className="box stack-top"
                                        style={{paddingLeft: `${i * 1}px`, paddingTop: `${i * 1}px`}}
                                    >
                                        <Card key={`future${i}`} card={ECard.BACK}/>
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
                            <tr>
                                <td style={{width: `${CARD_WIDTH}px`}}>
                                    Wisdom
                                </td>
                                <td style={{width: `${CARD_WIDTH}px`}}>
                                    Shield
                                </td>
                                <td style={{width: `${CARD_WIDTH-15}px`}}>
                                    Hero
                                </td>
                                <td style={{width: `${CARD_WIDTH}px`}}>
                                    Sword
                                </td>
                                <td style={{width: `${CARD_WIDTH}px`}}>
                                    Satchel
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <Droppable id={wisdomDroppableID}>
                                        {wisdomDroppable === wisdomDroppableID ? adventure0 : "Drop pentacles here"}
                                    </Droppable>
                                </td>
                                <td>
                                    <Droppable id={shieldDroppableID}>
                                        {shieldDroppable === shieldDroppableID ? adventure0 : "Drop wands here"}
                                    </Droppable>
                                </td>
                                <td>
                                    {fool && <span style={{margin:'auto'}}><Card card={fool}/></span>}
                                </td>
                                <td>
                                    <Droppable id={swordDroppableID}>
                                        {swordDroppable === swordDroppableID ? adventure0 : "Drop swords here"}
                                    </Droppable>
                                </td>
                                <td>
                                    <Droppable id={satchelDroppableID}>
                                        {satchelDroppable === satchelDroppableID ? adventure0 : "Drop satchel here"}
                                    </Droppable>
                                </td>
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