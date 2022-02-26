import { combineReducers, createStore } from "redux";
import dispatchReducer from "./dispatchReducer";


let rootReducer = combineReducers({
    dispatchPage: dispatchReducer
})

type RootReducerType = typeof rootReducer
export type AppStateType = ReturnType<RootReducerType>

let store = createStore(rootReducer)


//@ts-ignore
window.store = store

export default store