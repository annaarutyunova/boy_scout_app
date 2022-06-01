<script>
    let name = ""
    let reason = ""
    let amount = ""
    let receipt = ""
    let payTo = "scoutbook"
    let paymentDetails = ""

    const submit = async () => {
        const data = {
            name,
            reason,
            amount,
            receipt,
            payTo,
            paymentDetails,
        }
        console.log({data})
        console.log(data)
    }
    const onChooseFile = async (ev) => {
        const files = ev.target.files
        console.log({files})
    }
    


</script>

<div class="top">
    <div class="content">
        <h2>Troop 69 Reimbursement Form</h2>
        <p>Submit receipts for reimbersement</p>
    </div>
</div>
<form action="/" method="post" on:submit|preventDefault={submit} enctype="multipart/form-data" class="content">
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
        <label for="file" class="form-label">Receipt</label>
        <div id="fileMessage1" class="form-text">Attach a picture of the receipt</div>
        <input type="file" class="form-control" id="file" aria-describedby="fileMessage1" bind:value={receipt} required on:change={onChooseFile}>
        <div id="fileMessage2" class="form-text">Drop files here</div>
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
            <input class="form-check-input" type="radio" name="flexRadioDefault" id="scoutbook" bind:group={payTo} value="scoutbook">
            <label class="form-check-label" for="scoutbook">
            Scoutbook credit
            </label>
        </div>
        <div class="form-check">
            <input class="form-check-input" type="radio" name="flexRadioDefault" id="check" bind:group={payTo} value="check">
            <label class="form-check-label" for="check">
            Check
            </label>
        </div>
        <div class="form-check">
            <input class="form-check-input" type="radio" name="flexRadioDefault" id="venmo" bind:group={payTo} value="venmo">
            <label class="form-check-label" for="venmo">
            Venmo
            </label>
        </div>
        <div class="form-check">
            <input class="form-check-input" type="radio" name="flexRadioDefault" id="applePay" bind:group={payTo} value="applePay">
            <label class="form-check-label" for="applePay">
            Apple Pay
            </label>
        </div>
    </div>
    <div class="mb-3">
        <label for="paymentDelatils" class="form-label">Payment details</label>
        <div id="paymentDetailsMessage" class="form-text">
            {#if payTo == "scoutbook"}
                Enter the scout's account to credit.
            {:else if payTo == "check"}
                Enter the mailing address to send a check.
            {:else if payTo == "venmo"}
                Enter your Venmo username.
            {:else if payTo == "applePay"}
                Enter ApplePay user name or phone number.
            {:else}
                Unknown payment method.
            {/if}
        </div>
        <textarea class="form-control" id="paymentDelatils" rows="3" bind:value={paymentDetails} required></textarea>
    </div>
    
    <button type="submit" class="btn btn-primary">Submit</button>
</form>



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
    

    /* .form-control{
        margin-top:20px;
        margin-bottom:10px;
    }
    .form-label{
        margin:0;
    } */
    

</style>
