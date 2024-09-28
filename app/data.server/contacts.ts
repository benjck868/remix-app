import { z } from "zod";
const strapiURL = process.env.STRAPI_URL!
export const contactSchema = z.object({
    id: z.number(),
    documentId: z.string(),
    first_name: z.string(),
    last_name: z.string(),
    avatar: z.string().nullable(),
    twitter: z.string().nullable(),
    notes: z.string(),
    favorite: z.boolean().default(false),
    createdAt: z.string(),
    updatedAt: z.string(),
    publishedAt: z.string(),
    locale: z.string().nullable()

})

export async function getContacts() {
    try {
        const response = await fetch(`${strapiURL}/api/contacts`)
        const data = await response.json()
        if(!data) throw new Response("getcontact: ", {status:404})
        return data.data
    }
    catch(e){
        console.log({e})
    }
}

export async function getContactsByDocumentId(documentId: string){
    try {
        const response = await fetch(`${strapiURL}/api/contacts/${documentId}`)
        const contact = await response.json()
        return contact.data
    }
    catch(e){
        throw new Error("")
    }
}