import Api from '@/services/Api'

export default { 
    register (data) {
        return Api().post('commentaire', data)
   },
   delete (data) {
       return Api().delete('commentaire/'+data)
       }, 
   update (data) {
       return Api().put('commentaire', data)
       },
   getAll () {
       return Api().get('commentaire')
       }
    
     }