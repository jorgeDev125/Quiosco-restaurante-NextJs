"use client"
import { getImagePath } from "@/src/utils"
import { CldUploadWidget } from "next-cloudinary"
import Image from "next/image"
import { useState } from "react"
import { TbPhotoPlus } from "react-icons/tb"

export default function ImageUpload({image}: {image: string | undefined}) {
  const [imageUrl, setImageUrl] = useState("")

  return (
    <CldUploadWidget
      onSuccess={(result, {widget})=> {
          if (result.event === "success") {
            widget.close()
            //@ts-expect-error: Unreachable code error
            setImageUrl(result.info?.secure_url)
          }
      } }
      uploadPreset="jorgedev125237"
      options={{
        maxFiles: 1
      }}
    >
      {({open})=> (
        <>
            <div className="space-y-2">
              <label className="text-slate-800">Imagen Producto</label> 
              <div 
                className='relative cursor-pointer hover:opacity-70 transition p-10 border-neutral-300 flex flex-col justify-center items-center gap-4 text-neutral-600 bg-slate-100 '
                onClick={()=>open()}>
                <TbPhotoPlus size={50}/>
                <p className="font-semibold text-lg">Agregar Imagen</p>
                {imageUrl && (
                  <div className="absolute inset-0 w-full h-full">
                    <Image 
                      fill
                      style={{objectFit: "contain"}}
                      src={imageUrl}
                      alt="imagen de producto"
                    />
                  </div>
                )}
              </div> 
            </div> 
            {image && !imageUrl && (
              <div className="space-y-2">
                <label className="font-bold">Imagen Actual:</label>
                <div className="flex justify-center">
                  <div className="relative items-center w-64 h-64">
                    <Image
                      fill
                      src={getImagePath(image)}
                      style={{objectFit: "contain"}}
                      alt="Imagen Producto"
                      />
                  </div>
                </div>
              </div>
            )}
            <input 
              type="hidden"
              name="image"
              defaultValue={imageUrl ? imageUrl : image}
            />
        </>
      )}  
    </CldUploadWidget>
  )
}
