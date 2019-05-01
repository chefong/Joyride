
from flask import Flask, render_template,request
import json
from twilio.rest import Client
from flask_cors import CORS
import jsonify
import ast
import requests
import urllib.request
import imghdr
import numpy as np

app = Flask(__name__)
CORS(app)


account = "" #do not commit lol
token = "" # do not commit lol
client = Client(account,token)
endpoint = "https://maps.googleapis.com/maps/api/directions/json?"

class Passenger():

    name = ""
    phone_number = ""
    address = ""
    picked_up = False

    def __init__(self, name,phone_number, address):
            self.name = name
            self.phone_number = phone_number
            self.address = address


def getDuration(origin,destination):


    origin = origin.replace(' ','+')
    destination = destination.replace(' ', '+')
    mode = "driving"
    key = "" 

 
    nav_request = "origin={}&destination={}&mode={}&key={}".format(origin,destination,mode,key)
    MapsRequest = endpoint + nav_request
    maps_response = urllib.request.urlopen(MapsRequest).read()
    directions = json.loads(maps_response)
    duration = directions["routes"][0]["legs"][0]["duration"]["value"]
    
    return int(duration)

def jsonToDicts(STR):
    
    STRI = list(STR)
    for i in range(0,len(STRI)):
        if STRI[i] == "\"":
            STRI[i] = "\'"

    STRIN = ''.join(STRI)
    STRING = ast.literal_eval(STRIN)

    return STRING

