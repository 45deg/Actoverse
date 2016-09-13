export function moveToFront(index){
    return { type: 'MOVE_TO_FRONT', index };
}

export function showToolTip(x, y, actor){
    return { type: 'SHOW_TOOLTIP', data: {x, y, actor} };
}

export function hideToolTip(){
    return { type: 'HIDE_TOOLTIP' };
}

export function scrollTo(value){
    return { type: 'SCROLL_TO', value };
}