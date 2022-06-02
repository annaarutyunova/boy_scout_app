<script>
  import { onMount, onDestroy, createEventDispatcher } from 'svelte'

  const dispatch = createEventDispatcher();
  const pixelRatio = window.devicePixelRatio || 1;

  let cameraSrc = null
  let cameraStatus = null
  let cameraStream = null
  let cameraImage
  let media = {
    audio: false,
    video: {
      facingMode: 'environment'
    },
  }
  let imgDataUrl = ''
  let width = 1920
  let height = 1440
  let video

  onMount(async () => {
    init()
	})

  onDestroy(async () => {
    cameraOff()
  })

  const init = () => {
    if(!video){
      setTimeout(init, 200)
      return false;
    }
    video.width = width / pixelRatio
    video.height = height / pixelRatio
    cameraOn()
  }

  const cameraOn = async () => {
    if(cameraStatus == 'on'){ return null }
    cameraStatus = 'on'
    cameraStream = await window.navigator.mediaDevices.getUserMedia(media)
    try {
      video.srcObject = cameraStream;
    } catch (error) {
      cameraSrc = URL.createObjectURL(cameraStream);
    }
    video.play()
  }

  const cameraOff = () => {
    if(cameraStream){
      cameraStream.getTracks()[0].stop()
    }
    cameraStatus = 'off'
  }

  const cameraClick = (ev, data) => {
    ev.preventDefault();
    ev.stopPropagation();
    cameraImage.getContext('2d').drawImage(video, 0, 0, width / pixelRatio, height / pixelRatio);
    imgDataUrl = cameraImage.toDataURL()
    cameraOff()
    done()
  }

  const cancel = (ev) => {
    ev.preventDefault()
    dispatch('cancel')
  }

  const done = () => {
    dispatch('done', {
      image: imgDataUrl 
    })
  }

</script>

<div class="camera">
  <video bind:this={video} src={cameraSrc} width={parseInt(width / pixelRatio)} height={parseInt(height / pixelRatio)} autoplay on:click={cameraClick}></video>
  <div class="buttons">
    <button class="btn btn-danger" on:click={cameraClick}><i class="fas fa-finger-up"></i> Take Photo</button>
    <button class="btn btn-default" on:click={cancel}><i class="fas fa-finger-up"></i> Cancel</button>
  </div>
  <canvas bind:this={cameraImage} width={parseInt(width / pixelRatio)} height={parseInt(height / pixelRatio)} style="display: none;"></canvas>
</div>

<style>
  .camera{
    background-color: rgba(255,255,255,.8);
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 100;
  }
  .buttons{
    position: fixed;
    left: 0;
    right: 0;
    bottom: 20px;
    text-align: center;
    z-index: 200;
  }
</style>

