import Api from '@/services/Api'

export default { 
    register (data) {
        return Api().post('anneeuniv', data)
   },
   delete (data) {
       return Api().delete('anneeuniv/'+data)
       }, 
   update (data) {
       return Api().put('anneeuniv', data)
       },
   getAll () {
       return Api().get('anneeuniv')
       }
    
     }