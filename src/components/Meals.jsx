import MealItem from "./MealItem";
import useHttp from "../hooks/useHttp";
import Error from "./Error";

const requestConfig = {}
export default function Meals(){

    const {data: meals, isLoading, error} = useHttp("http://localhost:3000/meals", requestConfig,[]);
    if(isLoading){
      return <p className="text-center font-bold  text-neutral-400 mt-10">Meals Loading...</p>
    }
    if(error){
      return <Error title="Failed to fetch meals" message={error}/>
    }

    return(
        <>
        {meals.map((meal) => (<MealItem key ={meal.id} meal={meal}/>))}
        </>
    )
}