#!/bin/bash

#source ./credentials.yml
myid=$(cat ./credentials.yml|grep "APP_ID")
myid=$(echo "$myid"|sed "s/APP_ID='//; s/'//")

echo $myid
valid=$(echo $myid| grep "ari:cloud")
if [ -z "$myid" ];then
   echo "APP_ID variable not found in credentials.yml file"
else
   var1='${id}'
   var2=$myid
   sed -i -e "s|$var1|$var2|g" ./manifest.yml
fi

check_val=$(cat manifest.yml|grep "ari:cloud:ecosystem")
if [ "$check_val" ] ;then
   echo "App Id added successfully"
else
   echo "App Id not Added"
fi


#    "predeploy":"#!/bin/bash\nmyid=$(cat ../../credentials.yml|grep \"APP_ID\")\nmyid=$(echo \"$myid\"|sed \"s/APP_ID='//; s/'//\")\nvalid=$(echo $myid| grep \"ari:cloud\")\nif [ -z \"$myid\" ];then\n\techo \"APP_ID variable not found in credentials.yml file\"\nelse\n\tvar1='${id}'\n\tvar2=$myid\n\tsed -i -e \"s|$var1|$var2|g\" ../../manifest.yml\nfi\ncheck_val=$(cat ../../manifest.yml|grep \"ari:cloud:ecosystem\")\nif [ \"$check_val\" ] ;then\n\techo \"App Id added successfully\"\nelse\n\techo \"App Id not Added\"\nfi",
