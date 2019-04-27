
from flask import Flask, render_template,request

from twilio.rest import Client


app = Flask(__name__)



account = "" #do not commit lol
token = "" # do not commit lol
client = Client(account,token)

@app.route("/", methods=['GET','POST'])
def main():

    if request.method == 'POST':
            results = request.form
            #print(results.get(sendtext,-1))

            text_message = results.get('message',-1)
    
            message = client.messages.create(to = "+15104742763", from_ = "+19258923648", body = text_message) 


    return render_template("index.html")



if __name__ == "__main__":
    app.run()
