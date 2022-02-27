import { ElementsType } from "../types/types"

const ADD_ELEMENT = 'ADD_ELEMENT'
const TOGGLE_REFRESH = 'TOGGLE_REFRESH'

let initialState = {
    elements:[
        {received: '30.06.2011', pick: 'Moscow', deliver:'Perm', vehicle:'autobus'},
        {received: '04.07.2014', pick: 'Saint-P', deliver:'Perm', vehicle:'car'},
        {received: '27.06.2017', pick: 'Samara', deliver:'Sochi', vehicle:'airplane'},
        {received: '24.08.2000', pick: 'Dubna', deliver:'Moscow', vehicle:'autobus'},
        {received: '15.03.2002', pick: 'Moscow', deliver:'Perm', vehicle:'autobus'},
        {received: '27.06.2011', pick: 'Saint-P', deliver:'Perm', vehicle:'car'},
        {received: '27.05.2011', pick: 'Saint-P', deliver:'Perm', vehicle:'car'},
        {received: '26.05.2011', pick: 'Saint-P', deliver:'Perm', vehicle:'car'},
        {received: '29.06.2001', pick: 'Saint-P', deliver:'Perm', vehicle:'car'},
    ] as Array<ElementsType>
}

const dispatchReducer = (state=initialState, action: ActionsTypes) =>{
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

type ActionsTypes = AddObjectType

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