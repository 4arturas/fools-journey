"use client"

import React from "react";
import {ECard} from "@/app/utils";

type Props = {
    card: ECard
}
export const Card : React.FC<Props> = ({card}) =>
{
    return (
        <div>
            <img src={card} title={'Card'}/>
        </div>
    )
}