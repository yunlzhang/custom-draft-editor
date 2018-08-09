const koa = require('koa');
const app = new koa();
const fs = require('fs');
const router = require('koa-router')();
const cors = require('koa-cors');

const multer = require('koa-multer');
const upload = multer({ dest: 'server/uploads/' });


const static = require('koa-static');

router.get('/',ctx => {
    return ctx.body = 'koa'
})


router.post('/upload',upload.single('file'), async (ctx) => {
    let {path,mimetype} = ctx.req.file;
    await fs.rename(
        path,
        path + '.' + mimetype.split('/')[1],
        (err)=> {
            if(err){
                return ctx.body = {
                    error:err
                }
            }
        }
    )
	return ctx.body = {
        code:200,
        url:`http://localhost:9001${path.replace('server','')}.${mimetype.split('/')[1]}`
    }
})



app.use(static(__dirname))

app.use(cors());

app.use(router.routes()).use(router.allowedMethods())

app.listen(9001, ()=>{
    console.log('koa is listening in 9001');
})