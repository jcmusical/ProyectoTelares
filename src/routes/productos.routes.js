import { Router } from 'express'
import pool from '../database.js'
import multer from 'multer';
import path from 'path'

const router = Router(); //Crea un enrutador modular utilizando el módulo express.Router()

const storage = multer.diskStorage({
    destination: 'src/public/uploads/',
    filename: (req, file, cb) => {                          //Mayor o = 0 y Menor que 1
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        const ext = path.extname(file.originalname)
        cb(null, file.fieldname + '-' + uniqueSuffix + ext)
    }
})

const upload = multer({storage})

router.get('/add', (req, res) => {
    res.render('productos/add')
});

router.post('/add', upload.single('file') , async (req, res) => {
    try {
        const { referencia, tipotelar, precio, descripcion } = req.body
        let newProducto = {}
        if(req.file){
            const file = req.file
            const imagen_original = file.originalname
            const imagen = file.filename
            newProducto = { referencia, tipotelar, precio, descripcion, imagen }
        }else{
            newProducto = { referencia, tipotelar, precio, descripcion }
        }
        await pool.query('INSERT INTO productos SET ?', [newProducto]);
        res.redirect('/list');
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/list', async (req, res) => {
    try {
        const [result] = await pool.query('SELECT * FROM productos');
        res.render('productos/list', { productos: result })
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/delete/:id', async (req, res) => {
    try {
        const { id } = req.params
        await pool.query('DELETE FROM productos WHERE id = ?', [id]);
        res.redirect('/list');
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// productos llave que se asocia al resultado de la consulta.
router.get('/edit/:id', async (req, res) => {
    try {
        const { id } = req.params
        const [producto] = await pool.query('SELECT * FROM productos WHERE id = ?', [id]);
        const productoEdit = producto[0]
        res.render('productos/edit', { productos: productoEdit })
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.post('/edit/:id',  upload.single('file'), async (req, res) => {
    try {
        const { id } = req.params
        const { referencia, tipotelar, precio, descripcion } = req.body
        let editProducto = {}
        if(req.file){
            const file = req.file
            const imagen_original = file.originalname
            const imagen = file.filename
            editProducto = { referencia, tipotelar, precio, descripcion, imagen}
        }else{
            editProducto = { referencia, tipotelar, precio, descripcion}
        }
        await pool.query('UPDATE productos SET ? WHERE id = ?', [editProducto, id]);
        res.redirect('/list');
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/quienessomos', ( req , res)=>{
    res.render('productos/quienessomos')
});

router.get('/inscripcion', ( req , res)=>{
    res.render('productos/inscripcion')
});


router.get('/eventos', ( req , res)=>{
    res.render('productos/eventos')
});

/*
router.get('/productos', ( req , res)=>{
    res.render('productos/productos')
});
*/

export default router;