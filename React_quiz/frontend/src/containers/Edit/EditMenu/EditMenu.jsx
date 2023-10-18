import React from 'react'
import { createQuiz, getQuizList,deleteQuiz } from '../../../api/quizApi'
import classNames from 'classnames';


function EditMenu(props) {
    const[quizes,setQuizes] = React.useState([]);
    const[newTitle,setNewTitle] = React.useState();
    const[warning,setWarning] = React.useState(false)

    const addQuizHandler = React.useCallback(() => {
        if(!newTitle){
            setWarning(true);
            return 
        }
        createQuiz(newTitle).then(response =>{
            setQuizes(prev => [...prev,response.data])
            setNewTitle('')
        })
    },[newTitle])

    const titleChangeHandler = React.useCallback((e) =>{
        setWarning(false);
        setNewTitle(e.target.value)
    },[])

    const deleteQuizHandler = React.useCallback((id) =>{
        deleteQuiz(id).then(() => {
            setQuizes(prev => prev.filter(q => q.id !== id))
        })
    },[])

    React.useEffect(() =>{
        getQuizList().then(response =>{
            setQuizes(response.data)
        })
    },[])


  return (
    <div>
        <div className="text-2xl font-bold p-2 text-center">Quizes</div>
        <div>
            {
                quizes.map((quiz,index) => {
                  const onDeleteQuiz = () => deleteQuizHandler(quiz.id)
                  const selectQuiz = () => props.onQuizSelect(quiz.id)

                    return(
                        <div className='flex bg-slate-100 p-3 text-xl font-semibold gap-x-3 mb-2 items-center'>
                            <div className='mr-5'>{index + 1}</div>
                            <div className='grow'>{quiz.title}</div>
                            <div className=''>{quiz.question_count} Question</div>
                            <div  onClick={selectQuiz} className='basis-2/12  bg-green-600 p-2  cursor-pointer text-center rounded-sm'>Edit</div>
                            <div onClick={onDeleteQuiz}  className='basis-2/12  bg-red-600  p-2 cursor-pointer text-center rounded-sm'> Delete</div>
                        </div>
                    )
                })
            }
           
        </div>
        <div className='flex justify-end'>
            <input value={newTitle} onChange={titleChangeHandler} type="text" className={classNames('text-xl border-2 cursor-pointer p-2 grow',{'border-stone-500': !warning,'border-red-600 border-3':warning})}/>
            <div onClick={addQuizHandler} className='p-2 bg-blue-900 rounded-sm cursor-pointer text-xl font-bold text-white'>Add Quiz</div>
        </div>

    </div>
  )
}

export default EditMenu