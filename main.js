class voiceRecorder  {
 constructor(){
    if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia){
        console.log('user media supported');
    }
    else{
        console.log(' user media not supported');
        
    }
    this.mediaRecorder
    this.stream
    this.chunks =[]
    this.isRecording = false
    
    this.recorderRef = document.querySelector("#recorder");
    this.playerRef = document.querySelector("#player");
    this.startRef = document.querySelector("#start");
    this.stopRef = document.querySelector("#stop");
    this.downloadRef = document.querySelector("#download")

    this.startRef.onclick = this.startRecording.bind(this);
    this.stopRef.onclick = this.stopRecording.bind(this);
    this.downloadRef.onclick = this.downloadRecording.bind(this);

    this.constraints = {
        audio:true,
        video:false
    }
 }
 // handle if audio recording is successful
 handleSuccess(stream){
    this.stream = stream
    this.stream.oninactive = () => {
        console.log("streaming ended")
    }
    this.recorderRef.srcObject = this.stream
    this.mediaRecorder = new MediaRecorder(this.stream)
    this.mediaRecorder.ondataavailable = this.onMediaRecorderDataAvailable.bind(this)
    this.mediaRecorder.onstop = this.onMediaRecorderStop.bind(this);
    this.recorderRef.play();
    this.mediaRecorder.start();
 }

 onMediaRecorderDataAvailable(e){this.chunks.push(e.data)}
 onMediaRecorderStop(e){
    const blob = new Blob(this.chunks,{'type':'audio/webm; codesc=opus'})
    const audioURL = window.URL.createObjectURL(blob);
   
    this.downloadRef.href =   URL.createObjectURL(new Blob(this.chunks));
    this.playerRef.src = audioURL;
    this.chunks = []
    this.stream.getAudioTracks().forEach(track => track.stop());
    this.stream = null
 }

 // start the recording 
 startRecording(){
if(this.isRecording) return
this.isRecording = true
this.startRef.innerHTML = "recording"
this.playerRef.src = '';
navigator.mediaDevices.getUserMedia(this.constraints)
.then(this.handleSuccess.bind(this))
.catch(this.handleSuccess.bind(this))
 }

 // stop the recording
 stopRecording(){
    if(!this.isRecording) return
    this.isRecording = false
    this.startRef.innerHTML = "record"
    this.recorderRef.pause();
    this.mediaRecorder.stop()
 }
 //download the recording
 downloadRecording(){
    downloadLink.download = 'acetest.wav'
 }
}
window.voiceRecorder = new voiceRecorder(); 

/// new function
const start = document.querySelector('[data-recording="true"]');
start.addEventListener('click', function onClick(event) 
{
    // change the background color
    document.querySelector('[data-recording="true"]').style.backgroundColor = 'red';
}); 