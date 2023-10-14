import React from 'react';
import { appContext } from '../../App';


function Navbar() {

    const {page, setPage } = React.useContext(appContext)



    let quizClassName ='px-5 w-24 hover:bg-blue-900 text-center rounded-sm	 py-2 border border-gray-800 duration-500 cursor-pointer';
    let editClassName ='px-5 w-24 text-center hover:bg-blue-900	 rounded-sm py-2 border border-gray-800 duration-500 cursor-pointer';
    let reportClassName ='px-5 w-24 hover:bg-blue-900 text-center rounded-sm py-2 border border-gray-800 duration-500 cursor-pointer';

    if(page === 'quiz')
        quizClassName += ' bg-blue-900 text-slate-50 ';
    else if(page === 'edit')
        editClassName += ' bg-blue-900 text-slate-50 ';
    else if(page === 'report')
        reportClassName += ' bg-blue-900 text-slate-50 ';


  return (
    <div className=' flex justify-center gap-x-6 font-bold'>
        <div className={quizClassName} onClick={() => setPage('quiz')}>Quiz</div>
        <div className={editClassName} onClick={() => setPage('edit')}>Edit</div>
        <div className={reportClassName} onClick={() => setPage('report')}>Report</div>
    </div>
  )
}

export default Navbar