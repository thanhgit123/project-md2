import axios from "axios"

export default {
    register: async (dataRegister)=>{
        // return await axios.post(import.meta.env + "/users",data)

        return await axios.post(`http://localhost:8099/users`,dataRegister)
    },
    login: async (data)=>{
        // return await axios.post(import.meta.env + "users",data)
        // return await axios.post(`http://localhost:8000/users`,data)
    },
    // check trung
    checkRegister : async (email)=>{
        return await axios.get(`http://localhost:8099/users?email=${email}`)
    },
    checkLogin : async (email,password)=>{
        return await axios.get(`http://localhost:8099/users?email=${email}&password=${password}`)
    }
    
}
