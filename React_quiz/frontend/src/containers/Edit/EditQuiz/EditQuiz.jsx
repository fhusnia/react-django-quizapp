import React from 'react'
import { getQuestions } from '../../../api/quizApi'
import EditQuestion from '../EditQuestion/EditQuestion'

function EditQuiz(props) {
    const[quiz,setQuiz] = React.useState({});
    const[quizTitle,setQuizTitle] = React.useState('')

    React.useEffect(() => {
        getQuestions(props.quizId).then(response =>{
            setQuiz(response.data)
            setQuizTitle(response.data.title)
        })
    },[props.quizId])



  const deleteQuestionHandler = React.useCallback((id) =>{
        setQuiz(prev => ({...prev,questions: prev.questions.filter(q => q.id !== id)}))
  },[])

  return (
    <div>
  
        <div className="flex p-5 justify-center">
            <input onChange={e => setQuizTitle(e.target.value)} value={quizTitle} type='text' className='text-xl border text-center font-bold rounded p-1 '/>
            <div className='w-2/12 bg-blue-900 cursor-pointer text-white p-2 text-center font-bold'>Save</div>
        </div>
    
        <div>
            {quiz.questions && quiz.questions.map((question,index) => {
                const onDelete = () => deleteQuestionHandler(question.id)
                return(
                    <div key={question.id} className='w-9/12 p-3 m-auto mb-5'>
                        <EditQuestion question={question} onDelete={onDelete} index={index}/>
                    </div>
                )
            })}
            <div className='flex justify-center'>
                <div className='bg-blue-900 font-bold p-3 text-white rounded cursor-pointer'>Add Question</div>
            </div>
       
        </div>
      
    </div>
  )
  
}

export default EditQuiz