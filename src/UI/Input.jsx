export default function Input({label, id, ...props}){
    return(
        <p className="flex flex-col">
            <label htmlFor={id} className="font-bold mx-3"> {label} </label>
            <input id={id} name={id} {...props} required className = "m-3 border-2 "></input>
        </p>
    )
}