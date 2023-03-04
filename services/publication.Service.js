import Api from '@/services/Api'

export default { 
    register (data) {
        return Api().post('publication', data)
   },
   delete (data) {
       return Api().delete('publication/'+data)
       }, 
   update (data) {
       return Api().put('publication', data)
       },
   getAll () {
       return Api().get('publication')
       }
    
     }