import React from 'react'
import classNames from 'classnames'


function Question(props) {
  return (
    <div className='w-full p-3 relative rounded-sm'>
        <div className='flex'>
            <div className="font-bold mr-2">{props.index + 1}.</div>
            <div className="mb-2 grow">{props.question.content}</div>
        </div>

        <div>
            {props.question.options.map((option,index) => {
              const optionLetter = String.fromCharCode(65+index);
              const selectOption = () => {
                props.selectOption(props.index,index)
              }

                return (
                  <div key={option.id} className={classNames(
                    "mb-3 p-2 rounded-sm cursor-pointer",
                    {'bg-slate-200': !option.status},
                    {'bg-slate-400': option.status === 'selected'},
                    {'bg-emerald-700': option.status === 'correct'},
                    {'bg-yellow-400': option.status === 'info'},
                    {'bg-rose-600': option.status === 'wrong'},
                  )}
                    onClick={selectOption}>
                    <strong classNames='mr-2'>{optionLetter})</strong>
                    <span>{option.answer}</span>
                  </div>

                );
            })}
        </div>
    </div>
  )
}

export default Question