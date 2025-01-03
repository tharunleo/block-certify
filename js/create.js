const contractAddr = "0x82af6F7fd6435a328ca18DCfEDD573600c3A063E";
var walletConnected = false;

async function connectMetamask() {
    if (typeof window.ethereum !== 'undefined') {
        const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
        const account = accounts[0];
        
        document.getElementById("connectedMsg").style.display = "inline";
        if (walletConnected == false) {
            document.getElementById("connectedMsg").innerHTML += "<br>You are using account: " + account;
            walletConnected = true;
        }
    } else {
        document.getElementById("MetaMaskWarning").innerHTML = "MetaMask not installed.";
    }
}

function enableButton() {
    if (document.getElementById("recpWallet").value.trim() !== "" && document.getElementById("filelink").value.trim() !== "") {
        document.getElementById("finalSubmit").disabled = false;
    } else {
        document.getElementById("finalSubmit").disabled = true;
    }
}

const web3 = new Web3(new Web3.providers.HttpProvider('https://ropsten.infura.io/v3/75c0aeb12c204ddc8a1b3c8727055a89'));

async function makeMyNFT() {
    window.contract = await new web3.eth.Contract(contractABI, contractAddr);
    
    let receiverAddress = document.getElementById("recpWallet").value;
    let filelink = document.getElementById("filelink").value;
    
    const transactionParameters = {
        to: contractAddr, // Required except during contract publications.
        from: window.ethereum.selectedAddress, // must match user's active address.
        data: window.contract.methods.mintNFT(receiverAddress, filelink).encodeABI() // make call to NFT smart contract
    };

    try {
        // Sign transaction via Metamask
        const txHash = await window.ethereum.request({
            method: 'eth_sendTransaction',
            params: [transactionParameters],
        });

        document.getElementById("TrxResult").style.display = "block";
        document.getElementById("TrxResult").innerHTML = "Transaction successful. Hash: " + txHash;
    } catch (error) {
        console.error("Transaction failed", error);
        document.getElementById("TrxResult").style.display = "block";
        document.getElementById("TrxResult").innerHTML = "Transaction failed. See console for details.";
    }
}
