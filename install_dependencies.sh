#! /bin/bash

declare -a dependencies=("bootstrap" "joi" "react-useanimations")

for depends in "${dependencies[@]}"; do
    npm i $depends
    echo -e "\e[32m installed $depends \e[0m"
done
