<script>
    let name = ""
    let reason = ""
    let amount = ""
    let receipt = ""
    let reimbersement = ""
    let paymentDetails = ""


</script>


<main class="content">
    <div class="topPart">
        <h2>Troop 69 Reimbursement Form</h2>
        <p>Submit receipts for reimbersement</p>
    </div>
    <div class="mainPart">
        <form>
            <div class="mb-3">
                <label for="nameForm" class="form-label">Your Name</label>
                <input type="text" class="form-control" id="nameForm" bind:value={name}>
                
            </div>
            <div class="mb-3">
                <label for="reasonForm" class="form-label">Reason</label>
                <div id="reasonFormMessage" class="form-text">What was this expense for (activity and purpose)</div>
                <input type="text" class="form-control" id="reasonForm" aria-describedby="reasonFormMessage"bind:value={reason}>
            </div>
            <div class="mb-3">
                <label for="file" class="form-label">Receipt</label>
                <div id="fileMessage1" class="form-text">Attach a picture of the receipt</div>
                <input type="file" class="form-control" id="amount" aria-describedby="fileMessage1">
                <div id="fileMessage2" class="form-text">Drop files here</div>
            </div>
            <div class="mb-3">
                <label for="amount" class="form-label">Amount</label>
                <div id="amountMessage" class="form-text">Dollar amount requested for this reimbursement</div>
                <input type="text" class="form-control" id="amount" aria-describedby="amountMessage" bind:value={amount}>
            </div>
            <div class="form-check">
                <label for="reimbersement" class="form-label">How to receive funds</label>
                <div id="reimbersementMessage" class="form-text">How do you want to receive your reimbursement?</div>
                <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" bind:group={reimbersement} value={1}>
                <label class="form-check-label" for="flexRadioDefault1">
                Scoutbook credit
                </label>
            </div>
            <div class="form-check">
                <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" checked bind:group={reimbersement} value={2}>
                <label class="form-check-label" for="flexRadioDefault2">
                Check
                </label>
            </div>
            <div class="form-check">
                <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" bind:group={reimbersement} value={3} checked>
                <label class="form-check-label" for="flexRadioDefault2">
                Venmo
                </label>
            </div>
            <div class="form-check">
                <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" bind:group={reimbersement} value={4} checked>
                <label class="form-check-label" for="flexRadioDefault2">
                Apple Pay
                </label>
            </div>
            <div class="mb-3">
                <label for="paymentDelatils" class="form-label">Payment details</label>
                <div id="paymentDetailsMessage" class="form-text">Enter the scout's account to credit, the mailing address to send a check, OR the Venmo or ApplePay user name or phone number.</div>
                <textarea class="form-control" id="paymentDelatils" rows="3" bind:value={paymentDetails}></textarea>
            </div>
            
            <button type="submit" class="btn btn-primary">Submit</button>
        </form>
    </div>
</main>


<style>
    .content{
        margin:0 auto;
        width:700px;
    }
    .form-label:after{
        content:" *";
        color:red;
    }
    .topPart{
        background-color: white;
        padding:40px;
    }
    /* .form-control{
        margin-top:20px;
        margin-bottom:10px;
    }
    .form-label{
        margin:0;
    } */
    

</style>
