import React from 'react'
import { getQuestions } from '../../../api/quizApi'
import EditQuestion from '../EditQuestion/EditQuestion'

function EditQuiz(props) {
    const[quiz,setQuiz] = React.useState({});


    React.useEffect(() => {
        getQuestions(props.quizId).then(response =>{
            setQuiz(response.data)
        })
    },[props.quizId])

  return (
    <div>
        <div className='text-xl text-center font-bold'>Edit Quiz</div>
        <div>
            {quiz.questions && quiz.questions.map((question,index) => {
                return(
                    <div key={question.id} className='w-9/12 m-auto mb-5'>
                        <EditQuestion question={question} index={index}/>
                    </div>
                )
            })}
       
        </div>
      
    </div>
  )
}

export default EditQuiz