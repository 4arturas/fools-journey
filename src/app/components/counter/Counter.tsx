import {useAppDispatch, useAppSelector} from "@/store";
import {setCounter} from "@/store/counterSlice";

export const Counter = () =>
{
    const countState = useAppSelector((state) => state.counter.count);
    const dispatch = useAppDispatch();

    return (
        <div>
        <div>Counter - {countState}</div>
            <button
                onClick={() => {
                    dispatch(setCounter(countState+1));
                }}
            >
                Increment
            </button>
            <button
                onClick={() => {
                    dispatch(setCounter(countState-1));
                }}
            >
                Decrement
            </button>
        </div>
    );
}