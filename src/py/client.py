import socketio

sio = socketio.Client()
sio.connect('http://localhost:3000')

@sio.event
def message(data):
    print("Python:", sio.sid)

sio.disconnect()