/**
 * @fileoverview This file contains the route for the endpoint /.
 *
 * @author Maor Bezalel
 * @author @todo add your info Itzik (delete the todo after adding the info)
 */

import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
    res.render('index', { title: 'Express' });
});

export default router;
