import db from './db.js';
import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

app.get('/produtos', async (req, resp) => {
    try {
        let produtos = await db.tb_produto.findAll();
        resp.send(produtos);
    } catch (e) {
        resp.send({ erro: e.toString()})
    }
})

app.post('/produtos', async (req, resp) => {
    try {
        let { produto, categoria, precode, precopor, avaliacao, descricao, estoque, imagem, ativo, inclusao } = req.body;

        let m = await db.tb_produto.findOne({ where: { nm_produto: produto,
             ds_categoria: categoria, vl_preco_de: precode, vl_preco_por: precopor,
              vl_avaliacao:avaliacao, ds_produto: descricao, qtd_estoque: estoque,
               img_produto: imagem, bt_ativo: ativo, dt_inclusao: inclusao }});

        if (m != null)
            return resp.send({ erro: 'Produto já existe!' });

        let r = await db.tb_produto.create({
            nm_produto: produto,
            ds_categoria: categoria,
            vl_preco_de: precode,
            vl_preco_por: precopor,
            vl_avaliacao: avaliacao,
            ds_produto: descricao,
            qtd_estoque: estoque,
            img_produto: imagem,
            bt_ativo: ativo,
            dt_inclusao: inclusao
        })
        resp.send(r);
    } catch (e) {
        resp.send({ erro: 'Ocorreu um erro!'})
    }
})

app.put('/produtos/:id', async (req, resp) => {
    try {

        let id = req.params.id;
        let p = req.body;
        
        let r = await db.tb_matricula.update(
            {
                nm_produto: p.produto,
                ds_categoria: p.categoria,
                vl_preco_de: p.precode,
                vl_preco_por: p.precopor,
                vl_avaliacao: p.avaliacao,
                ds_produto: p.descricao,
                qtd_estoque: p.estoque,
                img_produto: p.imagem,
                bt_ativo: p.ativo,
                dt_inclusao: p.inclusao
            },
            {
                where: { id_produto: id }
            });
            
            resp.sendStatus(200);
            
    } catch(e) {
        resp.send({ erro: e.toString()});
    }
})

app.delete('/produtos/:id', async (req, resp) => {
    try {
        let r = await db.tb_produto.destroy({ where: {id_produto: req.params.id }})
        resp.sendStatus(200);
    } catch (e) {
        resp.send({ erro: e.toString() });
    }
})

app.listen(process.env.PORT,
    x => console.log(`subiu lindona princesa`))