import Api from '@/services/Api'

export default { 
    register (data) {
        return Api().post('parcour', data)
   },
   delete (data) {
       return Api().delete('parcour/'+data)
       }, 
   update (data) {
       return Api().put('parcour', data)
       },
   getAll () {
       return Api().get('parcour')
       }
    
     }