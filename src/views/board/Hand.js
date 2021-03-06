import React from 'react';

import { Piece } from "./Piece";
import { useSelector } from 'react-redux';
import { useDrop } from "react-dnd";
import cn from 'classnames';


export function Hand(props) {
    const hand = useSelector(state => state.pieces.hand);
    const round = useSelector(state => state.round);
    const pieces = [];
    const dndAllowed = props.dndAllowed || false;
    const show = (props.show === 'self')? 'self': 'enemy';

    const [collectedProps, drop] = useDrop({
        accept: 'Piece',
        drop: () => {
            return {
                targetType: 'hand'
            }
        },
        canDrop: () => {
            return dndAllowed;
        },
        collect: (monitor) => {
            return {
                hover: monitor.isOver()
            }
        },
    })

    for (let i = 0; i < hand.length; i++) {
        if (((hand[i].color === round.thisPlayerColor) && (show === 'self')) || ((hand[i].color !== round.thisPlayerColor) && (show === 'enemy')) ) {
            pieces.push(<Piece dndAllowed={dndAllowed} place='hand' color={hand[i].color} type={hand[i].type} key={`P${i}`} id={i} dragable/>);
        }
    }

    const classes = cn(
        'slots-wrapper',
        {'active': collectedProps.hover}
    );
    
    return <div className="game-board-wrapper stickup">
            <div ref={drop} className={classes}>
                {pieces}               
            </div>
        </div>;
}