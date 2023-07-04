import { useReducer } from 'react'


function reducer(state, action){
    switch (action.type) {
        case 'VISIBILITY':
            return {
                ...state,
                visibility: action.payload
            }
        case 'ADD_TODO':
            return {
                ...state,
                todos: [...state.todos, action.payload]
            }
        default:
            return state
    }
    
}

export default function TodoList() {
    const [state, dispatch] = useReducer(reducer, {
        todos: [],
        visibility: 'ALL'
    })

    const { todos, visibility } = state


    const handleVisibility = visibility => {
        console.log('visibility', visibility)
        dispatch({ type: 'VISIBILITY', payload: visibility })
    }

    const handleAddTodo = () => {
        const id = todos.length > 0 ? Math.max(...todos.map(t => t.id)) + 1 : 1
        dispatch({ type: 'ADD_TODO', payload: { id, todo: `Todo ${id}`, isCompleted: Math.random() > .5 } })
    }


    return (
        <div>
            <div className='flex space-x-2'>
                <button onClick={() => handleVisibility('all')}>View All</button>
                <button onClick={() => handleVisibility('completed')}>View Completed</button>
                <button onClick={() => handleVisibility('incomplete')}>Not Completed</button>

                <button onClick={handleAddTodo}>Add TODO</button>
            </div>
            {state.todos.filter(t => {
                if (visibility === 'completed') {
                    return t.isCompleted
                }
                else if(visibility === 'incomplete') {
                    return !t.isCompleted
                }
                return t
            }).map(t => {
                return <div key={t.id}>{t.todo} {String(t.isCompleted)}</div>
            })}
        </div>
    )
}