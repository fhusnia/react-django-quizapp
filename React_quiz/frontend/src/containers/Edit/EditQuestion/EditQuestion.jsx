import React from 'react'

const initialOptions = [
        
]


// const loadOptionsAction = (state,action) =>{

// }
const reducer = (state,action) => {
    switch(action.type){
        case 'LOAD_OPTIONS':
            return action.options
        default:
            return state
    }
}

function EditQuestion(props) {
  const[content,setContent] = React.useState('')
  const[options,dispatch] = React.useReducer(reducer,initialOptions)
  const textAreaRef = React.useRef()

    const changeContentHandler = React.useCallback((e) =>{
        setContent(e.target.value)
        const textAreaEl = textAreaRef.current
        textAreaEl.style.height = '1px';
        textAreaEl.style.height = textAreaEl.scrollHeight + 'px'
    },[])


  React.useEffect(() => {
    setContent(props.question.content)
    dispatch({type: 'LOAD_OPTIONS',options:props.question.options})
  },[props.question])



  return (
    <div className='w-full bg-slate-200 p-3 pl-1 rounded'>
        <div className='flex mb-3'>
            <div className='w-8 text-center text-xl font-bold'>1</div>
            <textarea 
            type="text" 
            className='resize-none w-full rounded p-3 outline-none' 
            rows={5}
            value={content}
            onChange={changeContentHandler}
            ref={textAreaRef}
            />
        </div>
        <div>
            {options.map((option,index) => {
                return(
                    <div  key={option.id} className='flex items-center mb-3'>
                        <span className='w-8 text-center'>A)</span>
                        <input type="text" className='w-full rounded p-1 outline-none'/>
                    </div>
                )
            })}
           
        </div>
    </div>
  )
}

export default EditQuestion