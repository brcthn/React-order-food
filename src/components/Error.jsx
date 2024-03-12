
export default function Error({title, message}){
    return (
        <div className="border-2 bg-amber-600 border-amber-800 rounded-md max-w-56 min-h-4 mx-auto">
            <h2 className="font-bold text-center mb-4">{title}</h2>
            <p className="text-center">{message}</p>
        </div>
    )
   
}