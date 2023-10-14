import React from 'react'
import { getQuestions } from '../../../api/quizApi'
import Question from '../../../components/Question/Question'
import Timer from '../../../components/Timer/Timer'
import { sendReport } from '../../../api/quizApi'


const initialState = []

const loadquestionsAction = (state,action) =>{
    localStorage.setItem('questions',JSON.stringify(action.questions))
    return action.questions
}

const selectOptionAction = (state,action) =>{
  const newState = [...state]
  const newQuestion = {...newState[action.questionIndex]}
  const newOptions = newQuestion.options.map(option =>({...option,status: null}))
  const newOption = {...newOptions[action.optionIndex],status:'selected'}
  newOptions[action.optionIndex] = newOption
  newQuestion.options = newOptions
  newState[action.questionIndex] = newQuestion
  localStorage.setItem('questions',JSON.stringify(newState))
  return newState
}


const finishAction = (state,action) => {
  const newState = [];

  for (let question of state){
    const newQuestion = {...question}
    const newOptions = [];
    const hasSelected = newQuestion.options.some(option => option.status === 'selected')
  
    for (let option of newQuestion.options){
      const newOption = {...option}
      if (newOption.correct){
        if( hasSelected )
          newOption.status = 'correct';
        else 
          newOption.status = 'info'
      }else if (newOption.status === 'selected' && !newOption.correct){
        newOption.status = 'wrong';
      }
      newOptions.push(newOption)
    }
    newQuestion.options = newOptions
    newState.push(newQuestion)
  }
  return newState
}



const reducer = (state,action) =>{
    switch(action.type){
      case 'LOAD_QUESTIONS':
        return loadquestionsAction(state,action)
      case 'SELECT_OPTION':
        return selectOptionAction(state,action)
      default:
        return state
      case 'FINISH':
        return finishAction(state,action)
    }
}


const divStyle = {
  backgroundColor: '#143f7a',

};


function QuizStart(props) {

  const[questions,dispatch] = React.useReducer(reducer,initialState)
  const[title,setTitle] = React.useState()
  const[name,setName] = React.useState(props.name)
  const[selectedQuizId,setSelectedQuizId] = React.useState(props.selectedQuizId)
  const[finished,setFinished] = React.useState(false)

  React.useEffect(() =>{

    if(localStorage.getItem('quizId')){
        const name = localStorage.getItem('name')
        const quizId = localStorage.getItem('quizId')
        const questions = JSON.parse(localStorage.getItem('questions'))
        const quizTitle = localStorage.getItem('quizTitle')
        
        setName(name)
        setSelectedQuizId(quizId)
        setTitle(quizTitle)
        dispatch({type:'LOAD_QUESTIONS',questions:questions})

    }else{
      getQuestions(selectedQuizId).then(response =>{
          localStorage.setItem('quizId',selectedQuizId)
          localStorage.setItem('quizTitle',response.data.title)
          localStorage.setItem('name',name)
          setTitle(response.data.title)
          dispatch({type:'LOAD_QUESTIONS',questions: response.data.questions})
      })
    }
  },[selectedQuizId,name])

  const submit = React.useCallback(() =>{
    if(finished) return;
    let wrong_count = 0;
    let correct_count = 0;
    for(let question of questions){
      for (let option of question.options){
        if (option.status === 'selected' && option.correct){
          correct_count ++
        }else if (option.status === 'selected' && !option.correct){
          wrong_count ++
        }
      } 
    }



    sendReport(name,selectedQuizId,questions.length,correct_count,wrong_count).then(response =>{
      localStorage.removeItem('quizId')
      localStorage.removeItem('quizTitle')
      localStorage.removeItem('timer')
      localStorage.removeItem('questions')
      localStorage.removeItem('name')
      dispatch({type:'FINISH'})
      setFinished(true)
    })
    
  },[questions,name,selectedQuizId,finished])


  const selectOption = React.useCallback((questionIndex,optionIndex) =>{
    if(finished) return;
    dispatch({type: 'SELECT_OPTION',questionIndex:questionIndex,optionIndex:optionIndex})

  },[finished])

  const cancelHandler = React.useCallback(() =>{
    localStorage.removeItem('quizId')
    localStorage.removeItem('quizTitle')
    localStorage.removeItem('timer')
    localStorage.removeItem('questions')
    localStorage.removeItem('name')
    props.onCancel()
  },[props])




  return (
    <div className="w-9/12 m-auto "> 
      <p className='text-center mb-3 text-2xl font-bold'>{title}</p>
      <div className='grid grid-cols-3 w-full gap-3 mx-auto mb-4 text-center font-bold' >
        <div style={divStyle} className=' text-slate-50 rounded-md'>Student: {name}</div>
        <div style={divStyle}  className='text-slate-50 rounded-md'>Question Count: {questions.length}</div>
        <div  style={divStyle} className='text-slate-50 rounded-md'><Timer duration={10} onEnd={(submit)} /></div>

      </div>
      <div className="flex justify-center flex-wrap">
        {questions.map((question,index) => {
            return(
                <div key={question.id} className='mb-10 p-2 w-full'>
                   <Question index={index} question={question} selectOption={selectOption}/>
                </div>
            )
        })}
     
          
      </div>
      <div >
        { finished || <div onClick={submit} className="w-full py-2 px-3 cursor-pointer rounded-sm text-xl text-white bg-emerald-700">Finish</div>}
        <div onClick={cancelHandler} className="w-full py-2 px-3  cursor-pointer rounded-sm text-xl text-white bg-rose-700">Cancel</div>
      </div>
    </div>
  )
}

export default QuizStart