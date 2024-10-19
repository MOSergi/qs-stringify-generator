import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import qs from "qs";
import { validateIfTextIsValidJSON } from './utils/JSON.validator';
import { CustomDrawer } from './components/custom/CustomDrawer';


function App() {
  const [text, setText] = useState<string>('');
  const [result, setResult] = useState<string | undefined>(undefined);
  const [error, setError] = useState<string | undefined>(undefined);

  const onChange = (e : React.ChangeEvent<HTMLTextAreaElement>)=>{
    const { target } = e;
    setText(target.value);
  }

  const onDelete = ()=>{
    setText('');
  }

  const onComplete = ()=>{
    setError(undefined);

    const validJson = validateIfTextIsValidJSON(text);

    if (validJson){
      const parsedValue = qs.stringify(validJson);
      setResult(parsedValue);
    } else {
      setError('Provide a valid JSON to complete the transform');
    }
  }

  return (
    <>
      <div className="flex flex-col justify-center items-center w-100 h-[95vh]">
        <h1 
          className='text-2xl text-center text-[#F2F2F2] font-bold'
        >
          QS Stringify Playground
        </h1>
        <div className='flex flex-col items-center pt-3'>
          <Textarea
            placeholder="Enter the value. IMPORTANT: include the necessary commas as if you were writing a JSON"
            className="resize text-white w-[350px] h-[225px] bg-[#262626]"
            onChange={onChange}
            value={text}
          />
          <div className='flex gap-x-4'>
            <CustomDrawer 
              result={result}
              onComplete={onComplete}
              error={error}
            />
            <Button 
              className='mt-3' 
              variant="destructive"
              onClick={onDelete}
            >
              Clean
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
