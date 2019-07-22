// At this stage, it may seem that creating/injecting this external 
// history object may be unnecessary but I do it as in the future phases 
//I will need a handle of history in my actions

import { createBrowserHistory } from 'history'
export default createBrowserHistory();