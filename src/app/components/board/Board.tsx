import {
    AreaNames, calculateAdventureCost,
    CARD_BACK,
    CARD_HEIGHT,
    CARD_WIDTH,
    DECK,
    PastAllowedCards, TAROT_COST,
    TAROT_IMAGES,
    TAROT_NAMES,
    WisdomAllowedCards
} from "@/app/utils";
import {ECard} from "@/app/ECard";
import {DndContext, DragEndEvent, DragStartEvent} from "@dnd-kit/core";
import React, {useId, useState} from "react";
import {useMachine} from '@xstate/react';

import './Board.css';
import {machine} from "@/app/components/board/Board.machine";
import {CardDroppable} from "@/app/components/card/CardDroppable";
import {BoardHeader1} from "@/app/components/board/BoardHeader1";
import {BoardHeader2} from "@/app/components/board/BoardHeader2";
import {PastDroppable} from "@/app/components/card/PastDroppable";
import {EArea} from "@/app/EArea";
import {shieldRules} from "@/app/rules/shieldRules";
import {adventureRules} from "@/app/rules/adventureRules";
import {swordRules} from "@/app/rules/swordRules";
import {satchelRules} from "@/app/rules/satchelRules";
import {Counter} from "@/app/components/counter/Counter";

export default function Board()
{
    const [current, send] = useMachine(machine);

    const id = useId();

    const [future, setFuture] = useState<ECard[]>(DECK.map(c => c));
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
        if ( over === undefined )
        {
            showMessage("Over is undefined - do nothing");
            return;
        }

        const active = e.active.data.current?.card ?? -1;
        const parent = e.active.data.current?.parent ?? -1;
        // console.log('OVER', `"${AreaNames[Number(over)]} - ${over}"`, 'ACTIVE', `"${TAROT_NAMES[active]} - ${active}"`, 'PARENT', `"${AreaNames[parent]} - ${parent}"`);



        if ( parent === over )
            return;

        let message: string | null = null;
        switch ( over )
        {
            case EArea.ADVENTURE0:
                message = adventureRules( adventure0, active );
                if ( message )
                {
                    showMessage( message )
                    return;
                }
                setAdventure0([...adventure0, active]);
                break;
            case EArea.ADVENTURE1:
                message = adventureRules( adventure1, active );
                if ( message )
                {
                    showMessage( message )
                    return;
                }
                setAdventure1([...adventure1, active]);
                break;
            case EArea.ADVENTURE2:
                message = adventureRules( adventure2, active );
                if ( message )
                {
                    showMessage( message )
                    return;
                }
                setAdventure2([...adventure2, active]);
                break;
            case EArea.ADVENTURE3:
                message = adventureRules( adventure3, active );
                if ( message )
                {
                    showMessage( message )
                    return;
                }
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
                message = shieldRules( shield, active );
                if ( message )
                {
                    showMessage( message );
                    return;
                }
                setShield([...shield, active]);
                break;
            case EArea.SWORD:
                message = swordRules( sword, active );
                if ( message )
                {
                    showMessage(message);
                    return;
                }
                setSword([...sword, active]);
                break;
            case EArea.SATCHEL:
                message = satchelRules( satchel, active );
                if ( message )
                {
                    showMessage(message);
                    return;
                }
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

        switch ( parent)
        {
            case EArea.ADVENTURE0:
                setAdventure0( adventure0.filter( f => f !== active ) );
                break;
            case EArea.ADVENTURE1:
                console.log(adventure1.filter( f => f !== active ))
                setAdventure1( adventure1.filter( f => f !== active ) );
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

    function pullCardFromTheDeck(card:ECard) : ECard
    {
        const tmpArr = future.filter( f => f !== card );
        setFuture(tmpArr);
        return card;
    }

    function getRandomAdventureCard() : ECard
    {
        const adventureCard = future[Math.floor(Math.random()*future.length)];
        return pullCardFromTheDeck(adventureCard);
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

    const syntheticAdventure: ECard[] = [ECard.MAGICIAN, ECard.SWORDS02, ECard.PENTACLES01, ECard.CUPS01];

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
                if ( adventure0.length === 0 )
                {
                    if ( syntheticAdventure.length > 0 && syntheticAdventure[0] )
                        setAdventure0([syntheticAdventure[0]]);
                    else
                        setAdventure0([getRandomAdventureCard()]);
                }
                timeoutState( EState.START_PLACE_ADVENTURE1, 50 );
                break;
            case EState.START_PLACE_ADVENTURE1:
                if ( adventure1.length === 0 )
                {
                    if (syntheticAdventure.length > 0 && syntheticAdventure[1])
                        setAdventure1([syntheticAdventure[1]]);
                    else
                        setAdventure1([getRandomAdventureCard()]);
                }
                timeoutState( EState.START_PLACE_ADVENTURE2, 50 );
                break;
            case EState.START_PLACE_ADVENTURE2:
                if ( adventure2.length === 0 )
                {
                    if ( syntheticAdventure.length > 0 && syntheticAdventure[2] )
                        setAdventure2([syntheticAdventure[2]]);
                    else
                        setAdventure2([getRandomAdventureCard()]);
                }
                timeoutState( EState.START_PLACE_ADVENTURE3, 50 );
                break;
            case EState.START_PLACE_ADVENTURE3:
                if ( adventure3.length === 0 )
                {
                    if (syntheticAdventure.length > 0 && syntheticAdventure[3])
                        setAdventure3([syntheticAdventure[3]]);
                    else
                        setAdventure3([getRandomAdventureCard()]);
                }
                // timeoutState( EState.START_PLACE_ADVENTURE3, 500 );
                break;
        }
    }, [state]);

    const showAdventureCost = (cards:ECard[]) =>
    {
        if ( cards.length === 0 ) return <></>;
        if ( cards.length === 1 ) return <div>{TAROT_COST[cards[0]]}</div>;
        let resultStr = '';
        let i;
        for ( i = 0; i < cards.length-1; i++ )
        {
            resultStr += `${TAROT_COST[cards[i]]} - `;
        }

        const sum = calculateAdventureCost(cards);
        const button = sum <= 0 ?
            <button
                style={{float: 'right'}}
                onClick={() => {
                    setPast([...past, ...cards]);
                    setAdventure0( adventure0.filter( f => !cards.includes(f) ) );
                }}
            >
                Move to the Past
            </button>
            :
            <></>;
        return <div>{`${resultStr} ${TAROT_COST[cards[i]]} = ${sum}`}{button}</div>;
    }

    const adventureLength = (cards:ECard[]) => {
        // return <div>Adventure length: {cards.length}&nbsp;{cards.length}</div>
        return ''
    }

    return (
        <>
            <Counter/>

            <DndContext
                id={id}
                onDragEnd={handleDragEnd}
                onDragStart={ (event:DragStartEvent ) => {  }}
                /*onDragMove?(event: DragMoveEvent): void;*/
                /*onDragOver?(event: DragOverEvent): void;*/
                /*onDragEnd?(event: DragEndEvent): void;*/
                /*onDragCancel?():*/
                >
                <table style={{width:'1800px', height:'100%', margin: 'auto'}} border={0}>
                    <tbody>
                    <tr>
                        <td colSpan={8} style={{textAlign:"center"}}>
                            <div style={{marginBottom:"10px", fontWeight:"bold", textDecoration:"underline"}}>
                                The Fool's Journey
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td style={{textAlign: 'center', width: '300px'}}>
                            <div>Past({past.length})</div>
                        </td>
                        <td colSpan={6} style={{textAlign: 'center'}}>
                            <div>Adventure</div>
                        </td>
                        <td style={{textAlign: 'center', width: '300px'}}>
                            <div>Future({future.length})</div>
                        </td>
                    </tr>
                    <tr>
                        <td style={{width: '300px'}}>
                            <PastDroppable cards={past}/>
                        </td>
                        <td style={{backgroundColor: 'lightblueNone'}}>&nbsp;</td>
                        <td style={{width: `${CARD_WIDTH}px`}}>
                        {adventureLength(adventure0)}
                            <div>{showAdventureCost(adventure0)}</div>
                            <CardDroppable area={EArea.ADVENTURE0} cards={adventure0}/>
                        </td>
                        <td style={{width: `${CARD_WIDTH}px`}}>
                            {adventureLength(adventure1)}
                            <div>{showAdventureCost(adventure1)}</div>
                            <CardDroppable area={EArea.ADVENTURE1} cards={adventure1}/>
                        </td>
                        <td style={{width: `${CARD_WIDTH}px`}}>
                            {adventureLength(adventure2)}
                            <div>{showAdventureCost(adventure2)}</div>
                            <CardDroppable area={EArea.ADVENTURE2} cards={adventure2}/>
                        </td>
                        <td style={{width: `${CARD_WIDTH}px`}}>
                            {adventureLength(adventure3)}
                            <div>{showAdventureCost(adventure3)}</div>
                            <CardDroppable area={EArea.ADVENTURE3} cards={adventure3}/>
                        </td>
                            <td style={{backgroundColor: 'lightblueNone'}}>&nbsp;</td>
                            <td>
                                <button
                                    style={{
                                        cursor: 'pointer',
                                        backgroundColor: ((adventure0.length + adventure1.length + adventure2.length + adventure3.length) > 1) ? 'lightgray' : 'red'
                                    }}
                                    disabled={(adventure0.length + adventure1.length + adventure2.length + adventure3.length) > 1}
                                    onClick={() => timeoutState(EState.START_PLACE_ADVENTURE0, 50)}
                                >
                                    Reveal future
                                </button>
                                <div className="container">
                                    {future.map((v, i) => {
                                        return (
                                            <div
                                                key={`spanFuture${i}`}
                                                className="box stack-top"
                                                style={{paddingLeft: `${i}px`, paddingTop: `${i}px`}}
                                            >
                                                <img key={`future${i}`} src={CARD_BACK}
                                                     style={{width: `${CARD_WIDTH}px`, height: `${CARD_HEIGHT}px`}}
                                                     alt=""/>
                                            </div>)
                                    })}
                                </div>
                            </td>
                    </tr>

                    <tr>
                    <td colSpan={8} style={{height:'80px'}}>{message}</td></tr>

                    <tr>
                        <td style={{backgroundColor: 'lightblueNone'}}>&nbsp;</td>
                        <td colSpan={6}>
                        <table border={0} style={{width:'100%'}}>
                            <tbody>
                            <BoardHeader2 CARD_WIDTH={CARD_WIDTH} />
                                <tr>
                                    <td style={{width: `${CARD_WIDTH}px`}} className="background-pattern">
                                        <CardDroppable area={EArea.WISDOM} cards={wisdom}/>
                                    </td>
                                    <td style={{width: `${CARD_WIDTH}px`}}>
                                        <CardDroppable area={EArea.SHIELD} cards={shield}/>
                                    </td>
                                    <td>
                                        {fool === ECard.FOOL &&
                                            <span style={{margin: 'auto'}}>
                                            <img
                                                key={`fullKey`}
                                                src={TAROT_IMAGES[ECard.FOOL]}
                                                style={{
                                                    width: `${CARD_WIDTH}px`,
                                                    height: `${CARD_HEIGHT}px`,
                                                    border: "1px solid black"
                                                }}
                                                className="card-shadow"
                                                alt=""
                                            />
                                        </span>
                                        }
                                    </td>
                                    <td style={{width: `${CARD_WIDTH}px`}}>
                                        <CardDroppable area={EArea.SWORD} cards={sword}/>
                                    </td>
                                    <td style={{width: `${CARD_WIDTH}px`}}>
                                        <CardDroppable area={EArea.SATCHEL} cards={satchel}/>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        </td>
                        <td style={{backgroundColor: 'lightblueNone'}}>&nbsp;</td>
                    </tr>


                    </tbody>
                </table>
            </DndContext>
        </>
    );
}