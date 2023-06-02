

import { createGlobalState } from 'react-hooks-global-state'




const { setGlobalState, useGlobalState } = createGlobalState({
    id: 0,
    isLoggedIn: false,
    currentUser: {} as any,
    loginError: undefined,
    loading: true,
})


export { setGlobalState, useGlobalState };
