import Api from '@/services/Api'

export default { 
    register (data) {
        return Api().post('action', data)
   },
   delete (data) {
       return Api().delete('action/'+data)
       }, 
   update (data) {
       return Api().put('action', data)
       },
   getAll () {
       return Api().get('action')
       }
    
     }