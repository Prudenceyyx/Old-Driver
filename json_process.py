import json
import pandas as pd

start_str = "eqfeed_callback({\"type\":\"FeatureCollection\","
end_str =");"

f = open('earthquake.js','r')   #earthquake data
json_str = f.read()

json1 = "{"+json_str[44:]
json1 = json1[:-3]

MAXN = 3000                   # number of total drawing circles
df = pd.read_csv('train_filter.csv').sample(MAXN) # taxi data
new_dict = json.loads(json1)

temp = new_dict["features"][1]  #append to fit the size
for i in range(288,MAXN):
    new_dict["features"].append(temp)

json2 = json.dumps(new_dict)    #p.s. new_dict1 = new_dict
f2 = open("earth2.js","w")
f2.write(json2)
f2.close()
f3 = open("earth2.js","r")
new_dict1 = json.loads(f3.read())   

for i in range(288):
    new_dict1["features"][i]["geometry"]["coordinates"][0] = df.values[i][6]
    new_dict1["features"][i]["geometry"]["coordinates"][1] = df.values[i][7]
    new_dict1["features"][i]["properties"]["mag"] = df.values[i][5]
    if (i&1):
        new_dict["features"][i]["geometry"]["coordinates"][1] *= 1

for i in range(288,MAXN):
    new_dict1["features"][i]["geometry"]["coordinates"][0] = df.values[i][6]
    new_dict1["features"][i]["geometry"]["coordinates"][1] = df.values[i][7]
    new_dict1["features"][i]["properties"]["mag"] = df.values[i][5]

json2 = json.dumps(new_dict1)
earth2 = start_str + json2[1:] + end_str
f0_2 = open("earthquake_big.js","w")
f0_2.write(earth2)



