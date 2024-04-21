import {
    AreaNames,
    CARD_BACK,
    CARD_HEIGHT,
    CARD_IMG_ARR,
    CARD_WIDTH,
    DECK,
    EArea,
    ECard,
    PastAllowedCards,
    SatchelAllowedCards,
    ShieldAllowedCards,
    SwordAllowedCards,
    TAROT_NAMES,
    WisdomAllowedCards
} from "@/app/utils";
import {DndContext, DragEndEvent} from "@dnd-kit/core";
import React, {useId, useState} from "react";
import {useMachine} from '@xstate/react';

import './Board.css';
import {machine} from "@/app/components/board/Board.machine";
import {CardDroppable} from "@/app/components/card/CardDroppable";
import {BoardHeader1} from "@/app/components/board/BoardHeader1";
import {BoardHeader2} from "@/app/components/board/BoardHeader2";
import {PastDroppable} from "@/app/components/card/PastDroppable";

export default function Board()
{
    const [current, send] = useMachine(machine);

    const [parent, setParent] = useState(null);
    const id = useId();

    const [future, setFuture] = useState<ECard[]>(DECK.map( c => c));
    const [fool, setFool] = useState<ECard | null>(null);
    const [adventure0, setAdventure0] = useState<ECard[]>([]);
    const [adventure1, setAdventure1] = useState<ECard[]>([]);
    const [adventure2, setAdventure2] = useState<ECard[]>([]);
    const [adventure3, setAdventure3] = useState<ECard[]>([]);
    // const [shield, setShield] = useState<CARD_INDEX | undefined>();

    const [wisdom, setWisdom] = useState<ECard[]>([]);
    const [shield, setShield] = useState<ECard[]>([]);
    const [sword, setSword] = useState<ECard[]>([]);
    const [satchel, setSatchel] = useState<ECard[]>([]);

    const [past, setPast] = useState<ECard[]>([]);

    const [message, setMessage] = useState<string>("");

    const showMessage = (msg:string) :void =>
    {
        setMessage( msg );
    }

    function handleDragEnd( e: DragEndEvent )
    {
        const over = e.over?.id;
        if ( !over )
        {
            showMessage("Over is undefined - do nothing");
            return;
        }

        const active = e.active.data.current?.card ?? -1;
        const parent = e.active.data.current?.parent ?? -1;
        console.log('OVER', `"${AreaNames[Number(over)]} - ${over}"`, 'ACTIVE', `"${TAROT_NAMES[active]} - ${active}"`, 'PARENT', `"${AreaNames[parent]} - ${parent}"`);



        if ( parent === over )
            return;

        switch ( over )
        {
            case EArea.ADVENTURE0:
                setAdventure0([...adventure0, active]);
                break;
            case EArea.ADVENTURE1:
                setAdventure1([...adventure1, active]);
                break;
            case EArea.ADVENTURE2:
                setAdventure2([...adventure2, active]);
                break;
            case EArea.ADVENTURE3:
                setAdventure3([...adventure3, active]);
                break;
            case EArea.WISDOM:
                if ( wisdom.length === 4 )
                {
                    showMessage( "Only 4 wisdom cards allowed")
                    return;
                }
                if ( !WisdomAllowedCards.find(f => f === active ) )
                {
                    showMessage("Only Pentacles allowed here");
                    return;
                }
                setWisdom([...wisdom, active]);
                break;
            case EArea.SHIELD:
                if ( !ShieldAllowedCards.find(f => f === active ) )
                {
                    showMessage("Only Wands allowed here");
                    return;
                }
                setShield([...shield, active]);
                break;
            case EArea.SWORD:
                if ( !SwordAllowedCards.find(f => f === active ) )
                {
                    showMessage("Only Swords allowed here");
                    return;
                }
                setSword([...sword, active]);
                break;
            case EArea.SATCHEL:
                if ( satchel.length === 4 )
                {
                    showMessage( "Only 4 cards allowed in satchel");
                    return;
                }
                if ( !SatchelAllowedCards.find( f => f === active ) )
                    return;
                setSatchel([...satchel, active]);
                break;
            case EArea.PAST:
                if ( !PastAllowedCards.find( f => f === active ) )
                {
                    showMessage(`"${TAROT_NAMES[active]}" is not allowed move to the past - you must fight this adventure`);
                    return;
                }
                showMessage( `${TAROT_NAMES[active]} went to past`);
                setPast([...past, active] );
                break;
        }

        console.log(adventure0);

        switch ( parent)
        {
            case EArea.ADVENTURE0:
                setAdventure0( adventure0.filter( f => f !== active ) );
                break;
            case EArea.ADVENTURE1:
                setAdventure1( adventure1.filter( f => f !== active ));
                break;
            case EArea.ADVENTURE2:
                setAdventure2( adventure2.filter( f => f !== active ));
                break;
            case EArea.ADVENTURE3:
                setAdventure3( adventure3.filter( f => f !== active ));
                break;
            case EArea.WISDOM:
                setWisdom( wisdom.filter( f => f !== active ));
                break;
            case EArea.SHIELD:
                setShield( shield.filter( f => f !== active ));
                break;
            case EArea.SWORD:
                setSword( sword.filter( f => f !== active ));
                break;
            case EArea.SATCHEL:
                setSatchel(satchel.filter( f => f !== active ));
                break;
        }
    }

    function getRandomAdventureCard() : ECard
    {
        const adventureCard = future[Math.floor(Math.random()*future.length)];
        const tmpArr = future.filter( f => f !== adventureCard );
        setFuture(tmpArr);
        return adventureCard;
    }

    enum EState {
        START,
        START_PLACE_FOOL,
        START_PLACE_ADVENTURE0,
        START_PLACE_ADVENTURE1,
        START_PLACE_ADVENTURE2,
        START_PLACE_ADVENTURE3,
    }

    const timeoutState = (state:EState, ms:number) =>
    {
        setTimeout(() => setState(state), ms );
    }

    const [state, setState] = React.useState<EState>(EState.START);
    React.useEffect(() => {
        switch (state)
        {
            case EState.START:
                timeoutState( EState.START_PLACE_FOOL, 50 );
                break;
            case EState.START_PLACE_FOOL:
                const foolCard = future[0];
                const tmpFuture = future.filter( f => f !== foolCard);
                setFuture(tmpFuture);
                setFool(foolCard);
                timeoutState( EState.START_PLACE_ADVENTURE0, 50 );
                break;
            case EState.START_PLACE_ADVENTURE0:
                setAdventure0([getRandomAdventureCard()]);
                timeoutState( EState.START_PLACE_ADVENTURE1, 50 );
                break;
            case EState.START_PLACE_ADVENTURE1:
                setAdventure1([getRandomAdventureCard()]);
                timeoutState( EState.START_PLACE_ADVENTURE2, 50 );
                break;
            case EState.START_PLACE_ADVENTURE2:
                setAdventure2([getRandomAdventureCard()]);
                timeoutState( EState.START_PLACE_ADVENTURE3, 50 );
                break;
            case EState.START_PLACE_ADVENTURE3:
                setAdventure3([getRandomAdventureCard()]);
                // timeoutState( EState.START_PLACE_ADVENTURE3, 500 );
                break;
        }
    }, [state]);

    return (
        <>
            <div>
                Deck size: {future.length}
            </div>

            <DndContext
                id={id}
                onDragEnd={handleDragEnd}>
            <table style={{width:'1800px', height:'100%', margin: 'auto'}} border={1}>
                <tbody>
                <BoardHeader1/>
                <tr>
                    <td style={{width: '300px'}}>
                        <PastDroppable cards={past} />
                    </td>
                    <td>Nothing</td>
                    <CardDroppable area={EArea.ADVENTURE0} cards={adventure0}/>
                    <CardDroppable area={EArea.ADVENTURE1} cards={adventure1}/>
                    <CardDroppable area={EArea.ADVENTURE2} cards={adventure2}/>
                    <CardDroppable area={EArea.ADVENTURE3} cards={adventure3}/>
                    <td>Nothing</td>
                    <td>
                        {future.length}
                        <div className="container">
                            {future.map((v, i) => {
                                return (
                                    <div
                                        key={`spanFuture${i}`}
                                        className="box stack-top"
                                        style={{paddingLeft: `${i}px`, paddingTop: `${i}px`}}
                                    >
                                        <img key={`future${i}`} src={CARD_BACK} style={{width: `${CARD_WIDTH}px`, height: `${CARD_HEIGHT}px`}} alt=""/>
                                    </div>)
                            })}
                        </div>
                    </td>
                </tr>

                <tr><td colSpan={8} style={{height:'80px'}}>{message}</td></tr>

                <tr>
                    <td></td>
                    <td colSpan={6}>
                        <table border={2} style={{width:'100%'}}>
                            <tbody>
                            <BoardHeader2 CARD_WIDTH={CARD_WIDTH} />
                            <tr>
                                <CardDroppable area={EArea.WISDOM} cards={wisdom} />
                                <CardDroppable area={EArea.SHIELD} cards={shield} />
                                <td>
                                    {fool === ECard.FOOL &&
                                        <span style={{margin: 'auto'}}>
                                            <img
                                                key={`fullKey`}
                                                src={CARD_IMG_ARR[ECard.FOOL]}
                                                style={{
                                                    width: `${CARD_WIDTH}px`,
                                                    height: `${CARD_HEIGHT}px`
                                                }}
                                                alt=""
                                            />
                                        </span>
                                    }
                                </td>
                                <CardDroppable area={EArea.SWORD} cards={sword}/>
                                <CardDroppable area={EArea.SATCHEL} cards={satchel}/>
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