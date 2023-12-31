import './App.css';
import Layout from './HOC/Layout/Layout';
import React from 'react';
import Quiz from './containers/Quiz/Quiz';
// import Edit from './containers/Edit/Edit';
// import Report from './containers/Report/Report';


const Edit = React.lazy(() => import('./containers/Edit/Edit'))
const Report = React.lazy(() => import('./containers/Report/Report'))


export const appContext = React.createContext()


function App() {
  const [page,setPage] = React.useState('quiz');

  const pageJSX = React.useMemo(() =>{
     switch(page){
      case 'quiz':
        return <Quiz/>
      case 'edit':
        return <React.Suspense fallback={<div>Loading...</div>}>
                    <Edit/> 
              </React.Suspense>            
      case 'report':
        return<React.Suspense fallback={<div>Loading...</div>}>
                    <Report/>
              </React.Suspense>  
      default:
        return
     }
  },[page])

  return (
    <div className='App'> 
      <appContext.Provider value={{page: page, setPage: setPage}}>
        <Layout>
            {pageJSX}
        </Layout>
      </appContext.Provider>
      
    </div>
  );
}

export default App;
