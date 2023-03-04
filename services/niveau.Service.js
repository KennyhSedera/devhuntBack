import Api from '@/services/Api'

export default { 
    register (data) {
        return Api().post('nivieau', data)
   },
   delete (data) {
       return Api().delete('nivieau/'+data)
       }, 
   update (data) {
       return Api().put('nivieau', data)
       },
   getAll () {
       return Api().get('nivieau')
       }
    
     }