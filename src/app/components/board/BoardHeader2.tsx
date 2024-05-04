import React from "react";

type Props = {
    CARD_WIDTH: number
}
export const BoardHeader2 : React.FC<Props> = ( { CARD_WIDTH} ) =>
    <tr>
        <td style={{textAlign:'center', width: `${CARD_WIDTH}px`}}>
            Wisdom
        </td>
        <td style={{textAlign:'center', width: `${CARD_WIDTH}px`}}>
            Shield
        </td>
        <td style={{textAlign:'center', width: `${CARD_WIDTH - 15}px`}}>
            Hero
        </td>
        <td style={{textAlign:'center', width: `${CARD_WIDTH}px`}}>
            Sword
        </td>
        <td style={{textAlign:'center', width: `${CARD_WIDTH}px`}}>
            Satchel
        </td>
    </tr>