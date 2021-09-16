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

            let { produto, categoria, precode, precopor, avaliacao, descricao, estoque, imagem } = req.body;

            if(estoque === NaN)
            return resp.send({erro:'O campo estoque aceita apenas números!'}); 
            
            
            if (produto === '' || produto.length < 4)
            return resp.send({erro :'O campo produto deve ser preenchido e ter pelo menos 4 caracteres!'}); 
            

            if (categoria === '' || categoria.length < 4)
            return resp.send({erro: 'O campo categoria é obrigatório e deve possuir mais de 4 caracteres!'});
           

            if (avaliacao === null || avaliacao <= 0)
            return resp.send({erro: 'O campo avalição deve ser maior que 0!'}); 
            

            if (imagem === '')
            return resp.send({erro: 'O campo imagem deve ser preenchido!'}); 
           
       
            if (precode <= 0  || precopor <= 0  || estoque <= 0 )
            return resp.send({erro: 'Os campos de preços e estoque precisam ser maiores que 0!'}); 
            

            if (descricao === '' || descricao.length < 10)
            return resp.send({erro: 'O campo descrição deve ser preenchido e ter mais que 10 caracteres!'}); 
            

        let m = await db.tb_produto.findOne({ where: { nm_produto: produto }});

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
        })
        resp.send(r);
    } catch (e) {
        resp.send({erro: e.toString()})
    }
})

app.put('/produtos/:id', async (req, resp) => {
    try {

        let id = req.params.id;
        let p = req.body;
        
        let r = await db.tb_produto.update(
            {
                nm_produto: p.produto,
                ds_categoria: p.categoria,
                vl_preco_de: p.precode,
                vl_preco_por: p.precopor,
                vl_avaliacao: p.avaliacao,
                ds_produto: p.descricao,
                qtd_estoque: p.estoque,
                img_produto: p.imagem,
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