const { expect } = require("chai");
const { ethers } = require("hardhat");
const { isCallTrace } = require("hardhat/internal/hardhat-network/stack-traces/message-trace");

describe("MyNFT", function () {
  it("Should mint and transfer an NFT to someone", async function () {
    const Colors = await ethers.getContractFactory("Colors")
    const colors = await Colors.deploy();
    await colors.deployed();

    const recipient = '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266'
    const metadataURI = 'cid/test.png'

    let balance = await colors.balanceOf(recipient)
    expect(balance).to.equal(0)

    const newlyMintedToken = await colors.payToMint(recipient, metadataURI, { value: ethers.utils.parseEther('0.05') })

    // wait until the transation is mined
    await newlyMintedToken.wait()
    balance = await colors.balanceOf(recipient)
    expect(balance).to.equal(1)

    expect(await colors.isContentOwned(metadataURI)).to.equal(true)
  })
})