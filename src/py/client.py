import socketio
import json
import datetime

class Backend:
    def __init__(self):
        self.sio = socketio.Client()
        self.class_map = {"monday_selector": 0,
                          "tuesday_selector": 1,
                          "wednesday_selector": 2,
                          "thursday_selector": 3,
                          "friday_selector": 4,
                          "saturday_selector": 5,
                          "sunday_selector": 6,}
        self.schedule = json.load(open("time_schedule.json", "r"))
        self.schedule_file = open("schedule.txt", "w+")

    def setupEventHandlers(self):
        @self.sio.event
        def connect():
            print("Python Local: Connected to the server with id")
            print ("Validating...")
            self.sio.emit("message", "vp")

        @self.sio.event
        def message(data):
            print("Python Local:", data)

        @self.sio.event
        def disconnect():
            print("Python Local: Disconnected from the server")

        #MAIN EVENTS END---------------------------------------------------------------------------------

        @self.sio.event
        def set_time(data):
            self.schedule[self.class_map.get(data.split(".")[0])] = str(data.split(".")[1])
            with open("time_schedule.json", "w+") as file:
                json.dump(self.schedule, file)

        @self.sio.event
        def check_time(data):
            current_time = datetime.datetime.now()
            limits = str(self.schedule[self.class_map[current_time.strftime("%A").lower() + "_selector"]])
            time_h = int(current_time.strftime("%H"))
            time_m = int(current_time.strftime("%M"))
            lower_limit_h = int(limits[:2])
            lower_limit_m = int(limits[2:4])
            upper_limit_h = int(limits[4:6])
            upper_limit_m = int(limits[6:])
            if time_h > lower_limit_h and time_h < upper_limit_h: result = "true"
            elif time_h == lower_limit_h or time_h == upper_limit_h:
                if time_h == lower_limit_h and time_h == upper_limit_h:
                    if time_m >= lower_limit_m and time_m <= upper_limit_m: result = "true"
                    else: result = "false"
                if time_h == lower_limit_h:
                    if time_m >= lower_limit_m: result = "true"
                    else: result = "false"
                else:
                    if time_m <= upper_limit_m: result == "true"
                    else: result = "false"
            else: result = "false"
            self.sio.emit("message", "j" + "update_on_time" + "-" + result)
    
    def main(self):
        self.sio.connect('http://localhost:3000')
        self.sio.wait()

if __name__ == "__main__":
    b = Backend()
    b.setupEventHandlers()
    b.main()