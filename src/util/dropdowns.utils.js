import {getAllUsers} from './users.utils'

export const transportTypes = () => {
    const transport = [
        { key: undefined, value: '' },
        { key: 'Land', value: 'land' },
        { key: 'Sea', value: 'sea' },
        
    ]
    return transport
}

export const statusTypes = () => {
    const status = [
        { key: undefined, value: '' },
        { key: 'Completed', value: 'completed' },
        { key: 'In Progress', value: 'inProgress' },
        { key: 'On Customs', value: 'onCustoms' },
        { key: 'Canceled', value: 'canceled' }
    ]
    return status
}


export const availableClients = async(authAxios) => {
        try {
            const { data } = await authAxios.get(`user/get-all-client-options`)
            const users = data.clients
            const userOptions = [{key:undefined,value:''}]
            users.forEach(user=>{
                const {clientName,_id} = user
                let obj = {}
                obj.key = clientName
                obj.value = _id
                userOptions.push(obj)
            })
            return userOptions
        } catch (error) {
            console.log(error)
            throw new Error('Try Again')
        }
}

