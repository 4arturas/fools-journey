import {horizontalListSortingStrategy, SortableContext, verticalListSortingStrategy} from "@dnd-kit/sortable";
import {Task} from "@/app/example4/Task/Task";

export const Column = ( { tasks } ) =>
{
    return (
        <div className="column">
            <SortableContext items={tasks} strategy={verticalListSortingStrategy}>
                {tasks.map( (task) => (
                    <Task key={task.id} id={task.id} title={task.title}/>
                ))}
            </SortableContext>
        </div>
    )
}