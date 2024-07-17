import { GET_TODO, INCREMENT } from "./ActionTypes"
import axios from "axios"

export const IncreaseAction = (payload) => {
    return { type: INCREMENT, payload: payload }
}

export const getTogo=(dispatch)=>{
    axios.get(`http://localhost:9090/todo`)
            .then((res) => {
                console.log(res.data);
                dispatch({ type: GET_TODO, payload: res.data });
            });
}