import { ElementsType } from "../types/types"

const ADD_ELEMENT = 'ADD_ELEMENT'

let initialState = {
    elements:[
        {received: '2011-06-30', pick: 'Moscow', deliver:'Perm', vehicle:'autobus'},
        {received: '2014-07-04', pick: 'Saint-P', deliver:'Perm', vehicle:'car'},
        {received: '2017-06-27', pick: 'Samara', deliver:'Sochi', vehicle:'airplane'},
        {received: '2014-07-04', pick: 'Dubna', deliver:'Moscow', vehicle:'autobus'},
        {received: '2018-06-30', pick: 'Moscow', deliver:'Perm', vehicle:'autobus'},
        {received: '2005-06-27', pick: 'Saint-P', deliver:'Perm', vehicle:'car'},
        {received: '2019-06-27', pick: 'Saint-P', deliver:'Perm', vehicle:'car'},
        {received: '2000-06-27', pick: 'Saint-P', deliver:'Perm', vehicle:'car'},
        {received: '2000-06-29', pick: 'Saint-P', deliver:'Perm', vehicle:'car'},
    ] as Array<ElementsType>,
    id: 1
}

const dispatchReducer = (state=initialState, action: any) =>{
        switch(action.type){
            case ADD_ELEMENT:{
                let elements = state.elements
                elements.push({received:action.received, pick: action.pick, deliver: action.deliver, vehicle: action.vehicle})
                return{
                    ...state,
                    elements: elements,
                }
            }
            default:
                return state
        }
}

export type AddObjectType ={
    type: typeof ADD_ELEMENT
    received: string
    pick: string
    deliver: string
    vehicle: string
}

export const addObject = (received: string, pick: string, deliver: string, vehicle: string): AddObjectType =>{
    return{
        type: ADD_ELEMENT,
        received: received,
        pick: pick,
        deliver: deliver,
        vehicle: vehicle
    }
}

export default dispatchReducer