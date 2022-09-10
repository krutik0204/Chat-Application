//node server which will handle socket io connections
//8000 port
const io=require('socket.io')(8000)

const user={};

io.on('connection', (socket) =>{          //socket.io instance 
  
    socket.on('new-user-joined',(username)=>{
        user[socket.id]=username; 
        if(username!=null)
        socket.broadcast.emit('user-joined',username);
    });

    socket.on('send',data =>{
        socket.broadcast.emit('receive',{data:data, username:user[socket.id]})
    });

    socket.on('disconnect',data=>{
        socket.broadcast.emit('left',user[socket.id])
        delete user[socket.id]
    });

})