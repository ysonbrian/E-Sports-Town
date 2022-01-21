// SPDX-License-Identifier: MIT
pragma solidity ^0.8.11;

// import "../node_modules/openzeppelin-solidity/contracts/token/ERC721/ERC721.sol";
// import "../node_modules/openzeppelin-solidity/contracts/utils/Counters.sol";
// import "../node_modules/openzeppelin-solidity/contracts/access/Ownable.sol";
// import "../node_modules/openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
// import "../node_modules/openzeppelin-solidity/contracts//token/ERC721/extensions/ERC721URIStorage.sol";
// import "../node_modules/openzeppelin-solidity/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Erc721 is ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    IERC20 public erc20Token;
    uint256 public nftPrice;
    mapping (string => uint256) public getTokenURI;
    mapping (uint256 => uint256) public tokenPrice;


    constructor() ERC721("MyNFTs", "MNFT") {

    }

    function mintNFT(address recipient, string memory tokenURI, uint256 _tokenPrice) public onlyOwner returns (uint256) {

        require(recipient != address(0x0), "No recipient address!");
        _tokenIds.increment();
        uint256 newItemId = _tokenIds.current();
        _mint(recipient, newItemId);
        _setTokenURI(newItemId, tokenURI);
        getTokenURI[tokenURI] = newItemId;
        tokenPrice[newItemId] = _tokenPrice;

        return newItemId;
    }

    function setToken(address erc20CA ) public  returns(bool) {
        require(erc20CA != address(0x0));
        erc20Token = IERC20(erc20CA);
        return true;
    }
    function sellNFT(address buyer, address tokenOwner, uint256 _tokenId, uint256 _nftPrice) public onlyOwner returns (uint256) {

        nftPrice = tokenPrice[_tokenId];
        address serverAddr = ownerOf(_tokenId);
        require(erc20Token.balanceOf(buyer) > _nftPrice, "Buyer has no enough money!");
        require(msg.sender != serverAddr,"Caller is Server Address");  //전체관리 걔정은 구매를 못함
        // require(nftPrice == _nftPrice, "NftPrice and buyer's money are not same");
        // erc20Token.transferFrom(buyer, tokenOwner, _nftPrice);
        safeTransferFrom(tokenOwner, buyer, _tokenId);

        return _tokenId;
    }

    function setApprove(address to, uint256 amount) public {
        erc20Token.approve(to, amount);
    }

    function checkTokenId(string memory tokenUri) public view returns(uint256){
        return getTokenURI[tokenUri];
    }

    function getTokenPrice(uint _tokenId) public view returns(uint) {
        return tokenPrice[_tokenId];
    }
    function getAllowance(address owner, address spender) public view returns(uint256) {
        return erc20Token.allowance(owner, spender);
    }
}