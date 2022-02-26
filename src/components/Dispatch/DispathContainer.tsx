import { connect, ConnectedProps } from "react-redux";
import Dispatch from "./Dispatch";
import {addObject} from '../../redux/dispatchReducer'
import { AppStateType } from "../../redux/store";
import { ElementsType } from "../../types/types";

export type MapStateToPropsType ={
    elements: Array<ElementsType>
}

export type MapDispatchToPropsType ={
    addObject: (received: string, pick: string, deliver: string, vehicle: string) => void
}

let mapStateToProps = (state: AppStateType): MapStateToPropsType =>{
    return{
        elements: state.dispatchPage.elements,
    }
}

const DispatchContainer = connect(mapStateToProps, {addObject})(Dispatch)

export default DispatchContainer