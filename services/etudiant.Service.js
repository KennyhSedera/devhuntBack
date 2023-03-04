import Api from '@/services/Api'

export default { 
    register (data) {
        return Api().post('etudiant', data)
   },
   delete (data) {
       return Api().delete('etudiant/'+data)
       }, 
   update (data) {
       return Api().put('etudiant', data)
       },
   getAll () {
       return Api().get('etudiant')
       }
    
     }