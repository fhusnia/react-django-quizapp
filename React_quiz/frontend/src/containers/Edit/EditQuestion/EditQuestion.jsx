import React from 'react'
import { BsFillTrashFill, BsPlusCircleFill,BsCheckCircle,BsFillCheckCircleFill } from "react-icons/bs";


const initialOptions = {
    content: '',
    options: []
}



const reducer = (state,action) => {
    switch(action.type){
        case 'LOAD_QUESTION':
            return action.question
        case 'CHANGE_CONTENT':
            return {...state,content: action.content}
        default:
            return state
    }
}

function EditQuestion(props) {
  const[question,dispatch] = React.useReducer(reducer,initialOptions);
  const[changed,setChanged] = React.useState(false);
  const textAreaRef = React.useRef()

    const changeContentHandler = React.useCallback((e) =>{
        dispatch({type:'CHANGE_CONTENT',content: e.target.value})
        setChanged(true)
    },[])


  React.useEffect(() => {
    dispatch({type: 'LOAD_QUESTION',question:props.question})
  },[props.question])

    React.useEffect(() =>{    
        const textAreaEl = textAreaRef.current
        if(textAreaEl){
            textAreaEl.style.height = '1px';
            textAreaEl.style.height = textAreaEl.scrollHeight + 'px';
        }
    },[textAreaRef,question.content])

  return (
    <div className='w-full bg-slate-200 p-3 pl-1 rounded relative'>

        <div className='self-center absolute right-[-25px] top-[-20px] text-3xl text-red-600  cursor-pointer p-2'><BsFillTrashFill/></div>
        {changed && <div className='self-center absolute right-[-28px] bottom-[-12px] text-3xl text-green-700  cursor-pointer p-3'><BsCheckCircle/></div>}

        <div className='flex mb-3'>
            <div className='w-8 text-center text-xl font-bold'>{props.index + 1}</div>
            <textarea 
            type="text" 
            className='resize-none w-full rounded p-3 outline-none' 
            rows={5}
            value={question.content}
            onChange={changeContentHandler}
            ref={textAreaRef}
            />

        </div>
        <div>
            {question.options.map((option,index) => {
                return(
                    <div  key={option.id} className='flex items-center mb-3'>
                        <span className='w-8 text-center'>{String.fromCharCode(index+65)})</span>
                        <input value={option.answer} type="text" className='w-full rounded p-1 outline-none mr-2'/>
                        <div className="text-green-700 mr-2  cursor-pointer"><BsFillCheckCircleFill/></div>
                        <div className="text-red-600 cursor-pointer"><BsFillTrashFill/></div>

                    </div>
                )
            })}
           <div className="flex justify-center text-3xl text-blue-900 cursor-pointer">
                <BsPlusCircleFill/>
           </div>
        </div>
    </div>
  )
}

export default EditQuestion