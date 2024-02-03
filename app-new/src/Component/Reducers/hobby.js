const a = {
    list :[1,2,3],
    activeId: null
}

const hobbyReducer = (state = a, action)=>{ 
    console.log(action.type)
    switch (action.type){
        
        default:
            return state;
    }
}
export default hobbyReducer;