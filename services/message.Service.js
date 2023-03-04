import Api from '@/services/Api'

export default { 
    register (data) {
        return Api().post('message', data)
   },
   delete (data) {
       return Api().delete('message/'+data)
       }, 
   update (data) {
       return Api().put('message', data)
       },
   getAll () {
       return Api().get('message')
       }
    
     }