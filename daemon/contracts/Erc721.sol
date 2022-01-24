// SPDX-License-Identifier: MIT
pragma solidity ^0.8.11;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MultiAuction {

    // 예외처리
    // 초기비딩할때 전체가 동등하면 첫번째 비드한 사람이 Owner가 된다
    // 찬성 비중이 혼자 3이고 반대가 다수의 인원의 투표합이 3 일경우 단일로 돈을 많이낸 찬성을 수락한다.

    // address[] public owners;
    mapping(uint => address[]) public isOwner;
    mapping(uint => mapping(address => uint)) public ownerPower;
    mapping(uint => uint) public totalPowerOfTokenId;
    uint public numConfirmationsRequired;


    // 판매할때 체크하는부분
    modifier ownerCheck(uint tokenId, address userAddress) {
        uint length = isOwner[tokenId].length;
        bool check = false;
        for(uint i = 0; i < length; i++){
            if(isOwner[tokenId][i] == userAddress) {
                check = true;
            }
        }
        require(check == true, "Current User is not owner");
        _;
    }


    constructor(){}

    function setMultiSigUsers(address[] memory _owners, uint[] memory _ownerValue, uint tokenId) public{
        require(_owners.length > 0, "owners required");
        require(_ownerValue.length > 0, "owners value required");
        for (uint i = 0; i < _owners.length; i++) {
            address owner = _owners[i];
            uint ownerValue = _ownerValue[i];

            require(owner != address(0), "invalid owner");
            require(ownerValue != 0, "invalid owner power");

            isOwner[tokenId].push(owner);
            ownerPower[tokenId][owner] = ownerValue;
            totalPowerOfTokenId[tokenId] += ownerValue;
        }

    }

    function getOwners(uint tokenId) public view returns (address[] memory) {
        return isOwner[tokenId];
    }


    function getOwnerPower(uint tokenId, address userAddress) public view returns(uint) {
        return ownerPower[tokenId][userAddress];
    }

    function getTotalBidOfToken(uint tokenId) public view returns(uint) {
        return totalPowerOfTokenId[tokenId];
    }

}


contract Erc721 is ERC721URIStorage, Ownable, MultiAuction {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    IERC20 public erc20Token;
    MultiAuction public multiAuction;
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
    function sellNFT(address buyer, address tokenOwner, uint256 _tokenId, uint256 _nftPrice, uint _type) public onlyOwner returns (uint256) {
        if(_type == 1) {
            nftPrice = tokenPrice[_tokenId];
            address serverAddr = ownerOf(_tokenId);
            require(erc20Token.balanceOf(buyer) > _nftPrice, "Buyer has no enough money!");
            require(msg.sender != serverAddr,"Caller is Server Address");  //전체관리 걔정은 구매를 못함
            // require(nftPrice == _nftPrice, "NftPrice and buyer's money are not same");
            // erc20Token.transferFrom(buyer, tokenOwner, _nftPrice);
            safeTransferFrom(tokenOwner, buyer, _tokenId);
        } else {}


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