// SPDX-License-Identifier: MIT
pragma solidity ^0.5.11;

contract MultiSigWallet {
    /*S06. ETH를 보내는 contract*/
    event Deposit(address indexed sender, uint amount, uint balance);
    /*E06. ETH를 보내는 contract*/

    /*S05. 01~04에 해당하는 Event 정의하기*/
    event SubmitTransaction(
        address indexed owner,
        uint indexed txIndex,
        address indexed to,
        uint value,
        bytes data
    );
    event ConfirmTransaction(address indexed owner, uint indexed txIndex);
    event RevokeConfirmation(address indexed owner, uint indexed txIndex);
    event ExecuteTransaction(address indexed owner, uint indexed txIndex);
    /*E05. 01~04에 해당하는 Event 정의하기*/

    /*S07. owner를 저장하는 변수(배열로)*/
    address[] public owners;
    /*E07. owner를 저장하는 변수(배열로)*/
    /*S12. address가 owner 인지 확인하는 것*/
    mapping(address => bool) public isOwner;
    /*E12. address가 owner 인지 확인하는 것*/
    /*S08. Confirmation을 충족시키는 숫자(과반수)*/
    uint public numConfirmationsRequired;
    /*E08. Confirmation을 충족시키는 숫자(과반수)*/

    /*S10. Transaction에 저장하고 있을 데이터들*/
    struct Transaction {
        address to; // ETH를 보낼 주소
        uint value; // 보낼 ETH 양
        bytes data; // 다른 transaction에 의해 호출 됬을때, 호출한 transaction 저장
        bool executed; // transaction의 실행됬는지 여부
        mapping(address => bool) isConfirmed; // owner가 transaction을 approve하고, 주소와 boolean을 메핑하것을 저장해여함.
        uint numConfirmations; // approval한 수를 저장함.
    }
    /*E10. Transaction에 저장하고 있을 데이터들*/

    /*S09. submitTransaction 함수로 propose가 호출되고, transaction을 저장하고 있을 배열*/
    Transaction[] public transactions;
    /*E09. submitTransaction 함수로 propose가 호출되고, transaction을 저장하고 있을 배열*/

    /*S14. 소유자 인자 확인하는 조건*/
    modifier onlyOwner() {
        require(isOwner[msg.sender], "not owner");
        _;
    }
    /*E14. 소유자 인자 확인하는 조건*/

    /*S16. 존재하는 transaction인지 확인하기*/
    modifier txExists(uint _txIndex) {
        require(_txIndex < transactions.length, "tx does not exist");
        _;
    }
    /*E16. 존재하는 transaction인지 확인하기*/

    /*S17. transaction이 실행(execute)되지 않았는지 확인하기*/
    modifier notExecuted(uint _txIndex) {
        require(!transactions[_txIndex].executed, "tx already executed");
        _;
    }
    /*E17. transaction이 실행(execute)되지 않았는지 확인하기*/

    /*S18. transaction이 확인(승락여부-confirm)되지 않았는지 확인하기*/
    modifier notConfirmed(uint _txIndex) {
        require(!transactions[_txIndex].isConfirmed[msg.sender], "tx already confirmed");
        _;
    }
    /*E18. transaction이 확인(승락여부-confirm)되지 않았는지 확인하기*/

    /*S11. 상태변수를 초기화하는 생성자*/
    // 입력은 multisig wallet을 소유자들의 주소를 담은 배열, confirmation을 충족시킬 과반수
    constructor(address[] memory _owners, uint _numConfirmationsRequired) public {
        require(_owners.length > 0, "owners required"); // 소유자들이 꼭 있어야함, 비어 있으면 안됨.
        require( // 과반수는 0초과 그리고 소유자 수 이하 여야 합니다.
        _numConfirmationsRequired > 0 &&
        _numConfirmationsRequired <= _owners.length,
        "invalid number of required confirmations");

        for (uint i = 0; i < _owners.length; i++) { // 입력받은 _owner를 변수에 저장하기
            address owner = _owners[i]; // 변수에 입력

            require(owner != address(0), "invalid owner"); // address가 아니면 유효하지 않은 owner로 나옴
            /*E11. 상태변수를 초기화하는 생성자*/
            /*S12. 입력한 address가 owner인지 확인하기*/
            require(!isOwner[owner], "owner not unique");
            // 위 require를 통과하면 true
            isOwner[owner] = true;
            // owners 배열에 owner 넣기
            owners.push(owner);
        }
        // 입력한 과반수를 변수에 저장하기
        numConfirmationsRequired = _numConfirmationsRequired;
        /*E12. 입력한 address가 owner인지 확인하기*/
    }

    /*S21. fallback 함수 만들기*/
    function () payable external {
        emit Deposit(msg.sender, msg.value, address(this).balance); // Deposit Event 실행
    } // payable로 선언하기(contract에 ETH를 보낼 수 있음)

    // NOTE: helper function to easily deposit in Remix, easily deposit into this contract(remix에서 DEMO할때)
    function deposit() payable external {
        emit Deposit(msg.sender, msg.value, address(this).balance); // Deposit Event 실행
    }
    /*E21. fallback 함수 만들기*/

    /*S01. 어느 한 owner가 원하는 transaction을 propose 하기, (다른 owners에 의해 approve 되어야 함)*/
    function submitTransaction(
    /*E01. 어느 한 owner가 원하는 transaction을 propose 하기, (다른 owners에 의해 approve 되어야 함)*/
        /*S13. 입력변수 및 내부 로직 설정*/
        address _to, // ETH를 보낼 주소
        uint _value, // 보낼 ETH의 양
        bytes memory _data // ?
        ) public onlyOwner // owner만 접근할 수 있도록
    {
        uint txIndex = transactions.length; // transaction ID를 찾을 수 있음 ,transaction 길이를 아용해서
        // 첫번째 transaction ID = 0

        // transaction을 초기화함, transaction array에 추가하기
        transactions.push(
            Transaction({
                to: _to,
                value: _value,
                data: _data,
                executed: false, // false로 해둬야함(초기화)
                numConfirmations: 0 // 0으로 (초기화)
            })
        );
        // Event 호출( emit )
        emit SubmitTransaction(msg.sender, txIndex, _to, _value, _data);
    }
    /*E13. 입력변수 및 내부 로직 설정*/

    /*S02. 다른 owners 들이 transaction을 approve 할 수 있게 해줌.*/
    function confirmTransaction(
    /*E02. 다른 owners 들이 transaction을 approve 할 수 있게 해줌.*/
        /*S15. transaction을 confirm하는 로직*/
        uint _txIndex) // transaction ID가 필요함, confirmations하기 위해서는
        public
        onlyOwner // owner만 접근할 수 있도록
        txExists(_txIndex) // owner는 존재하는 transaction 확인만 할 수 있음
        notExecuted(_txIndex) // 아직 execute되지 않은 transaction만 사용 가능
        notConfirmed(_txIndex) // owner가 transaction을 아직 confirmations하지 않은 것이여야함.(한번 컨펌하면 돌이킬 수 없음)
    {
        Transaction storage transaction = transactions[_txIndex]; // transaction 업데이트, 최신 transaction을 가져오기
        transaction.isConfirmed[msg.sender] = true; // transaction 확인여부를 true로 설정. msg.sender가 transaction을 approve 했다라는 의미
        transaction.numConfirmations += 1; // 승락 수를 증가시킨다
        //isConfirmed[_txIndex][msg.sender] = true;

        emit ConfirmTransaction(msg.sender, _txIndex); // Event를 실행시킨다
    }
    /*E15. transaction을 confirm하는 로직*/

    /*S04. 충분한(과반수이상) owner가 transaction을 approve 했다면, transaction을 실행할 수 있음*/
    function executeTransaction(
    /*E04. 충분한(과반수이상) owner가 transaction을 approve 했다면, transaction을 실행할 수 있음*/
        /*S19. transaction을 execute하는 로직*/
        uint _txIndex) // transaction execute위해 ID가 필요
        public
        onlyOwner // 소유자만 가능
        txExists(_txIndex) // 존재하는 tx
        notExecuted(_txIndex) // 실행되지 않은 tx
        // notConfirmed(_txIndex)
    {
        Transaction storage transaction = transactions[_txIndex]; // transaction 업데이트, 최신 transaction을 가져오기

        require( // 과반수 이상의 confirmations 체크하기
            transaction.numConfirmations >= numConfirmationsRequired,
            "cannot execute tx");

        transaction.executed = true; // transaction execute 여부 true로 변경

        (bool success, ) = transaction.to.call.value(transaction.value)(transaction.data); // call method 로 실제적인 실행

        require(success, "tx failed"); // call의 성공여부 확인

        emit ExecuteTransaction(msg.sender, _txIndex); // Event 실행하기
    }
    /*E19. transaction을 execute하는 로직*/

    /*S03. confirmation을 cancel할 때 사용*/
    function revokeConfirmation(
    /*E03. confirmation을 cancel할 때 사용*/
        /*S20. transaction을 revoke하는 로직 - 연습으로 해보기 Description에 있음(정답)*/
        uint _txIndex) // transaction ID가 필요함, confirmations하기 위해서는
        public
        onlyOwner // owner만 접근할 수 있도록
        txExists(_txIndex) // owner는 존재하는 transaction 확인만 할 수 있음
        notExecuted(_txIndex) // 아직 execute되지 않은 transaction만 사용 가능
        notConfirmed(_txIndex) // owner가 transaction을 아직 confirmations하지 않은 것이여야함.(한번 컨펌하면 돌이킬 수 없음)
    {
        Transaction storage transaction = transactions[_txIndex]; // transaction 업데이트, 최신 transaction을 가져오기
        transaction.isConfirmed[msg.sender] = false; // transaction 확인여부를 true로 설정. msg.sender가 transaction을 approve 했다라는 의미
        //transaction.numConfirmations -= 1; // 승락 수를 감소시킨다 ?? 증가 안시키는 것만 하면 되지 않을까?

        emit RevokeConfirmation(msg.sender, _txIndex); // Event를 실행시킨다
    }
    /*E20. transaction을 revoke하는 로직 - 연습으로 해보기 Description에 있음(정답)*/
}

// 다른 Contract 호출하기
contract TestContract {
    uint public i;

    // state 변수i 값을 상승시키는 함수
    function callMe(uint j) public {
        i += j;
    }

    // TestContract로 보내진 transaction data
    function getData() public pure returns (bytes memory) {
        return abi.encodeWithSignature("callMe(uint256)", 123);
    }
}