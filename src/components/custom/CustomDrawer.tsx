import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import resultImg from "../../assets/result.svg";
import errorImg from "../../assets/error.svg";
import { Toaster } from "../ui/toaster";
import { useToast } from "@/hooks/use-toast";

interface CustomDrawerProps {
    result : string | undefined
    onComplete : ()=> void,
    error : string | undefined
}

export const CustomDrawer = ({ result, onComplete, error } : CustomDrawerProps)=>{
    const { toast } = useToast();

    const copyString = ()=> {
        navigator.clipboard.writeText(result!);
        toast({
            title : "Copied :)!"
        })
    }

    return(
        <>
            <Toaster />
            <Drawer>
                <DrawerTrigger asChild onClick={onComplete}>
                    <Button variant="ghost" className='mt-3 bg-green-700 text-white'>Transform</Button>
                </DrawerTrigger>
                    <DrawerContent className='flex items-center bg-[#1C1917] text-white'>
                        <DrawerHeader className="text-center">
                            <DrawerTitle>Your result</DrawerTitle>
                            <DrawerDescription>Here, the stringify result for your request</DrawerDescription>
                        </DrawerHeader>
                        <div className='h-[30vh] flex flex-col items-center'>
                            {
                                error !== undefined
                                ?
                                <div className="flex flex-col items-center">
                                    <h2 className="text-[#F50004] font-bold text-xl">{error}</h2>
                                    <img 
                                        src={errorImg} 
                                        alt="error image"
                                        className="mt-2"
                                        style={{ width : 280 }} 
                                    />
                                </div>
                                :
                                <div className="flex flex-col items-center">
                                    <span className="text-center truncate">{result}</span>
                                    <div className="mt-4 cursor-pointer" onClick={copyString}>
                                        <p>Click ME to copy :)!</p>
                                        <img 
                                            src={resultImg} 
                                            alt="result image"
                                            className="mt-2"
                                            style={{ width : 90 }} 
                                        />
                                    </div>
                                </div>
                            }
                        </div>
                        <DrawerFooter>
                            <DrawerClose asChild>
                            <Button variant="secondary">Close</Button>
                            </DrawerClose>
                        </DrawerFooter>
                    </DrawerContent>
            </Drawer>
        </>
    );
}