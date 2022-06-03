const express = require("express");
const router = express.Router();
const autenticacao = require("./controllers/autenticacaoController");
const estoque = require("./controllers/estoqueController");
const bodyParser = require('body-parser');
var jsonParser = bodyParser.json();

// AUTENTICACAO
router.post("/autenticacao", jsonParser, autenticacao.autenticar);
router.get("/autenticacao", jsonParser, autenticacao.validar);


// ESTOQUE
router.get("/estoque", jsonParser, estoque.listar);
router.get("/estoque/buscar/codigo/:codigo", jsonParser, estoque.buscarCodigo);
router.post("/estoque/inserir", jsonParser, estoque.produtoInserir);



module.exports = router;

