"use client"

import React, {useState} from 'react';
import {DndContext} from '@dnd-kit/core';

import {Droppable} from './Droppable';
import {Draggable} from './Draggable';

export function Example2()
{
    const [parent, setParent] = useState( null );
    const draggable = (
        <Draggable id="draggable">
            Drag Me
        </Draggable>
    )

    function handleDragEnd( {over} )
    {
        setParent( over ? over.id : null );
    }
    return (
        <DndContext onDragEnd={handleDragEnd}>
            {!parent?draggable:null}
            <Droppable id="droppable">
                {parent === "droppable" ? draggable : "Drop here" }
            </Droppable>
        </DndContext>
    )
}