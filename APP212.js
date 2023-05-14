const http = require ('http')
const fs = require('fs');
 const port = 3000;
const server = http.createServer((req,res)=>{
    const url = req.url;
    const method = req.method;    
    if(url === '/'){     
        res.setHeader('Content-Type','text/html');  
        fs.readFile('message.txt',{encoding: 'utf-8'} ,(err,data)=>{
            if(err) {
                console.log(err) ;
          }
            console.log("data from data file" + data)
            //  res.setHeader('Content-Type','text/html');
              res.write('<html>');
             res.write('<head><title>My 1st page </title></head>');
             res.write('<body> '+ data +'</body>')
            res.write('<body><form action ="/message" method="POST"><label for="x">type</label><input type="text" name="message" id="x"><button type="submit">Send</button></form></body>')
             res.write('</html>')
            return res.end();
        })

  }
    else if(url ==="/message" && method === "POST"){
        const body =[];
        req.on('data',(chunk)=>{
            console.log(chunk);
        body.push(chunk)
         });
        return req.on('end',()=>{
           const parseBody = Buffer.concat(body).toString();
           console.log(parseBody)
           const message = parseBody.split('=')[1]
          // Fs.writeFileSync('message.txt',message);
           fs.writeFile('message.txt',message, ( err )=> {
            if(err){
                console.log(err)
            }
            res.statusCode = 302;

            res.setHeader('Location','/')
           return res.end();
           });
       
         })
    }
    // res.setHeader('Content-Type','text/html');
    // res.write('<html>');
    // res.write('<head><title>My 1st page </title></head>');
    // res.write('<body><h1>hello from the other side</h></body>')
    // res.write('</html>')
    // res.end();
})
server.listen(port)
 