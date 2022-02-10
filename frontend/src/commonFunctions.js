
export const capitalize = (string) =>{
    const lowercase = string?.toLowerCase();
    const capitalize = lowercase[0].toUpperCase();
     const answer = lowercase.replace(lowercase[0], capitalize)
    return answer;
}