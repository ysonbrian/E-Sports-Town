// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

import "../node_modules/openzeppelin-solidity/contracts/token/ERC721/ERC721.sol";
import "../node_modules/openzeppelin-solidity/contracts/utils/Counters.sol";
import "../node_modules/openzeppelin-solidity/contracts/access/Ownable.sol";
import "../node_modules/openzeppelin-solidity/contracts//token/ERC721/extensions/ERC721URIStorage.sol";
import "../node_modules/openzeppelin-solidity/contracts/token/ERC20/IERC20.sol";


contract NFTLootBox is ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    IERC20 public token;
    uint256 public nftPrice;
    mapping (string => uint256) public getToken;
    mapping (uint256 => uint256) public tokenPrice;

    constructor() ERC721("MyNFTs", "MNFT") {

        nftPrice = 100e18;
    }

    function mintNFT(address recipient, string memory tokenURI) public onlyOwner returns (uint256) {

        require(token.balanceOf(recipient) >= nftPrice);

         //오류지점
        token.transferFrom(recipient, msg.sender, nftPrice);

        _tokenIds.increment();
        uint256 newItemId = _tokenIds.current();
        _mint(recipient, newItemId);
        _setTokenURI(newItemId, tokenURI);
        getToken[tokenURI] = newItemId;
        _setApprovalForAll(recipient, msg.sender, true);
        return newItemId;
    }

    function setToken (address tokenAddress) public onlyOwner returns (bool) {
        require(tokenAddress != address(0x0));
        token = IERC20(tokenAddress);
        return true;
    }
    function checkTokenId(string memory tokenUri) public view returns(uint256){
        return getToken[tokenUri];
    }


    function setForSale(uint256 _tokenId, uint256 _price) public onlyOwner {
        //토큰의 소유자 계정만 판매하도록 만드는 함수
        address tokenOwner = ownerOf(_tokenId);
        require(_price > 0,'price is zero or lower');
        require(isApprovedForAll(tokenOwner, msg.sender),'token owner did not approve');
        tokenPrice[_tokenId] = _price;
    }

    function purchaseToken(uint256 _tokenId,address buyer) public onlyOwner {

        uint256 price = tokenPrice[_tokenId];
        address tokenSeller = ownerOf(_tokenId);
        require(msg.sender != tokenSeller,"caller is token seller");  //전체관리 걔정은 구매를 못함
        require(tokenSeller != buyer,"owner not buy itself");  //본인은 구매를 못함


        token.transferFrom(buyer,tokenSeller,price);
        safeTransferFrom(tokenSeller, buyer, _tokenId);

    }
}