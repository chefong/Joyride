
from flask import Flask, render_template,request
import json
from twilio.rest import Client


app = Flask(__name__)



account = "" #do not commit lol
token = "" # do not commit lol
client = Client(account,token)


class Passenger():

    name = ""
    phone_number = ""
    address = ""
    picked_up = False

    def __init__(self, name,phone_number, address):
            self.name = name
            self.phone_number = phone_number
            self.address = address


#passenger_stack



@app.route("/", methods=['GET','POST'])
def main():

    if request.method == 'POST':
            results = request.form
            #print(results.get(sendtext,-1))
            
            PO = json.loads(results.get(passenger_order,-1))
            #passenger_list = []
            for i in range(0,len(PO)):
                passenger_list.append(Passenger(PO[i].name, PO[i].phone_number, POI.address)
                text_message = "Hello! Your friend {} has scheduled a trip with you. You're place in the order is {}".format(Driver,i+1)
                message = client.messages.create(to = passenger_list[i].phone_number, from_ = driver_number, body = text_message)

            

    return render_template("index.html")


            
@app.route("/passengers",methods=['GET','POST'])
def pickup():
    
    if request.method == 'POST':
        results = request.form


        #if passenger is picked up
        #passenger_list.pop(0)

    return render_template("index.html")







@app.route("/passengers",methods=['GET','POST'])
def enroute():
    if request.method == 'POST':
        results = request.form

        #if driver is 5 minutes away
            #text_message = "Hi {}, your friend {} is 5 minutes away. Be ready! :) ".format(passenger[0]
            # message = client.message.create(to = passenger_list[0].phone_number, from_ = driver_number, body = text_message)





if __name__ == "__main__":
    app.run()
