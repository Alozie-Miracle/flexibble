import { ProjectForm } from "@/common.types";
import { createProjectMutation, createUserMutation, deleteProjectMutation, getProjectByIdQuery, getProjectsOfUserQuery, getUserQuery, projectsQuery, updateProjectMutation } from "@/graphql";
import { GraphQLClient } from "graphql-request";

const isProduction = process.env.NODE_ENV === 'production';

const apiUrl = isProduction ? process.env.NEXT_PUBLIC_GRAFBASE_API_URL || '':  'http://127.0.0.1:4000/graphql' 
const apiKey = isProduction ? process.env.NEXT_PUBLIC_GRAFBASE_API_KEY || '': 'grafbase'
const serverUrl = isProduction ? process.env.NEXT_PUBLIC_SERVER_URL || '': 'http://localhost:3000' 

const client = new GraphQLClient(apiUrl)

const makeGrapgQlRequest = async (query: string, variables: {}) => {
    try {
        //client.request
        return await client.request(query, variables)
    } catch (error) {
        console.log("request error", error);
        throw error
        
    }
}

export const getUser = (email: string) => {
    client.setHeader('x-api-key', apiKey)
    return makeGrapgQlRequest(getUserQuery, { email })
}

export const createUser = async (name: string, email: string, avatarUrl: string ) => {
    client.setHeader('x-api-key', apiKey)

    const variables = {

        input :{
            name,
            email,
            avatarUrl
        }
    }

   return makeGrapgQlRequest(createUserMutation, variables)
}

export const fetchToken = async () => {
    try {
        const response = await fetch(`${serverUrl}/api/auth/token`)

        return response.json()
    } catch (error) {
        throw error
    }
}

export const uploadImage = async (imagePath: string) => {
    try {
        const response = await fetch(`${serverUrl}/api/upload`, {
            method: 'POST',
            body: JSON.stringify({ path: imagePath})
        })

        return response.json();
    } catch (error) {
        throw error
    }
}

export const createNewProject = async (form: ProjectForm, creatorId: string, token: string) => {
    const imageUrl = await uploadImage(form.image)

    if(imageUrl.url){
        client.setHeader("Authorization", `Bearer ${token}`)

        const variables = {
            input: {
                ...form,
                image: imageUrl.url,
                createdBy: {
                    link: creatorId
                }
            }
        }

        return makeGrapgQlRequest(createProjectMutation, variables)
    }
}

export const fetchAllProject = async (category?: string | '', endCursor?: string | '') => {
    client.setHeader('x-api-key', apiKey)

    

    

    return makeGrapgQlRequest(projectsQuery, { category, endCursor })
}

export const getProjectDetails = async (id: string) => {
    client.setHeader('x-api-key', apiKey)
    return makeGrapgQlRequest(getProjectByIdQuery, { id })
}

export const getUserProjects = async (id: string, last?: number) => {
    client.setHeader('x-api-key', apiKey)
    return makeGrapgQlRequest(getProjectsOfUserQuery, { id, last })
}

export const deleteProject = async (id: string, token: string) => {
    client.setHeader("Authorization", `Bearer ${token}`)
    return makeGrapgQlRequest(deleteProjectMutation, { id })
}


export const updateProject = async (form: ProjectForm, projectId: string, token: string) => {

    function isBase64Data(value: string) {
        const base64Regex = /^data:image\/[a-z]+;base64,/;
        return base64Regex.test(value)
    }

    let updatedForm = { ...form }

    const isUploadingNewImage = isBase64Data(form.image)

    if(isUploadingNewImage){
        const imageUrl = await uploadImage(form.image)

        updatedForm = {
            ...form,
            image: imageUrl
        }
    }

    const variables = {
        id: projectId,
        input: updatedForm
    }

    client.setHeader("Authorization", `Bearer ${token}`)
    return makeGrapgQlRequest( updateProjectMutation, variables )
}