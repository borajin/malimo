import { response } from "express";

let url = "http://localhost:8080/interview"

let response = await fetch(url);

let viedo = document.querySelector('video');

video.src = URL.createObjectURL(blob);