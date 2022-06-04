const Farmacia = require('../models/Farmacia.js');
const Funcionario = require('../models/Funcionario.js');
const jwt = require('jsonwebtoken');
const constantes = require('../constantes.json');
const crypto = require('crypto');
const Estoque = require('../models/Estoque.js');

const ProdutoEstoque = require('../models/ProdutoEstoque.js');
const Produto = require('../models/Produto.js');
const database = require('../db');
const Sequelize = require('sequelize');
module.exports = {
    listar: (async (req, res) => {
        res.set('Content-Type', 'application/json');
        var hash = crypto.createHash('sha256');


        try {
            const farmaciaLogado = new Farmacia(jwt.verify(req.headers.authorization, constantes.env.JWT_KEY).usuario.farmacias[0]);
            try {
                //    const usuario = new Usuario(jwt.verify(req.headers.authorization, constantes.env.JWT_KEY).funcionario);

                const farmacia = await Farmacia.findAll({
                    where: {
                        id: farmaciaLogado.id,
                    },
                    include: [{
                        model: Estoque,
                        attributes: ['id'],
                        include: [{
                            model: ProdutoEstoque,
                            attributes: ['id'],
                            include: [{
                                model: Produto,

                            }]
                        }],
                    }],
                });
                res.status(200).send({
                    mensagem: 'Listado com sucesso',
                    farmacia: farmacia
                });
            }
            catch (err) {
                res.status(200).send({
                    mensagem: 'Erro ao localizar estoque ',
                });
            }
        }
        catch (err) {
            res.status(401).send({
                mensagem: 'Não autenticado',
            });
        }
    }),



    buscarCodigo: (async (req, res) => {
        res.set('Content-Type', 'application/json');
        var hash = crypto.createHash('sha256');



        try {
            const farmaciaLogado = new Farmacia(jwt.verify(req.headers.authorization, constantes.env.JWT_KEY).usuario.farmacias[0]);

            try {
                //    const usuario = new Usuario(jwt.verify(req.headers.authorization, constantes.env.JWT_KEY).funcionario);

                const farmacia = await Farmacia.findAll({
                    where: {
                        id: farmaciaLogado.id,
                    },
                    include: [{
                        model: Estoque,
                        attributes: ['id'],
                        include: [{
                            model: ProdutoEstoque,
                            attributes: ['id'],
                            include: [{
                                model: Produto,
                                where: { codigo: req.params.codigo }
                            }]
                        }],
                    }],
                });
                res.status(200).send({
                    mensagem: 'Produto localizado',
                    farmacia: farmacia
                });
            }
            catch (err) {
                res.status(404).send({
                    mensagem: 'Produto não localizado',
                });
            }
        }
        catch (err) {
            res.status(401).send({
                mensagem: 'Não autenticado',
            });
        }
    }),





    produtoInserir: (async (req, res) => {
        res.set('Content-Type', 'application/json');
        var hash = crypto.createHash('sha256');

        try {
            const farmaciaLogado = new Farmacia(jwt.verify(req.headers.authorization, constantes.env.JWT_KEY).usuario.farmacias[0]);

            const t = await database.sequelize.transaction();
            try {


                const novoProduto = await Produto.create({
                    produto: req.body.produto.produto,
                    codigo: req.body.produto.codigo,
                    principio_ativo: req.body.produto.principio_ativo,
                    fornecedor: req.body.produto.fornecedor,
                    data_compra: req.body.produto.data_compra,
                    validade: req.body.produto.validade,
                    estoque_minimo: req.body.produto.estoque_minimo,
                    estoque_maximo: req.body.produto.estoque_maximo,
                    situacao: req.body.produto.situacao,
                    valor_de_venda: req.body.produto.valor_de_venda,
                    valor_de_custo: req.body.produto.valor_de_custo,
                    unidade: req.body.produto.unidade,
                    localizacao_estoque: req.body.produto.localizacao_estoque,
                    marca: req.body.produto.marca,
                    tamanho: req.body.produto.tamanho,
                    origem: req.body.produto.origem,
                    tipo: req.body.produto.tipo,
                    descricao: req.body.produto.descricao,
                    imagem: req.body.produto.imagem

                });


                const estoque = await Estoque.findAll({
                    where: {
                        farmacia_id: farmaciaLogado.id
                    }
                }
                );

                novoProdutoEstoque = await ProdutoEstoque.create({
                    estoque_id: estoque[0].id,
                    produto_id: novoProduto.id
                });
                await t.commit();
                res.status(200).send({
                    mensagem: 'Produto Cadastrado',
                });
            }
            catch (err) {
                await t.rollback();
                res.status(422).send({
                    mensagem: 'Erro ao inserir',
                });
            }


        } catch (err) {
            res.status(401).send({
                mensagem: 'Não autenticado',
            });
        }

    })

}


