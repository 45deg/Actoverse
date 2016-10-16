export function connectNetwork(target){
    return { type: 'CONNECT_NETWORK', target };
}

export function disconnectNetwork(){
    return { type: 'DISCONNECT_NETWORK' };
}
