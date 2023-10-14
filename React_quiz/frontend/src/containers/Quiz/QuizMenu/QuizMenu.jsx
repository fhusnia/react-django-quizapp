import React from 'react';
import useApi from '../../../hooks/useApi';

function QuizMenu(props) {
  const{quizes,loadQuizes} = useApi()

  const divStyle = {
    backgroundColor: '#143f7a',

  };


  React.useEffect(() =>{
    loadQuizes()
  },[loadQuizes])


  return (
    <div>
      <div className='p-2 '> 
      {props.warning && <div className='text-red-700 text-center'>{props.warning}!</div>}
        <div className='text-center p-3 text-xl '>First name & Last name</div>
        <input type="text" className='w-full p-2 border-2 border-slate-600	' value={props.name}  onChange={props.onNameChange}/>
      </div>
      <div>

        {
          quizes.map((quiz,index) => {
            const startHandler = () =>{
              props.onSelectQuiz(quiz.id)
            }
            return(
              <div key={quiz.id} style={divStyle} className='flex p-3 rounded-md items-center mb-2 bg-cyan-600'>
                <div className='mr-3 text-slate-50'>{index+1}.</div>
                <div className='grow text-slate-50'>{quiz.title}</div>
                <div>
                  <div className=' border border-blue-50		 text-slate-50		rounded-sm w-24 text-center	  px-5 py-1 cursor-pointer' onClick={startHandler}>Start</div>
                </div>
              </div>
            )
          
          })
        }
      
      </div>
    </div>
  )
}

export default QuizMenu