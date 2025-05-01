"use server"

import { OrderSchema } from "@/src/schema"


export async function createOrder(data: unknown) {
    //validate data in server
    const result = OrderSchema.safeParse(data)
    if (!result.success) {
          return {
            errors: result.error.issues
        }
          
    }
    try {
                
    } catch (error) {
        console.log(error)
    }
}