
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


export const  monthAndDay = (date)=>{
    let commentDate = new Date(date).toString().split(" ");
    let commentMonth = commentDate[1];
    let commentDay = commentDate[2];
    return `${commentMonth} ${commentDay}`
}


export const hrsAndMins = (timeValue)=>{
    let commentDate = new Date(timeValue).toString().split(" ")[4];
    let furtherBreaking = commentDate?.split(":")
    let hours = furtherBreaking[0];
    let minutes = furtherBreaking[1];
    return `${hours}:${minutes}`
  }

  export  const AmOrPm = (time)=>{
    let commentDate = new Date(time).toString().split(" ")[4];
      const number = parseInt(commentDate?.split(":")[0])
      if(number === 12){
        return "pm";
      }else if(number > 12){
        return "pm";
      }else{
        return "am";
      }
  }