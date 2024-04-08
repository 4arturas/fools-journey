"use client"

import React from "react";
import {ECard} from "@/app/utils";

type Props = {
    card: ECard,
    paddingLeft?: number
}
export const Card : React.FC<Props> = ({card, paddingLeft}) =>
{
    return (
        <div>
            <img
                src={card}
                title={'Card'}
                style={{width:'220px', height: '316px'}}
            />
        </div>
    )
}