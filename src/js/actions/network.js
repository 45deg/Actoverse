export function connectNetwork(target){
    return { type: 'CONNECT_NETWORK', target };
}

export function disconnectNetwork(panelName, size){
    return { type: 'DISCONNECT_NETWORK', target };
}
