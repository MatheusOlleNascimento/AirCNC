const User = require('../models/User');
//Index   = Lista as sessões
//Show    = Lista uma única sessão
//Store   = Cria uma sessão
//Update  = Modifica uma sessão
//Destroy = Deleta uma sessão

module.exports = {
    async store(req, res) {
        //Desestruturação JS busca uma variável dentro de uma variável = (const email = req.body.email;) 
        const { email } = req.body;
        
        let user = await User.findOne({ email });

        if (!user) {
            user = await User.create({ email }) 
        }

        return res.json(user);
    } 
};