import { Router } from 'express'
import pool from '../database.js'
import multer from 'multer';
import path from 'path'

const router = Router(); //Crea un enrutador modular utilizando el módulo express.Router()

/*

*/
const storage = multer.diskStorage({
    destination: 'src/public/uploads/',
    filename: (req, file, cb) => {                          //Mayor o = 0 y Menor que 1
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        const ext = path.extname(file.originalname)
        cb(null, file.fieldname + '-' + uniqueSuffix + ext)
    }
})
const upload = multer({storage})


router.get('/addinscripcion', (req, res) => {
    res.render('inscripciones/addinscripcion')
});

router.post('/addinscripcion', async (req, res) => {
    try {
        const { nombre, email, telefono, tipo  } = req.body
        let newInscripcion = {}

        newInscripcion = { nombre, email, telefono, tipo }

/*

        if(req.file){
            const file = req.file
            const imagen_original = file.originalname
            const imagen = file.filename
            newProducto = { referencia, tipotelar, precio, descripcion, imagen }
        }else{
            newProducto = { referencia, tipotelar, precio, descripcion }
        }

*/        
        
        await pool.query('INSERT INTO inscripciones SET ?', [newInscripcion]);
        res.redirect('/listinscripcion');
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/listinscripcion', async (req, res) => {
    try {
        const [result] = await pool.query('SELECT * FROM inscripciones');
        res.render('inscripciones/listinscripcion', { inscripciones: result })
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/deleteinscripcion/:id', async (req, res) => {
    try {
        const { id } = req.params
        await pool.query('DELETE FROM inscripciones WHERE id = ?', [id]);
        res.redirect('/listinscripcion');
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// inscripciones llave que se asocia al resultado de la consulta.
router.get('/editinscripcion/:id', async (req, res) => {
    try {
        const { id } = req.params
        const [inscripcion] = await pool.query('SELECT * FROM inscripciones WHERE id = ?', [id]);
        const inscripcionEdit = inscripcion[0]
        res.render('inscripciones/editinscripcion', { inscripciones: inscripcionEdit })
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

/*
router.post('/editinscripcion/:id',  upload.single('file'), async (req, res) => {
*/

router.post('/editinscripcion/:id', async (req, res) => {
    try {
        const { id } = req.params
        const { nombre, email, telefono, tipo } = req.body
        let editInscripcion = {}

        editInscripcion = { nombre, email, telefono, tipo }
/*
        if(req.file){
            const file = req.file
            const imagen_original = file.originalname
            const imagen = file.filename
            editProducto = { referencia, tipotelar, precio, descripcion, imagen}
        }else{
            editProducto = { nombre, email, telefono, tipo }
        }
*/

        await pool.query('UPDATE inscripciones SET ? WHERE id = ?', [editInscripcion, id]);
        res.redirect('/listinscripcion');
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;