const Farmacia = require('../models/Farmacia.js');
const Funcionario = require('../models/Funcionario.js');
const jwt = require('jsonwebtoken');
const constantes = require('../constantes.json');
const crypto = require('crypto');
const FuncionarioFarmacia = require('../models/FuncionarioFarmacia.js');





module.exports = {



    autenticar: (async (req, res) => {
        res.set('Content-Type', 'application/json');
        var hash = crypto.createHash('sha256');


        if (req.body.login && req.body.senha && req.body.farmacia_id) {


            const funcionario = await Funcionario.findAll({

                where: {
                    login: req.body.login,
                    senha: hash.update(req.body.senha).digest('hex'),
                    status_id: 1

                },
                attributes: ['id', 'nome', 'nif', 'permissao_id', 'status_id'],
                include: [{
                    model: Farmacia,

                    where: {
                        id: req.body.farmacia_id
                    },


                }],

            });

            
            if (funcionario[0]) {

                let token = jwt.sign({
                    usuario: funcionario[0]
                },
                    constantes.env.JWT_KEY, {
                    expiresIn: "1h"
                });
                res.status(200).send({
                    mensagem: 'Autenticado com sucesso',
                    token: token
                });
            } else {
                res.status(401).send({
                    mensagem: 'Não autenticado',

                });
            }

        }
    }),







    validar: (async (req, res) => {

        if (req.headers.authorization) {
            try {
                usuario = new Funcionario(jwt.verify(req.headers.authorization, constantes.env.JWT_KEY).usuario)
                res.send(usuario);
            } catch (err) {
                res.sendStatus(401);
            }
        }
        else {
            res.status(400).send({ mensagem: 'Erro nos parâmetros enviados' });
        }
    })


}