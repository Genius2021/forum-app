
export const capitalize = (string) =>{
    const lowercase = string?.toLowerCase();
    const capitalize = lowercase[0].toUpperCase();
     const answer = lowercase.replace(lowercase[0], capitalize)
    return answer;
}



export function capitalizeStringWithDash(string){
    if(string.includes('-')){
         const ans = string.split("-").map(x =>{
            if(x === "and"){
                return "and"
            }else{           
                return capitalize(x);
            }
            
        })
        return ans.join(" ").toString();
    }else{
        return capitalize(string);

    }
        
}

export function capitalizeLowercaseStringWithSpace(string){
    if(string.includes('-')){
        const ans = string.split(" ").map(x =>{
            if(x === "and"){
                return "and"
            }else{
                return capitalize(x);
       
            }
            
        })
        return ans.join(" ").toString();

    }else{
        return capitalize(string);
 
    }

}