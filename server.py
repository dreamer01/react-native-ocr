# -*- coding: utf-8 -*-
"""
Created on Thu Jul 12 14:26:41 2018

@author: pushpendra.singh
"""

import pytesseract
from pyzbar.pyzbar import decode
import os
from skimage.filters import threshold_local
import cv2
import re
import imutils
try:
    import Image
except ImportError:
    from PIL import Image    
from flask import Flask,request, jsonify

app = Flask(__name__)

UPLOAD_FOLDER = os.path.basename('images')
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

def processImage(image):
    
    imgSrc = './images/'+image;
    
    result = decode(Image.open(imgSrc))
    
    if(result):
        return(result[0].data.decode("utf-8"))
    else:
        image = cv2.imread(imgSrc)
        image = imutils.resize(image, height = 500)  
        gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)    
        T = threshold_local(gray, 15, offset = 12, method = "gaussian")
        final = (gray > T).astype("uint8") * 255    
        textFound = pytesseract.image_to_string(final)            
        return (textFound)
            
    
    #cv2.imshow("Final", final)
    #cv2.waitKey(0);    
    
    

@app.route('/',methods=['GET','POST'])
def GetNoteText():
    if request.method == 'POST':
        file = request.files['img']
        filename = file.filename+'.jpg';
        file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))  
        result = processImage(filename)
        return jsonify({"Text": result});            
    else:
        return "Please make a POST request."

if __name__ == '__main__':
    app.run()

    
    