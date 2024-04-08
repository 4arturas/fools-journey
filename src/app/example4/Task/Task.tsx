import {useSortable} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export const Task = ( { id, title } ) =>
{
    const { attributes, listeners, setNodeRef, transition, transform} =
        useSortable({id});

    const style = {
        transition,
        transform: CSS.Transform.toString( transform )
    }

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
            className="task"
        >
            <input type="checkbox" className="checkbox"/>
            { title }
        </div>
    )
}