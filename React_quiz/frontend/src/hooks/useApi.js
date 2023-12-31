
import React from 'react';
import axios from 'axios'

const baseUrl = 'http://127.0.0.1:8000/api/'

function useApi() {
    const [quizes,setQuizes] = React.useState([])

    const loadQuizes = React.useCallback(()=> {
        axios.get(baseUrl + `quizes/`).then(response => {
            setQuizes(response.data)
        })
    },[])

  return {
    quizes,loadQuizes
  };
}

export default useApi;