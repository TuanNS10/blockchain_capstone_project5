// define a variable to import the <Verifier> or <renamedVerifier> solidity contract generated by Zokrates
var SquareVerifier = artifacts.require('SquareVerifier');
// Test verification with correct proof
// - use the contents from proof.json generated from zokrates steps
let proofJson = {
    "proof": {
        "a": ["0x01a8d1767b08bfc5187771b799b7943333558a4f44553eb945bdc77a1f5efe2b", "0x1e0e7f6c9fa20cedffb2812b52f61875eb54ee3e7e1572ec3b99248f13ad7c13"],
        "b": [["0x210ab0edbe52e7917f8f7e1a74becec2572ad8a94dec5d9b8dc5118825c91719", "0x115448a72997a28179a97dabde88917e5cc902f10779430c67483e844362b363"], ["0x1211cdc11d40f5038f1be836b589bacd78f33cf2233fc888b9ca03ebc790da5a", "0x2e049d486210a56d99e7d878ba6e28fc5064887ad0b377a6a1b2c2753b36d394"]],
        "c": ["0x08c8d919dba357c74df4b12aa9a77e989fbab32d93337ffaca14b3b53abe3362", "0x2d22ebb256ea07e0ea39d21a3b01027292197919d3dd3123a28857a8d27fcebe"]
    },
    "inputs": ["0x0000000000000000000000000000000000000000000000000000000000000009", "0x0000000000000000000000000000000000000000000000000000000000000001"]
}
    
// Test verification with incorrect proof
contract('SquareVerifier', accounts => {
    describe('Test SquareVerifier', function () {
  
        const account_one = accounts[0];
  
        beforeEach(async function () { 
            this.contract = await SquareVerifier.new({from: account_one});
        })
        it('should verify correct proof', async function () {
            let verified = await this.contract.verifyTx.call(
              proofJson.proof.a, proofJson.proof.b, proofJson.proof.c,
              proofJson.inputs
            )
            assert.equal(verified, true, 'should not fail with a correct proof')
        })
        it('should reject incorrect proof', async function () {
            let verified = await this.contract.verifyTx.call(
              proofJson.proof.a, proofJson.proof.b, proofJson.proof.a,
              proofJson.inputs
            )
            assert.strictEqual(verified, false, 'should accept a incorrect proof')
        })
    })
  })
