"use client"

import React, {useState} from 'react';
import {DndContext} from '@dnd-kit/core';
import {Draggable} from './Draggable';
import {Droppable} from './Droppable';

export function Example() {

    const [parent, setParent] = useState(null);

    const draggable = (
        <Draggable id="draggable">
            Go ahead, drag me.
        </Draggable>
    );

    function handleDragEnd({over}) {
        setParent(over ? over.id : null);
    }

    return (
        <DndContext onDragEnd={handleDragEnd}>
            {!parent ? draggable : null}
            <Droppable id="droppable">
                {parent === "droppable" ? draggable : 'Drop here'}
            </Droppable>
        </DndContext>
    );
}
