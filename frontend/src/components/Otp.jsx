import {  useRef, useState,useEffect } from "react"
export const Otp = ({
    number,
    handler,
    toggle
}) =>{
    const ref = useRef(Array(number).fill(0));
    const [value,setValue] = useState(Array(number).fill(""))
    const [otp,setOtp] = useState("");
    useEffect(() => {
    const filled = value.every(v => v.length === 1 && v.charCodeAt(0) >= 0x30 && v.charCodeAt(0) < 0x3a);
    
    if(filled){
        setOtp(c => "")
        for(let i=0;i<value.length;i++){
            setOtp(c => c+value[i])
        }
    } 
    toggle(filled)
    }, [value]);
    if(otp.length==6){
        handler(parseInt(otp))
    }
   
    return <div className="flex justify-center">
        {Array(number).fill(1).map((x,index) => <SubOtp reference={(e) => ref.current[index] = e} value={value[index]} setValue={setValue} key={index} index={index} onDone={()=>{
            if(index+1 >number){
                return
            }
            
            ref.current[index+1].focus()      
        }} onBack={()=>{
            if(index==0){
                return
            }
            ref.current[index-1].focus()
        }} />)}
        

    </div>

}
function SubOtp({
    reference,onDone,onBack,value,setValue,index
}){
    return <div>
        
        <input ref={reference} value={value} onKeyUp={(e) =>{
            if(e.key == "Backspace"){
                onBack()
                setValue((a) => {
                    const copy = [...a];
                    copy[index] = "";
                    return copy;
                });

            }
        }} onChange={(e)=>{
            const val = e.target.value;
            
            if(val.length>0){
                if(val.charCodeAt(0) < 0x3a && val.charCodeAt(0) >= 0x30 ){
                    setValue((a) => {
                        const copy = [...a];
                        copy[index] = val;
                        return copy;
                    });

                    
                    onDone()            
                }  
            }        
            
        }} type="text" className="text-2xl text-white px-3 m-2 w-[40px] h-[50px] rounded-xl bg-blue-500 outline-none" maxLength="1"></input>
    </div>
}