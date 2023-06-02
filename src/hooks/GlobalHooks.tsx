
import { createGlobalState } from 'react-hooks-global-state'

const storageFetch = localStorage.getItem('isLoggedIn');
const storageUser = localStorage.getItem('username')
const { setGlobalState, useGlobalState } = createGlobalState({
    id: 0,
    isLoggedIn: storageFetch,
    name: storageUser,

})


export { setGlobalState, useGlobalState };