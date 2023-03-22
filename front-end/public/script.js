let docTitle= document.title;
window.addEventListener("blur",()=>{
    document.title="Come Back Bro ☹";
});
window.addEventListener("focus",()=>{
    document.title=docTitle;
})