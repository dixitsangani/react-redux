import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { IncreaseAction } from '../Redux/Action';

export default function Counter() {
    const dispatch = useDispatch()
    const count = useSelector((store) => store.count);

    console.log(count)




    return (
        <div>
            <h1>Counter app {count}  </h1>

            <button onClick={() => { IncreaseAction(1) }} >Increment</button>

            <button onClick={() => dispatch({ type: "DECREMENT" })}  >Decrement</button>

            <button onClick={() => dispatch({ type: "RESET" })}  >Reset</button>
        </div>
    )
}
