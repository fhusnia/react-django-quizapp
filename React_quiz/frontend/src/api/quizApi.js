import iaxios from './iaxios'



export function getQuestions(quizId){
    return iaxios.get(`quizes/${quizId}/`)
}


export function sendReport(name,quizId,count,correct,wrong){
    const data = {
        full_name: name,
        quiz: quizId,
        count: count,
        correct_answer: correct,
        wrong_answer: wrong,
    }
    return iaxios.post('reports/',data)
}

export function getReports(){
    return iaxios.get('reports/')
}