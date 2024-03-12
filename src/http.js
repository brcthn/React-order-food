export async function getMeals(){
    const response = await fetch("http://localhost:3000/meals");
    const resData =  await response.json();
     if(!response.ok){
        throw new Error("Failed get meals");
    }
    return resData;

}
export async function saveMeals(items,customerData){
    const response = await fetch("http://localhost:3000/orders",{
        method:"POST",
        body:JSON.stringify({
            order:{
                items: items,
                customer: customerData
            }
        }),
        headers:{
            'Content-Type':"application/json"
        }  
    })
    const resData =  await response.json();
    if(!response.ok){
        throw new Error("Failed post meals");
    }
    return resData

}