<script>
    import { v4 as uuid } from 'uuid' // library that creates an ID that is unique to every request
    import Camera from "$lib/Camera.svelte" // library that enable to open camerain the app

    let cameraShow = false
    let images = []
    let name = ""
    let reason = ""
    let amount = ""
    let payTo = "Scoutbook"
    let paymentDetails = ""
    let message = ""
    

    const submit = async () => { // has an await funciton in it. line 26
        const data = {
            id: uuid(),
            name,
            reason,
            amount,
            images,
            payTo,
            paymentDetails,
        }
        // console.log({data})
        const res = await fetch('/receipt', { // fetch sends the data to a path on the server (to the src/routes/receipt.js file).
            method: 'post', // calls the post function in receipt.js. Post function takes the data and posts it to the server localhost:3000
            body: JSON.stringify(data) // body is required by the fetch method. It is the info we send to the server. Data object is the info we are sending. JSON.stringify turns the object passed to it into a string to send to a server, where it gets turned into a js object. Done for security purposes
        })
        // const json = await res.json()
        message = `Your request for $${amount} has been sent`
        reset()
        document.body.scrollIntoView(); // scrolls to the top when submit
        if (images.length == 0) {
            
        }
    }

    const cameraDone = (ev) => {
        images = [...images, ev.detail.image] //adds an image to images list above
        cameraShow = false
    }

    const reset = () => {
        images = []
        reason = ""
        amount = ""
    }


</script>

<div class="top">
    <div class="content">
        <h2>Troop 69 Reimbursement Form</h2>
        <p>Submit receipts for reimbersement</p>
    </div>
</div>
<form action="/receipt" method="post" on:submit|preventDefault={submit} enctype="multipart/form-data" class="content">
    {#if message != ""}
        <div class="alert alert-primary" role="alert">
            {message}
        </div>
    {/if}
    <div class="mb-3">
        <label for="nameForm" class="form-label">Your Name</label>
        <input type="text" class="form-control" id="nameForm" bind:value={name} required> 
    </div>
    <div class="mb-3">
        <label for="reasonForm" class="form-label">Reason</label>
        <div id="reasonFormMessage" class="form-text">What was this expense for (activity and purpose)</div>
        <input type="text" class="form-control" id="reasonForm" aria-describedby="reasonFormMessage"bind:value={reason} required>
    </div>
    <div class="mb-3">
        <label for="file" class="form-label">Receipt Images</label>
        <div id="fileMessage1" class="form-text">Attach receipt image(s)</div>
        <div class="images">
            {#each images as image}
                <!-- Add an img tag for each image. The src is a variable image {image}. display:flex and gap -->
                <img src={image} alt="Receipt Image">
            {/each}
            <div>
                <button type="button" class="btn btn-lg btn-warning" on:click={() => cameraShow = true}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" style="width:30px;">
                        <path fill="#fff" d="M194.6 32H317.4C338.1 32 356.4 45.22 362.9 64.82L373.3 96H448C483.3 96 512 124.7 512 160V416C512 451.3 483.3 480 448 480H64C28.65 480 0 451.3 0 416V160C0 124.7 28.65 96 64 96H138.7L149.1 64.82C155.6 45.22 173.9 32 194.6 32H194.6zM256 384C309 384 352 341 352 288C352 234.1 309 192 256 192C202.1 192 160 234.1 160 288C160 341 202.1 384 256 384z"/>
                    </svg>
                </button>
            </div>

        </div>
    </div>
    <div class="mb-3">
        <label for="amount" class="form-label">Amount</label>
        <div id="amountMessage" class="form-text">Dollar amount requested for this reimbursement</div>
        <input type="text" class="form-control" id="amount" aria-describedby="amountMessage" bind:value={amount} required>
    </div>
    <div class="mb-3">
        <label for="scoutbook" class="form-label">How to receive funds</label>
        <div id="reimbursementMessage" class="form-text">How do you want to receive your reimbursement?</div>
        <div class="form-check">
            <input class="form-check-input" type="radio" name="flexRadioDefault" id="scoutbook" bind:group={payTo} value="Scoutbook">
            <label class="form-check-label" for="scoutbook">
            Scoutbook credit
            </label>
        </div>
        <div class="form-check">
            <input class="form-check-input" type="radio" name="flexRadioDefault" id="check" bind:group={payTo} value="Check">
            <label class="form-check-label" for="check">
            Check
            </label>
        </div>
        <div class="form-check">
            <input class="form-check-input" type="radio" name="flexRadioDefault" id="venmo" bind:group={payTo} value="Venmo">
            <label class="form-check-label" for="venmo">
            Venmo
            </label>
        </div>
        <div class="form-check">
            <input class="form-check-input" type="radio" name="flexRadioDefault" id="applePay" bind:group={payTo} value="ApplePay">
            <label class="form-check-label" for="applePay">
            Apple Pay
            </label>
        </div>
    </div>
    <div class="mb-3">
        <label for="paymentDelatils" class="form-label">Payment details</label>
        <div id="paymentDetailsMessage" class="form-text">
            {#if payTo == "Scoutbook"}
                Enter the scout's account to credit.
            {:else if payTo == "Check"}
                Enter the mailing address to send a check.
            {:else if payTo == "Venmo"}
                Enter your Venmo username.
            {:else if payTo == "ApplePay"}
                Enter ApplePay user name or phone number.
            {:else}
                Unknown payment method.
            {/if}
        </div>
        <textarea class="form-control" id="paymentDelatils" rows="3" bind:value={paymentDetails} required></textarea>
    </div>
    {#if images.length == 0}
        <p>Please attach a picture of your reciept</p>
    {/if}
    <button type="submit" class="btn btn-primary" disabled={images.length == 0}>Submit</button>
</form>
<!-- Button - cameraShow = true. When cancel is clicked, cameraShow = false and the pop disappears -->
{#if cameraShow}
  <Camera on:cancel={() => cameraShow = false} on:done={cameraDone} /> 
{/if}




<style>
    .content{
        margin:0 auto;
        width:90%;
        max-width:700px;
    }

    form {
        padding:30px 0;
    }

    .form-label:after{
        content:" *";
        color:red;
    }

    .top{
        background-color: white;
        padding:40px;
        margin:0 auto;
    }
    
    .form-text{
        padding-bottom:2px;
    }

    .images{
        display:flex;
        gap: 10px;
        flex-wrap: wrap;
    }
    
    .images img{
        border: 1px solid #555;
        width: 300px;
    }

    /* .form-control{
        margin-top:20px;
        margin-bottom:10px;
    }
    .form-label{
        margin:0;
    } */
    

</style>
