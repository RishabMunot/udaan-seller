class Auth{
    constructor(){

        if(localStorage.getItem("isAuthenticated")){
            this.authenticated = localStorage.getItem("isAuthenticated")
        }else{
            this.authenticated = "false"
        }
        
    }
    
    isAuthenticated() {

        return this.authenticated
        
    }


    login(userData,history){
        localStorage.setItem("isAuthenticated","true")
        localStorage.setItem("userData",JSON.stringify(userData))
        history.push("/")
    }

    logout(history){
        var data = this.getUserData()
        localStorage.setItem("isAuthenticated","false")
        localStorage.setItem("userData",JSON.stringify({type:data.type}))
        history.push("/signin-seller")
    }

    getUserData(){
        return JSON.parse(localStorage.getItem("userData"))
    }

}

export default new Auth();