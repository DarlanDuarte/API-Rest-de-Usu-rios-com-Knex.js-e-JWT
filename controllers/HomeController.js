

class HomeController {
    async index(req, res){
        res.send('App Express! - Inicio' )
    }
}

module.exports = new HomeController()