#passenger_stack
passenger_list = []
ETA1 = []
ETA2 = []
ETA3 = []
ETA4 = []
ETA5 = []
ETA6 = []
correct_eta = []
@app.route("/foo", methods=['GET','POST'])
def main():


    if request.method == 'POST':
        results = request.form



        a = results.to_dict()
        b = list(a.keys())


                

        passengers = b[0]

        print(passengers)
        print(type(passengers))



        pppp = jsonToDicts(passengers)
        print(type(pppp))
        print(pppp)

        origin = pppp['startAddress']
        final_destination = pppp['endAddress']
    
        


        allPassengers = pppp['allPassengers']



        passenger_list = []


        for i in range(0, len(allPassengers)):
            passenger_list.append(Passenger(allPassengers[i]['name'], allPassengers[i]['phoneNumber'], allPassengers[i]['address']))
            


        for i in range(0, len(passenger_list)):
            print(passenger_list[i])

        #size = len(passenger_list) + 1
        #table = np.zeros((int(size),int(size)))
        #origin = "3318 Celeste Drive, Riverside CA,92507"
        #destination = "41717 Palm Avenue, Fremont CA, 94539"
        #destination = destination.replace(' ', '+')


        


        #for i in range(0, len(passenger_list)):
        #    possibilities.append({'path': origin, 'time_taken': getDuration(origin,passenger_list[i].address) })
            
        #for i in range(0, len(passenger_list)):
        #    possibilities[i]['path'] += "->" + passenger_list[i].address
        #    possibilities
        


        if(len(passenger_list) == 1):

    
            DUR = getDuration(origin,passenger_list[0].address)

            DUR = DUR/60

            text_message1 = "Hello! Your friend has started driving. His/Her current ETA is {} minutes".format(DUR)
            client.messages.create(to=passenger_list[0].phone_number,from_="+19258923648",body=text_message1)
            return json.dumps([allPassengers[0]])









        elif(len(passenger_list) == 2):

            timez = []

            pOne = [origin,passenger_list[0].address, passenger_list[1].address,final_destination]
            pTwo = [origin,passenger_list[1].address, passenger_list[0].address,final_destination]

            duration = 0
            for i in range(0,3):
                duration += getDuration(pOne[i],pOne[i+1])
                ETA1.append(duration)

            timez.append(duration)
            duration = 0
            for i in range(0,3):
                duration += getDuration(pTwo[i],pOne[i+1])
                ETA2.append(duration)

            timez.append(duration)

            if (timez[0] < timez[1]):
                correct_eta = ETA1
                
                DUR1 = ETA1[0]
                DUR2 = ETA1[1]
                DUR1 = DUR1/60
                DUR2 = DUR2/60

                text_message1 = "Hello! Your friend has started driving. His/Her current ETA is {} minutes".format(DUR1)
                text_message2 = "Hello! Your friend has started driving. His/Her current ETA is {} minutes".format(DUR2)
                client.messages.create(to = passenger_list[0].phone_number,from_="+19258923648",body=text_message1)
                client.messages.create(to = passenger_list[1].phone_number,from_="+19258923648",body=text_message2)



                return json.dumps([allPassengers[0], allPassengers[1]])
            else:
                correct_eta = ETA2

                DUR1 = ETA2[1]
                DUR2 = ETA2[0]
                DUR1 = DUR1/60
                DUR2 = DUR2/60

                text_message1 = "Hello! Your friend has started driving. His/Her current ETA is {} minutes".format(DUR1)
                text_message2 = "Hello! Your friend has started driving. His/Her current ETA is {} minutes".format(DUR2)
                client.messages.create(to = passenger_list[1].phone_number,from_="+19258923648",body=text_message1)
                client.messages.create(to = passenger_list[0].phone_number,from_="+19258923648",body=text_message2)


                return json.dumps([allPassengers[1],allPassengers[0]])


        elif(len(passenger_list) == 3):

            p1 = [origin,passenger_list[0].address, passenger_list[1].address, passenger_list[2].address, final_destination]
            p2 = [origin,passenger_list[0].address, passenger_list[2].address, passenger_list[1].address, final_destination]
            p3 = [origin,passenger_list[1].address, passenger_list[0].address, passenger_list[2].address, final_destination]
            p4 = [origin,passenger_list[1].address, passenger_list[2].address, passenger_list[0].address, final_destination]
            p5 = [origin,passenger_list[2].address, passenger_list[0].address, passenger_list[1].address, final_destination]
            p6 = [origin,passenger_list[2].address, passenger_list[1].address, passenger_list[0].address, final_destination]
        
            possibilities = []
            

            duration = 0
            for i in range(0, 4):
                duration += getDuration(p1[i], p1[i+1])
                ETA1.append(duration)

            possibilities.append(duration)

        


            duration = 0
            for i in range(0, 4):
                duration += getDuration(p2[i], p2[i+1])
                ETA2.append(duration)

            possibilities.append(duration)



            duration = 0
            for i in range(0, 4):
                duration += getDuration(p3[i], p3[i+1])
                ETA3.append(duration)

            possibilities.append(duration)



            duration = 0
            for i in range(0, 4):
                duration += getDuration(p4[i], p4[i+1])
                ETA4.append(duration)

            possibilities.append(duration)




            duration = 0
            for i in range(0, 4):
                duration += getDuration(p5[i], p5[i+1])
                ETA5.append(duration)

            possibilities.append(duration)



            duration = 0
            for i in range(0, 4):
                duration += getDuration(p6[i], p6[i+1])
                ETA6.append(duration)

            possibilities.append(duration)


            ind = np.argmin(possibilities)
            print(possibilities[ind])


            if (ind == 0):
                print(p1)
                correct_path = [allPassengers[0],allPassengers[1],allPassengers[2]]
                correct_eta = ETA1


                DUR1 = ETA1[0]
                DUR2 = ETA1[1]
                DUR3 = ETA1[2]
                DUR1 = int(DUR1/60)
                DUR2 = int(DUR2/60)
                DUR3 = int(DUR3/60)
                text_message1 = "Hello! Your friend has started driving. His/Her current ETA is {} minutes".format(DUR1)
                text_message2 = "Hello! Your friend has started driving. His/Her current ETA is {} minutes".format(DUR2)
                text_message3 = "Hello! Your friend has started driving. His/Her current ETA is {} minutes".format(DUR3)
                client.messages.create(to = passenger_list[0].phone_number,from_="+19258923648",body=text_message1)
                client.messages.create(to = passenger_list[1].phone_number,from_="+19258923648",body=text_message2)
                client.messages.create(to = passenger_list[2].phone_number,from_="+19258923648",body=text_message3)

















            elif (ind == 1):
                print(p2)
                correct_path = [allPassengers[0],allPassengers[2],allPassengers[1]]
                correct_eta = ETA2






                DUR1 = ETA2[0]
                DUR2 = ETA2[1]
                DUR3 = ETA2[2]
                DUR1 = int(DUR1/60)
                DUR2 = int(DUR2/60)
                DUR3 = int(DUR3/60)
                text_message1 = "Hello! Your friend has started driving. His/Her current ETA is {} minutes".format(DUR1)
                text_message2 = "Hello! Your friend has started driving. His/Her current ETA is {} minutes".format(DUR2)
                text_message3 = "Hello! Your friend has started driving. His/Her current ETA is {} minutes".format(DUR3)
                client.messages.create(to = passenger_list[0].phone_number,from_="+19258923648",body=text_message1)
                client.messages.create(to = passenger_list[2].phone_number,from_="+19258923648",body=text_message2)
                client.messages.create(to = passenger_list[1].phone_number,from_="+19258923648",body=text_message3)














            elif (ind == 2):
                print(p3)
                correct_path = [allPassengers[1],allPassengers[0],allPassengers[2]]
                correct_eta = ETA3



                DUR1 = ETA1[0]
                DUR2 = ETA1[1]
                DUR3 = ETA1[2]
                DUR1 = int(DUR1/60)
                DUR2 = int(DUR2/60)
                DUR3 = int(DUR3/60)
                text_message1 = "Hello! Your friend has started driving. His/Her current ETA is {} minutes".format(DUR1)
                text_message2 = "Hello! Your friend has started driving. His/Her current ETA is {} minutes".format(DUR2)
                text_message3 = "Hello! Your friend has started driving. His/Her current ETA is {} minutes".format(DUR3)
                client.messages.create(to = passenger_list[1].phone_number,from_="+19258923648",body=text_message1)
                client.messages.create(to = passenger_list[0].phone_number,from_="+19258923648",body=text_message2)
                client.messages.create(to = passenger_list[2].phone_number,from_="+19258923648",body=text_message3)


















            elif (ind == 3):
                print(p4)
                correct_path = [allPassengers[1],allPassengers[2],allPassengers[0]]
                correct_eta = ETA4





                DUR1 = ETA1[0]
                DUR2 = ETA1[1]
                DUR3 = ETA1[2]
                DUR1 = int(DUR1/60)
                DUR2 = int(DUR2/60)
                DUR3 = int(DUR3/60)
                text_message1 = "Hello! Your friend has started driving. His/Her current ETA is {} minutes".format(DUR1)
                text_message2 = "Hello! Your friend has started driving. His/Her current ETA is {} minutes".format(DUR2)
                text_message3 = "Hello! Your friend has started driving. His/Her current ETA is {} minutes".format(DUR3)
                client.messages.create(to = passenger_list[1].phone_number,from_="+19258923648",body=text_message1)
                client.messages.create(to = passenger_list[2].phone_number,from_="+19258923648",body=text_message2)
                client.messages.create(to = passenger_list[0].phone_number,from_="+19258923648",body=text_message3)

















            elif (ind == 4):
                print(p5)
                correct_path = [allPassengers[2],allPassengers[0],allPassengers[1]]
                correct_eta = ETA5







                DUR1 = ETA1[0]
                DUR2 = ETA1[1]
                DUR3 = ETA1[2]
                DUR1 = int(DUR1/60)
                DUR2 = int(DUR2/60)
                DUR3 = int(DUR3/60)
                text_message1 = "Hello! Your friend has started driving. His/Her current ETA is {} minutes".format(DUR1)
                text_message2 = "Hello! Your friend has started driving. His/Her current ETA is {} minutes".format(DUR2)
                text_message3 = "Hello! Your friend has started driving. His/Her current ETA is {} minutes".format(DUR3)
                client.messages.create(to = passenger_list[2].phone_number,from_="+19258923648",body=text_message1)
                client.messages.create(to = passenger_list[0].phone_number,from_="+19258923648",body=text_message2)
                client.messages.create(to = passenger_list[1].phone_number,from_="+19258923648",body=text_message3)













            else:
                print(p6)
                correct_path = [allPassengers[2],allPassengers[1],allPassengers[0]]
                correct_eta = ETA6

                DUR1 = ETA1[0]
                DUR2 = ETA1[1]
                DUR3 = ETA1[2]
                DUR1 = int(DUR1/60)
                DUR2 = int(DUR2/60)
                DUR3 = int(DUR3/60)
                text_message1 = "Hello! Your friend has started driving. His/Her current ETA is {} minutes".format(DUR1)
                text_message2 = "Hello! Your friend has started driving. His/Her current ETA is {} minutes".format(DUR2)
                text_message3 = "Hello! Your friend has started driving. His/Her current ETA is {} minutes".format(DUR3)
                client.messages.create(to = passenger_list[2].phone_number,from_="+19258923648",body=text_message1)
                client.messages.create(to = passenger_list[1].phone_number,from_="+19258923648",body=text_message2)
                client.messages.create(to = passenger_list[0].phone_number,from_="+19258923648",body=text_message3)





            return (json.dumps(correct_path)) 

        

        '''


    
        for i in range(0, len(passenger_list)):
            text_message = "Hello! Your friend {} has scheduled a trip with you. You're place in the order is {}".format(Driver,i+1)
            message = client.messages.create(to = passenger_list[i].phone_number, from_ = driver_number, body = text_message)




            
        #passengers.replace("\"", "\'") 


        #print("below is .lists()")
        #print(results.lists())
        #print("Below is lisvalues")
        #print(results.listvalues())
        #print("Below is values")
        #print(results.values())
        #print("This is the second one")
        #print(results[1])
        #print(results
        #print("PLEAASEEE WORK")
        #the_dict = json.loads(request)
        #print(the_dict)
        #print("HIIII")
        #print(json.loads(request.content.decode('utf-8')))
        #print(request.json())

        '''




    return json.dumps({'status': 0})






@app.route("/sms",methods=['GET','POST'])
def sms():


    if request.method == 'POST':
        results = request.form

        print(results)


        RR = results.to_dict()
        a = list(RR.keys())
        c = a[0]
        print(c)
        print(type(c))
        DD = jsonToDicts(c)
        print(DD)
        print(type(DD))

        number = DD['phoneNumber']
        name = DD['name']

        #b = a[1:-1]
        #print(b)
        #print(type(b))


        text_message = "Hey {}, I'm outside.".format(name)
        #other_text_message = "Hey, I just picked up {}, I'm picking you up next".format(name)
        message1 = client.messages.create(to=number,from_="+19258923648",body = text_message)
        #message2 = client.messages.create(to=number,from_="+19258923648",body = other_text_message)




    return json.dumps({'status':0})





            




if __name__ == "__main__":
    app.run()
