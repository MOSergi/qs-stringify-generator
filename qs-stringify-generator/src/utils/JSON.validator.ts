export const validateIfTextIsValidJSON = (jsonText : string) : string | null =>{
    try {
      return JSON.parse(jsonText);
    } catch (err){
      return null;
    }
  }