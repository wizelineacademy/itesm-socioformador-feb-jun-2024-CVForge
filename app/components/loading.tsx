import { Loader2 } from "lucide-react";

export default function GalleryLoading(){
    return <div className="flex justify-center items-center w-full h-full">
        <Loader2 className="size-24 animate-spin text-secondarygray mb-28"></Loader2>
        </div>
}