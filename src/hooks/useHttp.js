import {useCallback, useEffect, useState} from 'react';
async function sendHttpRequest(url, config){
    const response = await fetch(url, config);
    const resData =  await response.json();
     if(!response.ok){
        throw new Error(resData.message || "Someting went wrong, failed to send request.");
    }
    return resData;
}

export default function useHttp(url, config, initialData){
    const [data, setData] =  useState(initialData);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();

    const sendRequest = useCallback(async function sendRequest(data){
        setIsLoading(true);
        try{
            const resData = await sendHttpRequest(url, {...config, body: data});
            setData(resData);
        } catch(error){
            setError(error.message && 'Someting went wrong');
        }
        setIsLoading(false);
    },[url, config])

    useEffect(() => {
        if((config  && (config.method === "GET" || !config.method)) || !config){
            sendRequest();
        }
    
    },[sendRequest, config])

    function clearData(){
        setData(initialData)
    }

    return {
        isLoading,
        error,
        data,
        sendRequest,
        clearData
    } 
}