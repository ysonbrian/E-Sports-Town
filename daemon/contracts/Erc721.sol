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
    mapping(uint => address[]) public owners;
    mapping(uint => mapping(address => uint)) public ownerPower;
    mapping(uint => uint) public totalPowerOfTokenId;
    mapping(uint => bool) public isMultiOwners;


    // 판매할때 체크하는부분
    // 전체 주소를 받아서 하나씩 확인해본다
    modifier ownerCheck(uint _tokenId, address[] memory userAddress) {
        uint length = owners[_tokenId].length;
        bool check = false;
        for(uint i = 0; i < length; i++){
            if(owners[_tokenId][i] == userAddress[i]) {
                check = true;
            }
        }
        require(check == true, "Current User is not owner");
        _;
    }

    // 다중 지분 확인
    modifier multiOwners(uint _tokenId) {
        require(isMultiOwners[_tokenId] == true, "Current token is not multi owners");
        _;
    }


    constructor(){}

    function setMultiSigUsers(address[] memory _owners, uint[] memory _ownerValue, uint _tokenId) public{
        require(_owners.length > 0, "owners required");
        require(_ownerValue.length > 0, "owners value required");
        for (uint i = 0; i < _owners.length; i++) {
            address owner = _owners[i];
            uint ownerValue = _ownerValue[i];

            require(owner != address(0), "invalid owner");
            require(ownerValue != 0, "invalid owner power");

            owners[_tokenId].push(owner);
            ownerPower[_tokenId][owner] = ownerValue;
            totalPowerOfTokenId[_tokenId] += ownerValue;
        }
        isMultiOwners[_tokenId] = true;

    }

    function deleteOwners(address [] memory _owners, uint _tokenId) public {
        uint len = owners[_tokenId].length;
        delete owners[_tokenId];
        for(uint i = 0; i < len; i++) {
            delete ownerPower[_tokenId][_owners[i]];
        }
        delete totalPowerOfTokenId[_tokenId];
        isMultiOwners[_tokenId] = false;
    }

    function checkMultiOwners(uint _tokenId) public view returns(bool){
        return isMultiOwners[_tokenId];
    }

    function getOwners(uint tokenId) public view returns (address[] memory) {
        return owners[tokenId];
    }


    function getOwnerPower(uint _tokenId, address userAddress) public view returns(uint) {
        return ownerPower[_tokenId][userAddress];
    }

    function getTotalBidOfToken(uint _tokenId) public view returns(uint) {
        return totalPowerOfTokenId[_tokenId];
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

    // 민팅 및 판매

    function mintNFT(address recipient, string memory tokenURI, uint256 _tokenPrice) public onlyOwner returns (uint256) {

        require(recipient != address(0x0), "No recipient address!");
        _tokenIds.increment();
        uint256 newItemId = _tokenIds.current();
        _mint(recipient, newItemId);
        _setTokenURI(newItemId, tokenURI);
        getTokenURI[tokenURI] = newItemId;
        tokenPrice[newItemId] = _tokenPrice;
        _setApprovalForAll(recipient, msg.sender, true);

        return newItemId;
    }

    function sellNFT(address buyer, address tokenOwner, uint256 _tokenId) public onlyOwner returns (uint256) {
        // nftPrice = tokenPrice[_tokenId];
        address _tokenOwner = ownerOf(_tokenId); // 토큰 주인
        // require(erc20Token.balanceOf(buyer) > _nftPrice, "Buyer has no enough money!");
        require(msg.sender != _tokenOwner,"Caller is Server Address");  // 토큰이 컨트랙트 주인인지 확인
        // require(isMultiOwners[_tokenId] == false, "This token has many owners"); // 다중 지분 확인 (MultiAuction 변수)
        require(isApprovedForAll(tokenOwner, msg.sender),'token owner did not approve');
        // require(nftPrice == _nftPrice, "NftPrice and buyer's money are not same");
        // erc20Token.transferFrom(buyer, tokenOwner, _nftPrice);

        _setApprovalForAll(buyer, msg.sender, true);
        safeTransferFrom(tokenOwner, buyer, _tokenId);

        return _tokenId;
    }

     function sellMultiNFT(address maxOwner,address tokenOwner, uint256 _tokenId, address[] memory multiAddress, uint[] memory _ownerValue) public onlyOwner returns (uint256) {
        nftPrice = tokenPrice[_tokenId];
        address _tokenOwner = ownerOf(_tokenId); // 토큰 주인
        // require(erc20Token.balanceOf(maxOwner) > _nftPrice, "Buyer has no enough money!"); // 구매자가 돈이 있는지 확인
        require(msg.sender != _tokenOwner,"Caller is Server Address");  // 토큰이 컨트랙트 주인인지 확인
        require(isApprovedForAll(tokenOwner, msg.sender),"token owner did not approve");
        // require(nftPrice == _nftPrice, "NftPrice and buyer's money are not same");
        // erc20Token.transferFrom(buyer, tokenOwner, _nftPrice);
        // setMultiSig(multiAddress,_ownerValue, _tokenId); // 다중지분 설정
        setMultiSigUsers(multiAddress, _ownerValue, _tokenId); // 다중지분 설정 (MultiContract 에서 바로 사용)
        _setApprovalForAll(maxOwner, msg.sender, true);
        safeTransferFrom(tokenOwner, maxOwner, _tokenId);

        return _tokenId;
    }


    // 컨트랙트 설정

    function setToken(address erc20CA ) public  returns(bool) { // Erc20 컨트랙트 설정
        require(erc20CA != address(0x0));
        erc20Token = IERC20(erc20CA);
        return true;
    }

    function setMultiContract (address multiCA) public returns(bool) { // MultiContract 설정
        require(multiCA != address(0x0));
        multiAuction = MultiAuction(multiCA);
        return true;
    }


    // 컨트랙트 함수들...

    function setApprove(address to, uint256 amount) public { // Erc20 토큰 권한 부여
        erc20Token.approve(to, amount);
    }

    function setMultiSig(address[] memory _owners, uint[] memory _ownerValue, uint tokenId) public { // 다중 지분 설정
        // 대표 Owner주소를 받아서 sellNFT 함수로 주소 이전을 하고
        multiAuction.setMultiSigUsers(_owners, _ownerValue, tokenId);
        // Nft가 다중지분 인것을 true로 함
    }

    function deleteMultiSig(address[] memory _owners, uint tokenId) public { // 다중 지분 삭제
        multiAuction.deleteOwners(_owners, tokenId);
    }

    function isMultiContract(uint _tokenId) public view returns(bool) { // 다중 지분 확안 (bool형태)
        return multiAuction.checkMultiOwners(_tokenId);
    }

    function getMulOwners(uint tokenId) view public returns(address[] memory) { // 다중 지분 인원 확인 (배열형태)
        return multiAuction.getOwners(tokenId);
    }

    function checkTokenId(string memory tokenUri) public view returns(uint256){ // 토큰 URI 확인
        return getTokenURI[tokenUri];
    }

    function getTokenPrice(uint _tokenId) public view returns(uint) { // 토큰 가격 확인
        return tokenPrice[_tokenId];
    }
    function getAllowance(address owner, address spender) public view returns(uint256) { // Erc20 토큰 approve 된 값 확인
        return erc20Token.allowance(owner, spender);
    }

}